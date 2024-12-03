document.addEventListener("DOMContentLoaded", async () => {
  const getProducts = async () => {
    let response = await axios.get("http://localhost:3000/products");
    let products = response.data;

    console.log(products);
    return products;
  };
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  let products = await getProducts();
  let findProduct = products.find((product) => product.id === productId);
  let productContainer = document.querySelector(".product-dtls-container");
  if (!findProduct) {
    productContainer.textContent = "Product not found.";
    return;
  }

  console.log(findProduct);

  let productImageDiv = document.createElement("div");
  productImageDiv.classList.add("product-dtls-image");

  let productImage = document.createElement("img");
  productImage.classList.add("img");
  productImage.src = findProduct.image;
  productImage.alt = "Product Image";
  productImageDiv.appendChild(productImage);

  const mark = document.createElement("span");
  mark.classList.add("mark-dtls");
  mark.textContent = "30%";

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa-regular", "fa-heart", "heart-icon-dtls");

  productImageDiv.appendChild(mark);
  productImageDiv.appendChild(heartIcon);

  let productDetailsDiv = document.createElement("div");
  productDetailsDiv.classList.add("product-dtls-page-details");

  let productTitle = document.createElement("h3");
  productTitle.classList.add("product-dtls-title");
  productTitle.textContent = findProduct.title;

  let productCategory = document.createElement("p");
  productCategory.classList.add("product-dtls-category");
  productCategory.textContent = findProduct.category;

  let productRating = document.createElement("div");
  productRating.classList.add("product-dtls-rating");

  let ratingStars = document.createElement("span");
  ratingStars.textContent = `⭐⭐⭐⭐⭐ ${findProduct.rating.rate}`;
  let ratingCount = document.createElement("span");
  ratingCount.textContent = `(${findProduct.rating.count})`;

  productRating.appendChild(ratingStars);
  productRating.appendChild(ratingCount);

  let productPrice = document.createElement("p");
  productPrice.classList.add("product-dtls-price");
  productPrice.textContent = `$${findProduct.price}`;

  let quantitySelector = document.createElement("div");
  quantitySelector.classList.add("quantity-selector");

  let btnMinusElem = document.createElement("button");
  btnMinusElem.classList.add("btn-minus");
  btnMinusElem.textContent = "-";

  let countInpElem = document.createElement("input");
  countInpElem.classList.add("countInp");
  countInpElem.type = "number";
  countInpElem.value = 1;
  countInpElem.min = 1;

  let btnPlusElem = document.createElement("button");
  btnPlusElem.classList.add("btn-plus");
  btnPlusElem.textContent = "+";

  quantitySelector.appendChild(btnMinusElem);
  quantitySelector.appendChild(countInpElem);
  quantitySelector.appendChild(btnPlusElem);

  let addToCartBtnElem = document.createElement("button");
  addToCartBtnElem.classList.add("btn", "add-to-cart-dtls-btn");
  addToCartBtnElem.textContent = "Add to Cart";

  productDetailsDiv.appendChild(productTitle);
  productDetailsDiv.appendChild(productCategory);
  productDetailsDiv.appendChild(productRating);
  productDetailsDiv.appendChild(productPrice);
  productDetailsDiv.appendChild(quantitySelector);
  productDetailsDiv.appendChild(addToCartBtnElem);

  productContainer.appendChild(productImageDiv);
  productContainer.appendChild(productDetailsDiv);

  let descriptionDiv = document.querySelector(".description-info");
  let productDescription = document.createElement("p");
  productDescription.textContent = `${findProduct.description}`;
  descriptionDiv.appendChild(productDescription);

  // ------******

  let similarProductsContainer = document.querySelector(
    ".similar-products-container"
  );
  let category = findProduct.category;

  let categoryProducts = products.filter(
    (product) => product.category === category && product.id !== findProduct.id
  );
  categoryProducts = categoryProducts.slice(0, 3);

  categoryProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.addEventListener("click", () => {
      window.location.href = `product-detail.html?id=${product.id}`;
    });
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const mark = document.createElement("span");
    mark.classList.add("mark");
    mark.textContent = "New";

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-regular", "fa-heart", "heart-icon");

    cardHeader.appendChild(mark);
    cardHeader.appendChild(heartIcon);

    const productImage = document.createElement("img");
    productImage.src = `${product.image}`;
    productImage.alt = " product image";
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
    // addToCartBtn.addEventListener("click", (e) => {
    //   e.stopPropagation();
    //   // addBasket(product.id);
    //   // toast("Product added to the basket");
    // });

    productDetails.appendChild(stars);
    productDetails.appendChild(productTitle);
    productDetails.appendChild(productCategory);
    productDetails.appendChild(priceDiv);
    productDetails.appendChild(addToCardBtn);

    productCard.appendChild(cardHeader);
    productCard.appendChild(productImage);
    productCard.appendChild(productDetails);

    similarProductsContainer.appendChild(productCard);
  });

  let countInp = document.querySelector(".countInp");
  let btnMinus = document.querySelector(".btn-minus");
  let btnPlus = document.querySelector(".btn-plus");
  let addToCartBtn = document.querySelector(".add-to-cart-dtls-btn");

  btnPlus.addEventListener("click", () => {
    let currentValue = parseInt(countInp.value);
    countInp.value = currentValue + 1;
    if (currentValue + 1 > 1) {
      btnMinus.removeAttribute("disabled");
    }
  });

  btnMinus.addEventListener("click", () => {
    let currentValue = parseInt(countInp.value);
    if (currentValue > 1) {
      countInp.value = currentValue - 1;
    }
    if (currentValue - 1 === 1) {
      btnMinus.setAttribute("disabled", "true");
    }
  });

  addToCartBtn.addEventListener("click", () => {
    e.stopPropagation();
    addBasket(product.id);
    toast("Product added to the basket");
    let quantity = parseInt(countInp.value);
    let users = JSON.parse(localStorage.getItem("users"));
    let currentUser = users.find((user) => user.isLogined === true);
    let basket = currentUser.basket || [];

    let existProduct = basket.find((product) => product.id === findProduct.id);

    if (existProduct) {
      existProduct.count += quantity;
    } else {
      basket.push({ ...findProduct, count: quantity });
    }

    let userIndex = users.findIndex((user) => user.id === currentUser.id);
    users[userIndex].basket = basket;
    localStorage.setItem("users", JSON.stringify(users));
    toast("Product added to basket");
  });
  const searchInp = document.querySelector(".inp");
  const searchIcon = document.querySelector(".searchIcon");
  const list = document.querySelector(".list-search");

  searchInp.addEventListener("input", () => {
    const searchValue = searchInp.value.trim().toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
    const searchSlicedProducts = filteredProducts.slice(0, 3);

    if (searchValue === "") {
      list.innerHTML = "";
      return;
    }

    list.innerHTML = ""; 
    searchSlicedProducts.forEach((product) => {
      const listItem = document.createElement("li");
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
      list.appendChild(listItem);
    });
  });

  searchInp.addEventListener("focus", () => {
    list.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (e.target !== searchInp && !list.contains(e.target)) {
      list.style.display = "none";
    }
  });

  searchIcon.addEventListener("click", () => {
    searchInp.focus();
  });

  // Remove unused variables or implement functionality for them

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
});
