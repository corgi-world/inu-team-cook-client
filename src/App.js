import Words from "./components/Words";
import styled from "styled-components";
import Clock from "react-live-clock";

import { useQuery } from "react-query";
import { fetchWords } from "./api";

const Content = styled.div`
  height: 100vh;
  padding: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 10px;
  margin-bottom: 25px;
  font-size: 50px;
  font-weight: 600;
  text-align: center;
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: 50px;
  font-weight: 600;
`;

function App() {
  const { isLoading, data } = useQuery("words", fetchWords, {
    onError: () => {
      console.log("ERROR");
    },
  });

  return (
    <Content>
      <Title>
        <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Seoul"} />
      </Title>
      <Wrapper>
        {isLoading ? <Loader>불러오는 중</Loader> : <Words keywords={data} />}
      </Wrapper>
    </Content>
  );
}

export default App;

const Samples = [
  { name: "코로나 19", id: 21 },
  { name: "확진자", id: 22 },
  { name: "윌스미스", id: 23 },
  { name: "서른 아홉", id: 24 },
  { name: "블랙리스트 수사", id: 25 },
  { name: " 손흥민", id: 26 },
  { name: " 호날두", id: 27 },
  { name: "포켓몬 빵", id: 28 },
  { name: " 현빈", id: 29 },
  { name: "손예진", id: 10 },
  { name: "햄버거", id: 11 },
  { name: "피자", id: 12 },
  { name: "남주혁", id: 13 },
  { name: "SK", id: 14 },
  { name: "삼성전자", id: 15 },
  { name: "코스피", id: 16 },
  { name: "결혼식 코로나", id: 17 },
  { name: "주식 동향", id: 18 },
  { name: "안철수", id: 19 },
  { name: "문재인", id: 20 },
  { name: "8k 티비", id: 0 },
  { name: "중국 폴더블폰", id: 1 },
  { name: "계곡 익사 사건", id: 2 },
  { name: "브로치", id: 3 },
  { name: "김정숙 여사", id: 4 },
  { name: "김건희", id: 5 },
  { name: "자가진단키드", id: 6 },
  { name: "약국 약 부족", id: 7 },
  { name: "코리안 좀비", id: 8 },
  { name: "백신 접종 시기", id: 9 },
];
