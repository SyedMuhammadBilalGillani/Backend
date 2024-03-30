const connectDB = require("./db/db.js");
const dotenv = require("dotenv");
const { app } = require("./app.js");

dotenv.config({
    path: "../env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4123, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`DB Connection Failed`, err);
    });
