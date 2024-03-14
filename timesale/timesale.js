document.addEventListener("DOMContentLoaded", async function () {
    const productsContainer = document.querySelector('.products');

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

    // 서버로부터 상품 데이터를 가져오는 함수
    async function fetchProductData() {
        try {
            const allProducts = JSON.parse(localStorage.getItem('allProduct'));
            return allProducts || []; // 로컬 스토리지에 상품 데이터가 없을 경우 빈 배열 반환
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 에러 발생:', error);
            return []; // 오류 발생 시 빈 배열 반환
        }
    }

    // 대체 이미지 URL
    const defaultImgUrl = '../data/fail_Img.png';
    const failImgUrl = '../data/fail_Img.png';

    // 상품 데이터를 받아와서 화면에 표시하는 함수
    async function displayProducts() {
        const products = await fetchProductData(); // 상품 데이터 가져오기

        products.forEach(product => {
            // 타임세일 기간인 상품만 표시
            if (product.start_time && product.end_time) {
                const discountStart = new Date(product.start_time);
                const discountEnd = new Date(product.end_time);
                const currentDate = new Date(); // 현재 시간 가져오기

                if (currentDate >= discountStart && currentDate <= discountEnd) {
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

                    const productPrice = document.createElement('p');
                    productPrice.classList.add('product_info');

                    // 할인된 가격이 있는 경우에만 해당 가격을 표시합니다.
                    if (product.discount_price !== undefined) {
                        const originalPrice = document.createElement('p');
                        originalPrice.textContent = `${product.price}원 `;
                        originalPrice.style.textDecoration = 'line-through';

                        productPrice.appendChild(originalPrice);

                        const discountPrice = document.createElement('p');
                        discountPrice.textContent = `할인가: ${product.discount_price}원`;
                        discountPrice.style.color = 'red';
                        discountPrice.style.fontSize = '1.2em'; // 할인된 가격의 글꼴 크기를 강조
                        discountPrice.style.fontWeight = 'bold'; // 할인된 가격의 글꼴 굵기를 강조

                        productPrice.appendChild(discountPrice);
                    } else {
                        // 할인 가격이 설정되지 않은 경우에는 원래 가격만 표시합니다.
                        productPrice.textContent = `가격: ${product.price}원`;
                    }

                    productElement.appendChild(productPrice);

                    // 상품 클릭 시 상세 페이지로 이동하는 이벤트 리스너 추가
                    productElement.addEventListener('click', function() {
                        // 상세 페이지 URL 생성
                        const productDetailUrl = `../product/product.html?id=${product.id}`;

                        // 현재 페이지를 해당 상세 페이지로 이동
                        window.location.href = productDetailUrl;
                    });

                    productsContainer.appendChild(productElement);
                }
            }
        });
    }

    // 상품 표시 함수 호출
    displayProducts();
});
