// import { postData } from "./request.js";

// document.addEventListener("DOMContentLoaded", () => {
//   let form = document.querySelector(".form");
//   let name = document.querySelector("#name");
//   let surname = document.querySelector("#surname");
//   let username = document.querySelector("#username");
//   let email = document.querySelector("#email");
//   let password = document.querySelector("#password");
//   let isLogined = false;
//   const apiUrl = "http://localhost:3000/users";

//   function register(e) {
//     e.preventDefault();
//     // let id = uuidv4();

//     // Task 1: Username
//     const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
//     if (!usernameRegex.test(username.value)) {
//       toast(
//         "Username minimum 3, maksimum 20 simvol olmalı, yalnız əlifba, rəqəm, alt xətt və tire istifadə edilməlidir."
//       );
//       return;
//     }
//     // Task 3: Password
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
//     if (!passwordRegex.test(password.value)) {
//       toast(
//         "Şifrə minimum 8 simvol olmalı, ən azı bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol daxil edilməlidir."
//       );
//       return;
//     }

//     let newUser = {
//       name: name.value,
//       surname: surname.value,
//       username: username.value,
//       email: email.value,
//       password: password.value,
//       isLogined: isLogined,
//       wishList: [],
//       basket: [],
//     };

//     postData(apiUrl, newUser)
//       .then((response) => {
//         if (response) {
//           toast("User registered successfully");
//           setTimeout(() => {
//             window.location.href = "login.html"; // İstifadəçini login səhifəsinə yönləndirir
//           }, 2000);
//         } else {
//           throw new Error("No response received");
//         }
//       })
//       .catch((error) => {
//         toast("Error: Unable to register user");
//         console.error("Error details:", error);
//       });
//   }

//   function toast(text) {
//     Toastify({
//       text: `${text}`,
//       duration: 3000,
//       gravity: "top",
//       position: "right",
//       style: {
//         background: "linear-gradient(to right, #00b09b, #96c93d)",
//       },
//     }).showToast();
//   }
//   form.addEventListener("submit", register);
// });

document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    let form = document.querySelector(".form");
    let name = document.querySelector("#name");
    let surname = document.querySelector("#surname");
    let username = document.querySelector("#username");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let isLogined = false;
  
    function register(e) {
      e.preventDefault();
      // let id = uuidv4();
  
      // Task 1: Username
      const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
      if (!usernameRegex.test(username.value)) {
        toast(
          "Username minimum 3, maksimum 20 simvol olmalı, yalnız əlifba, rəqəm, alt xətt və tire istifadə edilməlidir."
        );
        return;
      }
      // Task 3: Password
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password.value)) {
        toast(
          "Şifrə minimum 8 simvol olmalı, ən azı bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol daxil edilməlidir."
        );
        return;
      }
  
  
      let uniqueUser = users.some(
        (user) => user.username === username.value || user.email === email.value
      );
  
      if (!uniqueUser) {
        let newUser = {
          name: name.value,
          surname: surname.value,
          username: username.value,
          email: email.value,
          password: password.value,
          isLogined: isLogined,
          wishList: [],
          basket: [],
          // id: id,
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        toast("User registered successfully");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        toast("User already exist");
        return;
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
    form.addEventListener("submit", register);
  });
  