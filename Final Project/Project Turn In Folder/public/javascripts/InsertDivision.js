function newOptions(passedDropDown, newId, newName, opId){
  var newOption = document.createElement("option");
  newOption.text = newName;
  newOption.value = newId;
  passedDropDown.options.add(newOption, opId);
}

function SubmitDivision(){
  var req = new XMLHttpRequest();
  var payload  = {Division_Name: null, Conf_Id: null};
  payload.Division_Name = document.getElementById("Division_Name").value;
  payload.Conf_Id = document.getElementById("Conf_Id").value;

  req.open('POST', '/insertDivisions', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response2 = JSON.parse(req.responseText);
          window.location.href = "/displayDivisions";
        } else {
          window.alert(req.responseText);
        }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
}

var newForm = document.createElement("form");
var newField = document.createElement("fieldset");
var newTextNode = document.createTextNode("Division Name: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Division_Name";
newField.appendChild(newTextBox);
var newTextNode = document.createTextNode("Conference: ");
newField.appendChild(newTextNode);
var newDropDown = document.createElement("select");
newDropDown.id = "Conf_Id";
var req = new XMLHttpRequest();
req.open("GET", "/displayConferencesData", true);
req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        for(m = 0; m < response.length; m++){
          newOptions(newDropDown, response[m].Conference_Id, response[m].Conference_Name, (m+1));
        }
        newField.appendChild(newDropDown);
        var newBreak = document.createElement("br");
        newField.appendChild(newBreak);
        var newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = "Insert Division";
        newButton.className = "submit";
        newButton.onclick = new Function("SubmitDivision();");
        newField.appendChild(newButton);
        newForm.appendChild(newField);
        document.body.appendChild(newForm);
      }
      else {
        console.log("Error in network request: " + req.statusText);
}});
req.send(null);
