import { createContext, useEffect, useState } from "react";
import axios from 'axios';


export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const [image, setImage] = useState(null);
    const [textPrompt, setTextPrompt] = useState("");
    const [markdownText, setMarkDownText] = useState("");
    


    const contextValue = {
        image,
        setImage,
        textPrompt,
        setTextPrompt,
        markdownText,
        setMarkDownText
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;