let allProduct = JSON.parse(localStorage.getItem(('allProduct')));

function addProducts() {
    var productContainer = document.getElementById('productContainer');

    allProduct.forEach(function (product) {
        var productLink = document.createElement('a');
        productLink.href = '../product/product.html';

        var productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = '';
        productImage.className = 'product';

        var productName = document.createElement('p');
        productName.className = 'product_info';
        productName.textContent = product.product_name;

        var productPrice = document.createElement('p');
        productPrice.className = 'product_info';
        productPrice.textContent = product.price;

        productLink.appendChild(productImage);
        productLink.appendChild(document.createElement('br'));
        productLink.appendChild(productName);
        productLink.appendChild(productPrice);

        productContainer.appendChild(productLink);
    });
}

window.onload = addProducts;
