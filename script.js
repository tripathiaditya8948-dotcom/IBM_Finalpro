const productContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cartCount");

let products = [];

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
    updateCartCount();
  });

function displayProducts(items) {
  productContainer.innerHTML = "";
  items.forEach(product => {
    productContainer.innerHTML += `
      <div class="product">
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>${product.description.slice(0, 80)}...</p>
        <p class="price">₹ ${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Product added to cart");
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.innerText = cart.length;
}

searchInput.addEventListener("input", () => {
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  displayProducts(filtered);
});