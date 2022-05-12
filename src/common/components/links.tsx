import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export const Links = () => {

  return (
    <Frame>

      <LinkWrapper>
        <Link href={'/'}>Hjem</Link>
      </LinkWrapper>

      <LinkWrapper>
        <Link href={'/signin'}>Logg inn</Link>
      </LinkWrapper>

      <LinkWrapper>
        <Link href={'/complete-signup'}>Fullfør registrering</Link>
      </LinkWrapper>

      <LinkWrapper>
        <Link href={'/preview'}>E-post</Link>
      </LinkWrapper>

    </Frame>
  )
}

const Frame = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: #121212;
  border-bottom: 0.5px solid #292929;
  display: flex;
  padding: 20px;
`

const LinkWrapper = styled.div`
  margin: 0 20px 0 0;
`
