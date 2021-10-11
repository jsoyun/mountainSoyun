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
  let star = document.querySelectorAll("input");

  let showValue = document.querySelector("#rating-value");

  for (let i = 0; i < star.length; i++) {
    star[i].addEventListener("click", function () {
      i = this.value;

      showValue.innerHTML = i + " out of 5 ";
    });
  }