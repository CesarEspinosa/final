

function showAccount(id){
    localStorage.setItem("accountId", id);
    document.location = "/diplomado/final/vercuenta.html"
}

function redirect(to){
  document.location = "/diplomado/final/"+to;
}

// Get the modal
var modal = document.getElementById('myModal');
var modal2 = document.getElementById('newAccModal');
var modal3 = document.getElementById('delAccModal');

// Get the button that opens the modal
var btn = document.getElementById("new-trx");

var btn2 = document.querySelector(".add-account")

// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

function showAccModal(){
  modal3.style.display = "block";
}

function hideAccModal(){
  modal3.style.display = "none";
}

function showModal(){
  modal2.style.display = "block";
}

function hideModal(){
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    
  }

  if(event.target == modal2){
    modal2.style.display = "none";
  }

  if(event.target == modal3){
    modal3.style.display = "none";
  }
}

function formatBalance(value){
  var split = value.split('.'); 
  var balance = split[0]; 
  var decimals = split[1];
  
  var saldo =  balance.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if(decimals === undefined){
    decimals = "00";
  }
  if(decimals.length == 1){
    decimals += "0";
  }
  return saldo + "." + decimals;
}

function formatNumber(value){

  var split = value.split('.'); 
  var balance = split[0]; 
  var decimals = split[1]; 

  var inputSaldo = document.getElementById("saldo-inicial");
  var saldo =  balance.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  console.log(balance);
  console.log(decimals);
  if(decimals === undefined){
    decimals = "00";
  }
  inputSaldo.type = "text";
  inputSaldo.value = saldo + "." + decimals;
}

function eraseNumber(input){
  input.value = ""; 
  input.type = "number"; 
}

function createNewAccount(){
  var name = document.getElementById("name-new-acc").value; 
  var saldo = document.getElementById("saldo-inicial").value; 
  saldo = saldo.replace(",","");
  console.log(saldo);

  var request = new XMLHttpRequest()
        
        request.open('GET', 'http://35.236.52.46:8080/final/accounts/addAccount?id=1&initialBalance='+saldo+'&name='+name, true)
        //request.open('GET', 'http://localhost:8080/final/accounts/addAccount?id=1&initialBalance='+saldo+'&name='+name, true)
        
        request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            if(data.id >= 0){
              hideModal();
              document.location.reload();
            }
        } else {
            console.log('error')
        }
        }
        
        request.send()
}