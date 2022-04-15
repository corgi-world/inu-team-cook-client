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
  get: ({ get }) => {
    const topic = get(topicAtom);
    return "";
  },
});
