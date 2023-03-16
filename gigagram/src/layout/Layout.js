import React from 'react';
import Navigation from '../partial/Navigation';
import Footer from '../partial/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;