import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Bmenu from './Bmenu'

const layout = ({children}) => {
  return (
    <>
        <Navbar />
        <Bmenu />
        {children}
        <Footer />
    </>
  )
}

export default layout