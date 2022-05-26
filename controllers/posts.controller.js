import {PostModel} from "../models/posts.model.js";
import {UserModel} from "../models/user.model.js";


export const getPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    let listPost = await PostModel.find().where('userId').equals(userId);
    const {avatar, firstName, lastName} = await UserModel.findById(userId);
    listPost = listPost.map(item => {
      return {
        avatar,
        fullName: firstName + ' ' +lastName,
        ...item._doc
      }
    })
    res.status(200).json(listPost);
  } catch (err) {
    res.status(500).json({error: err});
  }
};

export const createPost = async (req, res) => {
  try {
    const article = {...req.body, media: []};
    const user = await UserModel.findById(req.body.userId);
    if (req.files) {
      req.files.forEach((file) => {
        if (!article.media.map(item => item.path).includes(`img/${file.filename}`)) {
          article.media.push(
              {
                path: `img/${file.filename}`,
                type: file.mimetype
              }
          );
        }

        if (!user.album.includes(`img/${file.filename}`)) {
          user.album.push(`img/${file.filename}`)
        }
      })
    }
    user.save();
    const newPost = new PostModel(article);
    await newPost.save();

    res.status(200).json("create article successfully");
  } catch (err) {
    res.status(500).json({error: err});
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatePost = req.body;

    const post = await PostModel.findOneAndUpdate(
        {_id: updatePost._id},
        updatePost,
        {new: true}
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({error: err});
  }
};

export const deletePost = async (req, res) => {
  try {
    const updatePost = req.body;

    const post = await PostModel.findOneAndUpdate(
        {_id: updatePost._id},
        updatePost,
        {new: true}
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({error: err});
  }
};
