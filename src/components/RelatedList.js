import styled from "styled-components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

const Wrapper = styled.div`
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-top: -5px;
  margin-bottom: 5px;
`;

const ListText = styled.div`
  font-size: 16px;
  padding-top: 7px;
  padding-bottom: 7px;
`;

export default function RelatedList({ title, words }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <List>
        <Divider />
        {words.map((word) => {
          return (
            <div key={word}>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  target="_blank"
                  href={`https://www.google.com/search?q=${word}`}
                >
                  <ListText>{word}</ListText>
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Wrapper>
  );
}
