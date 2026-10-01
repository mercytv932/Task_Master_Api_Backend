const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/api/userRoutes.js");
const projectRouter = require("./routes/api/projectRoutes.js");
const taskRouter = require("./routes/api/taskRoutes.js");
const connectMongoDB = require("./config/databaseConnection.js");
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
connectMongoDB();

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
