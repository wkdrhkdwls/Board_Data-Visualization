// 날짜 문자열을 받아 한국 표준시(KST)로 포맷팅하는 함수
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // 한국 표준시(KST)는 UTC+9
  const offset = 9 * 60; // KST (UTC+9) 오프셋을 분 단위로 계산
  const kstDate = new Date(date.getTime() + offset * 60 * 1000);

  // 연, 월, 일, 시, 분, 초를 가져와서 두 자리로 포맷팅
  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getDate()).padStart(2, '0');
  const hours = String(kstDate.getHours()).padStart(2, '0');
  const minutes = String(kstDate.getMinutes()).padStart(2, '0');
  const seconds = String(kstDate.getSeconds()).padStart(2, '0');

  // "YYYY.MM.DD HH:mm:ss" 형식으로 날짜 문자열 반환
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

// 게시물이 생성된 시간과 현재 시간의 차이를 계산하여 문자열로 반환하는 함수
export const getTimeDifference = (createdAt: string) => {
  // 한국 표준시(KST)로 현재 시간과 게시물 생성 시간을 계산
  const postDate = new Date(new Date(createdAt).getTime() + 9 * 60 * 60 * 1000).getTime();
  const now = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).getTime();

  // 두 시간의 차이를 밀리초 단위로 계산
  const differenceInMilliseconds = now - postDate;

  // 밀리초 단위의 차이를 분, 시간, 일 단위로 변환
  const minutes = Math.floor(differenceInMilliseconds / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // 차이에 따라 적절한 문자열 반환
  if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
};
