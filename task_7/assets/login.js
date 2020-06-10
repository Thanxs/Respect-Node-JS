const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  fetch(`${window.location.origin}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        window.location.replace(`${window.location.origin}/messages`);
      }   
    })
    .catch(console.error);
});

