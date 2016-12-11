/**************************************************
* functions to create table
* also to add rows, insert rows
***************************************************/
function displayDate(dateStr){
   //here you could pass your date string 2016-01-01
//in javascript months start at 0 so 0=Jan and 11=Dec so
var year = dateStr.slice(0,4);
var month = dateStr.slice(5,7);
var date = dateStr.slice(8,10);

var fullDate = month+ "/" + date + "/" + year;
return fullDate;
}

function sendDate(dateStr){
  var year = dateStr.slice(6,10);
  var month = dateStr.slice(0,2);
  var date = dateStr.slice(3,5);

  var reqDate = year+ "/" + month + "/" + date;
  return reqDate
}

function submitNewWorkout(){
var req = new XMLHttpRequest();
var payload = {id:null, names:null, reps: null, weight: null, date:null, lbs:null};
payload.names = document.getElementById("newName").value;
if(payload.names == ""){
  return;
}
payload.reps = document.getElementById("newReps").value;
payload.weight = document.getElementById("newWeight").value;
var testDate = document.getElementById("newDate").value;
console.log(sendDate(testDate));
payload.date = sendDate(testDate);
if((document.getElementById("newLbs").value).toLocaleLowerCase() == 'lbs'){
  payload.lbs = 1;
}
else{
  payload.lbs = 0;
}
req.open('POST', '/insert', true);
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response2 = JSON.parse(req.responseText);
        document.getElementById("t01").removeChild(document.getElementById("entry"));
        newDataRow(newTable,response2[0].id, response2[0].name, response2[0].reps, response2[0].weight, response2[0].date, response2[0].lbs);
        newDataEntryRow(newTable, null, null, null, null, null, null);
      } else {
        console.log("Error in network request: " + request.statusText);
      }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
  }
function editRow(currRow) {
  // this prints out the id for the first element of the form, which is your hidden element
  var payload2 = {id:null, names:null, reps: null, weight: null, date:null, lbs:null};
  var EditLine = document.getElementById(currRow);
  payload2.id = currRow;
  payload2.names = EditLine.childNodes[1].textContent;
  payload2.reps = EditLine.childNodes[2].textContent;
  payload2.weight = EditLine.childNodes[3].textContent;
  payload2.date = EditLine.childNodes[4].textContent;
  payload2.lbs = EditLine.childNodes[5].textContent;
  EditLine.childNodes[1].textContent = "";
  EditLine.childNodes[2].textContent = "";
  EditLine.childNodes[3].textContent = "";
  EditLine.childNodes[4].textContent = "";
  EditLine.childNodes[5].textContent = "";
  while (EditLine.firstChild) {
    EditLine.removeChild(EditLine.firstChild);
  }
  EditDataEntryRow(currRow, payload2.id, payload2.names, payload2.reps, payload2.weight, payload2.date, payload2.lbs);
}

function UpdateRow(currRow){
  var req = new XMLHttpRequest();
  var payload4 = {id:null, names:null, reps: null, weight: null, date:null, lbs:null};
  payload4.id = currRow;
  payload4.names = document.getElementById("EditName").value;
  if(payload4.names == ""){
    return;
  }
  payload4.reps = document.getElementById("EditReps").value;
  payload4.weight = document.getElementById("EditWeight").value;
  var testDate = document.getElementById("EditDate").value;
  console.log(sendDate(testDate));
  payload4.date = sendDate(testDate);
  if((document.getElementById("EditLbs").value).toLocaleLowerCase() == 'lbs'){
    payload4.lbs = 1;
  }
  else{
    payload4.lbs = 0;
  }
  req.open('POST', '/update', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var EditLine = document.getElementById(currRow);
          while (EditLine.firstChild) {
            EditLine.removeChild(EditLine.firstChild);
          }
          UpdatedDataRow(currRow, payload4.id, payload4.names, payload4.reps, payload4.weight, testDate, payload4.lbs);
        } else {
          console.log("Error in network request: " + request.statusText);
        }});
  req.send(JSON.stringify(payload4));
  event.preventDefault();
}

function deleteRow(currRow) {
  var req = new XMLHttpRequest();
  var payload3 = {id:currRow};
  req.open('POST', '/delete', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          console.log("success");
        }
        else {
          console.log("Error in network request: " + request.statusText);
        }});
  req.send(JSON.stringify(payload3));
  var row = document.getElementById(currRow);
  row.parentNode.removeChild(row);
}
function newDataRow(newTable2, newId, newName, newReps, newWeight, newDate, newLbs){
  var newLine = document.createElement("tr");
  newLine.id = newId;
  var newBox = document.createElement("td");
  newBox.textContent = newId;
  newBox.style="visibility:hidden";
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.textContent = newName;
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.textContent = newReps;
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.textContent = newWeight;
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  var nextDate = displayDate(newDate);
  newBox.textContent = nextDate;
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  if(newLbs == 1){
    newBox.textContent = "Lbs";
  }
  else{
    newBox.textContent = "Kg";
  }
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newButton = document.createElement("input");
  newButton.id = newId;
  newButton.type = "button";
  newButton.value = "Edit";
  newButton.className = "edit";
  newButton.onclick = new Function("editRow(this.id);");
  newBox.appendChild(newButton);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newButton = document.createElement("input");
  newButton.id = newId;
  newButton.type = "button";
  newButton.value = "Delete";
  newButton.className = "delete";
  newButton.onclick = new Function("deleteRow(this.id);");
  newBox.appendChild(newButton);
  newLine.appendChild(newBox);
  newTable2.appendChild(newLine);
}

function UpdatedDataRow(EditRow, newId, newName, newReps, newWeight, newDate, newLbs){
  var newLine = document.getElementById(EditRow);
  newLine.id = newId;
  var newBox = document.createElement("td");
  newBox.textContent = newId;
  newBox.style="visibility:hidden";
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.textContent = newName;
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.textContent = newReps;
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.textContent = newWeight;
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.textContent = newDate;
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  if(newLbs == 1){
    newBox.textContent = "Lbs";
  }
  else{
    newBox.textContent = "Kg";
  }
  newBox.style.border = "thin solid black";
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newButton = document.createElement("input");
  newButton.id = newId;
  newButton.type = "button";
  newButton.value = "Edit";
  newButton.className = "edit";
  newButton.onclick = new Function("editRow(this.id);");
  newBox.appendChild(newButton);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newButton = document.createElement("input");
  newButton.id = newId;
  newButton.type = "button";
  newButton.value = "Delete";
  newButton.className = "delete";
  newButton.onclick = new Function("deleteRow(this.id);");
  newBox.appendChild(newButton);
  newLine.appendChild(newBox);
}

function newDataEntryRow(newTable2, newId, newName, newReps, newWeight, newDate, newLbs){
  var newLine = document.createElement("tr");
  newLine.id = "entry"
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "i";
  newBox.style="visibility:hidden";
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "newName";
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "newReps";
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "newWeight";
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "newDate";
  newTextBox.value = "mm/dd/yyyy"
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "newLbs";
  newTextBox.value = "Lbs/Kg"
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  newBox.id = "special";
  newBox.colSpan = "2";
  var newButton = document.createElement("input");
  newButton.id= "NewWorkout";
  newButton.type = "button";
  newButton.value = "Submit New Workout";
  newButton.className = "submit";
  newButton.onclick = new Function("submitNewWorkout();")
  newBox.appendChild(newButton);
  newLine.appendChild(newBox);
  newTable2.appendChild(newLine);
}

function EditDataEntryRow(insertRow, newId, newName, newReps, newWeight, newDate, newLbs){
  var newLine = document.getElementById(insertRow);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "i";
  newBox.style="visibility:hidden";
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "EditName";
  newTextBox.value = newName;
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "EditReps";
  newTextBox.value = newReps;
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "EditWeight";
  newTextBox.value = newWeight;
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "EditDate";
  newTextBox.value = newDate;
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  var newTextBox = document.createElement("input");
  newTextBox.type = "text";
  newTextBox.id = "EditLbs";
  newTextBox.value = newLbs;
  newBox.appendChild(newTextBox);
  newLine.appendChild(newBox);
  var newBox = document.createElement("td");
  newBox.style.border = "thin solid black";
  newBox.id = "special";
  newBox.colSpan = "2";
  var newButton = document.createElement("input");
  newButton.id= newId;
  newButton.type = "button";
  newButton.value = "Update Workout";
  newButton.className = "submit";
  newButton.onclick = new Function("UpdateRow(this.id);");
  newBox.appendChild(newButton);
  newLine.appendChild(newBox);
}

function newHeader(newTable2){
  var newHead = document.createElement("th");
  newHead.textContent = "Id";
  newHead.style="visibility:hidden";
  newHead.style.border = "thin solid black";
  newTable2.appendChild(newHead);
  var newHead = document.createElement("th");
  newHead.textContent = "Name";
  newHead.style.border = "thin solid black";
  newTable2.appendChild(newHead);
  var newHead = document.createElement("th");
  newHead.textContent = "Reps";
  newHead.style.border = "thin solid black";
  newTable2.appendChild(newHead);
  var newHead = document.createElement("th");
  newHead.textContent = "Weight";
  newHead.style.border = "thin solid black";
  newTable2.appendChild(newHead);
  var newHead = document.createElement("th");
  newHead.textContent = "Date";
  newHead.style.border = "thin solid black";
  newTable2.appendChild(newHead);
  var newHead = document.createElement("th");
  newHead.textContent = "Lbs/Kg";
  newHead.style.border = "thin solid black";
  newTable2.appendChild(newHead);
  var newHead = document.createElement("th");
  newHead.textContent = "Edit";
  newHead.style.border = "thin solid black";
  newTable2.appendChild(newHead);
  var newHead = document.createElement("th");
  newHead.textContent = "Delete";
  newHead.style.border = "thin solid black";
  newTable2.appendChild(newHead);
}
/**************************************************
* creates table
***************************************************/
var newTable = document.createElement("table");
newTable.id = "t01";
newHeader(newTable);
var req = new XMLHttpRequest();
req.open("GET", "/displayTable", true);
req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);
        for(i = 0; i <= response.length; i++){
          if(i != response.length){
            newDataRow(newTable,response[i].id, response[i].name, response[i].reps, response[i].weight, response[i].date, response[i].lbs);
          }
          else{
            newDataEntryRow(newTable,null, null, null, null, null, null);
          }
        }
        document.body.appendChild(newTable);
      } else {
        console.log("Error in network request: " + request.statusText);
}});
req.send(null);



/*function submitNewWorkout(event){
  var req = new XMLHttpRequest();
  var payload = {id:null, names:null, reps: null, weight: null, date:null, lbs:null};
  payload.names = document.getElementById("newName").value;
  if(payload.names == ""){
    return;
  }
  payload.reps = document.getElementById("newReps").value;
  payload.weight = document.getElementById("newWeight").value;
  payload.date = document.getElementById("newDate").value;
  payload.lbs = document.getElementById("newLbs").value;
  req.open('POST', '/insert', false);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  var response2 = JSON.parse(req.responseText);
  document.getElementById("t01").removeChild(document.getElementById("entry"));
  newDataRow(newTable,response2[0].id, response2[0].name, response2[0].reps, response2[0].weight, response2[0].date, response2[0].lbs);
  newDataEntryRow(newTable, null, null, null, null, null, null);
  document.getElementById('NewWorkout').addEventListener('click', submitNewWorkout);
};
document.getElementById('NewWorkout').addEventListener('click', submitNewWorkout);*/
