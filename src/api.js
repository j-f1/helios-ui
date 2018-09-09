export const API_ROOT =
  'https://cors-buster-htogzoidyu.now.sh/fggqk618ri.execute-api.us-east-1.amazonaws.com/dev'

export default async function get(route) {
  const res = await fetch(API_ROOT + route)
  return res.json()
}
