import React, {useRef} from 'react'
import styled from "styled-components"

type Props = {
    expanded: boolean
    header: () => JSX.Element
    content: () => JSX.Element
}

export const Accordion = (props: Props) => {
    const ref = useRef<HTMLDivElement>(null)
    const scrollHeight = ref.current?.scrollHeight

    const height = props.expanded ? scrollHeight : 0

    return (
        <Frame>
            <Header>
                {props.header()}
            </Header>
            <Content ref={ref} style={{height: `${height}px`}}>
                {props.content()}
            </Content>
        </Frame>
    )
}

const Frame = styled.div`

`

const Header = styled.div`

`

const Content = styled.div`
    overflow: hidden;
    transition: height 400ms ease;
`


