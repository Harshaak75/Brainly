"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.contentModel = exports.user = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const config_1 = require("../config");
mongoose_2.default.connect(config_1.Connection_mb);
const userScheme = new mongoose_1.Schema({
    username: { type: "string", unique: true, required: true },
    password: { type: "string", required: true }
});
exports.user = (0, mongoose_1.model)("User", userScheme);
// always use first argument data in ref
// like model("User", username) => userId: ..., ref:"User"
const contentSchema = new mongoose_1.Schema({
    link: String,
    type: String,
    title: String,
    tags: [{ type: mongoose_2.default.Types.ObjectId, ref: "Tags" }],
    userId: { type: mongoose_2.default.Types.ObjectId, ref: "User", required: true }
});
exports.contentModel = (0, mongoose_1.model)("Content", contentSchema);
const LinkSchema = new mongoose_1.Schema({
    hash: String,
    userId: { type: mongoose_2.default.Types.ObjectId, ref: "User", required: true }
});
exports.linkModel = (0, mongoose_1.model)("Link", LinkSchema);
