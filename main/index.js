document.addEventListener("DOMContentLoaded", function () {
    // 체크할 키와 값을 설정합니다.
    const keyToCheck = "allUser";
    const valueToSet = JSON.stringify(userData); // 원하는 값을 설정합니다.
    const keyToCheck2 = "allProduct";
    const valueToSet2 = JSON.stringify(productData); // 원하는 값을 설정합니다.
    const keyToCheck3 = 'cartKey';
    const valueToSet3 = JSON.stringify(cartData);

    // 로컬 세션 스토리지에서 키가 이미 존재하는지 확인합니다.
    const hasBeenSet = localStorage.getItem(keyToCheck);
    const hasBeenSet2 = localStorage.getItem(keyToCheck2);
    const cartDataSet = localStorage.getItem(keyToCheck3);

    // 키가 없다면 값을 설정하고 키를 마킹합니다.
    if (!hasBeenSet) {
        localStorage.setItem(keyToCheck, valueToSet);
        console.log("allUser가 로컬 세션 스토리지에 설정되었습니다.");
    }

    if (!hasBeenSet2) {
        localStorage.setItem(keyToCheck2, valueToSet2);
        console.log("allProduct가 로컬 세션 스토리지에 설정되었습니다.");
    }

    if (!cartDataSet) {
        localStorage.setItem(keyToCheck3, valueToSet3);
        console.log("cartKey가 로컬 세션 스토리지에 설정되었습니다.");
    }

    // 초기 로그인 상태 업데이트
    updateLoginStatus();
});


const mainLogo = () => {
    window.location.href = "./index.html";
}

const mini1 = () => {
    document.getElementById("contentFrame").setAttribute("src", "../login/signup-page.html");
}

const mini2 = () => {
    if (document.getElementById("mini2").textContent === '로그아웃') {
        logout();
        updateLoginStatus(); // 로그아웃 후 상태 업데이트
        location.reload();

    } else {
        document.getElementById("contentFrame").setAttribute("src", "../login/login-page.html");
    }
}
const cart = () => {
    document.getElementById("contentFrame").setAttribute("src", "../cart/cart.html");
}

const myPage = () => {
    document.getElementById("contentFrame").setAttribute("src", "../mypage/mypage.html");
}

const logout = () => {
    window.localStorage.removeItem('loggedInUser');
}

const search = () => {
    var searchKeyword = document.getElementById('searchInput').value; // 검색어 입력란의 값

    // localStorage에 검색어 저장
    localStorage.setItem('searchKeyword', searchKeyword);

    document.getElementById("contentFrame").setAttribute("src", "../search/search.html");
}

// 로그인 상태 업데이트 함수
function updateLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser !== null) {
        document.getElementById("mini1").style.display = "none";
        document.getElementById("mini2").innerText = '로그아웃';
    } else {
        document.getElementById("mini1").innerText = '회원가입';
        document.getElementById("mini1").style.display = "block";
        document.getElementById("mini2").innerText = '로그인';
    }
}