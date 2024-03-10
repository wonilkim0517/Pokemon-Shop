document.getElementById("login-form").addEventListener("submit", function(event) {
    // // 폼 제출을 막음
    event.preventDefault();

    // 필수 입력 필드 검사
    var id = document.getElementById("inputId").value;
    var ps = document.getElementById("inputPs").value;

    // 사용자 이름, 이메일, 비밀번호 모두 입력되었는지 확인
    if (id.trim() === '' || ps.trim() === '') {
        alert("필수 입력 필드를 작성해주세요.");
    } else {
        window.location.href = "../main/index.html"
    }
});


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