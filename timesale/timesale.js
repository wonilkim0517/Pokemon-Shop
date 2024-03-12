document.addEventListener("DOMContentLoaded", function () {
    // 상품 데이터
    const products = [
        { name: "상품1", price: "10000원", image: "../product/product-img/pokemon_one_flower_01.png" },
        { name: "상품2", price: "20000원", image: "../product/product-img/pokemon_one_flower_02.png" },
        { name: "상품3", price: "30000원", image: "../product/product-img/pokemon_one_flower_03.png" },
        // 나머지 상품 데이터도 추가
    ];

    // 상품 목록을 동적으로 생성하여 추가
    const productsContainer = document.querySelector('.products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        imageElement.alt = product.name;
        productElement.appendChild(imageElement);

        const nameElement = document.createElement('p');
        nameElement.textContent = product.name;
        nameElement.classList.add('product_info');
        productElement.appendChild(nameElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = product.price;
        priceElement.classList.add('product_info');
        productElement.appendChild(priceElement);

        productsContainer.appendChild(productElement);
    });

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
});
