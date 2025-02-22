import { useState } from "react";
import ReactMarkdown from "react-markdown";

function UploadButton() {
    const [image, setImage] = useState(null);
    const [markdown, setMarkdown] = useState("");



    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };



    const uploadImage = async () => {
        if (!image) {
            alert("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://192.168.99.220:4321/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json()  // Get response as text (Markdown format)
            console.log(data);

            setMarkdown(data.response); // Store Markdown response in state
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    
    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={uploadImage}>Upload</button>

            {/* Display the Markdown content */}
            <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
}

export default UploadButton;
