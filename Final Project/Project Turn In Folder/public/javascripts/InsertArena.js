function newOptions(passedDropDown, newId, newName, opId){
  var newOption = document.createElement("option");
  newOption.text = newName;
  newOption.value = newId;
  passedDropDown.options.add(newOption, opId);
}

function SubmitArena(){
  var req = new XMLHttpRequest();
  var payload  = {Arena_Name: null, Capacity: null, Avg_Attendance: null, Arena_City: null, Arena_State: null, Arena_Country: null, TId: null};
  payload.Arena_Name = document.getElementById("Arena_Name").value;
  payload.Capacity = document.getElementById("Capacity").value;
  payload.Avg_Attendance = document.getElementById("Avg_Attendance").value;
  payload.Arena_City = document.getElementById("Arena_City").value;
  payload.Arena_State = document.getElementById("Arena_State").value;
  payload.Arena_Country = document.getElementById("Arena_Country").value;
  payload.TId = document.getElementById("TId").value;


  req.open('POST', '/insertArena', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayArenas";
        } else {
          window.alert(req.responseText);
        }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
}

var newForm = document.createElement("form");
var newField = document.createElement("fieldset");
var newTextNode = document.createTextNode("Arena Name: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Arena_Name";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Capacity: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Capacity";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Average Attendance: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Avg_Attendance";
newField.appendChild(newTextBox);
var newBreak = document.createElement("br");
newField.appendChild(newBreak);
var newTextNode = document.createTextNode("City: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Arena_City";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("State: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Arena_State";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Country: ");
newField.appendChild(newTextNode);
var i = 0;
var newDropDown = document.createElement("select");
newDropDown.id = "Arena_Country";
var newOption = document.createElement("option");
newOption.text = "U.S.A";
i++;
newDropDown.options.add(newOption, i);
var newOption = document.createElement("option");
newOption.text = "Canada";
i++;
newDropDown.options.add(newOption, i);
newField.appendChild(newDropDown);
var newTextNode = document.createTextNode("Team Arena: ");
newField.appendChild(newTextNode);
var newDropDown = document.createElement("select");
newDropDown.id = "TId";
var req = new XMLHttpRequest();
req.open("GET", "/displayTeamsData", true);
req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        for(m = 0; m < response.length; m++){
          var fullTeamName = response[m].Team_City + " " + response[m].Team_Name
          newOptions(newDropDown, response[m].Team_Id, fullTeamName, (m+1));
        }
        newField.appendChild(newDropDown);
        var newBreak = document.createElement("br");
        newField.appendChild(newBreak);
        var newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = "Insert Arena";
        newButton.className = "submit";
        newButton.onclick = new Function("SubmitArena();");
        newField.appendChild(newButton);
        newForm.appendChild(newField);
        document.body.appendChild(newForm);
      }
      else {
        console.log("Error in network request: " + req.statusText);
}});
req.send(null);
