export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const offset = 9 * 60; // Offset for South Korea (KST)
  const kstDate = new Date(date.getTime() + offset * 60 * 1000);
  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getDate()).padStart(2, '0');
  const hours = String(kstDate.getHours()).padStart(2, '0');
  const minutes = String(kstDate.getMinutes()).padStart(2, '0');
  const seconds = String(kstDate.getSeconds()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

export const getTimeDifference = (createdAt: any) => {
  const postDate = new Date(createdAt).getTime();
  const now = new Date().getTime();
  const differenceInMilliseconds = now - postDate;
  const minutes = Math.floor(differenceInMilliseconds / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
};
