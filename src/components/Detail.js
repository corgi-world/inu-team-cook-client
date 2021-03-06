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
  summarySelector,
} from "../data/atom";
import { useRecoilValue } from "recoil";

import { cutString } from "../utils/util";

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
  width: 550px;
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
  margin-bottom: 20px;
`;
const SummaryWrapper = styled.div`
  margin-top: 35px;
`;
const SummaryBox = styled.div`
  font-size: 22px;
  line-height: 33px;
  word-spacing: 8px;
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
  font-size: 20px;
  color: black;
`;

export default function Detail(props) {
  const { id, name } = props.selectedNode;
  const link = useRecoilValue(linkSelector(name));
  const linkString = cutString({ str: link, maxLength: 70 });

  const donutData = useRecoilValue(genderSelector(name));
  const barData = useRecoilValue(ageSelector(name));
  const relatedSubjects = useRecoilValue(relatedSubjectSelector(name));
  const relatedKeywords = useRecoilValue(relatedKeywordSelector(name));
  const summary = useRecoilValue(summarySelector(name));
  const summaryString = cutString({ str: summary, maxLength: 330 });

  const nodes = relatedKeywords.map((keyword, index) => {
    return { id: index + 1, name: keyword };
  });
  const links = relatedKeywords.map((keyword, index) => {
    return { source: 0, target: index + 1, id: index };
  });

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
          <ChartWrapper>
            <Donut data={donutData} />
            <Bar data={barData} />
          </ChartWrapper>
          {/* <ListWrapper>
            <RelatedList title={"?????? ??????"} words={relatedSubjects} />
            <RelatedList title={"?????? ?????????"} words={relatedKeywords} />
          </ListWrapper> */}
          <Link href={link} target="_blank">
            {linkString}
          </Link>
          <SummaryWrapper>
            <SummaryBox>{summaryString}</SummaryBox>
          </SummaryWrapper>
        </Contents>
      </ContentsBox>
      <GraphBox
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <LinkWords nodes={[{ id: 0, name }, ...nodes]} links={links} />
      </GraphBox>
    </Overlay>
  );
}

// { source: 0, target: 1, id: 0 },
