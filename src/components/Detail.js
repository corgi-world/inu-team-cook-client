import { motion } from "framer-motion";
import styled from "styled-components";

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
`;

export default function Detail() {
  return (
    <Overlay initial={{ scale: 0 }} transition={{ duration: 0.4 }} animate={{ scale: 1 }}>
      <Box initial={{ scale: 0 }} transition={{ duration: 0.4 }} animate={{ scale: 1 }} />
    </Overlay>
  );
}
