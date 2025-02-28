import { ReactSketchCanvas } from "react-sketch-canvas";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { StoreContext } from "../../Contexts/StoreContext";


const CanvasBox = () => {

  const { image, setImage, textPrompt, setTextPrompt, setMarkDownText, setDisplayText, setMessages, isOpen, setIsOpen } = useContext(StoreContext)


  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [imageURL, setImageURL] = useState(null); // State to store the image file


  const handleExportClick = async () => {
    if (canvasRef.current) {
      try {

        const dataURL = await canvasRef.current.exportImage("png");
        await setImageURL(dataURL);

        const response = await fetch(imageURL);
        const blob = await response.blob(); // Convert to Blob

        // Create a File object
        const file = new File([blob], "uploaded-image.png", { type: blob.type });

        await setImage(file);

      } catch (error) {
        console.error("Error exporting image:", error);
      }
    }
  };


  // API call when imageData changes
  useEffect(() => {
    if (image) {

      console.log(image);

      const uploadImage = async () => {
        try {

          const formData = new FormData();
          formData.append("image", image);
          formData.append("textPrompt", textPrompt);


          const response = await fetch("https://draw-solve.onrender.com/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          console.log(data.response);

          setImage(null)
          await setMarkDownText(data.response)
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

      uploadImage();
    }
  }, [image]);  // Runs whenever imageData changes


  const handleEraserClick = () => {
    setEraseMode(true);
    if (canvasRef.current) {
      canvasRef.current.eraseMode(true);
    }
  };

  const handlePenClick = () => {
    setEraseMode(false);
    if (canvasRef.current) {
      canvasRef.current.eraseMode(false);
    }
  };

  const handleResetClick = async () => {
    canvasRef.current?.resetCanvas();
    setTextPrompt("");
    setDisplayText("");
    setMarkDownText("");
    setImage(null);

    setMessages([]);


    await fetch("http://172.20.122.25:5002/chat_clear", {
      method: "POST",
    });

    setIsOpen(false);

  };


  return (

    <header className="flex flex-col m-7 m-7  /*bg-red-500*/  min-h-120 min-w-210">


      <div className="flex flex-row-reverse">

        <div className="flex flex-col ">


          <button
            type="button"
            className="my-5 mx-2 w-16 h-16 flex items-center justify-center  text-white font-bold border-b-4  rounded-full shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePenClick}
          >
            <img src="/images/pen.png" alt="" />
          </button>



          <button
            type="button"
            className="my-5 mx-2 w-16 h-16 flex items-center justify-center  text-white font-bold border-b-4  rounded-full shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleEraserClick}
          >
            <img src="/images/eraser.png" alt="" />
          </button>

          <button
            type="button"
            className="my-5 mx-2 w-16 h-16 flex items-center justify-center  text-white font-bold border-b-4  rounded-full shadow-lg transition-all duration-300 ease-in-out"
            onClick={handleResetClick}
          >
            <img src="/images/reload.png" alt="" />
          </button>

          <button
            type="button"
            className="my-5 mx-2 w-16 h-16 flex items-center justify-center  text-white font-bold border-b-4 rounded-full shadow-lg transition-all duration-300 ease-in-out"
            onClick={handleExportClick}
          >
            <img src="/images/upload.png" alt="" />
          </button>




        </div>



        <div className="h-110 w-[100vh]">

          <ReactSketchCanvas
            className=""
            ref={canvasRef}
            strokeWidth={2}
            eraserWidth={70}
          />

        </div>

      </div>

    </header>

  );
};

export default CanvasBox;