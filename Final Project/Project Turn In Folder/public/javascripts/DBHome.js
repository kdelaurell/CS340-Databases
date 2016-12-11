function teamGoals(){
  var req = new XMLHttpRequest();
  var payload  = {num: null};
  payload.num = document.getElementById('points').value;

  req.open('POST', '/GoalsQuery', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response = JSON.parse(req.responseText);
          var newTable = document.createElement("table");
          var newHead = document.createElement("thead");
          var newHeader = document.createElement("th");
          newHeader.textContent = "Team";
          newHead.appendChild(newHeader);
          var newHeader = document.createElement("th");
          newHeader.textContent = "Total Goals";
          newHead.appendChild(newHeader);
          newTable.appendChild(newHead);
          var newBody = document.createElement("tbody");
          for(i = 0; i < response.length; i++){
            var newLine = document.createElement("tr");
            var newBox = document.createElement("td");
            newBox.textContent = response[i].Team_City + " " + response[i].Team_Name
            newLine.appendChild(newBox);
            var newBox = document.createElement("td");
            newBox.textContent = response[i].sum;
            newLine.appendChild(newBox);
            newBody.appendChild(newLine);
          }
          newTable.appendChild(newBody);
          document.getElementById('QResults').appendChild(newTable);

        } else {
          window.alert(req.responseText);
        }});
      req.send(JSON.stringify(payload));
      event.preventDefault();
}
function highAttendance(){
  var req = new XMLHttpRequest();

  req.open('GET', '/maxAttendance', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response = JSON.parse(req.responseText);
          var newTable = document.createElement("table");
          var newHead = document.createElement("thead");
          var newHeader = document.createElement("th");
          newHeader.textContent = "Team";
          newHead.appendChild(newHeader);
          var newHeader = document.createElement("th");
          newHeader.textContent = "Team Arena";
          newHead.appendChild(newHeader);
          var newHeader = document.createElement("th");
          newHeader.textContent = "Average Attendance";
          newHead.appendChild(newHeader);
          newTable.appendChild(newHead);
          var newBody = document.createElement("tbody");
          for(i = 0; i < response.length; i++){
            var newLine = document.createElement("tr");
            var newBox = document.createElement("td");
            newBox.textContent = response[i].Team_City + " " + response[i].Team_Name
            newLine.appendChild(newBox);
            var newBox = document.createElement("td");
            newBox.textContent = response[i].Arena_Name;
            newLine.appendChild(newBox);
            var newBox = document.createElement("td");
            newBox.textContent = response[i].max;
            newLine.appendChild(newBox);
            newBody.appendChild(newLine);
          }
          newTable.appendChild(newBody);
          document.getElementById('QResults2').appendChild(newTable);

        } else {
          window.alert(req.responseText);
        }});
      req.send(null);
      event.preventDefault();
}
