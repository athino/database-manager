import styled from "styled-components"
import React from 'react'

const borderWidth = 1

export default function Lol() {
    return (
        <Frame>
            <SvgFrame>
                <Svg>
                    <rect fill="black" stroke="white" strokeWidth={borderWidth} x="0" y="0" rx="10" ry="10" width="100%" height="100%"/>
                </Svg>
                <InnerSvgFrame>
                    <Svg viewBox="0 0 100 100">
                        <path stroke="white" strokeWidth={borderWidth} d="M 0 100 L 25 100 L 50 150 L 75 100 L 100 100 Z"/>
                    </Svg>
                </InnerSvgFrame>
            </SvgFrame>

        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    width: 80%;
    margin: 20px auto;
    min-height: 500px;
    background-color: black;
`

const SvgFrame = styled.div`
  position: absolute;
  top: ${0.5*borderWidth}px;
  right: ${0.5*borderWidth}px;
  bottom: ${0.5*borderWidth + 100}px;
  left: ${0.5*borderWidth}px;
  background-color: white;
`

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: visible;
`

const InnerSvgFrame = styled.div`
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
`