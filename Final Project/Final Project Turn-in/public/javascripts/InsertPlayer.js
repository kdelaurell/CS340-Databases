function newOptions(passedDropDown, newId, newName, opId){
  var newOption = document.createElement("option");
  newOption.text = newName;
  newOption.value = newId;
  passedDropDown.options.add(newOption, opId);
}

function SubmitPlayer(){
  var req = new XMLHttpRequest();
  var payload = {First_Name: null, Last_Name: null, Number: null, Position: null, Height: null, Weight: null, Age: null, Games_Played: null, Goals: null, Assists: null, TeamId: null};
  payload.First_Name = document.getElementById("First_Name").value;
  payload.Last_Name = document.getElementById("Last_Name").value;
  payload.Number = document.getElementById("Number").value;
  payload.Position = document.getElementById("Position").value;
  payload.Height = document.getElementById("Height").value;
  payload.Weight = document.getElementById("Weight").value;
  payload.Age = document.getElementById("Age").value;
  payload.Games_Played = document.getElementById("Games_Played").value;
  payload.Goals = document.getElementById("Goals").value;
  payload.Assists = document.getElementById("Assists").value;
  payload.TeamId = document.getElementById("TeamId").value;

  req.open('POST', '/insertPlayers', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response2 = JSON.parse(req.responseText);
          console.log(response2);
          window.location.href = "/displayPlayers";
        } else {
          window.alert(req.responseText);
        }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
}

var newForm = document.createElement("form");
var newField = document.createElement("fieldset");
var newTextNode = document.createTextNode("First Name: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "First_Name";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Last Name: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Last_Name";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("#: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Number";
newField.appendChild(newTextBox);
var newBreak = document.createElement("br");
newField.appendChild(newBreak);
var newTextNode = document.createTextNode("Position: ");
newField.appendChild(newTextNode);
var i = 0;
var newDropDown = document.createElement("select");
newDropDown.id = "Position";
var newOption = document.createElement("option");
newOption.text = "C";
i++;
newDropDown.options.add(newOption, i);
var newOption = document.createElement("option");
newOption.text = "LW";
i++;
newDropDown.options.add(newOption, i);
var newOption = document.createElement("option");
newOption.text = "RW";
i++;
newDropDown.options.add(newOption, i);
var newOption = document.createElement("option");
newOption.text = "D";
i++;
newDropDown.options.add(newOption, i);
var newOption = document.createElement("option");
newOption.text = "G";
i++;
newDropDown.options.add(newOption, i);
newField.appendChild(newDropDown);
var newTextNode = document.createTextNode("Height: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Height";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Weight: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Weight";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Age: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Age";
newField.appendChild(newTextBox);
var newBreak = document.createElement("br");
newField.appendChild(newBreak);
var newTextNode = document.createTextNode("Games Played: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Games_Played";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Goals: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Goals";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Assists: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Assists";
newField.appendChild(newTextBox);
var newBreak = document.createElement("br");
newField.appendChild(newBreak);
var newTextNode = document.createTextNode("Team: ");
newField.appendChild(newTextNode);
var newDropDown = document.createElement("select");
newDropDown.id = "TeamId";
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
        newButton.value = "Insert Player";
        newButton.className = "submit";
        newButton.onclick = new Function("SubmitPlayer();");
        newField.appendChild(newButton);
        newForm.appendChild(newField);
        document.body.appendChild(newForm);
      }
      else {
        console.log("Error in network request: " + req.statusText);
}});
req.send(null);
