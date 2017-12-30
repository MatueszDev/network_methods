"use strict";
//var interval = setInterval(read_cell_automat, 50);
var network;


function create_cell_automat(size=25, square=10, random=1)
{
    square /= 2;
    network = new Array(size);
    if(!random){
      for(var i=0; i < size; i++)
      {
          network[i] = new Array(size)
          for(var j = 0 ; j < size ; j++)
          {
              if((i >= size/2-square && i <= size/2+square) && (j >= size/2-square && j <= size/2+square))
                  network[i][j] = true;
              else
                  network[i][j] = false;
          }
      }
    }else{
      for(var i=0; i < size; i++)
      {
          network[i] = new Array(size)
          for(var j = 0 ; j < size ; j++)
          {
              network[i][j] = Math.round(Math.random());
          }
      }
    }
}

function read_cell_automat()
{

    var text = "";
    var size = network.length;
    for(var i=0; i < size; i++)
    {
        for(var j = 0 ; j < size ; j++)
        {
            if(network[i][j] === 1)
                text += "*";
            else
                text += "&nbsp;";
        }
        text += "<br/>";
    }
    document.getElementById("grid").innerHTML = text;
    next_cell();
}

function next_cell()
{
    var size = network.length;
    var temporary_network = new Array(size);

    for(var i=0; i < size;i++)
        temporary_network[i]=new Array(size);
    for(var i=0; i < size; i++)
    {
        for(var j = 0 ; j < size ; j++)
        {
            if(i > 0 && i < size-1 && j >0 && j < size-1)
            {
                let sum_of_adjacent_cells = network[i-1][j-1] + network[i-1][j] + network[i-1][j+1] + network[i+1][j-1] + network[i+1][j] + network[i+1][j+1] + network[i][j-1] + network[i][j+1];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                    temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                    temporary_network[i][j] = 1;
                else
                    temporary_network[i][j] = 0;
            }
            else if(i === 0 && j > 0 && (j < size -1))
            {
                let sum_of_adjacent_cells = network[size-1][j-1] + network[size-1][j] + network[size-1][j+1] +
                                    network[1][j-1] + network[1][j] + network[1][j+1] +
                                    network[0][j-1] + network[0][j+1];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                  temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                  temporary_network[i][j] = 1;
                else
                  temporary_network[i][j] = 0;

            }
            else if(i === size-1 && j > 0 && (j < size -1))
            {
                let sum_of_adjacent_cells = network[size-1][j-1] + network[size-1][j+1] +
                                network[size-2][j-1] + network[size-2][j] + network[size-2][j+1] +
                                network[0][j-1] + network[0][j] + network[0][j+1];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                  temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                  temporary_network[i][j] = 1;
                else
                  temporary_network[i][j] = 0;

            }
            else if(i > 0 && (i < size - 1) && j === 0)
            {
                let sum_of_adjacent_cells = network[i-1][size-1] + network[i-1][j] + network[i-1][j+1] + network[i+1][size-1] + network[i+1][j] + network[i+1][j+1] + network[i][size-1] + network[i][j+1];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                  temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                  temporary_network[i][j] = 1;
                else
                  temporary_network[i][j] = 0;
            }
            else if(i > 0 && (i < size - 1) && j === size-1)
            {
                let sum_of_adjacent_cells = network[i-1][j-1] + network[i-1][j] + network[i-1][0] + network[i+1][j-1] + network[i+1][j] + network[i+1][0] + network[i][j-1] + network[i][0];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                  temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                  temporary_network[i][j] = 1;
                else
                  temporary_network[i][j] = 0;
            }
            else if(i === 0 && j === 0)
            {
                let sum_of_adjacent_cells = network[size-1][size-1] + network[size-1][j] + network[size-1][j+1] + network[i+1][size-1] + network[i+1][j] + network[i+1][j+1] + network[i][size-1] + network[i][j+1];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                  temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                  temporary_network[i][j] = 1;
                else
                  temporary_network[i][j] = 0;
            }
            else if(i === size-1 && j === 0)
            {
                let sum_of_adjacent_cells = network[size-2][size-1] + network[i-1][j] + network[i-1][j+1] + network[i][size-1] + network[i][j+1] + network[j][i] + network[j][j] + network[j][j+1];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                  temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                  temporary_network[i][j] = 1;
                else
                  temporary_network[i][j] = 0;
            }
            else if(i === 0 && j === size-1)
            {
                let sum_of_adjacent_cells = network[j][j-1] + network[j][j] + network[j][i] + network[i][j-1] + network[i][i] + network[i+1][j-1] + network[i+1][j] + network[i+1][i];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                  temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                  temporary_network[i][j] = 1;
                else
                  temporary_network[i][j] = 0;
            }
            else if(i === size-1 && j === size-1)
            {
                let sum_of_adjacent_cells = network[i-1][j-1] + network[i-1][j] + network[i-1][0] + network[i][j-1] + network[i][0] + network[0][j-1] + network[0][j] + network[0][0];

                if(sum_of_adjacent_cells === 2 && network[i][j] ===1)
                  temporary_network[i][j] = 1;
                else if (sum_of_adjacent_cells === 3)
                  temporary_network[i][j] = 1;
                else
                  temporary_network[i][j] = 0;
            }
        }
    }

    for(var i = 0; i < size; i++)
        network[i] = temporary_network[i].slice();
}

function change_state(event)
{
  if(event.pageX)
			{
				var positonX = event.pageX;
				var positonY = event.pageY;
			}else if(event.clientX){
				var positonX = event.cilentX;
				var positonY = event.clientY;
			}

		var restPoint = "";
    var canvas = $("#glCanvas");
    var position = canvas.position();
    var network_size = network.length;
    var width = canvas.width() / network_size;
    var height = canvas.height() / network_size;

    var x = Math.floor((positonX - position.left)  / width);
		var y = Math.floor((positonY - position.top-40)  / height) ;

    network[x][y] = !network[x][y];
    main(network);
}

//Conways game of life
