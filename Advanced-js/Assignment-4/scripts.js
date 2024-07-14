// Product data
const products = [
  {
    id: 1,
    name: "Stylish Watch",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Leather Bag",
    price: 11999,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Sunglasses",
    price: 6999,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Sneakers",
    price: 9999,
    image:
      "https://images.unsplash.com/photo-1597405490028-282bac40f64c?q=80&w=2623&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Headphones",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to format price in Rupees
function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

// Function to render products
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");
    productEl.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    productList.appendChild(productEl);
  });
}

// Function to render cart
function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <span>${item.name} - ${formatPrice(item.price)} x ${
      item.quantity
    }</span>
            <button onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
    cartItems.appendChild(cartItem);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.innerHTML = `
        <span>Total:</span>
        <span>${formatPrice(total)}</span>
    `;

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showNotification(`${product.name} added to cart!`);
}

// Function to remove item from cart
function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    const removedItem = cart[index];
    if (removedItem.quantity > 1) {
      removedItem.quantity--;
    } else {
      cart.splice(index, 1);
    }
    renderCart();
    showNotification(`${removedItem.name} removed from cart!`);
  }
}

// Function to show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }, 100);
}

// Initial render
renderProducts();
renderCart();
