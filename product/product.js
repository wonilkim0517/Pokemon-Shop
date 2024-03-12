// - 누르면 수량 감소
document.querySelector('.minus').addEventListener('click', function(event) {
    event.preventDefault(); // 링크 페이지 이동 방지

    // 현재 결과 값 가져오기
    let resultElement = document.getElementById('result');
    let result = parseInt(resultElement.textContent);

    // 결과 값이 1보다 클 때만 감소
    if (result > 1) {
        result--;
        resultElement.textContent = result;
        updatePrice();
    }
});

// + 누르면 수량 증가
document.querySelector('.plus').addEventListener('click', function(event) {
    event.preventDefault(); // 링크의 기본 동작 방지

    // 현재 결과 값 가져오기
    let resultElement = document.getElementById('result');
    let result = parseInt(resultElement.textContent);

    // 결과 값 증가
    result++;
    resultElement.textContent = result;
    updatePrice();
});

function updatePrice() {
    let quantity = parseInt(document.getElementById("result").textContent);
    let priceText = document.getElementById("price").textContent;
    let price = parseInt(priceText.replace("원", "").trim());
    let totalPrice = quantity * price;
    document.getElementById("final_price").textContent = totalPrice.toLocaleString() + "원";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("default_img").classList.add("selected");
});

function changeMainImage(clickedImage, newSrc) {
    let mainImage = document.getElementById("main_img");
    mainImage.src = newSrc;

    let allImages = document.querySelectorAll('.img_detail img');
    allImages.forEach(function(image) {
        image.classList.remove('selected');
    });

    clickedImage.classList.add('selected');
}