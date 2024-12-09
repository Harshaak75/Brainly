import { model, Schema } from "mongoose";
import mongoose from "mongoose";

import { Connection_mb } from "../config";


mongoose.connect(Connection_mb);

const userScheme = new Schema({
    username: {type: "string",unique: true, required: true},
    password: {type: "string",required: true}
});

export const user = model("User", userScheme);

// always use first argument data in ref

// like model("User", username) => userId: ..., ref:"User"

const contentSchema = new Schema({
    link: String,
    type: String,
    title: String,
    tags: [{type: mongoose.Types.ObjectId, ref:"Tags"}],
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})

export const contentModel = model("Content", contentSchema);


const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})

export const linkModel = model("Link", LinkSchema);