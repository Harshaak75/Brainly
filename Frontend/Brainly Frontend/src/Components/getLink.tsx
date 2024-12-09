import axios from "axios"
import { BACKEND_URL, shareLink } from "../config"

async function getLink(){
    
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/brain/share`,
      { share: true },
      {
        headers: {
          Authorization: localStorage.getItem("jwt_token"),
        },
      }
    );
    console.log("is this a link", response.data.shareLink);
    return response.data.shareLink;
  } catch (error) {
    console.error("Error fetching the share link:", error);
    return null; // Handle errors gracefully
  }
}

export default getLink