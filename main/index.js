document.addEventListener("DOMContentLoaded", function () {
    // 체크할 키와 값을 설정합니다.
    const keyToCheck = "allUser";
    const valueToSet = JSON.stringify(userData); // 원하는 값을 설정합니다.
    const keyToCheck2 = "allProduct";
    const valueToSet2 = JSON.stringify(productData); // 원하는 값을 설정합니다.

    // 로컬 세션 스토리지에서 키가 이미 존재하는지 확인합니다.
    const hasBeenSet = localStorage.getItem(keyToCheck);
    const hasBeenSet2 = localStorage.getItem(keyToCheck2);
    // 키가 없다면 값을 설정하고 키를 마킹합니다.
    if (!hasBeenSet) {
        // 원하는 작업을 수행합니다.
        // 여기서는 값 설정을 예시로 들었습니다.
        localStorage.setItem(keyToCheck, valueToSet);

        // 설정된 후의 추가 작업을 수행할 수 있습니다.
        console.log("값이 로컬 세션 스토리지에 설정되었습니다.");

        // 만약 한 번만 실행하고 싶은 작업이 있다면 이 부분에 추가로 작성합니다.
        localStorage.setItem('allUser',JSON.stringify(userData));
        console.log(userData);
    }
    if (!hasBeenSet2) {
        // 원하는 작업을 수행합니다.
        // 여기서는 값 설정을 예시로 들었습니다.
        localStorage.setItem(keyToCheck2, valueToSet2);

        // 설정된 후의 추가 작업을 수행할 수 있습니다.
        console.log("값이 로컬 세션 스토리지에 설정되었습니다.");

        // 만약 한 번만 실행하고 싶은 작업이 있다면 이 부분에 추가로 작성합니다.
        localStorage.setItem('allProduct',JSON.stringify(productData));
        console.log(productData);
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

// const myPage = () => {
//     // 마이페이지 아직 구현 안됨
// }

const logout = () => {
    window.localStorage.removeItem('loggedInUser');
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