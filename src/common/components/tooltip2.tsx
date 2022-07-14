import styled from "styled-components"
import React, {FC} from 'react'

type Props = {
    arrow?: 'top' | 'bottom'
    margin?: string
    padding?: string
}

export const Tooltip: FC<Props> = (props) => {

    return (
        <Frame>
            <Left>
                <Svg x="0" y="0" width="100%" height="100%">
                    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" stroke="#595959" fill="#303030"/>
                </Svg>
            </Left>
            <Right>
                <Svg x="0" y="0" width="100%" height="100%">
                    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" stroke="#595959" fill="#303030"/>
                </Svg>
            </Right>
            <Center>
                <Svg x="0" y="0" width="100%" height="100%">
                    <Svg x="50%">
                        <path
                            fill="#303030"
                            d={'M -50 0 L -25 0 L 0 -20 L 25 0 L 50 0 L 50 50 L 0 50 Z'}/>

                        <path
                            d={'M -50 0 L -25 0 L 0 -20 L 25 0 L 50 0'}
                            fill={'none'}
                            strokeLinejoin={'round'}
                            strokeWidth={1}
                            stroke={'#595959'}/>
                    </Svg>
                </Svg>
            </Center>
        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    margin: 50px auto;
    width: 80%;
    height: 300px;
    border-radius: 10px;
    background-color: #303030;
`

const Left = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: calc(50% + ${100}px);
    clip-path: polygon(-10px -10px, calc(100% - ${100 + 50}px) -10px, calc(100% - ${100 + 50}px) 20px, calc(100% - ${100}px) 20px, calc(100% - ${100}px) 110%, -10px 110%);
`

const Right = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: calc(50% + ${100}px);
    clip-path: polygon(${100 + 50}px -10px, 110% -10px, 110% 110%, 100px 110%, 100px ${20}px, ${100 + 50}px ${20}px);
`

const Center = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

const Svg = styled.svg`
    overflow: visible;
`