import { useNavigate } from 'react-router-dom';

const ChartSideBar = () => {
  const navigate = useNavigate();

  // 홈으로 이동
  const handleHome = () => {
    navigate('/');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col items-start pl-8 mt-7 py-4">
        <p className="bg-white text-2xl font-bold text-[#ee3918] z-10">Testsite</p>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <button onClick={handleHome} className="text-lg font-medium text-gray-700">
                테스트 대시보드
              </button>
            </li>
            <li>
              <button className="text-lg font-medium text-[#ee3918]">기본 대시보드</button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default ChartSideBar;
