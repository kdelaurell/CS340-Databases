function deleteArena(currRow){
  var req = new XMLHttpRequest();
  var payload = {id:currRow};
  req.open('POST', '/deleteArena', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayArenas";
        }
        else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
function editArena(currRow){
  var Id = document.getElementById('id'+currRow).textContent;
  var Name = document.getElementById('Name'+currRow).textContent;
  var cap = document.getElementById('Cap'+currRow).textContent;
  var AvAtt = document.getElementById('AA'+currRow).textContent;
  var City = document.getElementById('AC'+currRow).textContent;
  var State = document.getElementById('AS'+currRow).textContent;
  var Country = document.getElementById('ACo'+currRow).textContent;
  document.getElementById('Name'+currRow).textContent = "";
  document.getElementById('Cap'+currRow).textContent = "";
  document.getElementById('AA'+currRow).textContent = "";
  document.getElementById('AC'+currRow).textContent = "";
  document.getElementById('AS'+currRow).textContent = "";
  document.getElementById('ACo'+currRow).textContent = "";

  var TdBox = document.getElementById('Name'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Arena_Name"+currRow;
  newTextBox.value = Name;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('Cap'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Capacity"+currRow;
  newTextBox.value = cap;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('AA'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Avg_Attendance"+currRow;
  newTextBox.value = AvAtt;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('AC'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Arena_City"+currRow;
  newTextBox.value = City;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('AS'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Arena_State"+currRow;
  newTextBox.value = State;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('ACo'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Arena_Country"+currRow;
  newTextBox.value = Country;
  TdBox.appendChild(newTextBox);
  var buttonid = "EB"+currRow;
  var button = document.getElementById(buttonid);
  button.onclick = new Function("UpdateArena(this.id)");
}

function UpdateArena(editRow){
  var req = new XMLHttpRequest();
  var button = document.getElementById(editRow);
  var pb = button.parentNode;
  var ppb = pb.parentNode;
  var payload = {Arena_Id: null, Arena_Name: null, Capacity: null, Avg_Attendance: null, Arena_City: null, Arena_State: null, Arena_Country: null};
  payload.Arena_Id = ppb.id;
  payload.Arena_Name = document.getElementById('Arena_Name'+ppb.id).value;
  payload.Capacity = document.getElementById('Capacity'+ppb.id).value;
  payload.Avg_Attendance = document.getElementById('Avg_Attendance'+ppb.id).value;
  payload.Arena_City = document.getElementById('Arena_City'+ppb.id).value;
  payload.Arena_State = document.getElementById('Arena_State'+ppb.id).value;
  payload.Arena_Country = document.getElementById('Arena_Country'+ppb.id).value;
  req.open('POST', '/UpdateARow', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayArenas";
        } else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
