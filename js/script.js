let user;
let userName;
let errorCode;
let usersList;
let userCheck
let privacyCheck;
let typeOfMessage;
let nickname;
let messages = [];
let allUsers = "Todos";
let textId;
textId = document.querySelector("text-id");
let privacyID;

userCheck = allUsers;
privacyCheck = "Público";



function getMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(receivedMessages) 
}


function stayConected() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user);
}

getMessages();
setInterval(getMessages, 3000);


function receivedMessages(response) {
    messages = response.data;
    renderMessages();
}

function renderMessages() {
    const chat = document.getElementById('chat');
    chat.innerHTML = "";

    for (let i = 0; i < messages.length; i++) {
        
        if (messages[i].type == "message") {
        chat.innerHTML = chat.innerHTML + `
            <div class="container message">
                <span class="time">(${messages[i].time})</span>
                <span class="target break-text">${messages[i].from}</span>
                <span>para</span>
                <span class="target break-text">${messages[i].to}: </span>
                <span class="content break-text">${messages[i].text}</span>
            </div>
                `
        }
        if (messages[i].type == "status") {
            chat.innerHTML = chat.innerHTML + `
            <div class="container status">
                <span class="time">(${messages[i].time})</span>
                <span class="target break-text">${messages[i].from}</span>
                <span class="content">${messages[i].text}</span>
            </div>
                `
        }
        if (messages[i].type == "private_message") {
            if (messages[i].to == userName || messages[i].from == userName || messages[i].to == allUsers) {
                chat.innerHTML = chat.innerHTML + `
                <div class="container private-message">
                <span class="time">(${messages[i].time})</span>
                <span class="target break-text">${messages[i].from}</span>
                <span>reservadamente para</span>
                <span class="target break-text">${messages[i].to}: </span>
                <span class="content break-text">${messages[i].text}</span>
                </div>
                    `
            }        
        }
    }
    viewLastMessage();
}   

function viewLastMessage() {
    window.scrollTo(0, document.body.scrollHeight);
}

function getUserName() {

    const login = document.getElementById("login");
    login.children[1].classList.add('hidden');
    login.children[2].classList.add('hidden');
    login.children[3].classList.remove('hidden');



    userName = document.getElementById("user-name").value;
    user = {name: userName};
    
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user);
    promise.then(confirmUserName).catch(notConfirm)

    console.log("Fazendo login");
}

function goChat() {
    const login_page = document.getElementById("login");
    const chat_page = document.getElementById("chat");
    login_page.classList.add('hidden');
    chat_page.classList.remove('hidden');
    setInterval(stayConected, 5000);
}

function confirmUserName(response) {
    nickname = response.status;
    if (nickname == 200) {
        goChat();
    }
}

function notConfirm (error) {
    errorCode = error.response.status;
    if (errorCode == 400) {
        alert("Este nome de usuário já está sendo usado");

        const login = document.getElementById("login");
        login.children[1].classList.remove('hidden');
        login.children[2].classList.remove('hidden');
        login.children[3].classList.add('hidden');

        document.getElementById("user-name").value = "";
    }
}

function refressPage() {
    window.location.reload();
}

function newMessage() {

    verifyType ();

    const fromElement = document.getElementById("user-name");
    const toElement = userCheck;
    const textElement = document.getElementById("send-message");
    const typeElement = typeOfMessage;

    const message = {
        from: fromElement.value,
        to: toElement,
        text: textElement.value,
        type: typeElement
    }
console.log(message);
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", message);
    promise.then(getMessages).catch(refressPage);
    document.getElementById("send-message").value = "";
}

let input1 = document.getElementById("user-name");
input1.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        let sendName = document.querySelector("#btn-login");
      
      sendName.click();
    
    }
  });

let input2 = document.getElementById("send-message");
input2.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        let sendMessage = document.querySelector("#send-m");
      
      sendMessage.click();
    
    }
  });
/*
  let esc = document.getElementById("gray");
esc.addEventListener("keypress", function(e) {
    if(e.key === 'Escape') {
    
        let hideSidebar = document.querySelector("#gray");
      
        hideSidebar.click();
    
    }
  });
*/
 
function getUsersList() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(receivedUsersList) 
}

function receivedUsersList(response) {
    usersList = response.data;
    renderUsersList();
}

function renderUsersList() {
    const users = document.getElementById("users");
    users.innerHTML = "";

    for (let i = 0; i < usersList.length; i++) {
        users.innerHTML = users.innerHTML + `
        <div id="user" class="user" onclick="userSelect(this)">
            <div>
                <ion-icon name="person-circle"></ion-icon>
                <span data-identifier="participant">${usersList[i].name}</span>
            </div>
            <ion-icon name="checkmark" class="checkmark"></ion-icon> 
        </div>
        `
    }
}

getUsersList();
setInterval(getUsersList, 10000);

function userSelect(userS) {

    const uSelect = document.querySelector(".user .selected");

    if ( uSelect !== null ){
        uSelect.classList.remove('selected');
    }

    userCheck = userS.children[0].children[1].innerHTML;
    userS.children[1].classList.add('selected');

    footerId();

}

function viewSidebar() {
    const sidebar = document.getElementById("chat-menu");
    sidebar.classList.remove('hidden');
}

function hideSidebar() {
    const sidebar = document.getElementById("chat-menu");
    sidebar.classList.add('hidden');
}

function privacySelect(privacyS) {

    const pSelect = document.querySelector(".privacy .selected");

    if ( pSelect !== null ){
        pSelect.classList.remove('selected');
    }

    privacyCheck = privacyS.children[0].children[1].innerHTML;
    privacyS.children[1].classList.add('selected');

    footerId();

}

function verifyType () {
    if (privacyCheck == "Reservadamente") {
        typeOfMessage = "private_message";
    } else {
        typeOfMessage = "message";
    }

}

function footerId() {

    const msgId = "Enviando para " + userCheck + " (" + privacyCheck + ")";

    let textI = document.getElementById("text-id");
    textI.innerHTML = "";
    textI.innerHTML = msgId;
        
}

footerId();