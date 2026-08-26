import { createContext } from "react";
import { useState } from "react";

export const songContext=createContext()

export function SongContextProvider({children}){
    const [song, setsong] = useState({
        
         
        "url": "https://ik.imagekit.io/1ilvoqg79/cohort/moodify/songs/Shacky_XgVSIYdWG",
        "posterUrl": "https://ik.imagekit.io/1ilvoqg79/cohort/moodify/posters/Shacky-poster_d42IcUYrO?updatedAt=1787745366709",
        "title": "Shacky",
        "mood": "happy",
        
    
        
    })
    const [loading, setloading] = useState(false)
    return(
        <songContext.Provider value={{loading,setloading,song,setsong}}>
            {children}
        </songContext.Provider>
    )
    


}