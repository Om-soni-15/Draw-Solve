import CanvasBox from './Components/CanvasBox/CanvasBox'
import DescriptionBox from './Components/DescriptionBox/DescriptionBox'
import ExampleSideBox from './Components/ExampleSideBox/ExampleSideBox'
import NavbarTop from './Components/NavbarTop/NavbarTop'
// import './App.css'




function App() {

  return (
    <div >
      <NavbarTop></NavbarTop>

      <div className="flex  min-h-screen">
        <div className="flex flex-col w-[506]">
          <CanvasBox />
          <DescriptionBox />
        </div>
        <ExampleSideBox className="" />
      </div>


    </div>
  )

}

export default App