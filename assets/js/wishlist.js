import { postData } from "./request.js";

document.addEventListener("DOMContentLoaded", async () => {
  let productsContainer = document.querySelector(".cards");
  let deleteAll = document.querySelector(".deleteAll");

  const getProducts = async () => {
    let response = await axios.get("http://localhost:3000/products");
    let products = response.data;

    return products;
  };

  let products = await getProducts();

  function createWislistItem(product) {
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");

      const mark = document.createElement("span");
      mark.classList.add("mark");
      mark.textContent = "New";

      const closeIcon = document.createElement("i");
      closeIcon.classList.add("fa-solid", "fa-x", "close-btn");
      closeIcon.addEventListener("click", () => {
        productCard.style.display = "none";
      });

      cardHeader.appendChild(mark);
      cardHeader.appendChild(closeIcon);

      const productImage = document.createElement("img");
      productImage.src = `${product.image}`;
      productImage.alt = " product image";
      productImage.classList.add("product-image");
      productImage.addEventListener("click", () => {
        window.location.href = `product-detail.html?id=${product.id}`;
      });

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
  }
  deleteAll.addEventListener("click", () => {
    // productsContainer.style.display = "none"
  });

  createWislistItem();
});
