function deletePlayer(currRow){
  var req = new XMLHttpRequest();
  var payload = {id:currRow};
  req.open('POST', '/deletePlayer', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayPlayers";
        }
        else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
function editPlayer(currRow){
  var FName = document.getElementById('FN'+currRow).textContent;
  var LName = document.getElementById('LN'+currRow).textContent;
  var Num = document.getElementById('N'+currRow).textContent;
  var Pos = document.getElementById('P'+currRow).textContent;
  var Hei = document.getElementById('H'+currRow).textContent;
  var Wei = document.getElementById('W'+currRow).textContent;
  var Ag = document.getElementById('A'+currRow).textContent;
  var GaP = document.getElementById('GP'+currRow).textContent;
  var Go = document.getElementById('G'+currRow).textContent;
  var Assis = document.getElementById('As'+currRow).textContent;
  document.getElementById('FN'+currRow).textContent = "";
  document.getElementById('LN'+currRow).textContent = "";
  document.getElementById('N'+currRow).textContent = "";
  document.getElementById('P'+currRow).textContent = "";
  document.getElementById('H'+currRow).textContent = "";
  document.getElementById('W'+currRow).textContent = "";
  document.getElementById('A'+currRow).textContent = "";
  document.getElementById('GP'+currRow).textContent = "";
  document.getElementById('G'+currRow).textContent = "";
  document.getElementById('As'+currRow).textContent = "";

  var TdBox = document.getElementById('FN'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "First_Name"+currRow;
  newTextBox.value = FName;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('LN'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Last_Name"+currRow;
  newTextBox.value = LName;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('N'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Number"+currRow;
  newTextBox.value = Num;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('P'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Position"+currRow;
  newTextBox.value = Pos;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('H'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Height"+currRow;
  newTextBox.value = Hei;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('W'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Weight"+currRow;
  newTextBox.value = Wei;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('A'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Age"+currRow;
  newTextBox.value = Ag;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('GP'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Games_Played"+currRow;
  newTextBox.value = GaP;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('G'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Goals"+currRow;
  newTextBox.value = Go;
  TdBox.appendChild(newTextBox);
  var TdBox = document.getElementById('As'+currRow);
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "Assists"+currRow;
  newTextBox.value = Assis;
  TdBox.appendChild(newTextBox);
  var buttonid = "EB"+currRow;
  var button = document.getElementById(buttonid);
  button.onclick = new Function("UpdatePlayer(this.id)");
}

function UpdatePlayer(editRow){
  var req = new XMLHttpRequest();
  var button = document.getElementById(editRow);
  var pb = button.parentNode;
  var ppb = pb.parentNode;
  var payload = {Player_Id: null, First_Name: null, Last_Name: null, Number: null, Position: null, Height: null, Weight: null, Age: null, Games_Played: null, Goals: null, Assists: null};
  payload.Player_Id = ppb.id;
  payload.First_Name = document.getElementById('First_Name'+ppb.id).value;
  payload.Last_Name = document.getElementById('Last_Name'+ppb.id).value;
  payload.Number = document.getElementById('Number'+ppb.id).value;
  payload.Position = document.getElementById('Position'+ppb.id).value;
  payload.Height = document.getElementById('Height'+ppb.id).value;
  payload.Weight = document.getElementById('Weight'+ppb.id).value;
  payload.Age = document.getElementById('Age'+ppb.id).value;
  payload.Games_Played = document.getElementById('Games_Played'+ppb.id).value;
  payload.Goals = document.getElementById('Goals'+ppb.id).value;
  payload.Assists = document.getElementById('Assists'+ppb.id).value;
  req.open('POST', '/UpdatePRow', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayPlayers";
        } else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
