import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../Contexts/StoreContext'

const DescriptionBox = () => {

  const { textPrompt, setTextPrompt } = useContext(StoreContext);


  const handleTextChange = (event) => {
    setTextPrompt(event.target.value);
  }




  return (
    <>
      <main className="flex align-center justify-center mx-7 /*bg-cyan-500*/ flex-grow min-h-20 min-w-210">

        <input placeholder='Add aditional prompt' id='input-text' value={textPrompt} onChange={handleTextChange} className='border-10 border-red-100 self-center w-full h-full' type="text" />

      </main>
    </>
  )
}

export default DescriptionBox