import { songContext } from "../song.context.jsx";
import { useContext } from "react";
import { getSong } from "../services/song.api.js";

export const useSong = () => {
    const context=useContext(songContext)
    const {loading,setloading,song,setsong}=context;
    async function handleGetSongs({mood}){
        setloading(true);
        const data=await getSong({mood});
        setsong(data.song)
        setloading(false)
    }

    return {handleGetSongs,loading,song}
}


