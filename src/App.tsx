
import { Outlet } from 'react-router'
import Navbar from './components/Navbar/Navbar'


function App() {


  return (
    <div>
      <Navbar></Navbar>


      <div>
        <Outlet></Outlet>
      </div>
    </div>


  )
}

export default App
