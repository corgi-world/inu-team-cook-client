// "proxy": "http://13.209.73.95:8000/"

export function fetchWords() {
  return fetch("http://13.209.73.95:8000/topic", {
    headers: {
      accepts: "application/json",
    },
  }).then((response) => response.json());
}
