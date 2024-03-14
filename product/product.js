let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
let selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
let cartData = JSON.parse(localStorage.getItem('cartKey'));

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('product_title').innerText = selectedProduct.product_name;

    // 할인 기간 내에 있는지 확인
    if (selectedProduct.start_time && selectedProduct.end_time) {
        var discountStart = new Date(selectedProduct.start_time);
        var discountEnd = new Date(selectedProduct.end_time);
        var currentDate = new Date(); // 현재 시간 가져오기

        if (currentDate >= discountStart && currentDate <= discountEnd) {
            // 할인된 가격이 있는 경우에만 해당 가격을 표시합니다.
            const productPrice = document.getElementById('price');
            if (selectedProduct.discount_price !== undefined) {
                const originalPrice = document.createElement('p');
                originalPrice.textContent = `${selectedProduct.price.toLocaleString()}원 `;
                originalPrice.style.textDecoration = 'line-through';

                productPrice.appendChild(originalPrice);

                const discountPrice = document.createElement('p');
                discountPrice.textContent = `할인가: ${selectedProduct.discount_price.toLocaleString()}원`;
                discountPrice.style.color = 'red';
                discountPrice.style.fontSize = '1.2em'; // 할인된 가격의 글꼴 크기를 강조
                discountPrice.style.fontWeight = 'bold'; // 할인된 가격의 글꼴 굵기를 강조

                productPrice.appendChild(discountPrice);
            } else {
                // 할인 가격이 설정되지 않은 경우에는 원래 가격만 표시합니다.
                productPrice.textContent = `가격: ${selectedProduct.price.toLocaleString()}원`;
            }
        } else {
            // 할인 기간이 지난 경우에는 원래 가격만 표시합니다.
            document.getElementById('price').textContent = `가격: ${selectedProduct.price.toLocaleString()}원`;
        }
    } else {
        // 할인 기간이 설정되지 않은 경우에는 원래 가격만 표시합니다.
        document.getElementById('price').textContent = `가격: ${selectedProduct.price.toLocaleString()}원`;
    }

    document.getElementById('product_id').innerText = selectedProduct.id;
    document.getElementById("final_price").textContent = selectedProduct.discount_price !== undefined ? selectedProduct.discount_price.toLocaleString() + "원" : (selectedProduct.price.toLocaleString() + "원");

    // 이미지 요소 설정
    const mainImage = document.getElementById('default_img');
    if (selectedProduct && selectedProduct.image) {
        mainImage.src = "../main/" + selectedProduct.image;

        // 추가 이미지 설정
        for (let i = 0; i < 11; i++) {
            const imageId = 'image' + i;
            const imageDetailId = 'image_detail' + i;
            const newSrc = (i < 9 ? '0' : '') + (i + 1) + '.png';
            const imgElement = document.getElementById(imageId);
            const detailImgElement = document.getElementById(imageDetailId);
            if (imgElement) {
                const newImageUrl = "../main/" + selectedProduct.image.replace(/\d+\.png/, newSrc);
                imgElement.onerror = function () {
                    console.log("이미지 로드 실패:", this.src);
                    this.src = '../data/fail_Img.png'; // 대체 이미지로 설정
                };
                imgElement.src = newImageUrl;
            }
            if (detailImgElement) {
                const newImageUrl2 = "../main/" + selectedProduct.image.replace(/\d+\.png/, newSrc);
                detailImgElement.onerror = function () {
                    console.log("이미지 로드 실패:", this.src);
                    this.src = '../data/fail_Img.png'; // 대체 이미지로 설정
                };
                detailImgElement.src = newImageUrl2;
            }
        }
    } else {
        // 이미지가 없는 경우 대체 이미지를 보여줍니다.
        mainImage.src = '../data/fail_Img.png';
    }
});

// - 누르면 수량 감소
document.querySelector('.minus').addEventListener('click', function (event) {
    event.preventDefault(); // 링크 페이지 이동 방지

    let resultElement = document.getElementById('result');
    let result = parseInt(resultElement.textContent);

    if (result > 1) {
        result--;
        resultElement.textContent = result;
        updatePrice();
    }
});

function updatePrice() {
    let quantity = parseInt(document.getElementById("result").textContent);
    let price = selectedProduct.discount_price !== undefined ? selectedProduct.discount_price : selectedProduct.price;
    let totalPrice = quantity * price;
    document.getElementById("final_price").textContent = totalPrice.toLocaleString() + "원";

    // 결제 금액을 로컬 스토리지에 저장
    localStorage.setItem('selectedProductPrice', totalPrice);
}

// + 누르면 수량 증가
document.querySelector('.plus').addEventListener('click', function (event) {
    event.preventDefault(); // 링크의 기본 동작 방지

    let resultElement = document.getElementById('result');
    let result = parseInt(resultElement.textContent);

    result++;
    resultElement.textContent = result;
    updatePrice();
});

function updatePrice() {
    let quantity = parseInt(document.getElementById("result").textContent);
    let price = selectedProduct.discount_price !== undefined ? selectedProduct.discount_price : selectedProduct.price;
    let totalPrice = quantity * price;
    document.getElementById("final_price").textContent = totalPrice.toLocaleString() + "원";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("default_img").classList.add("selected");
});

function changeMainImage(clickedImage, newSrc) {
    let mainImage = document.getElementById("main_img");
    let mainImageSrc = mainImage.src;

    let newMainImageSrc = mainImageSrc.replace(/\d+\.png/, newSrc + ".png");
    mainImage.src = newMainImageSrc;

    let allImages = document.querySelectorAll('.img_detail img');
    allImages.forEach(function (image) {
        image.classList.remove('selected');
    });

    clickedImage.classList.add('selected');
}

function addNewProductToCart() {
    if (!loggedInUser || !loggedInUser.id) {
        alert("로그인이 필요합니다")
        window.location.href = "../login/login-page.html";
        return;
    }

    let existingProductIndex = cartData.findIndex(item => item.user_id === loggedInUser.id && item.product_id === selectedProduct.id);

    if (existingProductIndex !== -1) {
        cartData[existingProductIndex].cart_quantity += parseInt(document.getElementById("result").textContent);
        localStorage.setItem('cartKey', JSON.stringify(cartData));
        console.log(cartData);
    } else {
        let productQuantity = parseInt(document.getElementById("result").textContent);
        let newProduct = {
            "id": cartData.length + 1,
            "user_id": loggedInUser.id,
            "product_id": selectedProduct.id,
            "cart_quantity": productQuantity,
            "is_ordered": 0
        };

        cartData.push(newProduct);
        localStorage.setItem('cartKey', JSON.stringify(cartData));
        console.log(cartData);
        alert("장바구니에 추가되었습니다.")
        window.location.href = "../cart/cart.html"
    }
}
