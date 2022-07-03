import React, {FC, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {forEachParent} from './utils/forEachParent'

type Props = {
    escape: number
    layer: number
}

export const Stack: FC<Props> = (props) => {

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

    return (
        <Frame ref={ref}>
            {props.children}
        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    transform-style: preserve-3d;
`