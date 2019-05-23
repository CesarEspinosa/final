

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
var modal4 = document.getElementById('selectAccountNewTrxModal'); 
var modal5 = document.getElementById('selectCategoryTrxModal');
var modal6 = document.getElementById('newTrxModal');

// Get the button that opens the modal
var btn = document.getElementById("new-trx");

var btn2 = document.querySelector(".add-account")

// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

function hideNewTrxModal(){
  modal.style.display = "none";
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

function showSelectAccountModal(type){
  hideNewTrxModal()
  var accountsContainer = document.getElementById("modal-content-select-account");
  accountsContainer.innerHTML = ""; 
        var request = new XMLHttpRequest()
        
        request.open('GET', 'http://35.236.52.46:8080/final/accounts?userId=1', true)
        //request.open('GET', 'http://localhost:8080/final/accounts?userId=1', true)
        
        request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
          var selectAcch1 = document.createElement("h1"); 
                var textNodeh1 = document.createTextNode("Selecciona la cuenta:")

                selectAcch1.appendChild(textNodeh1); 

                accountsContainer.appendChild(selectAcch1); 
            data.forEach(account => {
                var balance = formatBalance(account.finalBalance.toString());
                var icon = ""; 
                if(account.issuer == "money"){
                    icon = account.issuer;
                }else{
                    icon = "icon-cc-"+account.issuer;
                }
                var label = document.createElement("label"); 
                var input = document.createElement("input"); 
                input.type = "radio"; 
                input.name = "account"; 
                if(accountId = localStorage.getItem("accountId") == account.id){
                  input.checked = "checked"; 
                }
                input.value = account.id;
                label.appendChild(input); 
                var accountDiv = document.createElement("div");
                accountDiv.classList.add("account"); 

                var p = document.createElement("p"); 
                var textP = document.createTextNode(account.nombre); 
                p.appendChild(textP); 

                var h1Acc = document.createElement("h1"); 
                h1Acc.innerHTML = "<b>$</b> "+balance; 
                
                var h2Acc = document.createElement("h2"); 
                h2Acc.classList.add(account.issuer); 

                var spanAcc = document.createElement("span"); 
                spanAcc.classList.add(icon); 

                h2Acc.appendChild(spanAcc); 

                accountDiv.appendChild(p); 
                accountDiv.appendChild(h1Acc); 
                accountDiv.appendChild(h2Acc); 

                label.appendChild(accountDiv); 
                
                
                accountsContainer.appendChild(label); 
            })
            var btnContainer = document.createElement("div");
            btnContainer.classList.add("modal-content-select-account-btn-container")

            var btn1 = document.createElement("button");
            btn1.classList.add("btn-blue")
            var buttonTextNode = document.createTextNode("Aceptar"); 
            btn1.appendChild(buttonTextNode); 
            btn1.setAttribute("onclick", "openSelectCategoryModal("+type+")")

            var btn2 = document.createElement("button"); 
            btn2.classList.add("btn-red"); 
            var buttonTextNode2 = document.createTextNode("Cancelar"); 
            btn2.appendChild(buttonTextNode2); 
            btn2.setAttribute("onclick", "hideSelectAccountModal()")

            btnContainer.appendChild(btn1); 
            btnContainer.appendChild(btn2); 

            accountsContainer.appendChild(btnContainer); 
        } else {
            console.log('error')
        }
        }
        
        request.send()

        
  modal4.style.display = "block";
}

function openSelectCategoryModal(type){
  modal4.style.display = "none";
  var selectedAccountId = document.querySelector('input[name="account"]:checked').value;
  var categoriesListCont = document.getElementById("categoriesList"); 
  var request = new XMLHttpRequest()
        
        request.open('GET', 'http://35.236.52.46:8080/final/categories', true)
        //request.open('GET', 'http://localhost:8080/final/accounts/trx?idAccount='+accountId, true)
        
        request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            data.forEach(category => {
                var id = category.id; 
                var name = category.name; 
                var label = category.label; 
                var color = category.color; 

                var li = document.createElement("li"); 
                var iconDiv = document.createElement("div"); 
                iconDiv.classList.add("icon"); 
                iconDiv.classList.add(color); 

                var iconP = document.createElement("p"); 
                var spanIcon = document.createElement("span"); 
                spanIcon.classList.add(label);
                iconP.appendChild(spanIcon); 
                iconDiv.appendChild(iconP); 

                var trxDetailDiv = document.createElement("div"); 
                trxDetailDiv.classList.add("trx-detail");

                var trxNameH1 = document.createElement("h1"); 

                var textNodeName = document.createTextNode(name); 

                trxNameH1.appendChild(textNodeName); 

                trxDetailDiv.appendChild(trxNameH1); 

                li.appendChild(iconDiv); 
                li.appendChild(trxDetailDiv); 
                li.setAttribute("onclick", "openNewTrxDetailModal("+selectedAccountId+","+id+", "+type+")")
                categoriesListCont.appendChild(li);
            })
        } else {
            console.log('error')
        }
        }
        
        request.send()
        modal4.style.display = "none";
  modal5.style.display = "block";
}

function saveNewTrx(accountId, categoryId, type){
  var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
var date = dd+'/'+mm+'/'+yyyy;
var name = document.getElementById("name-new-trx").value; 
  var qty = document.getElementById("trx-qty").value; 
  qty = qty.replace(",","");

  var request = new XMLHttpRequest()
        
        request.open('GET', 'http://35.236.52.46:8080/final/newTrx?idAccount='+accountId+'&type='+type+'&category='+categoryId+'&qty='+qty+'&name='+name+'&date='+date, true)
        
        //request.open('GET', 'http://localhost:8080/final/accounts/addAccount?id=1&initialBalance='+saldo+'&name='+name, true)
        
        request.onload = function() {
        // Begin accessing JSON data here

        if (request.status >= 200 && request.status < 400) {
              hideNewTrxDetailModal();
              document.location.reload();
        } else {
            console.log('error')
        }
        }
        
        request.send()

}

function openNewTrxDetailModal(accId, catId, type){
  document.getElementById("acceptNewTrx").setAttribute("onclick", "saveNewTrx("+accId+","+catId+", "+type+")")
  modal5.style.display = "none";
  modal6.style.display = "block";
}

function hideSelectAccountModal(){
  modal4.style.display = "none";
}

function hideNewTrxDetailModal(){
  modal6.style.display = "none";
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

  if(event.target == modal4){
    
    modal4.style.display = "none";
  }

  if(event.target == modal5){
    modal5.style.display = "none";
  }

  if(event.target == modal6){
    modal6.style.display = "none";
  }
}

function formatBalance(value){
  console.log(value);
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
  decimals = decimals.substring(0,2);
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

function formatNumberNewTrx(value){

  var split = value.split('.'); 
  var balance = split[0]; 
  var decimals = split[1]; 

  var inputSaldo = document.getElementById("trx-qty");
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
  var issuer = document.querySelector('input[name="issuer"]:checked').value;
  console.log(issuer);
  saldo = saldo.replace(",","");
  console.log(saldo);

  var request = new XMLHttpRequest()
        
        request.open('GET', 'http://35.236.52.46:8080/final/accounts/addAccount?id=1&initialBalance='+saldo+'&name='+name+'&issuer='+issuer, true)
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

function deleteAccount(){
  var accountId = localStorage.getItem("accountId");

  var request = new XMLHttpRequest()
        
        request.open('GET', 'http://35.236.52.46:8080/final/accounts/delete?id='+accountId, true)
        //request.open('GET', 'http://localhost:8080/final/accounts/delete?id='+accountId, true)
        
        request.onload = function() {

        if (request.status >= 200 && request.status < 400) {
            
              
              document.location = "/diplomado/final/index.html"
            
        } else {
            console.log('error')
        }
        }
        
        request.send()
}