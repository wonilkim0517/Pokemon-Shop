// document.getElementById("login-form").addEventListener("submit", function (event) {
//     // 폼 제출을 막음
//     event.preventDefault();

// 필수 입력 필드 검사

let allUser = JSON.parse(localStorage.getItem(('allUser')));
// allUser[1].name
console.log(allUser);
const login = () => {
    let inputId = document.getElementById("inputId").value;
    let inputPs = document.getElementById("inputPs").value;

    let result = loginCheck(inputId, inputPs);

    if (result !== null) {
        // 로그인 성공
        alert('로그인 성공!');
        // 필요하면 다른 페이지로 리디렉션할 수 있습니다.
        // 사용자 정보를 localStorage에 저장
        localStorage.setItem('loggedInUser', JSON.stringify(result));
        let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            // 로그인한 사용자 정보를 이용하여 필요한 작업 수행
            console.log(loggedInUser);
        } else {
            // 로그인 정보가 없는 경우, 로그인 페이지로 이동 또는 다른 작업 수행
            console.log('로그인 정보 없음');
        }

        if(loggedInUser.nickname === 'admin'){ // 임시적으로 nickname 이 admin인 계정만 admin 계정으로 등록
            // window.parent.location.reload();
            window.location.href = "../admin/admin-page.html";
        } else {
            window.parent.location.reload();
            window.location.href = "../main/home.html";
        }
    }
    else {
        // 로그인 실패
        alert('틀린 이메일 또는 비밀번호입니다.');
    }
}

function loginCheck(email, password) {
    // dummy_data.js의 userData 배열을 순회합니다.
    for (let i = 0; i < allUser.length; i++) {
        if (allUser[i].email === email && allUser[i].password === password) {
            // 이메일과 비밀번호가 일치하는 경우 사용자 데이터를 반환합니다.
            return allUser[i];
        }
    }
    // 일치하는 사용자 데이터가 없는 경우 null을 반환합니다.
    return null;
}


// // localStorage 에 로그인 데이터 들어갔는지 확인
//     document.addEventListener('DOMContentLoaded', function () {
//         // localStorage에서 사용자 정보 읽기
//         let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//         if (loggedInUser) {
//             // 로그인한 사용자 정보를 이용하여 필요한 작업 수행
//             console.log('로그인한 사용자 정보:', loggedInUser);
//         } else {
//             // 로그인 정보가 없는 경우, 로그인 페이지로 이동 또는 다른 작업 수행
//             console.log('로그인 정보 없음');
//             // location.href = 'login_page.html';
//         }
//     });


const idSearch = () => {
    window.location.href = "id-search.html";
}

const psSearch = () => {
    window.location.href = "ps-search.html";
}

// const login = () => {
//     window.location.href = "../main/index.html"
// }

const signup = () => {
    window.location.href = "signup-page.html"
}