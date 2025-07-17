fetch(`https://fakestoreapi.com/products`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

//fetching products from the API and displaying them
let products = []
const container = document.querySelector('#products');
const input = document.querySelector('#search-input');
const sortTitle = document.querySelector('#sortTitle');
const sortPrice = document.querySelector('#sortPrice');
fetch(`https://fakestoreapi.com/products`)
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts(products);
  })

// Function to display products
function displayProducts(products) {
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded shadow w-60 text-center hover:shadow-lg hover:scale-105 transition-transform";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-contain mb-2 rounded" />
      <h2 class="text-sm font-semibold h-12 overflow-hidden">${product.title}</h2>
      <p class="text-grey-600 font-medium">₹${Math.round(85*product.price)}</p>
    `;

    container.appendChild(card);
  });
}

input.addEventListener('input', () => {
  filterAndSortProducts()
})

sortTitle, addEventListener('change', () => {
  filterAndSortProducts()
})

sortPrice.addEventListener('change', () => {
  filterAndSortProducts()
})

// Function to filter and sort products
function filterAndSortProducts() {
  let filteredProducts = [...products]
  const searchTerm = input.value.toLowerCase();
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
  }

  // Sorting by title
  const titleSort = sortTitle.value;
  if (titleSort === 'az') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    displayProducts(filteredProducts);
  } else if (titleSort === 'za') {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    displayProducts(filteredProducts);
  }

  // Sorting by price
  const priceSort = sortPrice.value;
  if (priceSort === 'low') {
    filteredProducts.sort((a, b) => a.price - b.price);
    displayProducts(filteredProducts);
  } else if (priceSort === 'high') {
    filteredProducts.sort((a, b) => b.price - a, price);
    displayProducts(filteredProducts);
  }
  if (filteredProducts.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-2xl">No products found</p>';
  }
}