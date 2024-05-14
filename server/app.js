import express from "express";
import ErrorMiddleware from "./middleware/Error.js";
import passport from "passport";
import bodyParser from "body-parser";
import "dotenv/config";
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
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(passport.initialize());

//Routes
import user from "./routes/userRoutes.js";
import { router } from "./Controller/googleAuth.js";

app.use("/api/v1", user);
app.use("/api/v1/auth", router);

app.get("/api/v1", (req, res) => {
  res.send("Hello World!");
});

app.use(ErrorMiddleware);
