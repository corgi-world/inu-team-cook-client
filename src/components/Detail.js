import { motion } from "framer-motion";
import styled from "styled-components";
import Donut from "./chart/Donut";
import Bar from "./chart/Bar";
import RelatedList from "./RelatedList";

import { ageSelector, genderSelector } from "../data/atom";
import { useRecoilValue } from "recoil";

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
  height: 720px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 30px;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 45px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Link = styled.a`
  font-size: 16px;
`;

export default function Detail(props) {
  const { id, name } = props.selectedNode;
  const link =
    "https://news.naver.com/main/read.naver?mode=LSD&mid=shm&sid1=105&oid=629&aid=0000141721";
  const linkString = link.length >= 100 ? `${link.substring(0, 97)}...` : link;

  const donutData = useRecoilValue(genderSelector(name));
  const barData = useRecoilValue(ageSelector(name));

  return (
    <Overlay
      onClick={props.onDetailClicked}
      variants={vars}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box
        onClick={(event) => {
          event.stopPropagation();
        }}
        variants={vars}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Contents>
          <Title>{name}</Title>
          <Link href={link} target="_blank">
            {linkString}
          </Link>
          <ContentWrapper>
            <Donut data={donutData} />
            <Bar data={barData} />
          </ContentWrapper>
          <ContentWrapper>
            <RelatedList
              title={"연관 주제"}
              words={["주제1", "주제2", "주제3", "주제4", "주제5"]}
            />
            <RelatedList
              title={"연관 키워드"}
              words={["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"]}
            />
          </ContentWrapper>
        </Contents>
      </Box>
    </Overlay>
  );
}
