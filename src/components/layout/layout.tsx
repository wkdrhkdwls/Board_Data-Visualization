import { LayoutProp } from '@/type/Layout/Layout';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }: LayoutProp) => {
  return (
    <>
      <Header />
      <main className="overflow-y-hidden scrollbar-hide w-full min-h-screen bg-white mx-auto mobile:min-h-[calc(10%)]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
