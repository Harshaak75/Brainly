import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function usegetlink({shareLink}: any){
    const [contents, setcontents] = useState([]);

    async function getlinkCode(){
        await axios.get(
            `${BACKEND_URL}/api/v1/brain/?shareLink=${shareLink}`
          )
          .then((response) =>{
            const contentData = response.data.content;
            console.log(typeof response.data.content)
            setcontents([contentData])
        })
    }
      useEffect(() => {
        if (shareLink) {
          getlinkCode();
        } else {
          console.error("Share link is missing in the URL.");
        }
      }, [shareLink]);


    return contents;
}