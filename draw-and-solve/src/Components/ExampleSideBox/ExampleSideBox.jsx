import React, { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { StoreContext } from "../../Contexts/StoreContext";

const MarkdownBox = () => {
    const [displayText, setDisplayText] = useState("");

    const { markdownText } = useContext(StoreContext)

    useEffect(() => {
        if (!markdownText) return; // Prevent running when markdownText is empty

        setDisplayText(""); // Reset text when new data arrives

        const words = markdownText.split(" ");
        let index = 0;

        const interval = setInterval(() => {
            if (index < words.length) {
                setDisplayText((prev) => prev + (index === 0 ? "" : " ") + words[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [markdownText]); // Re-run when markdownText updates

    return (
        <motion.div
            className=" max-w-lg mx-auto px-7 border border-gray-300 rounded-2xl shadow-lg bg-white flex justify-center items-center text-center h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            <ReactMarkdown>{displayText}</ReactMarkdown>


        </motion.div>
    );
};

export default MarkdownBox;
