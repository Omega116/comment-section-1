"use strict";

const users = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};

const body = document.querySelector("body");
const commentSection = document.querySelector(".comments");
const btnSend = document.querySelector(".btn-send");
const comment = document.querySelector(".comment-send-textarea");
const btnsReply = document.querySelectorAll(".btn-reply");
const commentContainers = document.querySelectorAll(".comment-reply-box");
const commentsArr = [];
let votes = [];
let i = 0;

const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => (textarea.value = ""));
const commentsArray = [];

const displayComments = function (comments) {
  const arr = comments.sort((a, b) => {
    if (a.score > b.score) return -1;
    else return 1;
  });

  arr.forEach((comment) => {
    const html = `<div class="comment-reply-box" id='${comment.id}'>
    <div class="comment-container">
    <div class="vote-box">
    <button class='btn-vote'>
    <img src="images/icon-plus.svg" alt="upvote icon" />
    </button>
    <p class="vote">${comment.score}</p>
    <button class='btn-vote'>
    <img src="images/icon-minus.svg" alt="downvote icon" />
    </button>
    </div>
    <div class="comment-box">
    <div class="user-info-box">
    <div class="user-info">
    <img
    class="avatar"
    src="${comment.user.image.png}"
    alt="${comment.user.username} avatar"
    />
    
    <h3 class="user-name">${comment.user.username}</h3>
    <p class="comment-time">${comment.createdAt}</p>
    </div>
    <div class="btn-container">
    ${
      comment.user.username === users.currentUser.username
        ? `<button class="btn btn-delete">
    <img src="images/icon-delete.svg" alt="delete icon" />
    <span>Delete</span>
    </button>
    <button class="btn btn-reply">
    <img src="images/icon-edit.svg" alt="reply icon" />
    <span>Edit</span>
    </button>`
        : `<button class="btn btn-reply">
    <img src="images/icon-edit.svg" alt="reply icon" />
    <span>Reply</span>
    </button>`
    }
    
    </div>
    </div>
    <div>
    <p class="user-comment">
    ${comment.content}
    </p>
    </div>
    </div>
    </div>
    </div>
    </div>
    
    </div>
    `;

    commentSection.insertAdjacentHTML("beforeend", html);
  });
};

displayComments(users.comments);
/* 
function showEl(el = "") {
  if (el != "") {
    commentsArr.push(el);
  }
  commentsArr.sort((a, b) =>
    Number(a.querySelector(".vote") - Number(b.querySelector(".vote")))
  );
  for (let i = 0; i < commentsArr.length; i++) {
    commentSection.insertAdjacentElement("beforeend", commentsArr[i]);
  }
} */

/* adding a comment case 1 */
btnSend.addEventListener("click", function () {
  const text = document.querySelectorAll(".comment-send-textarea").value;
  if (text) {
    users.comments.push({
      id: 1,
      content: `${text}`,
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    });
  }
  console.log(users);
  commentSection.innerHTML = "";
  displayComments(users.comments);
});

/* replying btn */
btnsReply.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    document
      .querySelectorAll(".add-comment-box.add-reply.comment-container")
      .forEach((el) => el.classList.add("hidden"));
    const target = e.target;

    const commentContainer = target.closest(".comment-container");
    commentContainer.parentNode
      .querySelector(".add-comment-box.add-reply.comment-container")
      .classList.remove("hidden");

    const repliedTo = commentContainer.querySelector(".user-name").innerText;
    commentContainer.parentNode
      .querySelector(".replies")
      .querySelector("textarea").placeholder = `Reply to @${repliedTo}...`;
  })
);

window.addEventListener("click", function (e) {
  if (e.target === document.querySelector("main")) {
    commentContainers.forEach((commentContainer) => {
      const toRemove = commentContainer.querySelector(
        ".add-comment-box.add-reply.comment-container"
      );
      toRemove.classList.add("hidden");
    });
  }
});

/* reply to comments logic */

/* const btnsSendReply = document.querySelectorAll(".btn-send-reply");
btnsSendReply.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    const target = e.target;
    const toAddComment = target.closest(".comment-reply-box");
    console.log(toAddComment);
    const text = target.parentNode.querySelector("textarea").value;
    const html = `<div class="comment-reply-box">
        <div class="comment-container">
          <div class="vote-box">
            <button>
              <img src="images/icon-plus.svg" alt="upvote icon" />
            </button>
            <p class="vote">5</p>
            <button>
              <img src="images/icon-minus.svg" alt="downvote icon" />
            </button>
          </div>
          <div class="comment-box">
            <div class="user-info-box">
              <div class="user-info">
                <img
                  class="avatar"
                  src="images/avatars/image-maxblagun.png"
                  alt="maxblagun avatar"
                />

                <h3 class="user-name">maxblagun</h3>
                <p class="comment-time">2 weeks ago</p>
              </div>
              <div class="btn-container">

                <button class="btn btn-reply">
                  <img src="images/icon-reply.svg" alt="reply icon" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
            <div>
              <p class="user-comment">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
                consectetur, cupiditate ratione corporis quis nesciunt in
                aperiam odio voluptatibus ipsum ducimus eveniet saepe qui et ut
                inventore beatae facere deserunt.
              </p>
            </div>
          </div>
        </div>
        <div class="replies">
          <div class="add-comment-box add-reply comment-container hidden">
            <img
              src="images/avatars/image-juliusomo.png"
              alt="juliusomo avatar"
            />
            <textarea type="textarea" placeholder="Add a comment..." class="comment-reply-textarea"></textarea>
            <button class="btn btn-send-reply"><span>Reply</span></button>
          </div>
          <div class="splitter"></div>
          <div class="comment-reply-box">
            <div class="comment-container">
              <div class="vote-box">
                <button>
                  <img src="images/icon-plus.svg" alt="upvote icon" />
                </button>
                <p class="vote">4</p>
                <button>
                  <img src="images/icon-minus.svg" alt="downvote icon" />
                </button>
              </div>
              <div class="comment-box">
                <div class="user-info-box">
                  <div class="user-info">
                    <img
                      class="avatar"
                      src="images/avatars/image-ramsesmiron.png"
                      alt="ramsesmiron avatar"
                    />
    
                    <h3 class="user-name">ramsesmiron</h3>
                    <p class="comment-time">1 weeks ago</p>
                  </div>
                  <div class="btn-container">

                    <button class="btn btn-reply">
                      <img src="images/icon-reply.svg" alt="reply icon" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p class="user-comment">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
                    consectetur, cupiditate ratione corporis quis nesciunt in
                    aperiam odio voluptatibus ipsum ducimus eveniet saepe qui et ut
                    inventore beatae facere deserunt.
                  </p>
                </div>
              </div>
            </div>
            <div class="replies">
              <div class="add-comment-box add-reply comment-container hidden">
                <img
                  src="images/avatars/image-juliusomo.png"
                  alt="juliusomo avatar"
                />
                <textarea type="textarea" placeholder="Add a comment..." class="comment-reply-textarea"></textarea>
                <button class="btn btn-send-reply"><span>Reply</span></button>
              </div>
            </div>
          
          <div class="comment-reply-box">
            <div class="comment-container">
              <div class="vote-box">
                <button>
                  <img src="images/icon-plus.svg" alt="upvote icon" />
                </button>
                <p class="vote">2</p>
                <button>
                  <img src="images/icon-minus.svg" alt="downvote icon" />
                </button>
              </div>
              <div class="comment-box">
                <div class="user-info-box">
                  <div class="user-info">
                    <img
                      class="avatar"
                      src="images/avatars/image-juliusomo.png"
                      alt="juliusomo avatar"
                    />
    
                    <h3 class="user-name">juliusomo</h3>
                    <p class="comment-time">2 days ago</p>
                  </div>
                  <div class="btn-container">

                    <button class="btn btn-delete">
                      <img src="images/icon-delete.svg" alt="delete icon" />
                      <span>Delete</span>
                    </button>
                    <button class="btn btn-reply">
                      <img src="images/icon-edit.svg" alt="reply icon" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p class="user-comment">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
                    consectetur, cupiditate ratione corporis quis nesciunt in
                    aperiam odio voluptatibus ipsum ducimus eveniet saepe qui et ut
                    inventore beatae facere deserunt.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>`;
    toAddComment.insertAdjacentHTML("beforeend", html);
    commentContainers.forEach((commentContainer) => {
      const toRemove = commentContainer.querySelector(
        ".add-comment-box.add-reply.comment-container"
      );
      toRemove.classList.add("hidden");
    });
  })
); */

/* delete comment */
const deletingBtns = document.querySelectorAll(".btn-delete");

window.addEventListener("click", function (e) {
  const target = e.target;
  deletingBtns.forEach((btn) => {
    if (target.closest(".btn-delete") === btn) {
      let commentToDelete = target.closest(".comment-reply-box");

      document.querySelector(".section-delete").classList.remove("hidden");
      document.querySelector(".yes").addEventListener("click", function () {
        document.querySelector(".section-delete").classList.add("hidden");
        commentToDelete.remove();
      });
      document.querySelector(".no").addEventListener("click", function () {
        document.querySelector(".section-delete").classList.add("hidden");
      });
    }
  });
});

/* editing logic */

const btnsEdit = document.querySelectorAll(".btn-edit");
window.addEventListener("click", function (e) {
  const btnEdit = e.target.closest(".btn-edit");

  const comment = btnEdit
    .closest(".comment-box")
    .querySelector("#user-comment");
  const text = comment.innerText;
  if (comment)
    if (btnEdit) {
      comment.innerHTML = `<textarea id='user-comment'>${text}</textarea>`;
    }
  btnEdit.innerHTML = `<button class="btn btn-edit">
                      <img src="images/icon-edit.svg" alt="reply icon" />
                      <span>Submit</span>
                    </button>`;
});

/* submitting new comment */
/* window.addEventListener("click", function (e) {
  console.log(e.target.closest(".btn-submit"));
  const btnSubmit = e.target.closest(".btn-submit");

  const comment = btnSubmit
    .closest(".comment-box")
    .querySelector("#user-comment");
  console.log(btnSubmit.closest(".comment-box").querySelector("#user-comment"));
  const text = comment.innerText;
  if (comment)
    if (btnSubmit) {
      comment.innerHTML = `<p class='user-comment' id='user-comment'>${text}</p>`;
    }
  btnSubmit.innerHTML = `<button class="btn btn-edit">
                      <img src="images/icon-edit.svg" alt="reply icon" />
                      <span>Edit</span>
                    </button>`;
}); */

/* Logics (time  // vote) */

window.addEventListener("click", function (e) {
  const target = e.target;
  console.log(target);
  const btnVote = target.closest(".btn-vote");
  console.log(btnVote);
  if (btnVote) {
    let type = target.getAttribute("alt");
    let index = btnVote.closest(".comment-reply-box").getAttribute("id");
    if (type === "upvote icon") {
      votes[index]++;
      btnVote.closest(".comment-reply-box").querySelector(".vote").innerText =
        votes[index];
    } else {
      if (votes[index] > 0) {
        votes[index]--;
        btnVote.closest(".comment-reply-box").querySelector(".vote").innerText =
          votes[index];
      }
    }
  }
});

/* test function  */

function showEl(arr) {
  arr.sort(
    (a, b) =>
      Number(a.querySelector(".vote").innerText) -
      Number(b.querySelector(".vote").innerText)
  );
  for (let i = 0; i < arr.length; i++) {
    commentSection.insertAdjacentHTML("beforeend", arr[i]);
  }
}
