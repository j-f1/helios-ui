export const fetchJSON = (...args) => fetch(...args).then(res => res.json())
