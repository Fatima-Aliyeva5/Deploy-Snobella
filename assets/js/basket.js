// Sample basket data for demonstration
let basket = [
    {
      id: 1,
      image: "./assets/images/kisspng-bag-laptop-backpack-knomo-beauchamp-5b0bf6a37cde46 7.png",
      title: "Shoulder Bag Leather Bag Leather undertakes laborious physical physical",
      category: "bag's product",
      price: 130.00,
      count: 1
    },
    // More products can be added here
  ];
  
  // Function to update the total price of the basket
  function updateTotalPrice() {
    let totalPrice = 0;
    basket.forEach((product) => {
      totalPrice += product.price * product.count;
    });
    let total = document.querySelector(".total-price");
    total.textContent = `US $${totalPrice.toFixed(2)}`;
  }
  
  // Function to create basket items dynamically from the basket array
  function createBasketItems() {
    let cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = ""; // Clear existing content
  
    basket.forEach((product) => {
      let productCard = document.createElement("div");
      productCard.classList.add("product-card");
  
      let imageDiv = document.createElement("div");
      imageDiv.classList.add("imageDiv");
  
      let img = document.createElement("img");
      img.src = product.image;
      img.alt = "Product Image";
      img.classList.add("product-image");
  
      let productDetails = document.createElement("div");
      productDetails.classList.add("product-details");
  
      let productTitle = document.createElement("div");
      productTitle.classList.add("product-title");
      let titleH3 = document.createElement("h3");
      titleH3.textContent = product.title;
      productTitle.appendChild(titleH3);
  
      let priceDiv = document.createElement("div");
      priceDiv.classList.add("price");
      let priceSpan = document.createElement("span");
      priceSpan.classList.add("current-price");
      priceSpan.textContent = `$${product.price.toFixed(2)}`;
      priceDiv.appendChild(priceSpan);
  
      let productCategory = document.createElement("p");
      productCategory.classList.add("product-category");
      productCategory.textContent = product.category;
  
      let countArea = document.createElement("div");
      countArea.classList.add("count-area");
  
      let minusBtn = document.createElement("button");
      minusBtn.classList.add("minus-btn");
      if (product.count === 1) {
        minusBtn.setAttribute("disabled", "true");
      }
      minusBtn.textContent = "-";
      minusBtn.addEventListener("click", () => decrementCount(product.id, product.count, minusBtn));
  
      let count = document.createElement("p");
      count.classList.add("count");
      count.textContent = product.count;
  
      let plusBtn = document.createElement("button");
      plusBtn.classList.add("plus-btn");
      plusBtn.textContent = "+";
      plusBtn.addEventListener("click", () => incrementCount(product.id, product.count, minusBtn));
  
      let favRemoveBottom = document.createElement("div");
      favRemoveBottom.classList.add("fav-remove-bottom");
  
      let heart = document.createElement("div");
      heart.classList.add("heart");
      let heartIcon = document.createElement("i");
      heartIcon.classList.add("fa-regular", "fa-heart", "heart-icon");
      let heartText = document.createElement("span");
      heartText.textContent = "Favorite";
      heart.appendChild(heartIcon);
      heart.appendChild(heartText);
  
      let remove = document.createElement("div");
      remove.classList.add("remove");
      let trashIcon = document.createElement("i");
      trashIcon.classList.add("bi", "bi-trash3");
      let removeText = document.createElement("span");
      removeText.textContent = "Remove";
      remove.appendChild(trashIcon);
      remove.appendChild(removeText);
      remove.addEventListener("click", () => removeProduct(product.id));
  
      countArea.append(minusBtn, count, plusBtn);
      favRemoveBottom.append(heart, remove);
      productDetails.append(productTitle, priceDiv, productCategory, countArea);
      productCard.append(imageDiv, productDetails, favRemoveBottom);
  
      imageDiv.appendChild(img);
      cardsContainer.appendChild(productCard);
    });
  }
  
  // Function to increment the product count
  function incrementCount(productId, currentCount, minusBtn) {
    let product = basket.find((item) => item.id === productId);
    if (product) {
      product.count++;
      if (product.count > 1) {
        minusBtn.removeAttribute("disabled");
      }
      updateTotalPrice();
      createBasketItems(); // Recreate the updated basket UI
    }
  }
  
  // Function to decrement the product count
  function decrementCount(productId, currentCount, minusBtn) {
    let product = basket.find((item) => item.id === productId);
    if (product && product.count > 1) {
      product.count--;
      if (product.count === 1) {
        minusBtn.setAttribute("disabled", "true");
      }
      updateTotalPrice();
      createBasketItems(); // Recreate the updated basket UI
    }
  }
  
  // Function to remove a product from the basket
  function removeProduct(productId) {
    basket = basket.filter((product) => product.id !== productId);
    updateTotalPrice();
    createBasketItems(); // Recreate the updated basket UI
  }
  
  // Handle Confirm Cart button click
  document.querySelector("#confirmCartBtn").addEventListener("click", () => {
    if (basket.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    // Process the cart confirmation (e.g., save order, redirect to checkout)
    confirmCart();
  });
  
  // Handle Cash Payment button click
  document.querySelector("#cashPaymentBtn").addEventListener("click", () => {
    if (basket.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    // Proceed with the cash payment process
    processCashPayment();
  });
  
  // Function to confirm the cart (can be extended to save an order or redirect to checkout)
  function confirmCart() {
    // Logic for confirming the cart (e.g., create order, show confirmation)
    alert("Cart confirmed. Proceeding to checkout.");
  }
  
  // Function to process cash payment (can be extended to simulate a payment process)
  function processCashPayment() {
    // Logic for cash payment (e.g., show payment instructions)
    alert("Cash payment selected. Please pay at the counter.");
  }
  
  // Initial call to display the basket items
  createBasketItems();
  