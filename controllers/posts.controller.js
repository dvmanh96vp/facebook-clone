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

          if(!user.album.map(item => item.path).includes(`img/${file.filename}`)) {
            user.album.push({path: `img/${file.filename}`, type: file.mimetype});
          }
        }
      })
    }
    await user.save();
    const newPost = new PostModel(article);
    await newPost.save();

    res.status(200).json("create article successfully");
  } catch (err) {
    res.status(500).json({error: err});
  }
};

export const updatePost = async (req, res) => {
  try {
    const body = req.body;
    const post = await PostModel.findById(body.id);
    if(body.hasOwnProperty('like')) {
      if(!post.likes.includes(body.userId)) {
        post.likes.push(body.userId)
      } else {
        post.likes = post.likes.filter(id  => id !== body.userId);
      }
      await post.save();
    }
    if(body.hasOwnProperty('desc')) {
      post.update({desc: body.desc})
    }
    res.status(200).json("update post successfully");
  } catch (err) {
    res.status(500).json({error: err});
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.body.id;
    await PostModel.deleteOne({_id: id});
    res.status(200).json("delete this post successfully");
  } catch (err) {
    res.status(500).json({error: err});
  }
};
