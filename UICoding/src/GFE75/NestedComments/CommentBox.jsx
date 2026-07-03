import { useState } from "react";
import ReplyComments from "./ReplyComments";
import "./CommentBox.css";

const CommentBox = ({ comment, allComments, addComment, deleteComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const handleClick = () => {
    setShowReplyBox(!showReplyBox);
  };
  return (
    <div className="comment-container">
      <div className="comment-content">{comment.value}</div>
      <div className="comment-actions">
        <button className="reply-btn" onClick={handleClick}>
          {showReplyBox ? "Cancel" : "Reply"}
        </button>
        <button
          className="delete-btn"
          onClick={() => deleteComment(comment.id)}
        >
          Delete
        </button>
      </div>
      {showReplyBox && (
        <ReplyComments
          setShowReplyBox={setShowReplyBox}
          addComment={addComment}
          id={comment.id}
        />
      )}
      <div className="nested-comments">
        {comment.children.map((childId) => {
          return (
            <CommentBox
              key={childId}
              comment={allComments[childId]}
              allComments={allComments}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentBox;
