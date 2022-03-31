// "proxy": "http://13.209.73.95:8000"

export function fetchWords() {
  return fetch("/topic", {
    headers: {
      accepts: "application/json",
    },
  }).then((response) => response.json());
}
