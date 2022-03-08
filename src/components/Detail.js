import { motion } from "framer-motion";
import styled from "styled-components";

const vars = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 1000px;
  height: 700px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
`;

export default function Detail(props) {
  const { id, name } = props.selectedNode;
  return (
    <Overlay
      onClick={props.onDetailClicked}
      variants={vars}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box variants={vars} initial="initial" animate="animate" exit="exit">
        <Title>{name}</Title>
      </Box>
    </Overlay>
  );
}
