document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-container');
    let products; // Declare products in the global scope

    // Fetch product data from your server or an API
    fetch('products.json') 
        .then(response => response.json())
        .then(data => {
            products = data; // Assign data to the global variable
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });

    // Function to filter products based on category
    function filterItems(category) {
        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }

    // Function to display products in the product-container
    function displayProducts(products) {
        productContainer.innerHTML = ''; // Clear existing products

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productImg = document.createElement('img');
            productImg.src = product.image;
            productCard.appendChild(productImg);

            const productInfo = document.createElement('div');
            productInfo.classList.add('product-info');

            // Update the HTML structure for price
            productInfo.innerHTML = `
                <p>${product.name}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            `;

            productCard.appendChild(productInfo);

            productContainer.appendChild(productCard);
        });
    }

    // Event listener for category filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.dataset.category;
            filterItems(category);
        });
    });
});
