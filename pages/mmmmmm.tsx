import styled from "styled-components"
import React from 'react'

const borderWidth = 1

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

    const path = `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 0 0 ${x3} ${y3} L ${x4} ${y4} A ${radius} ${radius} 0 0 1 ${x5} ${y5} L ${x6} ${y6} A ${radius} ${radius} 0 0 0 ${x7} ${y7} L ${x8} ${y8} L ${x9} ${y9}`
    const width = x9 - x1
    const height = y4 - radius*Math.cos(angle) + radius + 0.5*borderWidth + heightMargin
    
    return (
        <Frame>
            <FrameLeft>
                <FrameLeftInner>
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
                </FrameLeftInner>
            </FrameLeft>
            <Center>
                <CenterInner>
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
                </CenterInner>
            </Center>
            <FrameRight>
                <FrameRightInner>
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
                </FrameRightInner>
            </FrameRight>
        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    width: 80%;
    margin: 100px auto;
    min-height: 200px;
    background-color: #303030;
    filter: drop-shadow(0 0 2px black);
    border-radius: 10px;
`

const FrameLeft = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: calc(50% - 50px);
    background-color: red;
    overflow: hidden;
`

const FrameLeftInner = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: -50px;
    background-color: cyan;
`

const FrameRight = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: calc(50% - 50px);
    background-color: red;
    overflow: hidden;
`

const FrameRightInner = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: -50px;
    background-color: cyan;
`

const Center = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    left: calc(50% - 50px);
    overflow: hidden;
    background-color: orange;
`

const CenterInner = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: -50px;
    right: -50px;
    background-color: orange;
`

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: visible;
`