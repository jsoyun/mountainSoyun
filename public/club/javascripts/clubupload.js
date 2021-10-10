if (document.getElementById("img")) {
  let uploadNum = 0;  // 올릴 사진 셀 변수
  let index = 0;  // img 에 붙일 index
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
      formData.append("img", this.files[i]); 
    }
    console.log(formData);
    axios.post("/clubupload/img", formData)
      .then((res) => {
        console.log(res.data);
        let url = JSON.parse(res.data);
        console.log(url);
        let img_html = "";
        for (let i = 0; i < url.length; i++) {
          console.log("미리보기", url[i]);
          // let img_html += `<div class="img-preview${index}"> 
          //     <img id="img-preview${index}" src="${url[i]}" width="250" alt="미리보기"> 
          //     <input id="img-url" type="hidden" name="url" value="${url[i]}"> 
          //     </div>`;
          console.log("json 길이 : ", url.length);
          console.log("서버통신 index : ", index);
          console.log(img_html);
        }
        document.getElementById(".img-preview").append(img_html);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
let star = document.querySelectorAll("input");

let showValue = document.querySelector("#rating-value");

for (let i = 0; i < star.length; i++) {
star[i].addEventListener("click", function () {
    i = this.value;

    showValue.innerHTML = i + " out of 5 ";
});
}