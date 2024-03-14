let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

document.addEventListener("DOMContentLoaded", function () {
    let orderDetailData = JSON.parse(localStorage.getItem('orderKey')) || []; // 기존 주문 내역 데이터를 유지하면서 초기화
    let allProduct = JSON.parse(localStorage.getItem('allProduct'));

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
            return total + product.price * orderDetail.orderDetail_quantity;
        }, 0);

        document.getElementById('orderProductTotal').textContent = totalOrderPrice + "원";
    }

    orderDetailData.forEach((orderDetail, index) => {
        let product = allProduct.find(product => product.id === orderDetail.product_id);
        if (orderDetail.orderDetail_quantity > 0) {
            addOrderRow(index + 1, product.product_name, orderDetail.orderDetail_quantity, product.price * orderDetail.orderDetail_quantity);
        }
    });

    updateTotalOrderPrice();

    // 새로운 주문 내역 데이터를 로컬 스토리지에 저장
    localStorage.setItem('orderKey', JSON.stringify(orderDetailData));
});
