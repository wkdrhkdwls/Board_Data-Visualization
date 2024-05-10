import Footer from './footer';
import Header from './header';

interface LayoutProp {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProp) => {
  return (
    <>
      <Header />
      <main className="overflow-y-hidden scrollbar-hide w-full h-full bg-white mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
