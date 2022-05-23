import { PostModel } from "../models/posts.model.js";


export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost = async (req, res) => {
  try {
    const article = {...req.body, media: []};
    if(req.files) {
      req.files.forEach((file) => {
        if(!article.media.includes(`img/${file.filename}`)) {
          article.media.push(`img/${file.filename}`);
        }
      })
    }
    const newPost = new PostModel(article);
    await newPost.save();

    res.status(200).json("create article successfully");
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatePost = req.body;

    const post = await PostModel.findOneAndUpdate(
      { _id: updatePost._id },
      updatePost,
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deletePost = async (req, res) => {
  try {
    const updatePost = req.body;

    const post = await PostModel.findOneAndUpdate(
        { _id: updatePost._id },
        updatePost,
        { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
