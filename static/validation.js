"use strict";

function check_network_size()
{
  var respone = document.createElement('div');
  var size_place = document.getElementById('grid');
  size_place.appendChild(respone);
  
  start();
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
