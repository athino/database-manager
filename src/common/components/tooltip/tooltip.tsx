import styled from "styled-components"
import React, {FC} from 'react'

type Props = {
    arrow?: 'top' | 'bottom'
    margin?: string
    padding?: string
}

export const Tooltip: FC<Props> = (props) => {
    const bottom = props.arrow === 'bottom'

    const strokePath = 'M -50 0 L -25 0 L 0 -20 L 25 0 L 50 0'
    const coverPath = 'M -50 0 L -25 0 L 0 -20 L 25 0 L 50 0 L 50 50 L 0 50 Z'

    return (
        <Frame style={{ margin: props.margin }}>
            <Wrapper style={{ transform: bottom ? 'rotate(180deg)' : 'none' }}>
                <Left>
                    <Svg x={'0'} y={'0'} width={'100%'} height={'100%'}>
                        <rect x={'0'} y={'0'} rx={'10'} ry={'10'} width={'100%'} height={'100%'} stroke={'#595959'} fill={'#303030'}/>
                    </Svg>
                </Left>
                <Right>
                    <Svg x={'0'} y={'0'} width={'100%'} height={'100%'}>
                        <rect x={'0'} y={'0'} rx={'10'} ry={'10'} width={'100%'} height={'100%'} stroke={'#595959'} fill={'#303030'}/>
                    </Svg>
                </Right>
                <Center>
                    <Svg x={'0'} y={'0'} width={'100%'} height={'100%'}>
                        <Svg x={'50%'}>
                            <path
                                fill={'#303030'}
                                d={coverPath}/>
                            <path
                                d={strokePath}
                                fill={'none'}
                                strokeLinejoin={'round'}
                                strokeWidth={1}
                                stroke={'#595959'}/>
                        </Svg>
                    </Svg>
                </Center>
            </Wrapper>
            <Content style={{ padding: props.padding }}>
                {props.children}
            </Content>
        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
`

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #303030;
    filter: drop-shadow(0 0 2px black);
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

const Content = styled.div`
    position: relative;
`

const Svg = styled.svg`
    overflow: visible;
`