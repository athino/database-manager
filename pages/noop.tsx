import React, {useState} from 'react'
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
  
  const [selected, setSelected] = useState('1')

  return (
    <Frame>

      <Select
        placeholder={'Velg database'}
        selected={selected}
        options={options}
        onChange={({option}) => setSelected(option.id)}/>
    </Frame>
  )
}

export const Frame = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: #121212;
  padding: 50px;
`
