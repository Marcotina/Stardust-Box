document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-container');
  
    // Fetch product data from your server or an API
    fetch('products.json') // Replace 'path/to/your/products.json' with the actual path to your JSON file
      .then(response => response.json())
      .then(products => {
        // Display the products
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
  
        const productPrice = document.createElement('p');
        productPrice.classList.add('price');
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productCard.appendChild(productPrice);
  
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
        productInfo.innerHTML = `
          <p class="category">Category: ${product.category}</p>
          <p class="dimensions">Dimensions: ${product.dimensions}</p>
          <p class="description">${product.description}</p>
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
  