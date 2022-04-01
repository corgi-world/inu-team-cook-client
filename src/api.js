// "proxy": "http://13.209.73.95:8000"
// return fetch("http://13.209.73.95:8000/topic").then((response) => response.json());

export function fetchWords() {
  return fetch("http://54.180.114.46:3300/topic").then((response) => response.json());
}
