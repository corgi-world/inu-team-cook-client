import { atom, selectorFamily } from "recoil";

export const topicAtom = atom({
  key: "topicAtom",
  default: [],
});

export const genderSelector = selectorFamily({
  key: "genderSelector",
  get:
    (targetKeyword) =>
    ({ get }) => {
      const topic = get(topicAtom);
      const { male, female } = topic.filter(
        ({ keyword }) => targetKeyword === keyword
      )[0];
      return [male, female];
    },
});
export const ageSelector = selectorFamily({
  key: "ageSelector",
  get:
    (targetKeyword) =>
    ({ get }) => {
      const topic = get(topicAtom);
      const { age_10, age_20, age_30, age_40, age_50, age_60 } = topic.filter(
        ({ keyword }) => targetKeyword === keyword
      )[0];
      return [age_10, age_20, age_30, age_40, age_50, age_60];
    },
});
export const linkSelector = selectorFamily({
  key: "linkSelector",
  get:
    (targetKeyword) =>
    ({ get }) => {
      const topic = get(topicAtom);
      const { rankurl } = topic.filter(({ keyword }) => targetKeyword === keyword)[0];
      return rankurl;
    },
});
export const relatedSubjectSelector = selectorFamily({
  key: "relatedSubjectSelector",
  get:
    (targetKeyword) =>
    ({ get }) => {
      const topic = get(topicAtom);
      const targetTopic = topic.filter(({ keyword }) => targetKeyword === keyword)[0];

      return getRelatedValues("subject", { ...targetTopic });
    },
});
export const relatedKeywordSelector = selectorFamily({
  key: "relatedKeywordSelector",
  get:
    (targetKeyword) =>
    ({ get }) => {
      const topic = get(topicAtom);
      const targetTopic = topic.filter(({ keyword }) => targetKeyword === keyword)[0];

      return getRelatedValues("search", { ...targetTopic });
    },
});
export const summarySelector = selectorFamily({
  key: "summarySelector",
  get:
    (targetKeyword) =>
    ({ get }) => {
      const topic = get(topicAtom);
      const { summary } = topic.filter(({ keyword }) => targetKeyword === keyword)[0];
      return summary;
    },
});

const getRelatedValues = (type, targetTopic) => {
  const result = [];
  for (const key in targetTopic) {
    if (key.includes(type)) {
      const related = targetTopic[key];
      if (related !== "0") {
        result.push(related);
      }
    }
  }

  return result;
};
