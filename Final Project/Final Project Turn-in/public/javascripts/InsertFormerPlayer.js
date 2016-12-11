function newOptions(passedDropDown, newId, newName, opId){
  var newOption = document.createElement("option");
  newOption.text = newName;
  newOption.value = newId;
  passedDropDown.options.add(newOption, opId);
}

function SubmitFormerPlayer(){
  var req = new XMLHttpRequest();
  var payload  = {Former_Team_Id: null, Former_Player_Id: null};
  payload.Former_Team_Id = document.getElementById("Former_Team_Id").value;
  payload.Former_Player_Id = document.getElementById("Former_Player_Id").value;

  req.open('POST', '/insertFormerPlayers', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response2 = JSON.parse(req.responseText);
          window.location.href = "/displayFormerPlayers";
        } else {
          window.alert(req.responseText);
        }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
}

var newForm = document.createElement("form");
var newField = document.createElement("fieldset");
var newTextNode = document.createTextNode("Former Player: ");
newField.appendChild(newTextNode);



var newDropDown = document.createElement("select");
newDropDown.id = "Former_Player_Id";
var req = new XMLHttpRequest();
req.open("GET", "/displayPlayersData", false);
req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        for(m = 0; m < response.length; m++){
          var fullTeamName = response[m].First_Name + " " + response[m].Last_Name
          newOptions(newDropDown, response[m].Player_Id, fullTeamName, (m+1));
        }
        newField.appendChild(newDropDown);
      }
      else {
        console.log("Error in network request: " + req.statusText);
}});
req.send(null);










var newTextNode = document.createTextNode("Former Team: ");
newField.appendChild(newTextNode);
var newDropDown = document.createElement("select");
newDropDown.id = "Former_Team_Id";
var req2 = new XMLHttpRequest();
req2.open("GET", "/displayTeamsData", false);
req2.addEventListener('load',function(){
      if(req2.status >= 200 && req2.status < 400){
        var response2 = JSON.parse(req2.responseText);
        for(m = 0; m < response2.length; m++){
          var fullTeamName = response2[m].Team_City + " " + response2[m].Team_Name
          newOptions(newDropDown, response2[m].Team_Id, fullTeamName, (m+1));
        }
        newField.appendChild(newDropDown);
        var newBreak = document.createElement("br");
        newField.appendChild(newBreak);
        var newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = "Insert Former Player";
        newButton.className = "submit";
        newButton.onclick = new Function("SubmitFormerPlayer();");
        newField.appendChild(newButton);
        newForm.appendChild(newField);
        document.body.appendChild(newForm);
      }
      else {
        console.log("Error in network request: " + req.statusText);
}});
req2.send(null);
