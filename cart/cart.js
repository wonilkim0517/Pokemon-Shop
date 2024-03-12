function updateOrderDetailData(cartItem) {
    // 이미 있는 상품인지 확인
    let existingOrderDetailIndex = orderDetailData.findIndex(item => item.product_id === cartItem.product_id);

    if (existingOrderDetailIndex !== -1) {
        // 이미 있는 상품이면 해당 상품의 orderDetail_quantity를 증가시킴
        orderDetailData[existingOrderDetailIndex].orderDetail_quantity += cartItem.cart_quantity;
    } else {
        // 존재하지 않는 상품이면 새로운 상품을 추가
        let newOrderDetail = {
            "id": orderDetailData.length + 1,
            "order_id": cartItem.order_id,
            "product_id": cartItem.product_id,
            "orderDetail_quantity": cartItem.cart_quantity
        };

        orderDetailData.push(newOrderDetail);
    }
}

function addNewProductToCart(newProduct) {
    // 이미 있는 상품인지 확인
    let existingProductIndex = cartData.findIndex(item => item.product_id === newProduct.product_id);

    if (existingProductIndex !== -1) {
        // 이미 있는 상품이면 해당 상품의 cart_quantity를 증가시킴
        cartData[existingProductIndex].cart_quantity += newProduct.cart_quantity;

        // 주문 상세 데이터 업데이트
        updateOrderDetailData(cartData[existingProductIndex]);
    } else {
        // 존재하지 않는 상품이면 새로운 상품을 추가
        cartData.push(newProduct);

        // 주문 상세 데이터 업데이트
        updateOrderDetailData(newProduct);
    }
}

// 예시: 새로운 상품 추가
let newProduct1 = {
    "id": 1, // 새로운 상품의 고유 식별자
    "user_id": 2, // 사용자 ID
    "product_id": 102, // 상품 ID
    "cart_quantity": 11, // 장바구니에 담은 상품 수량
    "is_ordered": 0 // 주문 여부 (0: 주문 전)
};

// 새로운 상품을 장바구니에 추가
addNewProductToCart(newProduct1);

// 다른 상품 추가 예시
let newProduct2 = {
    "id": 2, // 새로운 상품의 고유 식별자
    "user_id": 2, // 사용자 ID
    "product_id": 103, // 상품 ID
    "cart_quantity": 15, // 장바구니에 담은 상품 수량
    "is_ordered": 0 // 주문 여부 (0: 주문 전)
};

// 새로운 상품을 장바구니에 추가
addNewProductToCart(newProduct2);

let newProduct3 = {
    "id": 2, // 새로운 상품의 고유 식별자
    "user_id": 2, // 사용자 ID
    "product_id": 101, // 상품 ID
    "cart_quantity": 7, // 장바구니에 담은 상품 수량
    "is_ordered": 0 // 주문 여부 (0: 주문 전)
};

// 새로운 상품을 장바구니에 추가
addNewProductToCart(newProduct3);

console.log(cartData);
console.log(orderDetailData)
document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // 세 번째 사용자 정보를 사용하겠다고 가정
    userAddress=loggedInUser.address;
    userId=loggedInUser.id;
    let totalOrderPrice = 0;
    let totalAmount = 0;

    // 주문 테이블을 동적으로 채우는 함수
    function addCartTable(cartTableClass, productName, quantity, price) {
        let table = document.querySelector('.' + cartTableClass);

        let newOrderRow = table.insertRow(table.rows.length);

        let cell1 = newOrderRow.insertCell(0);
        cell1.innerHTML = productName;

        let cell2 = newOrderRow.insertCell(1);
        cell2.innerHTML = quantity + "개";

        let cell3 = newOrderRow.insertCell(2);
        cell3.innerHTML = price + "원";

        totalOrderPrice += price;
        totalAmount += quantity;
    }

    // 주문 상품 테이블에 주문 정보 추가
    for (let i = 0; i < cartData.length; i++) {
        let cart = cartData[i];

        // 주문한 제품의 정보 찾기
        let product = productData.find(product => product.id === cart.product_id);

        // 주문 상품 테이블에 추가
        addCartTable("productBox", product.product_name, cart.cart_quantity, product.price * cart.cart_quantity);

        // 로컬 스토리지에 상품 정보 저장
        let cartKey = 'cartKey' + cart.id;
        localStorage.setItem(cartKey, JSON.stringify(product));
    }
    document.getElementById('cart_total_price').textContent = totalOrderPrice + "원";
    document.getElementById('cart_total_amount').textContent = totalAmount + "개";

    //사용자 주소
    function displayUserAddress() {
        // 배송지 요소에 사용자의 주소를 설정합니다.
        var addressElement = document.querySelector('.userAddress');
        addressElement.textContent = loggedInUser.address;
    }
// 페이지가 로드되면 사용자의 주소를 화면에 표시합니다.
    displayUserAddress();
});


// document.addEventListener('DOMContentLoaded', function() {
//
// });

let orderKey = "orderKey";
localStorage.setItem(orderKey, JSON.stringify(orderDetailData));