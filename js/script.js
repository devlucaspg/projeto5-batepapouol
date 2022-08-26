let userName;
let messages = [];

function getMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(receivedMessages) 
}

getMessages();

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
                <span class="target">${messages[i].from}</span>
                <span>para</span>
                <span class="target">${messages[i].to}: </span>
                <span class="content">${messages[i].text}</span>
            </div>
                `
        }
        if (messages[i].type == "status") {
            chat.innerHTML = chat.innerHTML + `
            <div class="container status">
                <span class="time">(${messages[i].time})</span>
                <span class="target">${messages[i].from}</span>
                <span class="content">${messages[i].text}</span>
            </div>
                `
        }
        if (messages[i].type == "private_message") {
            chat.innerHTML = chat.innerHTML + `
            <div class="container private-message">
            <span class="time">(${messages[i].time})</span>
            <span class="target">${messages[i].from}</span>
            <span>reservadamente para</span>
            <span class="target">${messages[i].to}: </span>
            <span class="content">${messages[i].text}</span>
            </div>
                `
        }
    }
}   







/*
function getUserName() {
    userName = document.getElementById("user-name").value;
    const user = {name: userName};

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user);
    promise.then(goChat).catch(confirmar);
}

function goChat() {

    const login_page = document.getElementById("login");
    login_page.classList.add('hidden');


}*/