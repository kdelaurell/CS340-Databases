function newOptions(passedDropDown, newId, newName, opId){
  var newOption = document.createElement("option");
  newOption.text = newName;
  newOption.value = newId;
  passedDropDown.options.add(newOption, opId);
}

function SubmitConference(){
  var req = new XMLHttpRequest();
  var payload  = {Conference_Name: null};
  payload.Conference_Name = document.getElementById("Conference_Name").value;

  req.open('POST', '/insertConferences', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          //var response2 = JSON.parse(req.responseText);
          window.location.href = "/displayConferences";
        } else {
          window.alert(req.responseText);
        }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
}

var newForm = document.createElement("form");
var newField = document.createElement("fieldset");
var newTextNode = document.createTextNode("Conference Name: ");
newField.appendChild(newTextNode);
var newTextBox = document.createElement("input");
newTextBox.type = "text";
newTextBox.class = "insert";
newTextBox.id = "Conference_Name";
newField.appendChild(newTextBox);
var newBreak = document.createElement("br");
newField.appendChild(newBreak);
var newButton = document.createElement("input");
newButton.type = "button";
newTextBox.class = "insert";
newButton.value = "Insert Conference";
newButton.className = "submit";
newButton.onclick = new Function("SubmitConference();");
newField.appendChild(newButton);
newForm.appendChild(newField);
document.body.appendChild(newForm);
