document.getElementById("signup-form").addEventListener("submit", function(event) {
    // // 폼 제출을 막음
    event.preventDefault();

    // 필수 입력 필드 검사
    var userId = document.getElementById("userId").value;
    var ps = document.getElementById("ps").value;
    var psCheck = document.getElementById("ps-check").value;
    var userName = document.getElementById("userName").value;
    var address = document.getElementById("address").value;
    var phoneNum = document.getElementById("phone").value;


    // 사용자 이름, 이메일, 비밀번호 모두 입력되었는지 확인
    if (userId.trim() === '' || ps.trim() === '' || psCheck.trim() === '' || userName.trim() === '' || address.trim() === '' || phoneNum.trim() === '') {
        alert("필수 입력 필드를 작성해주세요.");
    } else {
        alert("회원가입 성공. 로그인 화면으로 이동합니다.");
        window.location.href = "login-page.html";
    }
});