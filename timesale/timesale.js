document.addEventListener("DOMContentLoaded", async function () {
    const productsContainer = document.querySelector('.products');

    // 서버로부터 상품 데이터를 가져오는 함수
    async function fetchProductData() {
        try {
            const allProducts = JSON.parse(localStorage.getItem('allProduct'));
            return allProducts || data.productData; // 로컬 스토리지에 상품 데이터가 없을 경우 기본 데이터 반환
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 에러 발생:', error);
            return []; // 오류 발생 시 빈 배열 반환
        }
    }

    // 대체 이미지 URL
    const defaultImgUrl = '../data/defaultImg_pikachu.jpg';
    const failImgUrl = '../data/fail_Img.png';

    // 상품 데이터를 받아와서 화면에 표시하는 함수
    async function displayProducts() {
        const products = await fetchProductData(); // 상품 데이터 가져오기

        products.forEach(product => {
            // 할인 가격이 입력된 상품만 타임세일 상품에 표시
            if (product.discount_price) {
                const productElement = document.createElement('div');
                productElement.classList.add('product');

                const imageElement = document.createElement('img');
                // 이미지가 없을 때 또는 이미지 경로가 잘못된 경우 대체 이미지 사용
                imageElement.src = product.image ? product.image : defaultImgUrl;
                imageElement.onerror = function() {
                    this.src = failImgUrl;
                }
                imageElement.alt = product.product_name;
                productElement.appendChild(imageElement);

                const nameElement = document.createElement('p');
                nameElement.textContent = product.product_name;
                nameElement.classList.add('product_info');
                productElement.appendChild(nameElement);

                const originalPrice = document.createElement('p');
                // 할인 가격이 있는 경우 할인된 가격 표시
                originalPrice.textContent = `${product.price}원`;
                originalPrice.classList.add('product_info');
                productElement.appendChild(originalPrice);

                const discountPrice = document.createElement('p');
                // 할인 가격이 있는 경우 할인된 가격 표시
                discountPrice.textContent = `${product.discount_price}원`;
                discountPrice.classList.add('product_info');
                originalPrice.style.textDecoration = 'line-through';
                productElement.appendChild(discountPrice);
                discountPrice.style.color = 'red';
                discountPrice.style.fontSize = '1.2em'; // 할인된 가격의 글꼴 크기를 강조
                discountPrice.style.fontWeight = 'bold'; // 할인된 가격의 글꼴 굵기를 강조

                // 상품 클릭 시 상세 페이지로 이동하는 이벤트 리스너 추가
                productElement.addEventListener('click', function() {
                    // 상세 페이지 URL 생성
                    const productDetailUrl = `../product/product.html?id=${product.id}`;

                    // 현재 페이지를 해당 상세 페이지로 이동
                    window.location.href = productDetailUrl;
                });

                productsContainer.appendChild(productElement);
            }
        });
    }

    // 상품 표시 함수 호출
    displayProducts();
});
