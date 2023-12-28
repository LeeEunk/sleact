import useInput from '@hooks/useInput';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useSWR , {mutate} from 'swr';

const LogIn = () => {
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher, 
  {dedupingInterval: 100000,} // 기간 내에 캐시에서 불러옴 (캐시 유지기간 : 100초)
  );

  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          //revalidate(); // 로그인 정보를 저장하기 위함. 로그인 성공했을 때, 서버에 fetcher 실행해서 swr 호출 (1회)
          mutate(response.data, false); // 기존에 제가 갖고 있던 정보를 이 데이터에 저장, 서버에 요청
          // 서버에 요청이 가기도 전에 실제 데이터를 바꿔버리고 그다음에 요청은 나중에 보내는 거 -> OPTIMISTIC UI : true
        })
        .catch((error) => {
          setLogInError(error.response?.status === 401);
        });
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  // 로그인 하는 순간 채널 페이지로 이동
  if (data) {
    return <Redirect to="/workspace/channel"/>
  }
  // if (data) {
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  // }

  // console.log(error, userData);
  // if (!error && userData) {
  //   console.log('로그인됨', userData);
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  // }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
