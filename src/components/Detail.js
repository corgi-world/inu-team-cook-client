import { motion } from "framer-motion";
import styled from "styled-components";
import Donut from "./chart/Donut";
import Bar from "./chart/Bar";
import RelatedList from "./RelatedList";
import LinkWords from "./LinkWords";

import {
  linkSelector,
  ageSelector,
  genderSelector,
  relatedSubjectSelector,
  relatedKeywordSelector,
} from "../data/atom";
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
  justify-content: space-evenly;
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
const ContentsBox = styled(Box)`
  width: 1000px;
`;
const GraphBox = styled(Box)`
  width: 500px;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;
const ListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
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
  const link = useRecoilValue(linkSelector(name));
  const linkString = link.length >= 80 ? `${link.substring(0, 77)}...` : link;

  const donutData = useRecoilValue(genderSelector(name));
  const barData = useRecoilValue(ageSelector(name));
  const relatedSubjects = useRecoilValue(relatedSubjectSelector(name));
  const relatedKeywords = useRecoilValue(relatedKeywordSelector(name));

  return (
    <Overlay
      onClick={props.onDetailClicked}
      variants={vars}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ContentsBox
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
          <ChartWrapper>
            <Donut data={donutData} />
            <Bar data={barData} />
          </ChartWrapper>
          <ListWrapper>
            <RelatedList title={"연관 주제"} words={relatedSubjects} />
            <RelatedList title={"연관 키워드"} words={relatedKeywords} />
          </ListWrapper>
        </Contents>
      </ContentsBox>
      <GraphBox
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <LinkWords
          nodes={[
            { id: 0, name },
            { id: 1, name: "가나다라마바사" },
            { id: 2, name: "가나" },
          ]}
          links={[
            { source: 0, target: 1, id: 0 },
            { source: 0, target: 2, id: 1 },
          ]}
        />
      </GraphBox>
    </Overlay>
  );
}

// { source: 0, target: 1, id: 0 },
