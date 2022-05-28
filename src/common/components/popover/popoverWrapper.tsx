import React, {FC, useEffect, useMemo, useRef} from 'react'
import styled from 'styled-components'

type Props = {
  target: React.ReactNode
  content: React.ReactNode
  options?: {
    preserve3dTransformStyleOnParents?: boolean
    position: 'top' | 'bottom'
    translateZPixels?: number
  }
}


const forEachParent = async (firstParentElement: HTMLElement | null | undefined, iterator: (element: HTMLElement) => void) => {
  let currentElement = firstParentElement
  while (currentElement && currentElement.tagName !== 'HTML') {
    iterator(currentElement)
    currentElement = currentElement.parentElement
  }
}

export const PopoverWrapper: FC<Props> = (props) => {

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const firstParent = ref.current?.parentElement
    forEachParent(firstParent, async (element) => {
      element.style.transformStyle = 'preserve-3d'
    })
    return () => {
      forEachParent(firstParent, async (element) => {
        element.style.transformStyle = ''
      })
    }
  }, [])

  const style = useMemo(() => {
    switch (props.options?.position) {
      case 'bottom': {
        return {
          top: '100%',
          left: 0,
          right: 0
        }
      }
      case 'top': {
        return {
          bottom: '100%',
          left: 0,
          right: 0
        }
      }
    }
    return 
  }, [props.options?.position])

  return (
    <Frame ref={ref}>
      <Overlay>
        <Content style={{ ...style}}>
          {props.content}
        </Content>
      </Overlay>
      <Target>
        {props.target}
      </Target>
    </Frame>
  )
}

const Frame = styled.div`
  position: relative;
  transform-style: preserve-3d;
`

const Target = styled.div`
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform-style: preserve-3d;
`

const Content = styled.div`
  position: absolute;
  transform: translateZ(100px);
`

