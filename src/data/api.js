export function fetchWords() {
  return fetch("http://54.180.114.46:3300/topic").then((response) => response.json());
  // return fetch("http://127.0.0.1:3300/topic").then((response) => response.json());
}
