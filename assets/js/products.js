import { postData } from "./request.js";

document.addEventListener("DOMContentLoaded", async () => {
  let productsContainer = document.querySelector(".cards");

  const getProducts = async () => {
    let response = await axios.get("http://localhost:3000/products");
    let products = response.data;

    return products;
  };

  let products = await getProducts();
  let filteredProducts = [...products];
  let basket = [];

  let azBtn = document.querySelector(".az");
  let zaBtn = document.querySelector(".za");

  let lowToHighBtn = document.querySelector(".low-to-high");
  let highToLowBtn = document.querySelector(".high-to-low");

  azBtn.addEventListener("click", () => {
    filteredProducts = filteredProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    document.querySelector(".cards").innerHTML = "";
    updateProductCards(filteredProducts);
  });

  zaBtn.addEventListener("click", () => {
    filteredProducts = filteredProducts.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    document.querySelector(".cards").innerHTML = "";
    updateProductCards(filteredProducts);
  });

  lowToHighBtn.addEventListener("click", () => {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    document.querySelector(".cards").innerHTML = "";
    updateProductCards(filteredProducts);
  });

  highToLowBtn.addEventListener("click", () => {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    document.querySelector(".cards").innerHTML = "";
    updateProductCards(filteredProducts);
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
    document.querySelector(".cards").innerHTML = "";
    createUserCard(filteredProducts);
  });

  function createUserCard(products) {
    products.forEach((product) => {
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
      heartIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        
        toggleAddWishlist( heartIcon);
      });

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
      addToCardBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(product);
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
  }
  function updateProductCards(products) {
    productsContainer.innerHTML = "";
    createUserCard(products);
  }



  function toggleAddWishlist(heartElement) {
    // Əgər ürək doludursa, onu boş edirik
    if (heartElement.classList.contains("fa-solid")) {
      heartElement.classList.remove("fa-solid");
      heartElement.classList.add("fa-regular");
      heartElement.style.color = "#ccc"; // Boş ürək üçün rəng
    } else {
      // Əgər ürək boşdursa, onu dolu edirik
      heartElement.classList.remove("fa-regular");
      heartElement.classList.add("fa-solid");
      heartElement.style.color = "#df3226"; // Dolu ürək üçün rəng
    }
  }
  function addToCart(product) {
    // Səbətdə məhsul varmı yoxla
    let existingProduct = basket.find((item) => item.id === product.id);

    if (existingProduct) {
      // Məhsul artıq səbətdədirsə, sayını artır
      existingProduct.quantity++;
    } else {
      basket.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    // Məhsul sayını yenilə
    updateCartCount();
    const userId = "unique-user-id";
    const basketData = {
      userId,
      basket,
    };
  }

  // Səbət sayını yeniləyən funksiya
  function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    const totalCount = basket.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
  }
  createUserCard(filteredProducts);
});
