// export function fetchWords() {
//   return fetch("/topic/", {
//     headers: {
//       Accept: "application/json",
//     },
//   }).then((response) => response.json());
// }

export function fetchWords() {
  return fetch("/topic", {
    headers: {
      accepts: "application/json",
    },
  }).then((response) => response.json());
}
