import React, { Fragment } from 'react'
import NavLink from '../NavLink'
import types from './types'

export default function ListNav() {
  return types.map((type, i) => (
        <Fragment key={type}>
          {i > 0 && ' \u{2022} '}
          <NavLink to={'/list/' + type}>
            <code>{type}</code>
          </NavLink>
        </Fragment>
      ))
}
