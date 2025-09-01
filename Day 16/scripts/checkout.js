// checkout.js - payment processing logic

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
  loadCartSummary();
  setupPaymentForm();
});

// Load cart summary for confirmation
function loadCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('cart-summary').textContent = `Total Amount: ₹${total}`;
}

// Setup payment form validation
function setupPaymentForm() {
  const form = document.getElementById('payment-form');
  form.addEventListener('submit', processPayment);
}

// Process payment (simulated)
function processPayment(e) {
  e.preventDefault();
  
  // Get form values
  const cardNumber = document.getElementById('card-number').value;
  const expiry = document.getElementById('expiry').value;
  const cvv = document.getElementById('cvv').value;
  const name = document.getElementById('name').value;

  // Basic validation
  if (!validateCardNumber(cardNumber)) {
    alert('Please enter a valid card number');
    return;
  }

  if (!validateExpiry(expiry)) {
    alert('Please enter a valid expiry date (MM/YY)');
    return;
  }

  if (!validateCVV(cvv)) {
    alert('Please enter a valid CVV');
    return;
  }

  if (!name.trim()) {
    alert('Please enter name on card');
    return;
  }

  // Simulate payment processing
  const submitBtn = document.getElementById('submit');
  const messageDiv = document.getElementById('payment-message');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';
  
  setTimeout(() => {
    // Simulate successful payment
    messageDiv.textContent = 'Payment successful! Your order has been placed.';
    messageDiv.className = '';
    messageDiv.style.color = 'green';
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    
    // Redirect to success page after 2 seconds
    setTimeout(() => {
      alert('Order placed successfully! Thank you for your purchase.');
      window.location.href = '../pages/products.html';
    }, 2000);
    
  }, 2000);
}

// Validation functions
function validateCardNumber(cardNumber) {
  return /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
}

function validateExpiry(expiry) {
  return /^\d{2}\/\d{2}$/.test(expiry);
}

function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}