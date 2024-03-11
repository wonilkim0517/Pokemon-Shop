const ps_search= () => {
    let inputId = document.getElementById("userId").value;
    let inputPN = document.getElementById("phoneNumber").value;

    let result = checkFindPs(inputId, inputPN);

    if (result !== null) {
        // 로그인 성공
        alert(`찾으시는 비밀번호는 ${result} 입니다.`);
        // 필요하면 다른 페이지로 리디렉션할 수 있습니다.
        location.href='login-page.html';
    } else {
        // 로그인 실패
        alert('입력란에 공백이 있거나 올바른 id가 아닙니다.');
    }
}

function checkFindPs(email, phoneNum) {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email && userData[i].phone_num === phoneNum) {
            // email과 이름과 전화번호가 일치하는 경우 사용자 비밀번호를 반환합니다.
            return userData[i].password;
        }
    }
    // 일치하는 사용자 데이터가 없는 경우 null을 반환합니다.
    return null;
}