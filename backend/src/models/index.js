const User = require("./User");
const UserProfile = require("./UserProfile");
const Game = require("./Game");
const Post = require("./Post");
const Reaction = require("./Reaction");
const Comment = require("./Comment");
const Room = require("./Room");
const RoomMember = require("./RoomMember");
const Message  = require("./Message");

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

// User - Room
User.hasMany(Room, {
    foreignKey: "host_id",
    as: "hostedRooms",
});

Room.belongsTo(User, {
    foreignKey: "host_id",
    as: "host",
});

// Game - Room
Game.hasMany(Room, {
    foreignKey: "game_id",
    as: "rooms",
});

Room.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game",
});

// Room - RoomMember
Room.hasMany(RoomMember, {
    foreignKey: "room_id",
    as: "members",
});

RoomMember.belongsTo(Room, {
    foreignKey: "room_id",
    as: "room",
});

// User - RoomMember
User.hasMany(RoomMember, {
    foreignKey: "user_id",
    as: "roomMemberships",
});

RoomMember.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// Room - Message
Room.hasMany(Message, {
    foreignKey: "room_id",
    as: "messages",
});

Message.belongsTo(Room, {
    foreignKey: "room_id",
    as: "room",
});

// User - Message
User.hasMany(Message, {
    foreignKey: "sender_id",
    as: "messages",
});

Message.belongsTo(User, {
    foreignKey: "sender_id",
    as: "sender",
});


module.exports = {
    User, UserProfile, Game, Post, Reaction, Comment, Room, RoomMember, Message
};