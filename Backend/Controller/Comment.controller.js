import { Comment } from "../Modal/Comment.modal.js";

export const newcomment = async (req, res) => {
  try {
    const { comment, userId } = req.body;
    const { postId } = req.params;
    console.log(req.params);
    console.log(comment, userId, postId);

    if (!comment || !userId || !postId) {
      // Check all required fields
      return res.status(400).json({
        success: false,
        message: "Missing required fields", // Change message to indicate missing postId as well
      });
    }

    const newComment = await Comment.create({
      postId, // Use postId, not id
      userId,
      comment,
    });

    if (!newComment) {
      return res.status(400).json({
        success: false,
        message: "Your comment could not be added.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Your comment has been added successfully!",
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getallComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ postId: id })
      .populate({ path: "userId", select: "name" })
      .select("comment createdAt");

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Comments not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "These are the comments",
      comments,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
