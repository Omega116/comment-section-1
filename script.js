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
            "<span class='to-reply-to'>@maxblagun </span>If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
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
            "<span class='to-reply-to'>@maxblagun </span>I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
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
let deletingBtns = document.querySelectorAll(".btn-delete");
let btnsEdit = document.querySelectorAll(".btn-edit");

const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => (textarea.value = ""));

const displayComments = function (comments) {
  commentSection.innerHTML = "";
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
    <button class="btn btn-edit">
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
    <div class="replies">
              <div class="add-comment-box add-reply comment-container hidden">
                <img
                  src="images/avatars/image-juliusomo.png"
                  alt="juliusomo avatar"
                />
                <textarea
                  type="textarea"
                  placeholder="Add a comment..."
                  class="comment-reply-textarea"
                ></textarea>
                <button class="btn btn-send-reply"><span>Reply</span></button>
              </div>
    </div>
    </div>
    </div>
    
    `;

    commentSection.insertAdjacentHTML("beforeend", html);
  });
  btnsEdit = document.querySelectorAll(".btn-edit");
  deletingBtns = document.querySelectorAll(".btn-delete");
  document.querySelector(".comment-send-textarea").value = "";
  displayReplies(users.comments);
};

const displayReplies = function (comments) {
  comments.forEach((comment) => {
    let id;
    if (comment.replies.length > 0) {
      let arr = [];
      id = comment.id;
      arr.push(comment.replies);
      arr = comment.replies.sort((a, b) => {
        if (a.score >= b.score) return -1;
        else return 1;
      });
      let html = ``;
      for (let i = 0; i < arr.length; i++) {
        html += `
        <div class='splitter'></div>
        <div class="comment-reply-box" id=${comment.replies[i].id}>
        <div class="comment-container">
        <div class="vote-box">
        <button class="btn-vote">
        <img src="images/icon-plus.svg" alt="upvote icon" />
        </button>
        <p class="vote">${arr[i].score}</p>
        <button class="btn-vote">
        <img src="images/icon-minus.svg" alt="downvote icon" />
        </button>
        </div>
        <div class="comment-box">
        <div class="user-info-box">
        <div class="user-info">
        <img
        class="avatar"
        src="${arr[i].user.image.png}"
        alt="${arr[i].user.username} avatar"
        />
        
        <h3 class="user-name">${arr[i].user.username}n</h3>
        <p class="comment-time">${arr[i].createdAt}</p>
        </div>
        <div class="btn-container">
        ${
          arr[i].user.username === users.currentUser.username
            ? `<button class="btn btn-delete">
          <img src="images/icon-delete.svg" alt="delete icon" />
          <span>Delete</span>
          </button>
          <button class="btn btn-edit">
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
      ${arr[i].content}
      </p>
      </div>
      </div>
      </div>
      <div class="replies">
      <div
      class="add-comment-box add-reply comment-container hidden"
      >
      <img
      src="images/avatars/image-juliusomo.png"
      alt="juliusomo avatar"
      />
      <textarea
      type="textarea"
      placeholder="Add a comment..."
      class="comment-reply-textarea"
      ></textarea>
      <button class="btn btn-send-reply">
      <span>Reply</span>
      </button>
      </div>
      </div>
      </div>`;
      }
      document.getElementById(`${id}`).insertAdjacentHTML(
        "beforeend",
        `<div class="replies">
      <div class="add-comment-box add-reply comment-container hidden">
      <img
      src="images/avatars/image-juliusomo.png"
      alt="juliusomo avatar"
      />
      <textarea
      type="textarea"
      placeholder="Add a comment..."
      class="comment-reply-textarea"
      ></textarea>
      <button class="btn btn-send-reply"><span>Reply</span></button>
      </div>
      ${html}`
      );
    }
  });
};
displayComments(users.comments);

/* adding a comment case 1 */
btnSend.addEventListener("click", function () {
  const text = btnSend.parentNode.querySelector(".comment-send-textarea").value;
  let arr = [];
  users.comments.forEach((comment) => {
    arr.push(comment.replies);
  });
  let counter = 1;
  users.comments.forEach((comment) => {
    counter++;
    counter += comment.replies.length;
  });
  arr = arr.flat();
  if (text) {
    users.comments.push({
      id: counter,
      content: `${text}`,
      createdAt: "Today",
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    });
  }

  displayComments(users.comments);
  btnSend.parentNode.querySelector(".comment-send-textarea").value = "";
  /* displayReplies(users.comments); */
});

/* replying btn */
document.querySelector("main").addEventListener("click", function (e) {
  if (e.target.closest(".comment-reply-box") === null) {
    document
      .querySelectorAll(".add-comment-box.add-reply.comment-container")
      .forEach((el) => el.classList.add("hidden"));
  }
});
window.addEventListener("click", function (e) {
  const target = e.target;
  const btn = target.closest(".btn-reply");

  if (btn) {
    document
      .querySelectorAll(".add-comment-box.add-reply.comment-container")
      .forEach((el) => el.classList.add("hidden"));

    const commentContainer = target.closest(".comment-reply-box");

    commentContainer
      .querySelector(".add-comment-box.add-reply.comment-container")
      .classList.remove("hidden");

    const repliedTo = commentContainer.querySelector(".user-name").innerText;
    commentContainer
      .querySelector(".replies")
      .querySelector("textarea").placeholder = `Reply to @${repliedTo}...`;
  }
});

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
/* deleting  comments */

window.addEventListener("click", function (e) {
  const target = e.target;
  const btn = target.closest(".btn-delete");
  if (btn) {
    const commentToDelete = target.closest(".comment-reply-box");
    const sectionDelete = document.querySelector(".section-delete");
    sectionDelete.classList.remove("hidden");
    const handleYesClick = function () {
      sectionDelete.classList.add("hidden");
      const id = Number(commentToDelete.getAttribute("id"));
      users.comments = hardDelete(users.comments, id);
      displayComments(users.comments);
      document
        .querySelector(".yes")
        .removeEventListener("click", handleYesClick);
      document.querySelector(".no").removeEventListener("click", handleNoClick);
    };
    const handleNoClick = function () {
      sectionDelete.classList.add("hidden");
      document
        .querySelector(".yes")
        .removeEventListener("click", handleYesClick);
      document.querySelector(".no").removeEventListener("click", handleNoClick);
    };
    document.querySelector(".yes").addEventListener("click", handleYesClick);
    document.querySelector(".no").addEventListener("click", handleNoClick);
  }
});
function hardDelete(arr, id) {
  arr.forEach((comment) => {
    comment.replies = comment.replies.filter((reply) => reply.id !== id);
  });
  arr = arr.filter((comment) => comment.id !== id);
  console.log(arr);
  return arr;
}
/* editing logic */

window.addEventListener("click", function (e) {
  const target = e.target;
  const btnEdit = target.closest(".btn-edit");
  if (btnEdit) {
    const comment = btnEdit.closest(".comment-reply-box");
    let text = comment.querySelector(".user-comment").innerText;

    comment.querySelector(
      ".user-comment"
    ).parentNode.innerHTML = `<textarea class='textarea'>${text}</textarea>`;
    btnEdit.classList.remove("btn-edit");
    btnEdit.classList.add("btn-submit");
  }
});

window.addEventListener("dblclick", function (e) {
  const target = e.target;
  const btnEdit = target.closest(".btn-submit");
  if (btnEdit) {
    const commentBox = btnEdit.closest(".comment-reply-box");
    let id = Number(commentBox.getAttribute("id"));
    let textarea = commentBox.querySelector("textarea");
    for (const comment of users.comments) {
      if (comment.id === id) {
        comment.content = textarea.value;
      }
      comment.replies.forEach((reply) => {
        if (reply.id === id) {
          reply.content = textarea.value;
        }
      });
    }
    displayComments(users.comments);
  }
});

/* Logics ( vote) */

window.addEventListener("click", function (e) {
  const target = e.target;
  const btnVote = target.closest(".btn-vote");
  if (btnVote) {
    let type = target.getAttribute("alt");
    let id = Number(btnVote.closest(".comment-reply-box").getAttribute("id"));
    if (type === "upvote icon") {
      users.comments.map((comment) => {
        if (comment.id === id) comment.score++;
      });
      users.comments.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === id) {
            reply.score++;
          }
        });
      });

      displayComments(users.comments);
    } else {
      users.comments.map((comment) => {
        if (comment.id === id && comment.score > 0) comment.score--;
      });
      users.comments.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === id && reply.score > 0) {
            reply.score--;
          }
        });
      });

      displayComments(users.comments);
    }
  }
});

/* reply to comments */
window.addEventListener("click", function (e) {
  const target = e.target;
  const btn = target.closest(".btn-send-reply");
  if (btn) {
    const text = btn.parentNode.querySelector("textarea").value;
    if (text) {
      let id = Number(btn.closest(".comment-reply-box").getAttribute("id"));
      let counter = 1;
      users.comments.forEach((comment) => {
        counter++;
        counter += comment.replies.length;
      });
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      users.comments.forEach((comment) => {
        if (comment.id === id) {
          comment.replies.push({
            id: counter,
            content:
              `<span class='to-reply-to'>
      ${"@" + comment.user.username}
      </span>` + text,
            createdAt:
              "Today" +
              ` ${hours}`.padStart(2, "0") +
              ":" +
              `${minutes}`.padStart(2, "0"),
            score: 0,
            replyingTo: comment.user.username,
            user: {
              image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
          });
          displayComments(users.comments);
        }
      });
    }
  }
});
