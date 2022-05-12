import React, {FC} from 'react'
import styled from 'styled-components'

export const Select: FC = (props) => {

  return (
    <Frame>
      {props.children}
    </Frame>
  )
}

const Frame = styled.select`
  border-radius: 4px;
  padding: 5px;
  color: white;
  border: 1px solid #3B3B3C;
  background: #252526;
  appearance: none;
  outline: none;
  padding-right: 50px;
`
