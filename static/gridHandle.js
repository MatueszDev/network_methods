"use strict";


function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function main(network) {
  // Get A WebGL context
  var network_size = network.length;
  var canvas = document.getElementById("glCanvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  // Get the strings for our GLSL shaders
  var vertexShaderSource = `
  // an attribute will receive data from a buffer
  attribute vec4 a_position;

  uniform vec2 u_resolution;
  // all shaders have a main function
  void main() {

    //vec2 zeroToOne = a_position.xy / u_resolution;

    //vec2 zeroToTwo = zeroToOne * 2.0;

    //vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = a_position;//vec4(clipSpace, 0, 1);
  }
`;
  var fragmentShaderSource = `

  precision mediump float;
  uniform vec4 u_color;

  void main() {
      gl_FragColor = u_color;
    }
      `;

  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Link the two shaders into a program
  var program = createProgram(gl, vertexShader, fragmentShader);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  var colorUniformLocation = gl.getUniformLocation(program, "u_color");
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)

  // code above this line is initialization code.
  // code below this line is rendering code.

  drawScene();

  function updatePosition() {
    return function(event) {
      drawScene();
    }
  }

  function drawScene()
  {
    resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0., 0., 0., 1.);
    gl.clear(gl.COLOR_BUFFER_BIT);



    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset)

    var rectangle_width = 2/network_size;



    for(var i=0; i < network_size; ++i)
    {
      for(var j=0; j < network_size; ++j)
      {
        setRectangle(gl, -1.0 + i*rectangle_width, 1 -(j+1)*rectangle_width, rectangle_width, rectangle_width);

        if(network[i][j]){
          gl.uniform4f(colorUniformLocation, 0, 0, 0, 1);
        }else {
          gl.uniform4f(colorUniformLocation, 0.95, 0.95, 0.95, 1);
        }
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
      }

    }

    gl.uniform4f(colorUniformLocation, 0.9, 0.9, 0.9, 1);

    for(var i=0; i < network_size; ++i)
    {
      setLine(gl, 1, -1.0 + i*rectangle_width, 1);

      var primitiveType = gl.LINES;
      var offset = 0;
      var count = 2;
      gl.drawArrays(primitiveType, offset, count);
    }
    for(var i=0; i < network_size; ++i)
    {
      setLine(gl, -1.0 + i*rectangle_width, 1, 0);

      var primitiveType = gl.LINES;
      var offset = 0;
      var count = 2;
      gl.drawArrays(primitiveType, offset, count);
    }
  }
}






function setRectangle(gl, x, y, width, height)
{
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}

function setLine(gl, x, y, version)
{
  if(version){
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          x, y,
          -x, y,
    ]), gl.STATIC_DRAW);
  }else{
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          x, y,
          x, -y,
    ]), gl.STATIC_DRAW);
  }
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  var width  = canvas.clientWidth  * multiplier | 0;
  var height = canvas.clientHeight * multiplier | 0;
  if (canvas.width !== width ||  canvas.height !== height) {
    canvas.width  = width;
    canvas.height = height;
    return true;
  }
  return false;
}
