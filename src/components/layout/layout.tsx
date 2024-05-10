import Footer from './footer';
import Header from './header';

interface LayoutProp {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProp) => {
  return (
    <>
      <Header />
      <main className="w-full h-screen bg-white mx-auto overflow-hidden scrollbar-hide ">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
