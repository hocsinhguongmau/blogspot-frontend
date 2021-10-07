import Header from './header/Header'
import Footer from './footer/Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
