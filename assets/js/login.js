document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let form = document.querySelector(".form");
  
    function login(e) {
      e.preventDefault();
  
      if (!users.length) {
        toast("No users found");
        return;
      }
  
      let findUser = users.find(
        (user) =>
          user.username === username.value && user.password === password.value
      );
  
      if (findUser) {
        findUser.isLogined = true;
        localStorage.setItem("users", JSON.stringify(users));
        toast("User logged in successfully");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        toast("Username or password is incorrect");
      }
    }
    
  
    function toast(text) {
      Toastify({
        text: `${text}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }
  
    form.addEventListener("submit", login);
  });
  