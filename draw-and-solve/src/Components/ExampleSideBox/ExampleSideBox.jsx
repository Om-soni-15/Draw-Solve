import React, { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { StoreContext } from "../../Contexts/StoreContext";

const MarkdownBox = () => {


    const { displayText, setDisplayText } = useContext(StoreContext);

    const { markdownText } = useContext(StoreContext);

    useEffect(() => {
        if (!markdownText) return; // Prevent running when markdownText is empty

        setDisplayText(""); // Reset text when new data arrives

        const words = markdownText.split(" ");
        let index = 0;

        const interval = setInterval(() => {
            if (index < words.length - 1) {
                if (words[index] !== 'undefined') {
                    setDisplayText((prev) => prev + (prev ? " " : "") + words[index]);
                }
                index++; // Move to the next word regardless
            } else {
                clearInterval(interval);
            }
        }, 100);

        // console.log(words);

        return () => clearInterval(interval);
    }, [markdownText]); // Re-run when markdownText updates


    return (
        <motion.div
            className="mx-auto px-7 border border-gray-300 rounded-2xl shadow-lg bg-white text-center h-full w-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            <div className="my-10">
                <ReactMarkdown>{displayText}</ReactMarkdown>
            </div>


        </motion.div>
    );
};

export default MarkdownBox;
