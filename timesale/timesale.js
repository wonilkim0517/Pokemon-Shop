const saleStartTime = new Date("2024-03-11T00:00:00"); // 타임세일 시작 시간
const saleEndTime = new Date("2024-03-11T23:59:59");   // 타임세일 종료 시간

function isSaleActive() {
    const currentTime = new Date();
    return currentTime >= saleStartTime && currentTime <= saleEndTime;
}

function applyTimeSale() {
    const products = document.querySelectorAll('.product');
    const discountPercent = 20; // 할인율 설정

    products.forEach(product => {
        const productId = parseInt(product.getAttribute('data-product-id'));
        const productInfo = productData.find(item => item.id === productId);

        if (isSaleActive()) {
            const discountedPrice = productInfo.price * (1 - discountPercent / 100);
            product.querySelector('.product_info').innerHTML = `가격: <del>${productInfo.price}원</del> ${discountedPrice}원`;
        } else {
            product.querySelector('.product_info').innerHTML = `가격: ${productInfo.price}원`;
        }
    });
}

applyTimeSale(); // 페이지 로딩 시 타임세일 적용

// 이후에 필요에 따라 타임세일을 주기적으로 업데이트하거나 사용자 액션에 응답하는 등의 로직을 추가할 수 있습니다.
});
</script>