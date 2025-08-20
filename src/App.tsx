
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/navbar-02/Navbar'


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
