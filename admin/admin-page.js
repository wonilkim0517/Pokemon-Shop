document.addEventListener("DOMContentLoaded", function () {
    // 체크할 키와 값을 설정합니다.
    const keyToCheck2 = "allProduct";
    const valueToSet2 = JSON.stringify(productData); // 원하는 값을 설정합니다.

    // 로컬 세션 스토리지에서 키가 이미 존재하는지 확인합니다.
    const hasBeenSet2 = localStorage.getItem(keyToCheck2);
    // 키가 없다면 값을 설정하고 키를 마킹합니다.
    if (!hasBeenSet2) {
        // 키에 맞는 값을 localStorage에 넣습니다
        localStorage.setItem(keyToCheck2, valueToSet2);

        // 설정된 후의 추가 작업을 수행할 수 있습니다.
        console.log("값이 로컬 세션 스토리지에 설정되었습니다.");

        // 만약 한 번만 실행하고 싶은 작업이 있다면 이 부분에 추가로 작성합니다.
        localStorage.setItem('allProduct', JSON.stringify(productData));
        console.log(productData);
    }
});

const goods_stock = () => {
    const allProducts = JSON.parse(localStorage.getItem('allProduct'));

    // 필수 입력 필드 검사
    var product_name = document.getElementById("product_name").value;
    var stock = document.getElementById("stock").value;
    var price = document.getElementById("price").value;
    var content = document.getElementById("content").value;
    var discount_price_input = document.getElementById("discount_price"); // 할인 가격 입력 요소 가져오기
    var discount_price = discount_price_input ? discount_price_input.value : ''; // 할인 가격이 입력되지 않은 경우를 고려하여 값 가져오기

    // 추가로 타임세일 시작 시간과 종료 시간 요소를 가져오도록 수정
    var start_time_input = document.getElementById("start_time");
    var start_time = start_time_input ? start_time_input.value : '';

    var end_time_input = document.getElementById("end_time");
    var end_time = end_time_input ? end_time_input.value : '';

    // 사용자 이름, 이메일, 비밀번호 모두 입력되었는지 확인
    if (product_name.trim() === '' || stock.trim() === '' || price.trim() === '' || content.trim() === '' || discount_price.trim() === '' || start_time.trim() === '' || end_time.trim() === '') {
        alert("필수 입력 필드를 작성해주세요.");
        return; // 필수 입력 필드가 비어있을 경우 함수 종료
    } else if (product_name.trim() !== '') {
        for (let i = 0; i < allProducts.length; i++) {
            if (allProducts[i].product_name === product_name) { // 상품 이름 중복 확인
                alert("중복된 상품 이름 입니다.");
                return; // 중복된 경우 함수 종료
            }
        }
    }

    // 상품 json data 틀 작성 및 동적으로 추가하기 위한 구조 구성
    const newProduct = {
        "id": allProducts.length + 101, // 이 부분은 상황에 따라 수정해야 할 수도 있습니다.
        "product_name": product_name,
        "stock": stock,
        "price": price,
        "content": content,
        "discount_price": discount_price,
        "start_time": start_time, // 타임세일 시작 시간 추가
        "end_time": end_time // 타임세일 종료 시간 추가
    };

    allProducts.push(newProduct);
    localStorage.setItem('allProduct', JSON.stringify(allProducts)); // localstorage에 상품 추가
    alert("상품 추가 완료");
    location.href = "../main/index.html"; // 메인 페이지로 이동
};
