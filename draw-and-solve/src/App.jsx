import CanvasBox from './Components/CanvasBox/CanvasBox'
import DescriptionBox from './Components/DescriptionBox/DescriptionBox'
import NavbarTop from './Components/NavbarTop/NavbarTop'
import MarkdownBox from './Components/ExampleSideBox/ExampleSideBox'
import Chatbox from './Components/ChatBox/ChatBox'


function App() {

  return (
    <div>
      <NavbarTop />

      <div className="flex  min-h-full">
        <div className="flex flex-col w-[506]">
          <CanvasBox />
          <DescriptionBox />
        </div>

        <div className=" /*bg-red-50*/ flex min-w-90 max-h-150 my-17">
          <MarkdownBox />
        </div>
      </div>
      <Chatbox></Chatbox>

    </div>
  )

}

export default App