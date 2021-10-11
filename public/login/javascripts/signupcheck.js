// function checkMail() {
//   //메일 유효성 검사
//   const regExpMail =
//     /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

//   let mail = document.getElementById("user-email").value;
//   if (!regExpMail.test(mail)) {
//     document.getElementById("usereMail").innerHTML =
//       "메일주소를 다시 기입해주세요.";
//     alert("메일주소 기입오류");
//   } else {
//     document.getElementById("usereMail").innerHTML = "";
//     // return true;
//   }
// }

// function checkPw() {
//   //비밀번호 유효성 검사
//   const regExpPwd =
//     /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{4,16}$/;
//   let pw = document.getElementById("user-pw").value;
//   if (!regExpPwd.test(pw)) {
//     document.getElementById("wrongPw").innerHTML =
//       "4 ~ 16자의 영문, 숫자, 특수문자를 최소 한가지씩 조합하세요.";
//     alert("비밀번호 기입오류");
//   } else {
//     document.getElementById("wrongPw").innerHTML = "";
//     // return true;
//   }
// }

// function reCheckPw() {
//   //비밀번호 재확인
//   let pw = document.getElementById("user-pw").value;
//   let repw = document.getElementById("user-pw-confirm").value;
//   if (pw != repw) {
//     document.getElementById("wrongRePw").innerHTML = "위 비밀번호와 다릅니다.";
//     alert("비밀번호 재확인 기입오류");
//   } else {
//     document.getElementById("wrongRePw").innerHTML = "";
//     // return true;
//   }
// }

// function checkId() {
//   //이름 유효성 검사
//   const regExpName = /^[A-Za-z0-9가-힣]{2,10}$/;
//   let name = document.getElementById("user-nickname").value;
//   if (!regExpName.test(name)) {
//     document.getElementById("wrongid").innerHTML =
//       "형식에 맞지 않는 이름입니다.";
//   } else {
//     document.getElementById("wrongid").innerHTML = "";
//     // return true;
//   }
// }

// //회원가입시 입력란 정규식 체크
// function checkForm() {
//   console.log("회원가입정규식");
//   // const regExp1 = /^[A-Za-z0-9]{4,10}$/;

//   // let id = document.getElementById("user-id").value;
//   if (!regExp1.test(id)) {
//     console.log("에러냐");
//     alert("형식이 맞지 않습니다.");
//     // return false;
//   }
//   // console.log("리턴은돼?");
//   // return true;
// }
