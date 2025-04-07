const input = document.getElementById("input");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");
const nome = document.getElementById("username");

const template = "<li class=\"list-group-item\">%MESSAGE</li>";
const messages = [];

const socket = io();

input.onkeydown = (event) => {
  
  if (event.keyCode === 13) {
      event.preventDefault();
      button.click();
  }
}

button.onclick = () => {
  console.log(nome.value);
  socket.emit("message", input.value, nome.value);
  input.value = "";
}

socket.on("chat", (message) => {
  console.log(message);
  messages.push(message);
  render();
})

const render = () => {
  let html = "";
  messages.forEach((message) => {
    const row = template.replace("%MESSAGE", message);
    html+=row;
  });
  chat.innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
}