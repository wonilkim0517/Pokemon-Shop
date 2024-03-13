import data from '../data/data.js';

document.addEventListener("DOMContentLoaded", async function () {
    const productsContainer = document.querySelector('.products');

    // 서버로부터 상품 데이터를 가져오는 함수
    async function fetchProductData() {
        try {
            return data.productData; // productData를 반환
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 에러 발생:', error);
            return []; // 오류 발생 시 빈 배열 반환
        }
    }

    // 대체 이미지 URL
    const defaultImgUrl = '../data/defaultImg_pikachu.jpg';

    // 상품 데이터를 받아와서 화면에 표시하는 함수
    async function displayProducts() {
        const products = await fetchProductData(); // 상품 데이터 가져오기

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            const imageElement = document.createElement('img');
            imageElement.src = product.image || defaultImgUrl; // 이미지가 없는 경우 대체 이미지 사용
            imageElement.alt = product.product_name;
            productElement.appendChild(imageElement);

            const nameElement = document.createElement('p');
            nameElement.textContent = product.product_name;
            nameElement.classList.add('product_info');
            productElement.appendChild(nameElement);

            const priceElement = document.createElement('p');
            priceElement.textContent = `가격: ${product.price}원`;
            priceElement.classList.add('product_info');
            productElement.appendChild(priceElement);

            productsContainer.appendChild(productElement);
        });
    }

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

    // 상품 표시 함수 호출
    displayProducts();
});
