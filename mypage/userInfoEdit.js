let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const checkPassword = () => {
    // 사용자가 입력한 현재 비밀번호를 가져옵니다.
    var currentPassword = document.getElementById("currentPassword").value;

    // 로컬 스토리지에서 현재 로그인된 사용자의 정보를 가져옵니다.
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // 입력한 비밀번호와 로그인된 사용자의 비밀번호를 비교합니다.
    if (currentPassword === loggedInUser.password) {
        // 비밀번호가 일치하는 경우
        alert("비밀번호가 일치합니다.");
        // 여기에 원하는 작업을 추가하세요 (예: 다음 단계로 이동)
    } else {
        // 비밀번호가 일치하지 않는 경우
        alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");

        // 입력 필드를 초기화합니다.
        document.getElementById("currentPassword").value = '';
    }
}