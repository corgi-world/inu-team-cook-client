// "proxy": "http://13.209.73.95:8000"

export function fetchWords() {
  return fetch("/topic").then((response) => response.json());
}
