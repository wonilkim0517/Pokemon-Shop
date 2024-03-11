// document.getElementById("signup-form").addEventListener("submit", function (event) {
//     // 폼 제출을 막음
//     event.preventDefault();
//     // signup 함수 호출
//     signup();
// });
let allUser = JSON.parse(localStorage.getItem(('allUser')));
console.log(allUser);
const signup = () => {
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
        return; // 필수 입력 필드가 비어있을 경우 함수 종료
    }
    else if (userId.trim() !== '') {
        for (let i = 0; i < allUser.length; i++) {
            if (allUser[i].email === userId) {
                alert("중복된 id(email) 입니다.");
                return; // 중복된 경우 함수 종료
            }
        }
    }
    if (ps.trim() !== psCheck.trim()) {
        alert("입력하신 비밀번호와 비밀번호(확인)이 같지 않습니다. 다시 입력해 주세요.");
        return; // 비밀번호가 다른 경우 함수 종료
    }

    // 이후 로직은 유효성 검사를 통과한 경우에만 실행됨
    const newUser = {
        "id": allUser.length + 1,
        "password": ps,
        "user_name": userName,
        "nickname": "dummy",
        "email": userId,
        "address": address,
        "phone_num": phoneNum
    }
    allUser.push(newUser);
    localStorage.setItem('allUser', JSON.stringify(allUser));
    console.log(allUser.length);
    alert("회원가입 성공. 로그인 화면으로 이동합니다.");
    location.href = "login-page.html";
}
