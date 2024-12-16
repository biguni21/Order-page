const prices = {
    Paracetamol: 350.00,
    Ibuprofen: 200.00,
    Aspirin: 400.00,
    Naproxen: 100.00,
    Codeine: 500.00,
    Morphine: 300.00,
    Amoxicillin: 200.00,
    Penicillin: 300.00,
    Ciprofloxacin: 400.00,
    Azithromycin: 500.00,
    Doxycycline: 600.00,
    Clindamycin: 150.00,
    Fluoxetine: 250.00,
    Sertraline: 200.00,
    Citalopram: 150.00,
    Escitalopram: 100.00,
    Venlafaxine: 200.00,
    Duloxetine: 200.00,
    Benadry: 155.00,
    Loratadine: 170.00,
    Cetirizine: 300.00,
    Fexofenadine: 250.00,
    Chlorpheniramine: 480.00,
    Desloratadine: 480.00,
    Lisinopril: 250.00,
    Amlodipine: 200.00,
    Losartan: 200.00,
    Metoprolol: 200.00,
    Hydrochlorothiazide: 100.00,
    Enalapril: 150.00
};

function addItemToOrder(itemId, quantity) {
    if (quantity <= 0) {
        alert('Need more than 0');
        return;
    }

    const tableBody = document.querySelector('#order-table tbody');
    let existingRow = null;

    Array.from(tableBody.rows).forEach(row => {
        if (row.cells[0].textContent === itemId) {
            existingRow = row;
        }
    });

    if (existingRow) {
        const newQuantity = parseFloat(existingRow.cells[1].textContent) + parseFloat(quantity);
        existingRow.cells[1].textContent = newQuantity;
        existingRow.cells[2].textContent = (newQuantity * prices[itemId]).toFixed(2);
    } else {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = itemId;
        row.insertCell(1).textContent = quantity;
        row.insertCell(2).textContent = (quantity * prices[itemId]).toFixed(2);

        // Create and add remove button
        const removeCell = row.insertCell(3);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeCell.appendChild(removeButton);
        removeButton.addEventListener('click', () => {
            row.remove();
            updateTotalPrice();
        });
    }

    updateTotalPrice();
    alert(`You added ${quantity} of ${itemId}`);
}

function updateTotalPrice() {
    const tableBody = document.querySelector('#order-table tbody');
    let totalPrice = 0;

    Array.from(tableBody.rows).forEach(row => {
        totalPrice += parseFloat(row.cells[2].textContent);
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-item');
        const quantity = parseFloat(document.getElementById(itemId).value);
        if (isNaN(quantity) || quantity === 0) {
            alert('Enter a valid amount');
        } else if (quantity > 0) {
            addItemToOrder(itemId, quantity);
        }
    });
});

document.getElementById('add-to-favourites').addEventListener('click', () => {
    const formData = new FormData(document.getElementById('grocery-form'));
    const favouriteItems = {};

    formData.forEach((value, key) => {
        if (parseFloat(value) > 0) {
            favouriteItems[key] = value;
        }
    });

    localStorage.setItem('favouriteOrder', JSON.stringify(favouriteItems));
    alert('Selling items added to the favourite');
});

document.getElementById('apply-favourites').addEventListener('click', () => {
    const favouriteItems = JSON.parse(localStorage.getItem('favouriteOrder'));

    if (favouriteItems) {
        for (const [key, value] of Object.entries(favouriteItems)) {
            document.getElementById(key).value = value;
            addItemToOrder(key, value);
        }
    }
});

document.getElementById('clear-favourites').addEventListener('click', () => {
    localStorage.removeItem('favouriteOrder');
    alert('Favourite order cleared!');
});

document.getElementById('buy-now').addEventListener('click', () => {
    const tableBody = document.querySelector('#order-table tbody');
    if (tableBody.rows.length > 0) {
        const orderItems = [];

        Array.from(tableBody.rows).forEach(row => {
            orderItems.push({
                item: row.cells[0].textContent,
                quantity: row.cells[1].textContent,
                price: row.cells[2].textContent
            });
        });

        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        window.location.href = '../html/summary.html';
    } else {
        alert('Please add items to your order before proceeding.');
    }
});
