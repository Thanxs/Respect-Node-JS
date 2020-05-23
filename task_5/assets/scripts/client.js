const messages = document.getElementById("messages");

fetch(`/messages`)
  .then(res => res.json())
  .then(data => {
    data.forEach(({ text, addedAt }) => {
      const message = document.createElement("li");
      message.innerHTML = `<li><i>${addedAt}</i> ${text}</li>`;
      messages.append(message);
    });
  });
