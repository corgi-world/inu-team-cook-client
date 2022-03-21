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
        <Words keywords={Samples} />
      </Wrapper>
    </>
  );
}

export default App;

const Samples = [
  { name: "키워드21", id: 21 },
  { name: "키워드22", id: 22 },
  { name: "키워드23", id: 23 },
  { name: "키워드24", id: 24 },
  { name: "키워드25", id: 25 },
  { name: "키워드26", id: 26 },
  { name: "키워드27", id: 27 },
  { name: "키워드28", id: 28 },
  { name: "키워드29", id: 29 },
  { name: "키워드10", id: 10 },
  { name: "키워드11", id: 11 },
  { name: "키워드12", id: 12 },
  { name: "키워드13", id: 13 },
  { name: "키워드14", id: 14 },
  { name: "키워드15", id: 15 },
  { name: "키워드16", id: 16 },
  { name: "키워드17", id: 17 },
  { name: "키워드18", id: 18 },
  { name: "키워드19", id: 19 },
  { name: "키워드20", id: 20 },
  { name: "키워드00", id: 0 },
  { name: "키워드01", id: 1 },
  { name: "키워드02", id: 2 },
  { name: "키워드03", id: 3 },
  { name: "키워드04", id: 4 },
  { name: "키워드05", id: 5 },
  { name: "키워드06", id: 6 },
  { name: "키워드07", id: 7 },
  { name: "키워드08", id: 8 },
  { name: "키워드09", id: 9 },
];
