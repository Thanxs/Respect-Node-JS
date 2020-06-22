const messages = document.querySelector(".chat-messages");
const chatForm = document.querySelector('.chat-form');
const messageRemove = document.querySelector('.message-remove');

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target[0].value;
  
  fetch(`${window.location.origin}/chat/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then((data) => {
      if (data.status === 200) {      
          const message = document.createElement("li");
          message.innerHTML = `<li class="message">
          <div class="message-info"><i>${new Date().toLocaleTimeString()}</i> <b class="message-text">${text}</b></div>
          <span class="message-remove"><i class="fas fa-trash-alt"></i></span>
          </li>`;
          messages.append(message);
          e.target[0].value = '';
      }   
    })
    .catch(console.error);
});

fetch(`/chat/messages`)
  .then(res => res.json())
  .then(data => {      
    data.forEach(({ text, createdAt }) => {
      const message = document.createElement("li");
      message.innerHTML = `<li class="message">
      <div class="message-info"><i>${createdAt}</i> <b class="message-text">${text}</b></div>
      <span class="message-remove"><i class="fas fa-trash-alt"></i></span>
      </li>`;
      messages.append(message);
    });
  });
