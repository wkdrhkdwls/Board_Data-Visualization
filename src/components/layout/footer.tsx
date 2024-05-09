const Footer = () => {
  return (
    <div className="w-full h-auto bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 my-28 flex justify-between items-start py-4 ">
        <p className="text-base font-bold">개발자 테스트용</p>
        <div className="space-y-1">
          <p className="text-sm">대표 홍길동 ㅣ 사업자 등록 번호 123-4567-890</p>
          <p className="text-sm">서울특별시 가가동 나나로 111-2 8층</p>
          <p className="text-sm">통신 판매업 신고 제 2014-서울홍홍홍 0291호</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm">고객지원 111-2345</p>
          <p className="text-sm">이메일 help@gmail.com</p>
          <p className="text-sm">평일 09:00 - 17:00 토,일 공휴일 휴무</p>
        </div>
      </div>
      <div className="container mx-auto px-4 flex justify-center items-center border-t border-gray-200">
        <div className="flex flex-row space-x-4 mt-2">
          <p className="text-[10px] font-semibold text-gray-700">이용약관</p>
          <p className="text-[10px] font-semibold text-gray-700">개인정보처리방침</p>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center text-xs text-gray-700 py-2">
        <p>Copyrightⓒ2023 Data nugget All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
