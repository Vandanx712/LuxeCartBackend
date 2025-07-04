import Navbar from '../components/common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
