// 타임 세일 마감까지의 시간 표시
const saleEndDate = new Date('2024-03-29T23:59:59'); // 타임 세일 종료일 설정
const timeRemainingElement = document.getElementById('timeRemaining');
function updateRemainingTime() {
    const now = new Date();
    const timeDiff = saleEndDate - now;

    if (timeDiff <= 0) {
        timeRemainingElement.textContent = "타임 세일 종료";
    } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        timeRemainingElement.textContent = `남은 시간: ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
    }
}
updateRemainingTime();
setInterval(updateRemainingTime, 1000); // 1초마다 남은 시간 업데이트

let allProduct = JSON.parse(localStorage.getItem('allProduct'));

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
        let currentProduct = product.product_name;
        productName.textContent = currentProduct;

        var productPrice = document.createElement('p');
        productPrice.className = 'product_info';

        // 할인된 가격이 있으면 원래 가격과 할인 가격을 함께 표시합니다.
        if (product.discount_price !== undefined) {
            var originalPrice = document.createElement('span');
            originalPrice.textContent = product.price;
            originalPrice.style.textDecoration = 'line-through';

            productPrice.appendChild(originalPrice);

            var discountPrice = document.createElement('span');
            discountPrice.textContent = product.discount_price;
            discountPrice.style.color = 'red';
            discountPrice.style.fontSize = '1.2em'; // 할인된 가격의 글꼴 크기를 강조
            discountPrice.style.fontWeight = 'bold'; // 할인된 가격의 글꼴 굵기를 강조

            productPrice.appendChild(document.createTextNode(' ')); // 가격 사이에 공백 추가
            productPrice.appendChild(discountPrice);
        } else {
            // 할인된 가격이 없으면 원래 가격만 표시합니다.
            productPrice.textContent = product.price;
        }

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