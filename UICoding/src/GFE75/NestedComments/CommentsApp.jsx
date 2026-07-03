import { useState } from "react";
import CommentBox from "./CommentBox";
import commentsData from "./commentsData.json";

const CommentsApp = () => {
  const [comments, setComments] = useState(commentsData.comments);

  const addComment = (value, parentId) => {
    const newId = Date.now();
    const newComment = { id: newId, value, parentId, children: [] };
    setComments((prevComments) => {
      const updatedComments = { ...prevComments, [newId]: newComment };
      updatedComments[parentId].children.push(newId);
      return updatedComments;
    });
  };

  const deleteComment = (id) => {
    const parentId = comments[id].parentId;
    // Remove from UI
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      if (parentId) {
        updatedComments[parentId].children = updatedComments[
          parentId
        ].children.filter((childId) => {
          return childId !== id;
        });
      }
      const queue = [id];
      while (queue.length > 0) {
        const nodeToDelete = queue.shift();
        queue.push(...updatedComments[nodeToDelete].children);

        delete updatedComments[nodeToDelete];
      }
      return updatedComments;
    });
  };

  return (
    <CommentBox
      comment={comments[1]}
      allComments={comments}
      addComment={addComment}
      deleteComment={deleteComment}
    />
  );
};

export default CommentsApp;
