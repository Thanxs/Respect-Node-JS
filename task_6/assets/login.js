const loginForm = document.getElementById('login-form');
const email = document.querySelector('.email');
const password = document.querySelector('.password');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`${window.location.origin}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
      })
        .then(() => {
          window.location.replace(window.location.origin);
        })
        .catch(console.error);  
});