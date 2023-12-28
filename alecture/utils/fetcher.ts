import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true, // 로그인 세션 쿠키 보내주기
    })
    .then((response) => response.data);

export default fetcher;
