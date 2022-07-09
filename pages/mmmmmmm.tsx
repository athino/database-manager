import styled from "styled-components"
import React from 'react'

const overflowMargin = 20
const borderWidth = 1
const rightCutoff = 100
const offset = 100

export default function Lol() {

    const borderWidth = 1
    const radius = 4
    const margin = 10
    const angle = 45 * 2*Math.PI / 360
    const k = 6
    const heightMargin = 20
    
    const x1 = 100
    const y1 = 0

    const x2 = x1 + margin
    const y2 = y1

    const x3 = x2 + radius*Math.sin(angle)
    const y3 = y2 - radius*(1 - Math.cos(angle))

    const x4 = x3 + k
    const y4 = y3 - k*Math.tan(angle)

    const x5 = x4 + Math.sqrt(2*radius*radius*(1 - Math.cos(2*angle)))
    const y5 = y4

    const x6 = x5 + k
    const y6 = y5 + k*Math.tan(angle)

    const x7 = x6 + radius*Math.sin(angle)
    const y7 = y2

    const x8 = x7 + margin
    const y8 = y1

    const x9 = x8
    const y9 = y1

    const path2 = `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 0 0 ${x3} ${y3} L ${x4} ${y4} A ${radius} ${radius} 0 0 1 ${x5} ${y5} L ${x6} ${y6} A ${radius} ${radius} 0 0 0 ${x7} ${y7} L ${x8} ${y8} L ${x9} ${y9}`
    const width = x9 - x1
    const height = y4 - radius*Math.cos(angle) + radius + 0.5*borderWidth + heightMargin

    const X_CENTER = rightCutoff + offset

    const X1 = X_CENTER - 50
    const Y1 = 0

    const X2 = X1 + 25
    const Y2 = Y1

    const X3 = X2 + 25
    const Y3 = Y1 - 10

    const X4 = X3 + 25
    const Y4 = 0

    const X5 = X4 + 25
    const Y5 = Y4

    const path = `M ${X1} ${Y1} L ${X2} ${Y2} L ${X3} ${Y3} L ${X4} ${Y4} L ${X5} ${Y5}`

    const MX = X1

    return (
        <Frame>
            <RightFrame>
                <RightFrameInner>
                    <Svg>
                        <mask id={'mask'}>
                            <rect x={'-5%'} y={'-5%'} height={'110%'} width={'110%'} fill={'white'}/>
                            <rect x={MX} y={'-10'} height={'110'} width={200} fill={'black'}/>
                        </mask>
                        <rect
                            mask="url(#mask)" 
                            fill="#303030"
                            stroke="#595959"
                            strokeWidth={borderWidth}
                            x="0"
                            y="0"
                            rx="10"
                            ry="10"
                            width="100%"
                            height="100%"/>

                        <path
                            fill="#303030"
                            d={path}
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
                            rx="10"
                            ry="10"
                            width="100%"
                            height="100%"/>
                    </Svg>
                </LeftFrameInner>
            </LeftFrame>

        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    width: 80%;
    margin: 100px auto;
    min-height: 200px;
    background-color: #303030;
    will-change: filter;
    filter: drop-shadow(0 0 2px black);
    border-radius: 10px;
`

const RightFrame = styled.div`
    position: absolute;
    top: -${overflowMargin}px;
    width: calc(50% + ${offset}px + ${overflowMargin}px);
    bottom: -${overflowMargin}px;
    right: -${overflowMargin}px;
    background-color: pink;
    overflow: hidden;
`

const RightFrameInner = styled.div`
    position: absolute;
    top: ${overflowMargin}px;
    right: ${overflowMargin}px;
    left: -${rightCutoff}px;
    bottom: ${overflowMargin}px;
    background-color: blue;
`

const LeftFrame = styled.div`
    position: absolute;
    top: -${overflowMargin}px;
    width: calc(50% - 50px + ${overflowMargin}px);
    bottom: -${overflowMargin}px;
    left: -${overflowMargin}px;
    background-color: green;
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