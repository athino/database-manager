import styled from "styled-components"
import React, {FC} from 'react'

const overflowMargin = 20
const rightCutoff = 100
const offset = 50

type Props = {

}

export const Tooltip: FC<Props> = (props) => {
    const borderWidth = 1

    const X_CENTER = rightCutoff + offset

    const a = 8
    const b = 4
    const c = 45 * 2*Math.PI / 360
    const d = 5
    const e = 5
    const f = X_CENTER
    const g = 0
    
    const X1 = f
    const Y1 = g

    const X2 = X1 + e
    const Y2 = Y1

    const X3 = X2 + a * Math.sin( c )
    const Y3 = Y2 - a * ( 1 - Math.cos( c ) )

    const X4 = X3 + d
    const Y4 = Y3 - d * Math.tan( c )

    const X5 = X4 + Math.sqrt( 2 * b * b * ( 1 - Math.cos( 2 * c ) ) )
    const Y5 = Y4

    const X6 = X5 + d
    const Y6 = Y3

    const X7 = X6 + a * Math.sin( c )
    const Y7 = Y1

    const X8 = X7 + d
    const Y8 = Y1

    const path = `M ${X1} ${Y1} L ${X2} ${Y2} A ${a} ${a} 0 0 0 ${X3} ${Y3} L ${X4} ${Y4} A ${b} ${b} 0 0 1 ${X5} ${Y5} L ${X6} ${Y6} A ${a} ${a} 0 0 0 ${X7} ${Y7} L ${X8} ${Y8}`

    const MX = X1

    const width = e + 2 * a * Math.sin( c ) + Math.sqrt( 2 * b * b * ( 1 - Math.cos( 2 * c ) ) ) + 3 * d

    return (
        <Wrapper>
            <Frame>
                <RightFrame>
                    <RightFrameInner>
                        <Svg>
                            <mask id={'mask'}>
                                <rect x={'-5%'} y={'-5%'} height={'110%'} width={'110%'} fill={'white'}/>
                                <rect x={MX} y={'-10'} height={'20'} width={width} fill={'black'} transform={`translate(-${0.5*width} 0)`}/>
                            </mask>
                            <rect
                                mask="url(#mask)" 
                                fill="#303030"
                                stroke="#595959"
                                strokeWidth={borderWidth}
                                x="0"
                                y="0"
                                rx="4"
                                ry="4"
                                width="100%"
                                height="100%"/>

                            <path
                                transform={`translate(-${0.5*width} 0)`}
                                fill="#303030"
                                d={path}
                                strokeLinejoin={'round'}
                                strokeWidth={1}
                                stroke={'#595959'}/>
                        </Svg>
                    </RightFrameInner>
                </RightFrame>
                <LeftFrame>
                    <LeftFrameInner>
                        <Svg>
                            <rect
                                fill="#303030"
                                stroke="#595959"
                                strokeWidth={borderWidth}
                                x="0"
                                y="0"
                                rx="4"
                                ry="4"
                                width="100%"
                                height="100%"/>
                        </Svg>
                    </LeftFrameInner>
                </LeftFrame>
            </Frame>

            <Content>
                {props.children}
            </Content>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    margin: 20px;

    padding-bottom: 20px;
`

const Frame = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 20px;
    background-color: #303030;
    will-change: filter;
    filter: drop-shadow(0 0 2px black);
    border-radius: 10px;
    transform: rotate(180deg);
`


const Content = styled.div`
    position: relative;
    min-height: 20px;
    min-width: 100px;
`

const RightFrame = styled.div`
    position: absolute;
    top: -${overflowMargin}px;
    width: calc(50% + ${offset}px + ${overflowMargin}px);
    bottom: -${overflowMargin}px;
    right: -${overflowMargin}px;
    //background-color: pink;
    overflow: hidden;
`

const RightFrameInner = styled.div`
    position: absolute;
    top: ${overflowMargin}px;
    right: ${overflowMargin}px;
    left: -${rightCutoff}px;
    bottom: ${overflowMargin}px;
    //background-color: blue;
`

const LeftFrame = styled.div`
    position: absolute;
    top: -${overflowMargin}px;
    width: calc(50% - ${offset}px + ${overflowMargin}px);
    bottom: -${overflowMargin}px;
    left: -${overflowMargin}px;
    //background-color: green;
    overflow: hidden;
`

const LeftFrameInner = styled.div`
    position: absolute;
    top: ${overflowMargin}px;
    left: ${overflowMargin}px;
    right: -100px;
    bottom: ${overflowMargin}px;
    //background-color: orange;
`

const Svg = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: visible;
`