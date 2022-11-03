import React from 'react'
import styled from 'styled-components'
import {Select} from '@athino/select'

const options = [{
  id: '1',
  value: 'Users'
},{
  id: '2',
  value: 'Templates'
}]

export default function Home() {
  

  return (
    <Frame>

      <Select
        placeholder={'Velg database'}
        selected={'1'}
        options={options}
        onChange={() => 1}/>
    </Frame>
  )
}

export const Frame = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: black;
  padding: 50px;
`
