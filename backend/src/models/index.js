const User = require("./User");
const UserProfile = require("./UserProfile");

User.hasOne(UserProfile, {
    foreignKey: "user_id",
    as: "profile",
});

UserProfile.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

module.exports = {
    User,
    UserProfile,
};