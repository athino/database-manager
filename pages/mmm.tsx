import styled from "styled-components"
import React from 'react'

export default function Lol() {

    const borderWidth = 1
    const radius = 4
    const margin = 10
    const angle = 45 * 2*Math.PI / 360
    const k = 6
    const heightMargin = 20
    
    const x1 = 0
    const y1 = 50

    const x2 = x1 + margin
    const y2 = y1

    const x3 = x2 + radius*Math.sin(angle)
    const y3 = y2 + radius*(1 - Math.cos(angle))

    const x4 = x3 + k
    const y4 = y3 + k*Math.tan(angle)

    const x5 = x4 + Math.sqrt(2*radius*radius*(1 - Math.cos(2*angle)))
    const y5 = y4

    const x6 = x5 + k
    const y6 = y5 - k*Math.tan(angle)

    const x7 = x6 + radius*Math.sin(angle)
    const y7 = y2

    const x8 = x7 + margin
    const y8 = y1

    const x9 = x8
    const y9 = 0

    const path = `M 0 0 L ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${radius} ${radius} 0 0 0 ${x5} ${y5} L ${x6} ${y6} A ${radius} ${radius} 0 0 1 ${x7} ${y7} L ${x8} ${y8} L ${x9} ${y9} Z`
    const width = x9
    const height = y4 - radius*Math.cos(angle) + radius + 0.5*borderWidth + heightMargin

    return (
        <Frame>
            <OverlapFrame/>
            <OverlapFrame2 path={path}/>




            <ContentFrame>
                {[...Array(30)].map((_,k) => {
                    return (
                        <div key={k}>
                            hei ... jiuo <br/>
                        </div>
                    )
                })}
            </ContentFrame>
        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    width: 80%;
    margin: 20px auto;
    background-color: #303030;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 1));
    border-radius: 6px;
`

const OverlapFrame = styled.div`
    position: absolute;
    height: 100px;
    right: 0;
    bottom: -50px;
    left: 0;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><path stroke="%23595959" fill="%23303030" d="M 0 50 L 100 50 L 100 0 L 0 0 Z "/></svg>');
    background-repeat: repeat-x;
`

const ContentFrame = styled.div`
    position: relative;
    z-index: 1;
`

const OverlapFrame2 = styled.div<{
    path: string
}>`
    position: absolute;
    height: 100px;
    right: 0;
    bottom: -50px;
    left: 0;
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-image: ${({path}) => `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><path stroke="%23595959" fill="%23303030" d="${path}"/></svg>')`};
`