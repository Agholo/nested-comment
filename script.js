const cont = document.getElementById("contenier");

const comments = [
  {
    id: 1,
    text: "This is the first comment",
    parentId: null,
    replies: [
      {
        id: 2,
        text: "This is a reply to the first comment",
        parentId: 1,
        replies: [
          {
            id: 3,
            text: "This is a nested reply",
            parentId: 2,
            replies: [], // Further nesting possible
          },
          {
            id: 4,
            text: "This is another nested reply",
            parentId: 2,
            replies: [], // Further nesting possible
          },
        ],
      },
    ],
  },
  {
    id: 5,
    text: "This is an independent comment",
    parentId: null,
    replies: [
      {
        id: 6,
        text: "This is another nested reply",
        parentId: 2,
        replies: [], // Further nesting possible
      },
    ],
  },
  // Additional comment objects...
];

function setComment(comment) {
  const nestedComment = document.createElement("div");
  nestedComment.innerText = comment.text;
  nestedComment.classList.add("comment");
  if (comment.parentId) {
    nestedComment.classList.add("hidden");
  } else {
    nestedComment.id = "parrent";
    nestedComment.addEventListener("click", () => {
      const hiddenReplies = nestedComment.querySelectorAll(".hidden");
      if (!hiddenReplies.length) {
        const allCommentDivs = document.querySelectorAll(".comment");
        allCommentDivs.forEach((commentDiv) => {
          commentDiv.id === "parrent" || commentDiv.classList.add("hidden");
        });
      } else {
        hiddenReplies.forEach((reply) => reply.classList.remove("hidden"));
      }
    });
  }
  comment.replies.forEach((reply) => {
    nestedComment.appendChild(setComment(reply));
  });
  return nestedComment;
}

function draw(coms) {
  coms.forEach((comment) => {
    const div = setComment(comment);
    if (comment.parentId) {
      div.classList.add("hidden");
    }
    cont.appendChild(div);
  });
}

draw(comments);
