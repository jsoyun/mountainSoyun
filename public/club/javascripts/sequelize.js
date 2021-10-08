// async function test() {
//   try {
//     const res = await axios.get(`/clubdetail/comment`);
//     const comments = res.data;
//     console.log(comments);
//   } catch (err) {
//     console.error(err);
//   }
// };
// test()

// document.querySelectorAll('.comment-form').forEach((el) => {
//   el.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const clubId = e.target.clubId.value;
//     const writerId = document.querySelector('#my-id').value;
//     const comment = e.target.comment.value;
//     try {
//       await axios.post('/clubdetail', { clubId, writerId, comment });
//       getComment(clubId);
//     } catch (err) {
//       console.error(err);
//     }
//     e.target.comment.value = '';
//   })
// });
async function getComment(clubId) {
  try {
    const res = await axios.get(`/clubdetail/comment`);
    const comments = res.data;
    console.log(comments);
    const commentsData = comments.filter((element) => { if (element.clubId == clubId) { return true } });
    const tbody = document.querySelector(`.comment-list${clubId} tbody`);
    tbody.innerHTML = '';
    comments.map(function (commentsData) {
      // 로우 셀 추가
      for (let i = 0; i < commentsData.length; i++) {
        const row = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = commentsData[i].User.nick;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = commentsData[i].comment;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.comment;
        row.appendChild(td);
      }

      // const edit = document.createElement('button');
      // edit.textContent = '수정';
      // edit.addEventListener('click', async () => { // 수정 클릭 시
      //     const newComment = prompt('바꿀 내용을 입력하세요');
      //     if (!newComment) {
      //         return alert('내용을 반드시 입력하셔야 합니다');
      //     }
      //     try {
      //         await axios.patch(`/comments/${comment.id}`, { comment: newComment });
      //         getComment(id);
      //     } catch (err) {
      //         console.error(err);
      //     }
      // });
      // const remove = document.createElement('button');
      // remove.textContent = '삭제';
      // remove.addEventListener('click', async () => { // 삭제 클릭 시
      //     try {
      //         await axios.delete(`/comments/${comment.id}`);
      //         getComment(id);
      //     } catch (err) {
      //         console.error(err);
      //     }
      // });
      // // 버튼 추가
      // td = document.createElement('td');
      // td.appendChild(edit);
      // row.appendChild(td);
      // td = document.createElement('td');
      // td.appendChild(remove);
      // row.appendChild(td);
      // tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}
async function getComment2() {
  try {
    const res = await axios.get(`/clubdetail/comment`);
    const comments = res.data;
    const commentsData = comments.filter((element) => { if (element.clubId == 2) { return true } });
    const tbody = document.querySelector(".comment-list2 tbody");
    // tbody.innerHTML = '';
    console.log(commentsData[0].User.nick);
    // 로우 셀 추가
    // for (let i = 0; i < commentsData.length; i++) {
      document.createElement('tr');
      document.createElement('tr');
      document.createElement('tr');
      document.createElement('tr');
      document.createElement('tr');
      document.createElement('tr');
      document.createElement('tr');
      document.createElement('tr');
      // const row = document.createElement('tr');
      // let td = document.createElement('td');
      // td.textContent = commentsData[0].User.nick;
      // row.appendChild(td);
      // td = document.createElement('td');
      // td.textContent = commentsData[0].comment;
      // row.appendChild(td);
    // };
  } catch (err) {
    console.error(err);
  }
}
getComment2();