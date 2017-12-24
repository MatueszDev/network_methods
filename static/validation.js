"use strict";

function check_network_size()
{
  var response = document.getElementById('response');
  var size_place = document.getElementById('grid');

  response.innerHTML="";


  var size = parseInt(document.getElementById("size").value);
  //console.log(size);
  if(isNaN(size))
  {
    response.innerHTML = '<p style="color:#ff3333;">&nbsp; Rozmiar siatki musi być liczbą!</p>';
    return;
  }

  if(size > 100 || size < 15)
  {
    response.innerHTML = '<p style="color:#ff3333;">&nbsp; Rozmiar siatki musi być z zakresu 15-100!</p>';
    return;
  }
  var radio_option = document.getElementsByName("type_of_network");

  if(radio_option[0].checked)
      start(size, 1, 1);
  else {
    let square_size = parseInt(document.getElementById("square_size").value);

    if(isNaN(square_size))
    {
      response.innerHTML = '<p style="color:#ff3333;">&nbsp; Rozmiar boku kwadratu musi być liczbą!</p>';
      return;
    }

    if(square_size > size || square_size <= 0)
    {
      response.innerHTML = '<p style="color:#ff3333;">&nbsp; Rozmiar boku kwadratu nie moze przekroczyć '+size+' !</p>';
      return;
    }
    start(size, square_size, 0);
  }


}

function add_square_size()
{
  var additional_input = document.getElementById("square");
  var radio_option = document.getElementsByName("type_of_network");

  if( radio_option[0].checked)
  {
      additional_input.innerHTML = "";
  }else{
    var new_input = `Długość boku kwadratu:<br/>
    <input type="text" id="square_size" /><br/><br/>`;
    additional_input.innerHTML = new_input;
  }
}
