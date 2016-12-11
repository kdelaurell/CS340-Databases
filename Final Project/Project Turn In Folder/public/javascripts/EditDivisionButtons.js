function deleteDivision(currRow){
  var req = new XMLHttpRequest();
  var payload = {id:currRow};
  req.open('POST', '/deleteDivision', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          console.log(req);
          window.location.href = "/displayDivisions";
        }
        else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
function editDivision(currRow){
  var Id = document.getElementById('id'+currRow).textContent;
  var Name = document.getElementById('Name'+currRow).textContent;
  document.getElementById('Name'+currRow).innerText = "";
  var NameBox = document.getElementById('Name'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Division_Name"+currRow;
  newTextBox.value = Name;
  NameBox.appendChild(newTextBox);
  var buttonid = "EB"+currRow;
  var button = document.getElementById(buttonid);
  button.onclick = new Function("UpdateDivision(this.id)");
}

function UpdateDivision(editRow){
  var req = new XMLHttpRequest();
  var button = document.getElementById(editRow);
  var pb = button.parentNode;
  var ppb = pb.parentNode;
  var payload = {Division_Id: null, Division_Name: null};
  payload.Division_Id = ppb.id;
  payload.Division_Name = document.getElementById('Division_Name'+ppb.id).value;
  req.open('POST', '/UpdateDRow', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayDivisions";
        } else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
