if (document.getElementById("img")) {
  document.getElementById("img").addEventListener("change", function (e) {
    const formData = new FormData();
    console.log(this, this.files);
    formData.append("img", this.files[0]);
    axios
      .post("/clubupload/img", formData)
      .then((res) => {
        document.getElementById("img-url").value = res.data.url;
        document.getElementById("img-preview").src = res.data.url;
        document.getElementById("img-preview").style.display = "inline";
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