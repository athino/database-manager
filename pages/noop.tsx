import React, {useState} from 'react'
import styled from 'styled-components'
import {Select} from '@athino/select'

const options = [{
  id: '0',
  value: '1.0.0'
},{
  id: '1',
  value: '1.0.1'
},{
  id: '2',
  value: '1.0.2'
}]

export default function Home() {
  
  const [selected, setSelected] = useState('0')

  return (
    <Frame>

      <Select
        placeholder={'Velg database'}
        selected={selected}
        options={options}
        onChange={({option}) => {
          setSelected(option.id)
        }}/>
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
