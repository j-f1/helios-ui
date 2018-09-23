import { createContext } from 'react'

export const { Provider, Consumer } = createContext({
  token: null,
  tokenInfo: null,
  chatAccounts: [],
})
