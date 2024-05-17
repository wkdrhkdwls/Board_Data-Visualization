import BlockChart from '@/components/Chart/BlockChart';
import LineChart from '@/components/Chart/LineChart';
import StackedBarChart from '@/components/Chart/StackChart';

import Layout from '@/components/layout/layout';
import { fetchPostsGroupedByDate } from '@/services/DashBoard/dashBoardAPI';
import { PostCountByDateDTO } from '@/type/PostTable/DashBoard';
import { useEffect, useState } from 'react';

const ChartPage = () => {
  const [lineData, setLineData] = useState<PostCountByDateDTO[]>([]);

  useEffect(() => {
    const LineData = async () => {
      try {
        const data = await fetchPostsGroupedByDate();
        setLineData(data);
      } catch (e) {
        console.error(e);
      }
    };

    LineData();
  }, []);

  const BlockData = [
    { tag: '#1', count: 10 },
    { tag: '#2', count: 150 },
    { tag: '#3', count: 180 },
    { tag: '#4', count: 120 },
    { tag: '#5', count: 160 },
  ];
  console.log(lineData);

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
      <div className="p-4 grid grid-cols-2 tablet:flex tablet:flex-col">
        <LineChart campaign={lineData} />
        <BlockChart data={BlockData} />
        <StackedBarChart data={stackedData} />
      </div>
    </Layout>
  );
};

export default ChartPage;
