import BlockChart from '@/components/Chart/BlockChart';

import LineChart from '@/components/Chart/LineChart';
import StackedBarChart from '@/components/Chart/StackChart';

import Layout from '@/components/layout/layout';

const ChartPage = () => {
  const LineData = [
    { date: '2023-01-02', people: 100 },
    { date: '2023-01-02', people: 85 },
    { date: '2023-01-02', people: 180 },
    { date: '2023-01-02', people: 135 },
    { date: '2023-01-02', people: 160 },
    { date: '2023-01-03', people: 160 },
  ];
  const BlockData = [
    { tag: '#1', count: 10 },
    { tag: '#2', count: 150 },
    { tag: '#3', count: 180 },
    { tag: '#4', count: 120 },
    { tag: '#5', count: 160 },
  ];

  const stackedData = [
    { date: '2023-01-02', 자유게시판: 50, 질문게시판: 30, 기타게시판: 20 },
    { date: '2023-01-03', 자유게시판: 70, 질문게시판: 40, 기타게시판: 40 },
    { date: '2023-01-04', 자유게시판: 30, 질문게시판: 20, 기타게시판: 10 },
    { date: '2023-01-05', 자유게시판: 80, 질문게시판: 60, 기타게시판: 40 },
    { date: '2023-01-06', 자유게시판: 60, 질문게시판: 30, 기타게시판: 50 },
    { date: '2023-01-07', 자유게시판: 60, 질문게시판: 30, 기타게시판: 50 },
    { date: '2023-01-08', 자유게시판: 30, 질문게시판: 30, 기타게시판: 50 },
    { date: '2023-01-09', 자유게시판: 12, 질문게시판: 30, 기타게시판: 50 },
    { date: '2023-01-10', 자유게시판: 53, 질문게시판: 30, 기타게시판: 50 },
  ];

  return (
    <Layout>
      <div className="p-4 grid gird-cols-2 tablet:flex tablet:flex-col">
        <LineChart campaign={LineData} />
        <BlockChart data={BlockData} />
        <StackedBarChart data={stackedData} />
      </div>
    </Layout>
  );
};

export default ChartPage;
