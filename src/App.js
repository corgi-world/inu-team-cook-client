import Words from "./components/Words";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 5px;
  padding: 10px;
`;

function App() {
  return (
    <Wrapper>
      <Words />
    </Wrapper>
  );
}

export default App;
