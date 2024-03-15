let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
let allProduct = JSON.parse(localStorage.getItem('allProduct'));

document.addEventListener("DOMContentLoaded", function () {
    let orderDetailData = JSON.parse(localStorage.getItem('orderKey')) || []; // 기존 주문 내역 데이터를 유지하면서 초기화

    function addOrderRow(orderNumber, productName, quantity, price) {
        let table = document.querySelector('.order_product');

        let newRow = table.insertRow(table.rows.length);

        let cell1 = newRow.insertCell(0);
        cell1.textContent = orderNumber;

        let cell2 = newRow.insertCell(1);
        cell2.textContent = productName;

        let cell3 = newRow.insertCell(2);
        cell3.textContent = quantity + "개";

        let cell4 = newRow.insertCell(3);
        cell4.textContent = price + "원";
    }

    function updateTotalOrderPrice() {
        let totalOrderPrice = orderDetailData.reduce((total, orderDetail) => {
            let product = allProduct.find(product => product.id === orderDetail.product_id);
            return total + (orderDetail.orderDetail_quantity * (product.discount_price !== undefined ? product.discount_price : product.price));
        }, 0);

        document.getElementById('orderProductTotal').textContent = totalOrderPrice + "원";
    }

    orderDetailData.forEach((orderDetail, index) => {
        let product = allProduct.find(product => product.id === orderDetail.product_id);
        if (orderDetail.orderDetail_quantity > 0 && orderDetail.user_id === loggedInUser.id) {
            addOrderRow(index + 1, product.product_name, orderDetail.orderDetail_quantity, (orderDetail.orderDetail_quantity * (product.discount_price !== undefined ? product.discount_price : product.price)));
        }
    });

    updateTotalOrderPrice();

    // 새로운 주문 내역 데이터를 로컬 스토리지에 저장
    localStorage.setItem('orderKey', JSON.stringify(orderDetailData));

    // 장바구니에서 최종 결제 금액을 가져와서 주문 내역에 반영
    let cartTotalPrice = JSON.parse(localStorage.getItem('cartTotalPrice'));
    if (cartTotalPrice) {
        document.getElementById('orderProductTotal').textContent = cartTotalPrice + "원";
    }
});
