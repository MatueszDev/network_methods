"use strict";

function check_network_size(kind_of_function)
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
  {
    if(kind_of_function == 1)
      start(size, 1, 1);
    else if (kind_of_function == 2)
      fit(size, 1, 1);
  }
  else {
    let square_size = parseInt(document.getElementById("square_size").value);
    var response2 = document.getElementById("response2");

    response2.innerHTML = "";

    if(isNaN(square_size))
    {

      response2.innerHTML = '<p style="color:#ff3333;">&nbsp; Rozmiar boku kwadratu musi być liczbą!</p>';
      return;
    }

    if(square_size > size || square_size <= 0)
    {

      response2.innerHTML = '<p style="color:#ff3333;">&nbsp; Rozmiar boku kwadratu nie moze przekroczyć '+size+' !</p>';
      return;
    }
    if(kind_of_function == 1)
      start(size, square_size, 0);
    else if (kind_of_function == 2)
      fit(size, square_size, 0);

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
    <input type="text" id="square_size" /><div id="response2"></div><br/><br/>`;
    additional_input.innerHTML = new_input;
  }
}
