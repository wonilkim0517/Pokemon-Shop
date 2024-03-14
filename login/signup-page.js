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

    // 이메일 형식 검사를 위한 정규 표현식
    let emailRegex = /\S+@\S+\.\S+/;

    // 비밀번호 형식 검사를 위한 정규 표현식
    let passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


    let phoneRegex = /^\d{10,12}$/;

    // 사용자 이름, 이메일, 비밀번호 모두 입력되었는지 확인
    if (userId.trim() === '' || ps.trim() === '' || psCheck.trim() === '' || userName.trim() === '' || address.trim() === '' || phoneNum.trim() === '') {
        alert("모든 필수 입력란을 작성해주세요.");
        return; // 필수 입력 필드가 비어있을 경우 함수 종료
    }
    else if (!emailRegex.test(userId)) {
        alert("올바른 이메일 형식이 아닙니다. 다시 입력해주세요.");
        return; // 이메일 형식이 아닌 경우 함수 종료
    }
    else if (userId.trim() !== '') {
        for (let i = 0; i < allUser.length; i++) {
            if (allUser[i].email === userId) {
                alert("입력하신 이메일은 이미 사용 중입니다. 다른 이메일을 입력해주세요.");
                return; // 중복된 경우 함수 종료
            }
        }
    }
    if (!passwordRegex.test(ps)) {
        alert("비밀번호는 최소 8자 이상이며, 대문자, 소문자, 특수문자를 모두 포함해야 합니다. 다시 입력해 주세요.");
        return; // 비밀번호 형식이 아닌 경우 함수 종료
    }
    if (ps.trim() !== psCheck.trim()) {
        alert("입력하신 비밀번호와 확인용 비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
        return; // 비밀번호가 다른 경우 함수 종료
    }


    // 사용자가 입력한 전화번호가 형식에 맞는지 확인
    if (!phoneRegex.test(phoneNum)) {
        alert("전화번호는 10자에서 12자 사이의 숫자만 입력해주세요.");
        return; // 전화번호 형식이 아닌 경우 함수 종료
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
    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    location.href = "login-page.html";
}
