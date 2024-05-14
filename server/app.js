import express from "express";
import "dotenv/config";
import ErrorMiddleware from "./middleware/Error.js";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";

export const app = express();

//Use Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(passport.initialize());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Routes
import user from "./routes/userRoutes.js";
import googleAuthRoutes from "./Controller/googleauth.js";

app.use("/api/v1", user);
app.use("/api/v1/auth", googleAuthRoutes);

app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome, Website is Working on ${process.env.FRONTEND_URL} click <a href=${process.env.FRONTEND_URL}>here</a></h1>`
  );
});
app.use(ErrorMiddleware);
