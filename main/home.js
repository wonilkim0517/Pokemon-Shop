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
        let currentProduct = product.product_name
        productName.textContent = currentProduct;

        var productPrice = document.createElement('p');
        productPrice.className = 'product_info';
        productPrice.textContent = product.price;


        // 나중에 검색을 위해 제품 이름을 저장하는 속성을 추가합니다.
        productLink.setAttribute('data-product-name', currentProduct);

        // 클릭 이벤트 리스너를 추가하여 클릭 시 선택한 제품을 로그로 남깁니다.
        productLink.addEventListener('click', function () {
            let selectedProductName = this.getAttribute('data-product-name');
            let selectProduct = allProduct.find(product => product.product_name === selectedProductName);

            // 선택한 제품 정보를 콘솔에 로그로 출력합니다.
            console.log('선택한 제품:', selectProduct);

            // 나중에 사용을 위해 선택한 제품을 로컬 스토리지에 저장합니다.
            localStorage.setItem('selectedProduct', JSON.stringify(selectProduct));
        });
        productLink.appendChild(productImage);
        productLink.appendChild(document.createElement('br'));
        productLink.appendChild(productName);
        productContainer.appendChild(productLink);

        productLink.appendChild(productPrice);

    });
}

window.onload = addProducts;
