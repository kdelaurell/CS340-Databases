function newOptions(passedDropDown, newId, newName, opId){
  var newOption = document.createElement("option");
  newOption.text = newName;
  newOption.value = newId;
  passedDropDown.options.add(newOption, opId);
}

function SubmitTeam(){
  var req = new XMLHttpRequest();
  var payload  = {Team_Name: null, Team_City: null, Team_State: null, Team_Country: null, DivId: null};
  payload.Team_Name = document.getElementById("Team_Name").value;
  payload.Team_City = document.getElementById("Team_City").value;
  payload.Team_State = document.getElementById("Team_State").value;
  payload.Team_Country = document.getElementById("Team_Country").value;
  payload.DivId = document.getElementById("DivId").value;

  req.open('POST', '/insertTeams', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response2 = JSON.parse(req.responseText);
          window.location.href = "/displayTeams";
        } else {
          window.alert(req.responseText);
        }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
}

var newForm = document.createElement("form");
var newField = document.createElement("fieldset");
var newTextNode = document.createTextNode("Team Name: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Team_Name";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Team City: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Team_City";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("State/Province: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Team_State";
newField.appendChild(newTextBox);
var newBreak = document.createElement("br");
newField.appendChild(newBreak);
var newTextNode = document.createTextNode("Team Country: ");
newField.appendChild(newTextNode);
var i = 0;
var newDropDown = document.createElement("select");
newDropDown.id = "Team_Country";
var newOption = document.createElement("option");
newOption.text = "U.S.A";
i++;
newDropDown.options.add(newOption, i);
var newOption = document.createElement("option");
newOption.text = "Canada";
i++;
newDropDown.options.add(newOption, i);
newField.appendChild(newDropDown);
var newTextNode = document.createTextNode("Division: ");
newField.appendChild(newTextNode);
var newDropDown = document.createElement("select");
newDropDown.id = "DivId";
var req = new XMLHttpRequest();
req.open("GET", "/displayDivisionsData", true);
req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        for(m = 0; m < response.length; m++){
          newOptions(newDropDown, response[m].Division_Id, response[m].Division_Name, (m+1));
        }
        newField.appendChild(newDropDown);
        var newBreak = document.createElement("br");
        newField.appendChild(newBreak);
        var newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = "Insert Team";
        newButton.className = "submit";
        newButton.onclick = new Function("SubmitTeam();");
        newField.appendChild(newButton);
        newForm.appendChild(newField);
        document.body.appendChild(newForm);
      }
      else {
        console.log("Error in network request: " + req.statusText);
}});
req.send(null);
