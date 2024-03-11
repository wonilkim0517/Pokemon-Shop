let allUser = JSON.parse(localStorage.getItem(('allUser')));

const id_search = () => {
    // window.location.href = "";
    // 인증번호 생성 기능

    let inputName = document.getElementById("userName").value;
    let inputPN = document.getElementById("phoneNumber").value;

    let result = checkFindId(inputName, inputPN);

    if (result !== null) {
        // 로그인 성공
        alert(`찾으시는 id(email)는 ${result} 입니다.`);
        // 필요하면 다른 페이지로 리디렉션할 수 있습니다.
        location.href='login-page.html';
    } else {
        // 로그인 실패
        alert('입력란에 공백이 있거나 해당하는 id(email)가 없습니다.');
    }

}

function checkFindId(name, phoneNum) {
    for (let i = 0; i < allUser.length; i++) {
        if (allUser[i].user_name === name && allUser[i].phone_num === phoneNum) {
            // 이름과 전화번호가 일치하는 경우 사용자 email을 반환합니다.
            return allUser[i].email;
        }
    }
    // 일치하는 사용자 데이터가 없는 경우 null을 반환합니다.
    return null;
}