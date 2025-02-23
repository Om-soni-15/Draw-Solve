import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [image, setImage] = useState(null);
    const [textPrompt, setTextPrompt] = useState("");
    const [markdownText, setMarkDownText] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);




    const contextValue = {
        image,
        setImage,
        textPrompt,
        setTextPrompt,
        markdownText,
        setMarkDownText,
        displayText,
        setDisplayText,
        messages,
        setMessages,
        isOpen,
        setIsOpen
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;