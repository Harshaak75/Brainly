import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(){
    const [contents, setcontents] = useState([])

    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers:{
                Authorization: localStorage.getItem("jwt_token")
            }
        })
        .then((response) =>{
            setcontents(response.data.content)
        })
    }

    useEffect(() =>{
        refresh();
         const timmer = setInterval(() => {
            refresh()
         }, 10 * 1000);

         return () => {
             clearInterval(timmer)
         } 
    }, [])

    return {contents,setcontents, refresh };
}