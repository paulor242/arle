// Cart functionality
let cart = [];
        
// DOM elements
const cartToggle = document.getElementById('cart-toggle');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const apiResponse = document.getElementById('api-response');
const apiResponseContainer = document.getElementById('api-response-container');
const testCartApi = document.getElementById('test-cart-api');

// Toggle cart dropdown
cartToggle.addEventListener('click', () => {
    cartDropdown.classList.toggle('hidden');
});

// Close cart when clicking outside
document.addEventListener('click', (event) => {
    if (!cartToggle.contains(event.target) && !cartDropdown.contains(event.target)) {
        cartDropdown.classList.add('hidden');
    }
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);
        const image = e.target.dataset.image;
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }
        
        updateCart();
        cartDropdown.classList.remove('hidden');
    });
});

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items list
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
        checkoutBtn.classList.add('hidden');
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item flex items-center justify-between py-2 px-1 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                    <img src="${item.image}" alt="${item.name} product thumbnail" class="h-10 w-10 object-cover rounded">
                    <div>
                        <h4 class="text-sm font-medium text-gray-800">${item.name}</h4>
                        <p class="text-xs text-gray-500">$${item.price.toFixed(2)} × ${item.quantity}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <span class="text-sm font-semibold text-gray-800">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-from-cart ml-3 text-red-500 hover:text-red-700 text-xs" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
        
        checkoutBtn.classList.remove('hidden');
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.closest('button').dataset.id;
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector('#cart-total span:last-child').textContent = `$${total.toFixed(2)}`;
}

// API Simulation
function getCartApi() {
    return {
        success: true,
        timestamp: new Date().toISOString(),
        data: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
}

// API Test Button
testCartApi.addEventListener('click', () => {
    const response = getCartApi();
    apiResponse.textContent = JSON.stringify(response, null, 2);
    apiResponseContainer.classList.remove('hidden');
});

// Login functionality
const loginToggle = document.getElementById('login-toggle');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const loginForm = document.getElementById('login-form');

loginToggle.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
});

closeLogin.addEventListener('click', () => {
    loginModal.classList.add('hidden');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (email && password) {
        alert(`Login successful with email: ${email}`);
        loginModal.classList.add('hidden');
        loginToggle.textContent = `Hi, ${email.split('@')[0]}`;
        loginToggle.classList.remove('bg-white', 'text-green-700');
        loginToggle.classList.add('bg-green-800', 'text-white');
    } else {
        alert('Please enter both email and password');
    }
});

// Checkout button
checkoutBtn.addEventListener('click', () => {
    alert('Checkout functionality would be implemented here. Your total is $' + 
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
});