import Layout from '@/components/layout/layout';

import { DashBoardTable } from '@/utils/DashBoardTable';

function Home() {
  return (
    <Layout>
      <div className="mx-[390px] mobile:mx-2 tablet:mx-[20px] flex justify-center flex-col">
        <DashBoardTable />
      </div>
    </Layout>
  );
}

export default Home;
