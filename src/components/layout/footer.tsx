const Footer = () => {
  return (
    <div className="w-full h-auto font-bold bg-white border-t border-gray-200">
      <div
        id="sectorOne"
        className="container mx-auto px-4 my-28 flex flex-col tablet:flex-row desktop:flex-row mobile:flex-col justify-between items-start py-4"
      >
        <p className="text-base font-bold">개발자 테스트용</p>
        <div className="text-sm space-y-1">
          <p>대표 홍길동 ㅣ 사업자 등록 번호 123-4567-890</p>
          <p>서울특별시 가가동 나나로 111-2 8층</p>
          <p>통신 판매업 신고 제 2014-서울홍홍홍 0291호</p>
        </div>
        <div className="text-sm space-y-1">
          <p>고객지원 111-2345</p>
          <p>이메일 help@gmail.com</p>
          <p>평일 09:00 - 17:00 토,일 공휴일 휴무</p>
        </div>
      </div>
      <div
        id="sectorTwo"
        className="container font-semibold mx-auto px-4 flex flex-col tablet:flex-row desktop:flex-row mobile:flex-col justify-center items-center border-t border-gray-200"
      >
        <div className="flex flex-row mobile:flex-col text-[10px] text-black space-x-0 mobile:space-x-4 mt-2">
          <p>이용약관</p>
          <p>개인정보처리방침</p>
        </div>
      </div>
      <div
        id="sectorThree"
        className="container font-semibold mx-auto px-4 text-center text-xs text-gray-700 py-2"
      >
        <p>Copyrightⓒ2023 Data nugget All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
