document.addEventListener('DOMContentLoaded', function () {
    const productTable = document.getElementById('productTable');
  
    // Fetch and display products
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        data.forEach(product => {
          const row = document.createElement('tr');
  
          row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
          `;
  
          productTable.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  
    // Delete product function
  });
  
  function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      fetch(`/api/products/${id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            alert('Product deleted successfully');
            window.location.reload(); // Reload the page to update the list
          } else {
            alert('Error deleting product');
          }
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  }
  