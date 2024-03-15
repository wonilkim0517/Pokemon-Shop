let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
let cartsData = JSON.parse(localStorage.getItem('cartKey'));
let userCarts = cartsData.filter(cartItem => cartItem.user_id === loggedInUser.id);
let allProduct = JSON.parse(localStorage.getItem('allProduct'));

document.addEventListener("DOMContentLoaded", function () {
    // 사용자 정보 설정
    document.getElementById('order_finish_user_name').textContent = loggedInUser.user_name;
    document.getElementById('order_finish_phone_num').textContent = loggedInUser.phone_num;
    document.getElementById('order_finish_address').textContent = loggedInUser.address;
    let totalOrderPrice = 0;

    // 주문 테이블을 동적으로 채우는 함수
    function addOrderTable(orderTableClass, productName, quantity, price) {
        let table = document.querySelector('.' + orderTableClass);

        let newOrderRow = table.insertRow(table.rows.length);

        let cell1 = newOrderRow.insertCell(0);
        cell1.innerHTML = productName;

        let cell2 = newOrderRow.insertCell(1);
        cell2.innerHTML = quantity + "개";

        let cell3 = newOrderRow.insertCell(2);
        cell3.innerHTML = price + "원";

        totalOrderPrice += price;
    }

    // 주문 상품 테이블에 주문 정보 추가
    for (let i = 0; i < userCarts.length; i++) {
        let cart = userCarts[i];

        // 주문한 제품의 정보 찾기
        let product = allProduct.find(product => product.id === cart.product_id);

        // 할인 기간 내에 있는지 확인
        if (product.start_time && product.end_time) {
            let discountStart = new Date(product.start_time);
            let discountEnd = new Date(product.end_time);
            let currentDate = new Date();

            if (currentDate >= discountStart && currentDate <= discountEnd) {
                // 할인된 가격이 있는 경우에만 해당 가격으로 계산합니다.
                if (product.discount_price !== undefined) {
                    addOrderTable("order_finish_product", product.product_name, cart.cart_quantity, product.discount_price * cart.cart_quantity); // 할인된 가격으로 변경
                } else {
                    // 할인 가격이 설정되지 않은 경우에는 원래 가격으로 계산합니다.
                    addOrderTable("order_finish_product", product.product_name, cart.cart_quantity, product.price * cart.cart_quantity);
                }
            } else {
                // 할인 기간이 지난 경우에는 원래 가격으로 계산합니다.
                addOrderTable("order_finish_product", product.product_name, cart.cart_quantity, product.price * cart.cart_quantity);
            }
        } else {
            // 할인 기간이 설정되지 않은 경우에는 원래 가격으로 계산합니다.
            addOrderTable("order_finish_product", product.product_name, cart.cart_quantity, product.price * cart.cart_quantity);
        }

        // 로컬 스토리지에 상품 정보 저장
        let cartKey = 'cartKey' + cart.id; // 수정된 부분
        localStorage.setItem(cartKey, JSON.stringify(product));
    }
    document.getElementById('order_finish_total_price').textContent = totalOrderPrice + "원";

    cartsData = cartsData.filter(cartItem => !userCarts.includes(cartItem));
    localStorage.setItem('cartKey', JSON.stringify(cartsData));
});
