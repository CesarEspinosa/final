

function showAccount(id){
    localStorage.setItem("accountId", id);
    document.location = "/diplomado/final/vercuenta.html"
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("new-trx");

// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}