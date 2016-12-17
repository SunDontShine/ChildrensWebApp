function ajaxCall(id,fileName) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById(id).innerHTML = this.responseText;
    }
  };
  req.open("GET", '../Views/'+fileName+'.html', true);
  req.send();
}