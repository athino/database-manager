import {useClickAway} from 'common/hooks/useClickAway'
import React, {FC, ReactNode, useRef, useState} from 'react'
import styled from 'styled-components'

type Props = {
  onClickAway(context: {
    event: MouseEvent
    preventClose(): void
    triggeredFromTarget(): boolean
  }): void
  popoverComponent(): ReactNode
  targetComponent(context: {
    openPopover(): void
  }): ReactNode
}

export const PopoverWrapper: FC<Props> = (props) => {

  const ref = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  useClickAway(ref, (event) => {

    let preventClose = false

    props.onClickAway({
      event: event,
      preventClose: () => {
        preventClose = true
      },
      triggeredFromTarget: () => {
        if (targetRef.current?.isSameNode(event.target as Node)) {
          return false
        }

        return !!targetRef.current?.contains(event.target as Node)
      }
    })

    if (!preventClose) {
      setIsOpen(false)
    }
  })

  const wrappedComponent = props.targetComponent({
    openPopover: () => setIsOpen(true)
  })

  return (
    <Frame>

        <ReferenceContainer>
          <OffsetPopoverFrame>
            <PopoverFrame ref={ref} isOpen={isOpen}>
              {props.popoverComponent()}
            </PopoverFrame>
          </OffsetPopoverFrame>
        </ReferenceContainer>

      <Target ref={targetRef}>
        {wrappedComponent}
      </Target>
  
    </Frame>
  )
}

const Frame = styled.div`
  position: relative;
`

const Target = styled.div`
  position: relative;
  z-index: 1;
`

const ReferenceContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
`

const OffsetPopoverFrame = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  z-index: 0;
  pointer-events: none;
`

const PopoverFrame = styled.div<{
  isOpen: boolean
}>`
  z-index: 1;
  position: relative;
  opacity: ${({isOpen}) => isOpen ? 1 : 0};
  transition: ${({isOpen}) => isOpen ? 'none' : 'opacity ease 0.3s'};
  pointer-events: ${({isOpen}) => isOpen ? 'auto' : 'none'};
  display: ${({isOpen}) => isOpen ? 'inline-block' : 'none'};
`
