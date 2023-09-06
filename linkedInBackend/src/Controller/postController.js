import PostModel from "../Models/postModel.js";
import ProfileModel from "../Models/profileModel.js";
import { asyncHandler } from "../Utilities/asyncHandler.js";
import { responseHandler } from "../Utilities/responseHandler.js";
export const createPost = asyncHandler(async (req, res, next) => {
  const post = req.body;
  const profileId = req.params.id;
  if (!post)
    return next(
      new ErrorHandler(
        "we could not fulfilled your request because of no information!",
        "failed",
        404
      )
    );
  if (!profileId)
    return next(
      new ErrorHandler("Could not find profile of the person!", "failed", 404)
    );
  const newPost = new PostModel(post);
  await newPost.save();
  const updatePost = await ProfileModel.updateOne(
    { _id: profileId },
    { $push: { posts: newPost._id } }
  );
  res.status(201).json(updatePost);
  if (updatePost.modifiedCount == 1)
    return res.json(responseHandler(education, "success", 200));
  return next(new ErrorHandler("Could not make a new post!", "failed", 404));
});

export const makeComment = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const commentsContent = req.body;
  if (!userId && !postId)
    return next(
      new ErrorHandler("could not fulfilled your request !", "failed", 404)
    );
  if (!commentsContent)
    return next(
      new ErrorHandler("could not fulfilled your request !", "failed", 404)
    );
  const comment = await PostModel.updateOne(
    { _id: postId },
    { $push: { comments: { user: userId, text: commentsContent.text } } }
  );
  return res.json(
    responseHandler("commented on a post succesfully", "success", 200)
  );
});

export const likePost = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  const postId = req.params.postId;
  if (!postId)
    return next(new ErrorHandler("could not find the post !", "failed", 404));
  const like = await PostModel.updateOne(
    { _id: postId },
    { $push: { likes: userId } }
  );
  return res.json(responseHandler("liked a post succesfully", "success", 200));
});

export const getAllPost = asyncHandler(async (req, res, next) => {
  const post = await PostModel.find();
  if (!post)
    return next(new ErrorHandler("could not find the post !", "failed", 404));
  return res.json(responseHandler("liked a post succesfully", "success", 200));
});
