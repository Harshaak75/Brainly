import { useEffect, useState } from "react";

import Button from "../Components/Button";
import { Shareicon } from "../icons/share";
import { Plusicon } from "../icons/plus";
import { DeleteIcon } from "../icons/Delete";

import { Cards } from "../Components/Cards";
import { CreateContentCard } from "../Components/CreateContentCard";
import { Sidebar } from "../Components/Sidebar";
import { useContent } from "../hooks/useContenst";
import axios from "axios";
import { BACKEND_URL, shareLink } from "../config";
import getLink from "../Components/getLink";

function MainComponents() {
  const [contentopen, onContentopen] = useState(false);

  const {contents,setcontents, refresh} = useContent();

  async function handleDelete(id: any){
    // console.log("delete",id)

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`,{
        headers: {
          Authorization: localStorage.getItem("jwt_token"),
        },
        data: {
          content_id:id
        }
      })

      refresh();

      const updatedContent = contents.filter((item: any) => item._id != id)
      setcontents(updatedContent)

      

      console.log("Successfully deleted")
    } catch (error) {
      console.log("error in delete part", error)
    }
  }

  useEffect(()=>{
    refresh();
  },[contentopen,setcontents])

  return (
    <div>
      <div className="">
        <Sidebar />
      </div>
      <div className="ml-64 p-4 min-h-screen bg-gray-100">
        <CreateContentCard
          open={contentopen}
          onclose={() => {
            onContentopen(false);
          }}
        />
        <div className="flex justify-end flex-wrap">
          <Button
            varient="secondary"
            text="Add Content"
            sizeStyles="md"
            icons={<Plusicon />}
            onclose={() => {
              onContentopen(true);
            }}
          />
          <Button
            varient="primary"
            text="Share Brain"
            sizeStyles="md"
            icons={<Shareicon />}
            onclose={async ()=>{
              const link = await getLink();
              console.log("the link i got is", link)
              alert(`Link copied to clipboard: ${shareLink}${link}`);
              navigator.clipboard.writeText(`${shareLink}${link}`);
              // alert(`${shareLink}${link}`)
            }}
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          {contents.map(({_id, title, link, type }) => (
            <Cards
              head={title}
              shareIcon={<Shareicon />}
              DeleteIcon={<DeleteIcon click={() =>handleDelete({_id})}/>}
              type={type}
              link={link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainComponents;
