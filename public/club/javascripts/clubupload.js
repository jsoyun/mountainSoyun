if (document.getElementById("img")) {
  let uploadNum = 0; //올린 사진 셀 변수 
  let index = 0; //img 에 붙일 index
  document.getElementById("img").addEventListener("change", function (e) {
    const formData = new FormData();
    const length = this.files.length;
    const max = 4; //사진 최대 4장까지
    switch (uploadNum) { 
      case 0: 
        if (length > max - uploadNum) { 
          alert("사진은 최대 4장까지만 가능합니다."); 
          return; 
        } 
        uploadNum += length; 
        break; 
      case 1: 
        if (length > max - uploadNum) { 
          alert("사진은 최대 4장까지만 가능합니다."); 
          return; 
        } 
        uploadNum += length; 
        break; 
      case 2: 
        if (length > max - uploadNum) { 
          alert("사진은 최대 4장까지만 가능합니다."); 
          return; 
        } 
        uploadNum += length; 
        break; 
      case 3: 
        if (length > max - uploadNum) { 
          alert("사진은 최대 4장까지만 가능합니다."); 
          return; 
        } 
        uploadNum += length; 
        break; 
      default: 
        alert("사진은 최대 4장까지만 가능합니다."); 
        return; 
    } 
    console.log("업로드한 사진 : ", uploadNum); 
    console.log("현재 올린 사진 : ", this.files);
      
    for (let i = 0; i < length; i++) { 
      console.log(this.files[i]);
      formData.append("img", this.files[i]); 
      
      // index++; 
    }
    // console.log(formData);
    axios.post("/clubupload/img", formData)
      .then((res) => {
        let url = JSON.parse(res.data); 
        console.log(url); 
        let img_html = ""; 
        for (let i = 0; i < url.length; i++) { 
          console.log("미리보기", url[i]); 
          img_html += `<div class="img-preview${index}"> 
          <img id="img-preview${index}" src="${url[i]}" width="250" alt="미리보기"> 
          <input id="img-url" type="hidden" name="url" value="${url[i]}"> 
          </div>`;
          console.log("json 길이 : ", url.length); 
          console.log("서버통신index:", index); 
          console.log(img_html);
        }
        document.querySelector('.img-preview').innerHTML = img_html;
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

//별점 마킹 모듈 프로토타입으로 생성
function Rating() { };
Rating.prototype.rate = 0;
Rating.prototype.setRate = function (newrate) {
  //별점 마킹 - 클릭한 별 이하 모든 별 체크 처리
  this.rate = newrate;
  let items = document.querySelectorAll('.rate_radio');
  items.forEach(function (item, idx) {
    if (idx < newrate) {
      item.checked = true;
    } else {
      item.checked = false;
    }
  });
}
let rating = new Rating();//별점 인스턴스 생성

document.addEventListener('DOMContentLoaded', function () {
  //별점선택 이벤트 리스너
  document.querySelector('.rating').addEventListener('click', function (e) {
    let elem = e.target;
    if (elem.classList.contains('rate_radio')) {
      rating.setRate(parseInt(elem.value));
    }
  })
});

/* 별점 */
const container = document.querySelector(".rating");
const items = container.querySelectorAll(".rating-item");
container.onclick = (e) => {
  const elClass = e.target.classList;
  if (!elClass.contains("active")) {
    items.forEach((item) => item.classList.remove("active"));
    console.log(e.target.getAttribute("data-rate"));
    elClass.add("active");
  }
};
