import React, { Fragment } from 'react'

export default function BulletedNav({ links }) {
  return (
    <nav>
      {links.map((link, i) => (
        <Fragment key={i}>
          {i > 0 && ' \u{2022} '}
          {link}
        </Fragment>
      ))}
    </nav>
  )
}
