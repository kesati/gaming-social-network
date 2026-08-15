const User = require("./User");
const UserProfile = require("./UserProfile");
const Game = require("./Game");
const Post = require("./Post");
const Reaction = require("./Reaction");
const Comment = require("./Comment");


// User - UserProfile
User.hasOne(UserProfile, {
    foreignKey: "user_id",
    as: "profile",
});

UserProfile.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Game - Post
Game.hasMany(Post, {
    foreignKey: "game_id",
    as: "posts",
});

Post.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game",
});

// User - Post
User.hasMany(Post, {
    foreignKey: "user_id",
    as: "posts",
});

Post.belongsTo(User, {
    foreignKey: "user_id",
    as: "author",
});

// User - Reaction
User.hasMany(Reaction, {
    foreignKey: "user_id",
    as: "reactions",
});

Reaction.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Post - Reaction
Post.hasMany(Reaction, {
    foreignKey: "post_id",
    as: "reactions",
});

Reaction.belongsTo(Post, {
    foreignKey: "post_id",
    as: "post",
});

// User - Comment
User.hasMany(Comment, {
    foreignKey: "user_id",
    as: "comments",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    as: "author",
});

// Post - Comment
Post.hasMany(Comment, {
    foreignKey: "post_id",
    as: "comments",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    as: "post",
});


module.exports = {
    User, UserProfile, Game, Post, Reaction, Comment
};