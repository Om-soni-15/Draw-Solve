import { useContext } from 'react'
import CanvasBox from './Components/CanvasBox/CanvasBox'
import DescriptionBox from './Components/DescriptionBox/DescriptionBox'
import NavbarTop from './Components/NavbarTop/NavbarTop'
import { StoreContext } from './Contexts/StoreContext'

import MarkdownBox from './Components/ExampleSideBox/ExampleSideBox'
// import './App.css'




function App() {



  return (
    <div>
      <NavbarTop></NavbarTop>

      <div className="flex  min-h-screen">
        <div className="flex flex-col w-[506]">
          <CanvasBox />
          <DescriptionBox />
        </div>

        <div className=" /*bg-red-50*/ flex min-w-90 max-h-150 my-17">
          <MarkdownBox />
        </div>
      </div>


    </div>
  )

}

export default App