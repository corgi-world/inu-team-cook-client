import Words from "./components/Words";
import styled from "styled-components";
import Clock from "react-live-clock";

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 15px;
  margin-bottom: 20px;
  font-size: 50px;
  font-weight: 600;
  text-align: center;
`;

function App() {
  return (
    <>
      <Title>
        <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Seoul"} />
      </Title>
      <Wrapper>
        <Words />
      </Wrapper>
    </>
  );
}

export default App;
