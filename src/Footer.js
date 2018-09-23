import React from 'react'
import BulletedNav from './BulletedNav'

export const Link = ({ href, children }) => {
  const A = new URL(href).host === location.host ? 'strong' : 'a'
  return <A href={href}>{children}</A>
}

export default () => (
  <footer>
    <BulletedNav
      links={[
        <Link href="https://helios-ui.glitch.me">dev</Link>,
        <Link href="https://helios-ui.netlify.com">prod</Link>,
      ]}
    />
  </footer>
)
