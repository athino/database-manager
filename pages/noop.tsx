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
  margin: 50px;
  height: 500px;
  width: 500px;
  background-color: black;
`
