const messages = document.querySelector(".messages");

fetch(`${window.location.origin}/messages`)
  .then(res => { 
    return res.json();
  })
  .then(data => {
    if (data) {
      data.forEach(({ text, addedAt }) => {
        const message = document.createElement("li");
        message.innerHTML = `<li class="message"><i>${addedAt}</i> ${text}</li>`;
        messages.append(message);
      }); 
    }        
});
