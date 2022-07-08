import styled from "styled-components"
import React from 'react'

export default function Lol() {

    return (
        <Frame>
            <Svg viewBox={'0 0 100 100'} preserveAspectRatio={'none'}>
                <path
                    stroke={'red'}
                    strokeWidth={'2'}
                    d={'M 0 0 L 100 0 L 100 100 L 0 100 Z'}
                    fill={'cyan'}
                    vectorEffect={'non-scaling-stroke'}/>

            </Svg>
        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    width: 80%;
    margin: 100px auto;
    min-height: 500px;
    background-color: red;
`

const Svg = styled.svg`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: visible;
    background-color: orange;
`
