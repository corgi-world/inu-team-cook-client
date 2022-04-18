import Words from "./components/Words";
import styled from "styled-components";
import Clock from "react-live-clock";

import { useQuery } from "react-query";
import { fetchWords } from "./data/api";
import { topicAtom } from "./data/atom";
import { useSetRecoilState } from "recoil";

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
  const setTopicAtom = useSetRecoilState(topicAtom);
  const { isLoading, data } = useQuery("topic", fetchWords, {
    onSuccess: (topic) => {
      console.log(topic);
      setTopicAtom(topic);
    },
    onError: () => {
      console.log("FETCH ERROR");
    },
  });

  return (
    <Content>
      <Title>
        <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Seoul"} />
      </Title>
      <Wrapper>
        {isLoading ? (
          <Loader>불러오는 중</Loader>
        ) : (
          <Words
            nodes={data.map(({ keyword }, index) => {
              return { name: keyword, id: 30 - index };
            })}
            links={[]}
          />
        )}
      </Wrapper>
    </Content>
  );
}

export default App;
