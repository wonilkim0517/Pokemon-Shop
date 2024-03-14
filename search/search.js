let allProduct = JSON.parse(localStorage.getItem(('allProduct')));

function addProducts() {
    // localStorage에서 검색어를 가져옵니다.
    var searchKeyword = localStorage.getItem('searchKeyword') || ''; // 검색어가 없으면 빈 문자열을 기본값으로 사용합니다.

    // 검색어가 없거나 빈 문자열인 경우, 화면에 아무 상품도 추가하지 않습니다.
    if (!searchKeyword || searchKeyword.trim() === '') {
        return;
    }

    // 검색어를 표시할 요소를 선택합니다.
    var searchWordElement = document.getElementById('search_word');

    // 검색어를 요소의 텍스트 내용으로 설정합니다.
    searchWordElement.textContent = '"' + searchKeyword + '" 검색 결과';

    var productContainer = document.getElementById('productContainer');

    // 제품명에 검색어가 포함된 상품들만 필터링합니다.
    var filteredProducts = allProduct.filter(function(product) {
        // 제품명에 검색어가 포함되어 있는 경우에만 반환합니다.
        return product.product_name.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    // 필터링된 상품들을 화면에 추가합니다.
    filteredProducts.forEach(function (product) {
        var productLink = document.createElement('a');
        productLink.href = '../product/product.html';

        var productImage = document.createElement('img');
        productImage.src = '/main/' + product.image; // 이미지가 있는 디렉토리의 경로로 수정
        productImage.alt = '';
        productImage.className = 'product';

        // 이미지 로드 실패 시 대체 이미지로 설정
        productImage.onerror = function () {
            this.src = '../data/fail_Img.png';
        };

        var productName = document.createElement('p');
        productName.className = 'product_info';
        productName.textContent = product.product_name;

        var productPrice = document.createElement('p');
        productPrice.className = 'product_info';

        // 할인 가격이 있는 경우 할인 가격을 표시하고, 그렇지 않은 경우 원래 가격을 표시합니다.
        if (product.discount_price !== undefined) {
            const originalPrice = document.createElement('p');
            originalPrice.textContent = `${product.price.toLocaleString()}원 `;
            originalPrice.style.textDecoration = 'line-through';

            productPrice.appendChild(originalPrice);

            const discountPrice = document.createElement('p');
            discountPrice.textContent = `할인가: ${product.discount_price.toLocaleString()}원`;
            discountPrice.style.color = 'red';
            discountPrice.style.fontSize = '1.2em'; // 할인된 가격의 글꼴 크기를 강조
            discountPrice.style.fontWeight = 'bold'; // 할인된 가격의 글꼴 굵기를 강조

            productPrice.appendChild(discountPrice);
        } else {
            productPrice.textContent = `가격: ${product.price.toLocaleString()}원`;
        }

        // 클릭 이벤트 리스너를 추가하여 클릭 시 선택한 제품을 로그로 남깁니다.
        productLink.addEventListener('click', function () {
            let selectedProductName = product.product_name;
            let selectProduct = allProduct.find(product => product.product_name === selectedProductName);

            // 나중에 사용을 위해 선택한 제품을 로컬 스토리지에 저장합니다.
            localStorage.setItem('selectedProduct', JSON.stringify(selectProduct));
        });

        productLink.appendChild(productImage);
        productLink.appendChild(document.createElement('br'));
        productLink.appendChild(productName);
        productLink.appendChild(productPrice);

        productContainer.appendChild(productLink);
    });
}

window.onload = addProducts;
