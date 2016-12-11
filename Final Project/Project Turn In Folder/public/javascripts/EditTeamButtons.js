function deleteTeam(currRow){
  var req = new XMLHttpRequest();
  var payload = {id:currRow};
  req.open('POST', '/deleteTeam', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayTeams";
        }
        else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
function editTeam(currRow){
  var Id = document.getElementById('id'+currRow).textContent;
  var Name = document.getElementById('TN'+currRow).textContent;
  var City = document.getElementById('TC'+currRow).textContent;
  var State = document.getElementById('TS'+currRow).textContent;
  var Country = document.getElementById('TCo'+currRow).textContent;
  document.getElementById('TN'+currRow).textContent = "";
  document.getElementById('TC'+currRow).textContent = "";
  document.getElementById('TS'+currRow).textContent = "";
  document.getElementById('TCo'+currRow).textContent = "";

  var TdBox = document.getElementById('TN'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Team_Name"+currRow;
  newTextBox.value = Name;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('TC'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Team_City"+currRow;
  newTextBox.value = City;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('TS'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Team_State"+currRow;
  newTextBox.value = State;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('TCo'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Team_Country"+currRow;
  newTextBox.value = Country;
  TdBox.appendChild(newTextBox);
  var buttonid = "EB"+currRow;
  var button = document.getElementById(buttonid);
  button.onclick = new Function("UpdateTeam(this.id)");
}

function UpdateTeam(editRow){
  var req = new XMLHttpRequest();
  var button = document.getElementById(editRow);
  var pb = button.parentNode;
  var ppb = pb.parentNode;
  var payload = {Team_Id: null, Team_Name: null, Team_City: null, Team_State: null, Team_Country: null};
  payload.Team_Id = ppb.id;
  payload.Team_Name = document.getElementById('Team_Name'+ppb.id).value;
  payload.Team_City = document.getElementById('Team_City'+ppb.id).value;
  payload.Team_State = document.getElementById('Team_State'+ppb.id).value;
  payload.Team_Country = document.getElementById('Team_Country'+ppb.id).value;
  console.log(payload);
  req.open('POST', '/UpdateTRow', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          console.log(req);
          window.location.href = "/displayTeams";
        } else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
