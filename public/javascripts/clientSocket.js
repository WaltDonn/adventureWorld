var socket = io.connect('/');
var name = "";

socket.on('newComment', function (data) {
  $("#displayArea").append(data.c);
});

socket.on('updateKingdom', function (data) {
  let ge = data.ge;
  let fame = data.fame;
  let fortune = data.fortune;
  $("#gePlace").text(ge);
  $("#famePlace").text(fame);
  $("#fortPlace").text(fortune);

  //adventure variable reqs
  if(ge >= 75 && fame >= 75 && fortune >= 75) // very high on everything
    $("#adv2").show();
  else
    $("#adv2").hide();
  if(ge != 0 || fame != 0 || fortune != 0) // not zero
    $("#adv3").show();
  else
    $("#adv3").hide();
  if(ge <= -50 && fortune <= -50) // low ge and fort
    $("#adv4").show();
  else
    $("#adv4").hide();
  if(fortune >= 75) //very high fort
    $("#adv5").show();
  else
    $("#adv5").hide();
  if(fame >= 50 && ge <= -50) // high fame low ge
    $("#adv6").show();
  else
    $("#adv6").hide();
  if(ge >= 50 && fame <= 25 && fame >= -25 && fortune <= 25 && fortune >= -25) //high ge and average fame and fortune
    $("#adv7").show();
  else
    $("#adv7").hide();
  if(ge <= -75 && fame <= -75 && fortune <= -75) // very low on everything
    $("#adv8").show();
  else
    $("#adv8").hide();
  if(ge <= -50 && ge >= -75 && fort >= 50 && fort <= 75) // low ge and high fort
    $("#adv9").show();
  else
    $("#adv9").hide();
  if(ge == 10 && fame == 16 && fortune == 97)
    $("#adv10").show();
  else
    $("#adv10").hide();
});

function nameSubmit() {
  name = $("#name_input").val();
  $("#messageStuff").show();
  $("#nameStuff").hide();
}

function buttonClicked() {
  socket.emit('message', {c: name +"<br>"+$("#input_area").val()+"<br><br>"});
  $("#input_area").val("");
}

$(document).ready( function() {
  $(".geButton").click(function (){
    socket.emit('updateGeS', {v: $(this).val()})
  });
  $(".fameButton").click(function (){
    socket.emit('updateFameS', {v: $(this).val()})
  });
  $(".fortButton").click(function (){
    socket.emit('updateFortS', {v: $(this).val()})
  });

  $("#adv2").hide();
  $("#adv3").hide();
  $("#adv4").hide();
  $("#adv5").hide();
  $("#adv6").hide();
  $("#adv7").hide();
  $("#adv8").hide();
  $("#adv9").hide();
  $("#adv10").hide();

  if(name == "")
    $("#messageStuff").hide();
  else
    $("#nameStuff").hide();



  //below is temporary, take out after testing
  $("#submit_1").click(function (){
    socket.emit('setGeS', {v: $("#manGE").val()});
  });
  $("#submit_2").click(function (){
    socket.emit('setFameS', {v: $("#manFame").val()});
  });
  $("#submit_3").click(function (){
    socket.emit('setFortS', {v: $("#manFort").val()});
  });
});
