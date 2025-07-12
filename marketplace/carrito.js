let total = 0;
    let cart = {};
    let itemCount = 0;

    function addToCart(product, price) {
        total += price;
        if (cart[product]) {
            cart[product].quantity += 1;
        } else {
            cart[product] = { price: price, quantity: 1 };
        }
        itemCount++;
        document.getElementById('totalAmount').innerText = '$' + total + ' COP';
        document.getElementById('itemCount').innerText = itemCount;
    }

    function showCart() {
        let cartContent = '';
        for (let item in cart) {
            cartContent += `
                <div class="cart-item">
                    ${cart[item].quantity}x ${item} - $${cart[item].price} COP 
                    <button class="bto" onclick="removeFromCart('${item}')">×</button>
                </div>`;
        }
        cartContent += '<br> <b>Total a pagar:</b> $' + total + ' COP';
        document.getElementById('cartContent').innerHTML = cartContent;
        document.getElementById('myModal').style.display = "block";
    }

    function closeModal() {
        document.getElementById('myModal').style.display = "none";
    }

    function removeFromCart(product) {
        if (cart[product]) {
            total -= cart[product].price * cart[product].quantity;
            itemCount -= cart[product].quantity;
            delete cart[product];
            document.getElementById('totalAmount').innerText = '$' + total + ' COP';
            document.getElementById('itemCount').innerText = itemCount;
            showCart(); // Actualiza el contenido del carrito
        }
    }

    function acceptCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('total', total);
        window.location.href = 'pago.html'; // Cambia a la URL de tu página de pago
    }