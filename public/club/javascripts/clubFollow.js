//팔로우
document.querySelectorAll(".twit-follow").forEach(function (tag) {
  console.log("팔로이있는창");
  tag.addEventListener("click", function () {
    console.log("팔로우클릭");
    const myId = document.querySelector("#my-id");
    if (myId) {
      console.log("myid가져와지니?");
      const userId = tag.parentNode.querySelector(".twit-user-id").value;
      console.log(userId);
      //if (userId !== myId.value)원래 이거였음 근데 바꿔도 콘솔에는 찍히네

      if (userId !== myId.value) {
        if (confirm("팔로잉하시겠습니까?")) {
          console.log("팔로요청되나?");
          axios
            .post(`/user/${userId}/follow`)
            .then(() => {
              console.log("팔로됐나");
              location.reload();
            })
            .catch((err) => {
              console.log("에러");
              console.error(nperr);
            });
        }
      }
    }
  });
});
//팔로우끊기
document.querySelectorAll(".twit-unfollow").forEach(function (tag) {
  tag.addEventListener("click", function () {
    const myId = document.querySelector("#my-id");
    console.log(myId);
    if (myId) {
      const userId = tag.parentNode.querySelector(".twit-user-id").value;

      if (userId !== myId.value) {
        if (confirm("팔로잉끊으시겠습니까?")) {
          console.log("팔로요청되나?");
          axios
            .post(`/user/${userId}/unfollow`)
            .then(() => {
              console.log("팔로됐나");
              location.reload();
            })
            .catch((err) => {
              console.log("에러");
              console.error(err);
            });
        }
      }
    }
  });
});