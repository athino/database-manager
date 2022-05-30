import React, {FC} from 'react'
import styled from 'styled-components'

export const DateInput: FC = (props) => {

  return (
    <Frame>
      <input type={'text'} pattern={'[0-9]*'} placeholder={'YYYY'}/>
      <div>/</div>
      <input type={'text'} pattern={'[0-9]*'} placeholder={'MM'}/>
      <div>/</div>
      <input type={'text'} pattern={'[0-9]*'} placeholder={'DD'}/>
    </Frame>
  )
}

const Frame = styled.div`
    position: relative;
    display: flex;
    border: 1px solid #1A1A1A;
    background-color: #1F1F1F;
    &:focus-within {
        border: 1px solid rgb(0, 95, 204);
    }
    * {
    background-color: #1F1F1F;
        appearance: none;
        border: none;
        outline: none;
        color: white;
    }
`
