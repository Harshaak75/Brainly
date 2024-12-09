import { useEffect, useState } from "react";
import { Cards } from "../Components/Cards";
import { Sidebar } from "../Components/Sidebar";
import { DeleteIcon } from "../icons/Delete";
import { Shareicon } from "../icons/share";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

export function ShareDashboard() {
  // const {contents, refresh} = useContent();

  const [content, setcontents] = useState([]);
  const {shareLink} = useParams();

  // const content = usegetlink({shareLink})

  const getDataFromLink = async () =>{
    // console.log("getDataFromLink",shareLink)
    const response = await axios.get(`${BACKEND_URL}/api/v1/brain`,{
      params: { shareLink }
    })
    console.log(response)
    setcontents(response.data.content)
  }

  useEffect(() =>{
    getDataFromLink();
  }, [shareLink])

  return (
    <div>
      <div className="">
        <Sidebar />
      </div>
      <div className="ml-64 p-4 min-h-screen bg-gray-100">

      <div className="flex gap-3 flex-wrap">
          {content.length > 0 && content.map(({ title, link, type}) => (
            <Cards
              head={title}
              shareIcon={<Shareicon />}
              DeleteIcon={<DeleteIcon />}
              type={type}
              link={link}
            />
          ))}
      </div>
      </div>
    </div>
  );
}
