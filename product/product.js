
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
let selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
let cartData = JSON.parse(localStorage.getItem('cartKey'))

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('product_title').innerText = selectedProduct.product_name;
    document.getElementById('price').innerText = selectedProduct.price;
    document.getElementById('product_id').innerText = selectedProduct.id;
    // document.getElementById('final_price').innerText = totalPrice
    document.getElementById("final_price").textContent = selectedProduct.price + "원";
    // document.getElementById("default_img").src = selectedProduct.image;
});

document.addEventListener("DOMContentLoaded", function() {
    // 로컬 스토리지에서 selectedProduct 가져오기
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // 이미지 요소 찾기
    const mainImage = document.getElementById('default_img');

    // selectedProduct가 존재하고 이미지 주소가 있는 경우에만 설정
    if (selectedProduct && selectedProduct.image) {
        // 이미지의 src 속성을 selectedProduct의 이미지 주소로 설정
        document.getElementById('main_img').src = "../main/" + selectedProduct.image;
        document.getElementById('default_img').src = "../main/" + selectedProduct.image;

        for (var i = 0; i < 11; i++) {
            var imageId = 'image' + i;
            var imageDetailId = 'image_detail' + i;
            var newSrc = (i < 9 ? '0' : '') + (i + 1) + '.png';
            var imgElement = document.getElementById(imageId);
            var detailImgElement = document.getElementById(imageDetailId);
            if (imgElement) {
                var newImageUrl = "../main/" + selectedProduct.image.replace(/\d+\.png/, newSrc);
                imgElement.onload = function() {
                    console.log("이미지 로드 성공:", this.src);
                };
                imgElement.onerror = function() {
                    console.log("이미지 로드 실패:", this.src);
                    this.style.display = "none"; // 이미지를 숨깁니다.
                };
                imgElement.src = newImageUrl;
            }
            if (detailImgElement) {
                var newImageUrl2 = "../main/" + selectedProduct.image.replace(/\d+\.png/, newSrc);
                detailImgElement.onload = function() {
                    console.log("이미지 로드 성공:", this.src);
                };
                detailImgElement.onerror = function() {
                    console.log("이미지 로드 실패:", this.src);
                    this.style.display = "none"; // 이미지를 숨깁니다.
                };
                detailImgElement.src = newImageUrl2;
            }
        }
    }
    // 나머지 초기화 또는 다른 작업 수행 가능
});




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
    // let priceText = document.getElementById("price").textContent;
    let price = selectedProduct.price;
    let totalPrice = quantity * price;
    document.getElementById("final_price").textContent = totalPrice.toLocaleString() + "원";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("default_img").classList.add("selected");
});

function changeMainImage(clickedImage, newSrc) {
    let mainImage = document.getElementById("main_img");
    let mainImageSrc = mainImage.src;

    // 메인 이미지의 숫자 부분을 클릭한 이미지의 숫자 부분으로 교체
    let newMainImageSrc = mainImageSrc.replace(/\d+\.png/, newSrc + ".png");
    mainImage.src = newMainImageSrc;

    // 모든 이미지의 선택 클래스를 제거
    let allImages = document.querySelectorAll('.img_detail img');
    allImages.forEach(function(image) {
        image.classList.remove('selected');
    });

    // 클릭한 이미지에 선택 클래스 추가
    clickedImage.classList.add('selected');
}

console.log(loggedInUser.id);
console.log(cartData.user_id)
console.log(selectedProduct.id)
console.log(cartData.product_id)

function addNewProductToCart() {
    // 로그인 확인
    if (!loggedInUser || !loggedInUser.id) {
        alert("로그인이 필요합니다")
        window.location.href = "../login/login-page.html";
        return;
    }
    // 이미 있는 상품인지 확인
    let existingProductIndex = cartData.findIndex(item => item.user_id === loggedInUser.id && item.product_id === selectedProduct.id);

    if (existingProductIndex !== -1) {
        // 이미 있는 상품이면 해당 상품의 cart_quantity를 증가시킴
        cartData[existingProductIndex].cart_quantity += parseInt(document.getElementById("result").textContent);
        localStorage.setItem('cartKey', JSON.stringify(cartData));
        console.log(cartData);
    } else {
        // 존재하지 않는 상품이면 새로운 상품을 추가
        let productQuantity = parseInt(document.getElementById("result").textContent);
        // 예시: 새로운 상품 추가
        let newProduct = {
            "id": cartData.length + 1, // 새로운 상품의 고유 식별자
            "user_id": loggedInUser.id, // 사용자 ID
            "product_id": selectedProduct.id, // 상품 ID
            "cart_quantity": productQuantity, // 장바구니에 담은 상품 수량
            "is_ordered": 0 // 주문 여부 (0: 주문 전)
        };

        cartData.push(newProduct);
        localStorage.setItem('cartKey', JSON.stringify(cartData));
        console.log(cartData);
        alert("장바구니에 추가되었습니다.")
        window.location.href = "../cart/cart.html"
    }
}
// addNewProductToCart(cartData);


