import React, {FC} from 'react'
import styled from 'styled-components'
import { Message } from './message'
import {Popover} from './popover'
import {PopoverWrapper} from './popoverWrapper'

type Props = {

}

export const TextInput: FC<Props> = (props) => {
  return (
    <BoxWrapper>
      <Popover padding='8px'>
        <PopoverWrapper
          onClickAway={(context) => {
            if (context.triggeredFromTarget()) {
              context.preventClose()
            }
          }}
          targetComponent={(context) => (
            <Input onChange={context.openPopover}/>
          )}
          popoverComponent={() => (
            <Message/>
        )}/>
      </Popover>
    </BoxWrapper>
  )
}

const BoxWrapper = styled.div`
  position: relative;
  padding: 0 0 0 0;
  margin: 0 0 20px 0;
  border-radius: 6px;
`

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Name',
  autoFocus: true
})<{}>`
  background-color: #1F1F1F;
  border: 2px solid #0077FF;
  border-radius: 6px;
  padding: 8px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
`