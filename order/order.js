
function addNewCartToOrderDetail(newProduct) {
    // 이미 있는 상품인지 확인
    let exisingOrderDetailIndex = orderDetailData.findIndex(item => item.product_id === newProduct.product_id);

    if (exisingOrderDetailIndex !== -1) {
        // 이미 있는 상품이면 해당 상품의 orderDetail_quantity를 증가시킴
        orderDetailData[exisingOrderDetailIndex].orderDetail_quantity += newProduct.orderDetail_quantity;
    } else {
        // 존재하지 않는 상품이면 새로운 상품을 추가
        orderDetailData.push(newProduct);
    }
}

console.log(orderDetailData);

// DOMContentLoaded 이벤트 발생 시 실행할 함수
document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let orderDetailData = JSON.parse(localStorage.getItem('orderKey'));

    console.log(orderDetailData);

    // 사용자 정보 설정
    document.getElementById('orderDetail_user_name').textContent = loggedInUser.user_name;
    document.getElementById('orderDetail_phone_num').textContent = loggedInUser.phone_num;
    document.getElementById('order_detail_address').textContent = loggedInUser.address;
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
    for (let i = 0; i < orderDetailData.length; i++) {
        let orderDetail = orderDetailData[i];

        // 주문한 제품의 정보 찾기
        let product = productData.find(product => product.id === orderDetail.product_id);

        // 주문 상품 테이블에 추가
        addOrderTable("order_product", product.product_name, orderDetail.orderDetail_quantity, product.price * orderDetail.orderDetail_quantity);

        // 로컬 스토리지에 상품 정보 저장
        let cartKey = 'cartKey' + orderDetail.id; // 수정된 부분
        localStorage.setItem(cartKey, JSON.stringify(product));
    }
    document.getElementById('orderDetail_total_price').textContent = totalOrderPrice + "원";
});

