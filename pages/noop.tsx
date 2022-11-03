import React from 'react'
import styled from 'styled-components'
import {Select} from '@athino/select'

export default function Home() {


  return (
    <Frame>
      <Select selected={'1'} options={[]} onChange={() => 1}/>
    </Frame>
  )
}

export const Frame = styled.div`
  position: relative;
  margin: 50px;
  height: 500px;
  width: 500px;
  background-color: orange;
`
