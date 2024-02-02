document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-container');
    let productsData; // Variable to store fetched product data
  
    // Fetch product data from the JSON file
    fetch('products.json')
      .then(response => response.json())
      .then(products => {
        productsData = products; // Store fetched data
        displayProducts(products);
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
  
        const productOverlay = document.createElement('div');
        productOverlay.classList.add('product-overlay');
        productOverlay.innerHTML = `<p>${product.description}</p><p>${product.price}</p>`;
        productCard.appendChild(productOverlay);
  
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
  