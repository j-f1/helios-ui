const fetchJSON = (...args) => fetch(...args).then(res => res.json())

const fetchWithRoot = (root, defaultOpts) => (route, opts) =>
  fetchJSON(root + route, Object.assign({}, defaultOpts, opts))

export const heliosRoot =
  'https://cors-buster-htogzoidyu.now.sh/fggqk618ri.execute-api.us-east-1.amazonaws.com/dev/'
// export const HELIOS_ROOT = 'https://fggqk618ri.execute-api.us-east-1.amazonaws.com/dev/'
export const helios = fetchWithRoot(heliosRoot)

export const backendRoot = 'https://helios-ui-backend.glitch.me/'
export const backend = fetchWithRoot(backendRoot)
export const backendPost = fetchWithRoot(backendRoot, { method: 'POST' })

export const seRoot = 'https://api.stackexchange.com/2.2/'
export const se = (route, opts) => {
  if (route.includes('?')) {
    route += '&key=' + process.env.REACT_APP_KEY
  }
  return fetchJSON(backendRoot + route, opts)
}
