// main.js - common scripts for all pages

// Load navbar component dynamically
async function loadNavbar() {
  const navbarDiv = document.getElementById('navbar');
  try {
    const res = await fetch('../components/navbar.html');
    const html = await res.text();
    navbarDiv.innerHTML = html;

    updateCartCount();
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

// Update cart count in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountSpan = document.getElementById('cart-count');
  if (cartCountSpan) {
    cartCountSpan.textContent = count;
  }
}

loadNavbar();