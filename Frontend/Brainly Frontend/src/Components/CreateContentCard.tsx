import { useRef, useState } from "react"
import { CloseIcon } from "../icons/Close"
import { Input } from "./Input"

import Button from "./Button"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContenst";

interface Contenttype {
    open: boolean,
    onclose: () => void,
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "x"
}

export function CreateContentCard({open, onclose}: Contenttype){

    const {refresh} = useContent();

    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();

    const [type, settype] = useState(ContentType.Youtube)

    async function CreateContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                type,
                title
            }, {
                headers: {
                    "Authorization": localStorage.getItem("jwt_token")
                }
            })

            refresh();

            titleRef.current!.value = ""
            linkRef.current!.value = ""

            console.log("Content created successfully")
        } catch (error) {
            
        }

        onclose();
        
    }
    
    return <div>
        {open && <div className="w-screen flex justify-center h-screen bg-slate-500 fixed top-0 left-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
            <div className="flex flex-col justify-center">
                <span className="bg-white p-2 rounded-md min-w-80 min-h-72">
                    <div className="flex justify-end pt-2 pr-3">
                        <CloseIcon close={onclose}/>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5 p-1 mt-7 w-[100%]">
                        <Input reff={titleRef} placeholder="Title"/>
                        <Input reff={linkRef} placeholder="Link"/>
                    </div>
                    <div className="flex p-2 items-center justify-center">
                        <Button sizeStyles="md" text="Youtube" varient={type == "youtube" ? "primary" : "secondary"} onclose={() =>{
                            settype(ContentType.Youtube)
                        }}/>
                        <Button sizeStyles="md" text="Twitter" varient={type == "x"? "primary" : "secondary"} onclose={() =>{
                            settype(ContentType.Twitter)
                        }}/>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button onClick={CreateContent} className="bg-purple-300 p-2 rounded-lg">Submit</button>
                    </div>
                </span>
            </div>
        </div>}
    </div>
}