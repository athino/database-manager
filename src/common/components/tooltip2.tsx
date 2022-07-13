import styled from "styled-components"
import React, {FC} from 'react'

const overflowMargin = 20
const rightCutoff = 100
const offset = 50

type Props = {
    arrow?: 'top' | 'bottom'
    margin?: string
    padding?: string
}

export const Tooltip2: FC<Props> = (props) => {
    const bottom = props.arrow === 'bottom'
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

    const coverPath = `M ${X1} ${Y1} L ${X2} ${Y2} A ${a} ${a} 0 0 0 ${X3} ${Y3} L ${X4} ${Y4} A ${b} ${b} 0 0 1 ${X5} ${Y5} L ${X6} ${Y6} A ${a} ${a} 0 0 0 ${X7} ${Y7} L ${X8} ${Y8} L ${X8} ${20} L ${X1} ${20} Z`


    const MX = X1

    const width = e + 2 * a * Math.sin( c ) + Math.sqrt( 2 * b * b * ( 1 - Math.cos( 2 * c ) ) ) + 3 * d

    return (
            <Frame>
                <RootSvg>
                    
                    <FillSvg x="50%" y="0">
                        <path x="0" y="0" d="M -60 0 L -25 0 L 0 -10 L 25 0 L 60 0 L 60 30 L -60 30 Z"  fill="#303030"/>
                    </FillSvg>

                    <BackgroundSvg y="0" x="0" width="100%" height="100%">
                        <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" stroke="#595959" fill="#303030"/>
                    </BackgroundSvg>

                    <PathSvg x="50%" y="0">
                        <path x="0" y="0" d="M -50 0 L -25 0 L 0 -10 L 25 0 L 50 0" stroke="#595959" fill="#303030"/>
                    </PathSvg>

                </RootSvg>
            </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    width: 80%;
    height: 500px;

    margin: 50px auto;
`

const RootSvg = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: visible;
`

const BackgroundSvg = styled.svg`
    clip-path: polygon(-10% -10%, calc(50% - 50px) -10%, calc(50% - 50px) 20px, calc(50% + 50px) 20px, calc(50% + 50px) -10%, 110% -10%, 110% 110%, -10% 110%);
    overflow: visible;
`

const PathSvg = styled.svg`
    overflow: visible;
`

const FillSvg = styled.svg`
    overflow: visible;
`

const Content = styled.div`
    position: relative;
    min-height: 20px;
    min-width: 100px;
`
