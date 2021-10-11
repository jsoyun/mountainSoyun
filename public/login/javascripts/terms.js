const agreeChkAll = document.querySelector('input[name=agree-all]');
let agree1 = document.getElementById('agree1');
let agree2 = document.getElementById('agree2');

// 동의 모두선택 / 해제 - 수정중
agreeChkAll.addEventListener('change', (e) => {
  let agreeChk = document.querySelectorAll('input[name=agree]');
  for(let i = 0; i < agreeChk.length; i++){
    agreeChk[i].checked = e.target.checked;
  }

  let agreeChange1 = agree1.checked; 
  let agreeChange2 = agree2.checked;
  let agreeCheck = document.getElementById('agreeCheck').value;
  if(agreeChange1 && agreeChange2) {
    agreeCheck = 'Y';
  } else {
    agreeCheck = 'N';
  }
  console.log(agreeCheck);
});

agree1.addEventListener('change', () => {
  let agreeChange1 = agree1.checked; 
  let agreeChange2 = agree2.checked;
  let agreeCheck = document.getElementById('agreeCheck').value;
  if(agreeChange1 && agreeChange2) {
    agreeCheck = 'Y';
  } else {
    agreeCheck = 'N';
  }
  console.log(agreeCheck);
});

agree2.addEventListener('change', () => {
  let agreeChange1 = agree1.checked; 
  let agreeChange2 = agree2.checked;
  let agreeCheck = document.getElementById('agreeCheck').value;
  if(agreeChange1 && agreeChange2) {
    agreeCheck = 'Y';
  } else {
    agreeCheck = 'N';
  }
  console.log(agreeCheck);
});