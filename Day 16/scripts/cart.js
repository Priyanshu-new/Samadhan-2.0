// cart.js - logic for cart.html page

// Show cart items on page
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cart-items');
  const cartSummaryDiv = document.getElementById('cart-summary');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartSummaryDiv.textContent = '';
    checkoutBtn.style.display = 'none';
    return;
  }

  cartItemsDiv.innerHTML = '';
  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <div class="item-name">${item.name}</div>
      <div>₹${item.price}</div>
      <div>
        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="qty-input" />
      </div>
      <div>₹${item.price * item.quantity}</div>
      <div><button class="remove-btn" data-id="${item.id}">Remove</button></div>
    `;

    cartItemsDiv.appendChild(itemDiv);
  });

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartSummaryDiv.textContent = `Total: ₹${total}`;

  checkoutBtn.style.display = 'inline-block';

  // Add event listeners for quantity inputs
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', e => {
      const id = e.target.getAttribute('data-id');
      const newQuantity = parseInt(e.target.value);

      if (newQuantity < 1) {
        removeFromCart(id);
        return;
      }

      updateCartQuantity(id, newQuantity);
    });
  });

  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', e => {
      const id = e.target.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}

// Update quantity in cart
function updateCartQuantity(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Load cart when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    displayCart();
});
