import Footer from './footer';
import Header from './header';

interface LayoutProp {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProp) => {
  return (
    <main className="overflow-hidden scrollbar-hide w-full bg-white  mx-auto">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
