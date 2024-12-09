"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const db1_1 = require("./Database/db1");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./Middleware/middleware");
// import { random } from "./utiles.ts";
const utiles_1 = require("./utiles");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log("user name is ", username);
    try {
        // console.log(password);
        yield db1_1.user.create({ username, password });
        console.log("User created successfully");
        res.json({
            message: "User created successfully",
        });
    }
    catch (error) {
        console.error("Error during user creation:", error);
        res.status(403).send({
            message: "User already exists",
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const valid_user = yield db1_1.user.findOne({ username, password });
        if (valid_user) {
            const token = jsonwebtoken_1.default.sign({
                id: valid_user._id,
            }, config_1.serect);
            res.json({
                message: "User authenticated successfully",
                token,
            });
        }
        else {
            res.status(401).send({
                message: "Invalid username or password",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error during authentication",
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    try {
        yield db1_1.contentModel.create({
            link,
            type,
            title,
            //@ts-ignore
            userId: req.userId,
            tags: [],
        });
        res.json({
            message: "Content created successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "errro while creating content",
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = yield db1_1.contentModel.find({
            userId: userId
        }).populate("userId", "username");
        res.json({
            content
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({ message: "eoorin showing the content" });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    // const content_id = req.userId;
    const { content_id } = req.body;
    try {
        yield db1_1.contentModel.deleteOne({
            _id: content_id
        });
        res.json({
            message: "the content is deleted"
        });
    }
    catch (error) {
        res.json({ message: "error during delete content", error });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const shareLink = (0, utiles_1.random)(10);
        yield db1_1.linkModel.create({
            hash: shareLink,
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Link shared successfully",
            shareLink
        });
        return;
    }
    yield db1_1.linkModel.deleteOne({
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Link deleted successfully",
    });
}));
app.get("/api/v1/brain", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shareLink = req.query.shareLink;
    // console.log(shareLink)
    const linkData = yield db1_1.linkModel.findOne({
        hash: shareLink
    });
    if (!linkData) {
        res.json({
            message: "link is not present"
        });
        return;
    }
    const content = yield db1_1.contentModel.find({
        userId: linkData.userId
    });
    if (!content) {
        res.json({
            message: "content is not present"
        });
        return;
    }
    const userData = yield db1_1.user.find({
        _id: linkData.userId
    });
    if (!userData) {
        res.json({
            message: "user is not present"
        });
        return;
    }
    res.json({
        username: userData,
        content: content
    });
}));
app.listen(config_1.port, () => console.log(`Server is running on port ${config_1.port}`));
