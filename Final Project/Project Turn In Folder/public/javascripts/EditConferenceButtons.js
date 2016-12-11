function deleteConference(currRow){
  var req = new XMLHttpRequest();
  var payload = {id:currRow};
  req.open('POST', '/deleteConference', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          console.log(req.responseText);
          window.location.href = "/displayConferences";
        }
        else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
function editConference(currRow){
  var Id = document.getElementById('Id'+currRow).textContent;
  var Name = document.getElementById('Name'+currRow).textContent;
  document.getElementById('Name'+currRow).innerText = "";
  var NameBox = document.getElementById('Name'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Conference_Name"+currRow;
  newTextBox.value = Name;
  NameBox.appendChild(newTextBox);
  var buttonid = "EB"+currRow;
  var button = document.getElementById(buttonid);
  button.onclick = new Function("UpdateConference(this.id)");
}

function UpdateConference(editRow){
  var req = new XMLHttpRequest();
  var button = document.getElementById(editRow);
  var pb = button.parentNode;
  var ppb = pb.parentNode;
  var payload = {Conference_Id: null, Conference_Name: null};
  payload.Conference_Id = ppb.id;
  payload.Conference_Name = document.getElementById('Conference_Name'+ppb.id).value;
  req.open('POST', '/UpdateCRow', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayConferences";
        } else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
