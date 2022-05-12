import React, {FC} from 'react'
import {TextInput} from './textInput'
import {PopoverWrapper} from './popoverWrapper'
import {Button} from '../button'

type Props = {

}

export const NewPopover: FC<Props> = (props) => {
  
  return (
    <PopoverWrapper
      onClickAway={(context) => {
        if (context.triggeredFromTarget()) {
          context.preventClose()
        }
      }}
      targetComponent={(context) => (
        <Button onClick={context.openPopover}>
          Create New
        </Button>
      )}
      popoverComponent={() => (
        <TextInput/>
    )}/>
  )
}