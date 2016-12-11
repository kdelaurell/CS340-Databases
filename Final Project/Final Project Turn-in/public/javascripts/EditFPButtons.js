function deleteFP(currTRow, currPRow){
  var req = new XMLHttpRequest();
  var payload = {Tid:currTRow, Pid: currPRow};
  req.open('POST', '/deleteFormerPlayer', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          window.location.href = "/displayFormerPlayers";
        }
        else {
          window.alert(req.responseText);
        }});
  req.send(JSON.stringify(payload));
}
function editFP(currTRow, currPRow){
  console.log("edit " + newId);
}
