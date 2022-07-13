import styled from "styled-components"
import React, {FC} from 'react'

type Props = {
    arrow?: 'top' | 'bottom'
    margin?: string
    padding?: string
}

export const Tooltip2: FC<Props> = (props) => {

    return (
        <Frame>
            <Left>

            </Left>
            <Right>

            </Right>
        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    margin: 50px auto;
    width: 80%;
    height: 300px;

    //background-color: red;

`

const Left = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: calc(50% + ${100 + 0.5*100}px);
    background-color: orange;


    clip-path: polygon(-10px -10px, calc(100% - ${100 + 100}px) -10px, calc(100% - ${100 + 100}px) ${20}px, calc(100% - ${100}px) ${20}px, calc(100% - ${100}px) 110%, -10px 110%);

`

const Right = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: calc(50% + ${100 + 0.5*100}px);
    //clip-path: polygon(110% -10px, 300px -10px, 300px 20px, 100px 20px, 100px 110%, 110% 110%);


    clip-path: polygon(100px -10px, 110% -10px, 110% 110%, 200px 110%, 200px ${20}px, 100px ${20}px);

    background-color: blue;


`

const Svg = styled.svg`
    overflow: visible;
`