import styled from "styled-components"
import React from 'react'

const overflowMargin = 20
const borderWidth = 1
const rightCutoff = 100
const offset = 100

export default function Lol() {

    const X_CENTER = rightCutoff + offset

    const a = 10
    const b = 5
    const c = 45 * 2*Math.PI / 360
    const d = 10
    const e = 10
    const f = X_CENTER - 50
    const g = 0

    const borderWidth = 1
    const radius = 4
    const margin = 10
    const angle = 45 * 2*Math.PI / 360
    const k = 6
    const heightMargin = 20
    
    const X1 = f
    const Y1 = g

    const X2 = X1 + e
    const Y2 = Y1

    const X3 = X2 + a * Math.sin( c )
    const Y3 = Y2 - a * ( 1 - Math.cos( c ) )

    const X4 = X3 + e
    const Y4 = Y3 - d * Math.tan( c )

    const X5 = X4 + Math.sqrt( 2 * b * b * ( 1 - Math.cos( 2 * c ) ) )
    const Y5 = Y4

    const X6 = X5 + d
    const Y6 = Y3

    const X7 = X6 + a * Math.sin( c )
    const Y7 = Y1

    const X8 = X7 + d
    const Y8 = Y1

    const path = `M ${X1} ${Y1} L ${X2} ${Y2} L ${X3} ${Y3} L ${X4} ${Y4} L ${X5} ${Y5} L ${X6} ${Y6} L ${X7} ${Y7} L ${X8} ${Y8}`

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