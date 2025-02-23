import { ReactSketchCanvas } from "react-sketch-canvas";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import { StoreContext } from "../../Contexts/StoreContext";


const CanvasBox = () => {

  const {image, setImage, textPrompt, setTextPrompt, setMarkDownText} = useContext(StoreContext)

  

  const canvasRef = useRef(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [imageURL, setImageURL] = useState(null); // State to store the image file




  const handleExportClick = async () => {
    if (canvasRef.current) {
      try {

        const dataURL = await canvasRef.current.exportImage("png");
        setImageURL(dataURL);

        const response = await fetch(imageURL);
        const blob = await response.blob(); // Convert to Blob

        // Create a File object
        const file = new File([blob], "uploaded-image.png", { type: blob.type });

        setImage(file);

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
          

          const response = await fetch(REACT_APP_BACKEND_URL, {
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

  const handleResetClick = () => {
    canvasRef.current?.resetCanvas();
    setTextPrompt("");
  };






  return (

    <header className="flex flex-col m-7 m-7  /*bg-red-500*/  min-h-120 min-w-210">


      <div className="">

        <button
          type="button"

          className="mx-2 w-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          disabled={!eraseMode}
          onClick={handlePenClick}
        >
          Pen
        </button>


        <button
          type="button"
          className="mx-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          disabled={eraseMode}
          onClick={handleEraserClick}
        >
          Eraser
        </button >


        <button
          type="button"
          className="mx-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={handleResetClick}
        >
          Reset
        </button>


        <button
          type="button"
          className="mx-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={handleExportClick}
        >
          Export Image
        </button>




        <div className="h-110">

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
