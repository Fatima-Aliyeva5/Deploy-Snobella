const sliderContainer = document.querySelector(".sliderContainer");
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");

sliderContainer.addEventListener("mouseover", stopAutoSlide);
sliderContainer.addEventListener("mouseleave", startAutoSlide);

let currentIndex = 0;

const dotsContainer = document.querySelector(".dot-container");

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % slide.length;
  updateSlider();
  updateDots();
};
const prevSlide = () => {
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  updateSlider();
  updateDots();
};

function updateSlider() {
  const newTransform = -currentIndex * 100 + "%";
  slides.style.transform = `translateX(${newTransform})`;
}

let interval;
function startAutoSlide() {
  interval = setInterval(nextSlide, 1000);
}
function stopAutoSlide() {
  clearInterval(interval);
}

startAutoSlide();

function createDots() {
  slide.forEach((index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (index == 0) {
      dot.classList.add("active");
    }
    dot.setAttribute("data-index", index);
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
      updateDots();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index == currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}
createDots();

//section-1  slides end

// section featured start

document.addEventListener("DOMContentLoaded", async () => {
  const getProducts = async () => {
    let response = await axios.get("http://localhost:3000/products");
    let products = response.data;

    return products;
  };
  let products = await getProducts();

  let slicedProducts = products.slice(0, 3);

  let productsContainer = document.querySelector(".featured-cards");

  slicedProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.addEventListener("click", () => {
      window.location.href = `product-detail.html?id=${product.id}`;
    });
    console.log(product.id);

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const mark = document.createElement("span");
    mark.classList.add("mark");
    mark.textContent = "New";

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-regular", "fa-heart", "heart-icon");
    heartIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      heartIcon.style.backgroundColor = "#ec3636;";
    });

    cardHeader.appendChild(mark);
    cardHeader.appendChild(heartIcon);

    const productImage = document.createElement("img");
    productImage.src = `${product.image}`;
    productImage.alt = "product image";
    productImage.classList.add("product-image");

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const stars = document.createElement("div");
    stars.classList.add("stars");

    const starsImage = document.createElement("img");
    starsImage.src = "./assets/images/stars.png";
    starsImage.alt = "stars";

    stars.appendChild(starsImage);

    const productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    if (product.title.length > 80) {
      productTitle.textContent = product.title.slice(0, 80) + "...";
    } else {
      productTitle.textContent = product.title;
    }

    const productCategory = document.createElement("p");
    productCategory.classList.add("product-category");
    productCategory.textContent = `${product.category}`;

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price");

    const price = document.createElement("span");
    price.classList.add("current-price");
    price.textContent = `$${product.price}`;

    priceDiv.appendChild(price);

    const addToCardBtn = document.createElement("button");
    addToCardBtn.classList.add("add-to-card");
    addToCardBtn.textContent = "Add to card";
    addToCardBtn.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    productDetails.appendChild(stars);
    productDetails.appendChild(productTitle);
    productDetails.appendChild(productCategory);
    productDetails.appendChild(priceDiv);
    productDetails.appendChild(addToCardBtn);

    productCard.appendChild(cardHeader);
    productCard.appendChild(productImage);
    productCard.appendChild(productDetails);

    productsContainer.appendChild(productCard);
  });

  let searchInp = document.querySelector(".inp");
  let searchIcon = document.querySelector(".searchIcon");

  searchInp.addEventListener("input", () => {
    let searchValue = searchInp.value.trim();
    filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    let searchSlicedProducts = filteredProducts.slice(0, 3);
    let list = document.querySelector(".list-search");
    if (searchValue === "") {
      list.innerHTML = "";
      return;
    }
    list.innerHTML = ``;
    searchSlicedProducts.forEach((product) => {
      let listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = `        
     
            <div class="search-image">
              <img class="img" src="${product.image}" alt="Product Image">
            </div>
          
            <div class="search-details">
              <p class="search-category">${product.category}</p>
              <h3 class="search-title">${product.title}</h3>
              <p class="search-price">$${product.price}</p>
            </div>
    `;
      listItem.addEventListener("click", () => {
        window.location.href = `product-detail.html?id=${product.id}`;
      });
      document.querySelector(".list-search").appendChild(listItem);
    });
    document.addEventListener("click", (e) => {
      let list = document.querySelector(".list-search");
      if (e.target === searchInp) {
        list.style.display = "block";
      } else {
        list.style.display = "none";
      }
    });

    searchInp.addEventListener("focus", () => {
      const list = document.querySelector(".list-search");
      list.style.display = "block";
    });

    const dropdownContent = document.querySelector(".dropdown-content-signUp");

    // LocalStorage-dan istifadəçi məlumatlarını yoxlayırıq
    const user = JSON.parse(localStorage.getItem("currentUser"));
  });
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = users.find((user) => user.isLogined === true);
  let isLogined = users.find((user) => user.isLogined === true);
  const signUpDropdown = document.querySelector(".dropdown-signUp");
  if (isLogined) {
    // İstifadəçi login olarsa, header dəyişir
    signUpDropdown.innerHTML = `
        <div class="user-info">
          <img src="${
            currentUser.avatar || "https://picsum.photos/200/300"
          }" alt="User Avatar" />
          <span>${currentUser.name} ${currentUser.surname}</span>
        </div>
        <div class="dropdown-content-signUp">
          <a href="./addresses.html">Addresses</a>
          <a href="#" id="logout">Logout</a>
        </div>
      `;

    // Logout funksiyası

    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
    function updateUserStatus() {
      if (isLogined) {
        usernameBtn.textContent = isLogined.username;
        loginBtn.classList.add("d-none");
        registerBtn.classList.add("d-none");
        document.getElementById("logout").classList.remove("d-none");
        document.getElementById("logout").style.backgroundColor = "red";
      } else {
        usernameBtn.textContent = "Username";
        loginBtn.classList.remove("d-none");
        registerBtn.classList.remove("d-none");
        document.getElementById("logout").classList.add("d-none");
      }
    }

    function logout(e) {
      if (currentUser) {
        e.preventDefault();
        currentUser.isLogined = false;
        usernameBtn.textContent = "";
        localStorage.setItem("users", JSON.stringify(users));
        toast("You logged out successfully!");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);

        updateUserStatus();
      }
    }

    document.getElementById("logout").addEventListener("click", logout);
    let wishlistButton = document.querySelector(".wishlistpageicon");
    wishlistButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (!isLogined) {
        toast("Please login to access your wishlist!");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        window.location.href = "wishlist.html";
      }
    });
  }
  getProducts();
});
