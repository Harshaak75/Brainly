import express from "express";
import { port, serect } from "./config";
import { user, contentModel, linkModel} from "./Database/db1";
import jwt from "jsonwebtoken";
import cors from "cors"

import { userMiddleware } from "./Middleware/middleware";

// import { random } from "./utiles.ts";

import { random } from "./utiles";

const app = express();

app.use(express.json());

app.use(cors())

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  console.log("user name is ",username);

  try {
    // console.log(password);
    await user.create({ username, password });
    console.log("User created successfully");
    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(403).send({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const valid_user = await user.findOne({ username, password });

    if (valid_user) {
      const token = jwt.sign(
        {
          id: valid_user._id,
        },
        serect
      );

      res.json({
        message: "User authenticated successfully",
        token,
      });
    } else {
      res.status(401).send({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error during authentication",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { link, type, title } = req.body;

  try {
    await contentModel.create({
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
  } catch (error) {
    console.log(error)
    res.json({
        message: "errro while creating content",
    })
  }
});

app.get("/api/v1/content",userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;

    try {
        const content = await contentModel.find({
            userId: userId
        }).populate("userId", "username")
    
        res.json({
            content
        })
    } catch (error) {
        console.log(error)
        res.status(411).json({message: "eoorin showing the content"})
    }
    
});

app.delete("/api/v1/content",userMiddleware, async (req, res) => {
    //@ts-ignore
    // const content_id = req.userId;

    const {content_id} = req.body;

    try {
      await contentModel.deleteOne({
        _id: content_id
      })

      res.json({
        message: "the content is deleted"
      })
    } catch (error) {
      res.json({message: "error during delete content", error})
    }
});

app.post("/api/v1/brain/share",userMiddleware, async (req, res) => {
  const { share } = req.body;

  if(share){
    const shareLink = random(10);

    await linkModel.create({
      hash: shareLink,
      //@ts-ignore
      userId: req.userId
    })

    res.json({
      message: "Link shared successfully",
      shareLink
    })
    return;
  }

  await linkModel.deleteOne({
    //@ts-ignore
    userId: req.userId
  })

  res.json({
    message: "Link deleted successfully",
  })

});

app.get("/api/v1/brain",async (req, res) => {
  const shareLink = req.query.shareLink
  // console.log(shareLink)
  const linkData = await linkModel.findOne({
    hash: shareLink
  })

  if(!linkData){
    res.json({
      message: "link is not present"
    })
    return;
  }

  const content = await contentModel.find({
    userId: linkData.userId
  })

  if(!content){
    res.json({
      message: "content is not present"
    })
    return;
  }

  const userData = await user.find({
    _id: linkData.userId
  })

  if(!userData){
    res.json({
      message: "user is not present"
    })
    return;
  }

  res.json({
    username: userData,
    content: content
  })

});

app.listen(port, () => console.log(`Server is running on port ${port}`));
