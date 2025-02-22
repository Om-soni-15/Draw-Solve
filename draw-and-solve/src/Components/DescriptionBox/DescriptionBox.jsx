import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../Contexts/StoreContext'

const DescriptionBox = () => {

  const { textPrompt, setTextPrompt, handleReset } = useContext(StoreContext);


  const handleTextChange = (event) => {
    setTextPrompt(event.target.value);
  }
  



  return (
    <>
      <main className="flex align-center justify-center mx-7 /*bg-cyan-500*/ flex-grow max-h-30 min-w-210">

        <input id='input-text' onChange={handleTextChange} className='border-10 border-red-100 self-center w-full h-full' type="text" />

      </main>
    </>
  )
}

export default DescriptionBox