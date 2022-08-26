let user;
let userName;
let errorCode;
let nickname;
let messages = [];
let allUsers = "Todos";

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
    const chat = document.getElementById('chat');
    chat.scrollIntoView(false);
}

function getUserName() {
    userName = document.getElementById("user-name").value;
    user = {name: userName};
    
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user);
    promise.then(confirmUserName).catch(notConfirm)
}

function goChat() {
    const login_page = document.getElementById("login");
    login_page.classList.add('hidden');
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
    }
}
