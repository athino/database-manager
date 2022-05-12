import React, {FC} from 'react'
import styled from 'styled-components'

type Props = {

}

export const Message: FC<Props> = (props) => {

  return (
    <Frame>
      «notifier» is available
      <TriangleWrapper>
        <Triangle/>
      </TriangleWrapper>
    </Frame>
  )
}

const Frame = styled.div`
  position: relative;
  display: inline-block;
  background-color: #083F01;
  border: 1px solid #0F8200;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 30px 0 rgba(0,0,0,0.30);
  border-radius: 6px;
  padding: 5px;
  z-index: 1;
  font-size: 12px;
  margin: 0 0 8px 0;
`

const TriangleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Triangle = styled.div`
  position: absolute;
  background-color: #083F01;
  border-radius: 0 0 1px 0;
  bottom: -5px;
  left: 10px;
  height: 10px;
  width: 10px;
  z-index: 1;
  transform: rotate(45deg);
`