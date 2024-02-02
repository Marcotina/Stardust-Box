document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-container');
    let productsData = []; // Declare a variable to store the product data
  
    // Fetch product data from your server or an API
    fetch('products.json')
      .then(response => response.json())
      .then(products => {
        // Store the product data in the variable
        productsData = products;
  
        // Display the initial products
        displayProducts(productsData);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  
    // Function to filter products based on category
    function filterItems(category) {
      const filteredProducts = category === 'all' ? productsData : productsData.filter(product => product.category === category);
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
        productInfo.innerHTML = `<p>${product.name}</p><p>$${product.price.toFixed(2)}</p>`;
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
  