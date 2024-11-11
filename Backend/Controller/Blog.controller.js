import { Blog } from "../Modal/Blog.modal.js";

export const create = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const userId = req.id;
    console.log(title, description, userId);

    if (!title || !description || !tag) {
      return res.status(400).json({
        success: false,
        success: "Something Is Missing",
      });
    }

    const newPost = await Blog.create({
      title,
      description,
      userId,
      tag,
    });

    if (!newPost) {
      return res.status(400).json({
        success: false,
        message: "Your Post Is Not Created",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Post Is Created Successfully",
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const userPost = async (req, res) => {
  try {
    const userId = req.id;
    const posts = await Blog.find({ userId });
    if (!posts) {
      return res.status(400).json({
        success: "Post Is Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "These Are The Your Post",
      posts,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const allPost = async (req, res) => {
  try {
    const posts = await Blog.find();
    if (!posts) {
      return res.status(400).json({
        success: "Post Is Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "These Are The Your Post",
      posts,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const postById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const posts = await Blog.findOne({ _id: id });
    if (!posts) {
      return res.status(400).json({
        success: "Post Is Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "These Are The Your Post",
      posts,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
