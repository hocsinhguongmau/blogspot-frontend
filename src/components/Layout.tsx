import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
