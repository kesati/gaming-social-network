require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db")

const PORT = process.env.PORT || 5001;


async function startServer() {
    try {
        await sequelize.authenticate();

        app.listen(PORT, () => {
            console.log(`server is running on PORT: ${PORT}`);
        })
    } catch (err) {
        console.log(`err: ${err.message}`);
        console.error(err);
    }
}

startServer();
