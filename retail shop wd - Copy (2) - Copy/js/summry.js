document.addEventListener('DOMContentLoaded', () => {
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    const tableBody = document.querySelector('#order-summary-table tbody');
    let totalPrice = 0;

    orderItems.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.item;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = item.price;
        totalPrice += parseFloat(item.price);
    });

    document.getElementById('summary-total-price').textContent = totalPrice.toFixed(2);

    document.getElementById('pay-button').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (name && address && email && phone && date && cardNumber && expiryDate && cvv) {
            const thankYouMessage = document.getElementById('thank-you-message');
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 3); // Assuming delivery in 3 days

            document.getElementById('delivery-date').textContent = new Date(date).toDateString();
            document.getElementById('summary-name').textContent = name;
            document.getElementById('summary-address').textContent = address;
            document.getElementById('summary-email').textContent = email;
            document.getElementById('summary-phone').textContent = phone;
            document.getElementById('summary-preferred-date').textContent = new Date(date).toDateString();

            thankYouMessage.style.display = 'block';

            // Hide the form and summary table after payment
            document.getElementById('details-form').style.display = 'none';
            document.getElementById('order-summary-table').style.display = 'none';
        } else {
            alert('Please fill in all the fields.');
        }
    });
});
