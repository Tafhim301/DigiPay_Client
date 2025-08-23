import { Outlet } from 'react-router'
import CommonLayout from './components/Layout/CommonLayout'



function App() {


  return (
    <div>





      <CommonLayout>
        <div className='md:mx-8 mx-2'>

          <Outlet></Outlet>
        </div>
      </CommonLayout>


    </div>


  )
}

export default App
