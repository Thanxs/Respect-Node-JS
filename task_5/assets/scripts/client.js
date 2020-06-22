const messages = document.getElementById("messages");

fetch(`/messages`)
  .then(res => res.json())
  .then(data => {
    data.forEach(({ text, createdAt }) => {
      const message = document.createElement("li");
      message.innerHTML = `<li><i>${createdAt}</i> ${text}</li>`;
      messages.append(message);
    });
  });
