import styled from "styled-components"
import React from 'react'

export default function Lol() {

    const width = 300
    const height = 300
    const borderWidth = 1
    const radius = 50
    const margin = 100
    const angle = 45 * 2*Math.PI / 360
    const k = 50

    const x1 = 0
    const y1 = 300

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
    const y8 = y7

    const x9 = x8
    const y9 = 0

    const path = `M 0 0 L ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${radius} ${radius} 0 0 0 ${x5} ${y5} L ${x6} ${y6} A ${radius} ${radius} 0 0 1 ${x7} ${y7} L ${x8} ${y8} L ${x9} ${y9} Z`


    return (
        <Frame>
            {[...Array(30)].map((_,k) => {
                return (
                    <div key={k}>
                        hei ... jiuo <br/>
                    </div>
                )
            })}

            <div style={{
                position: 'absolute',
                left: `calc(50% - ${0.5*width}px)`,
                top: `calc(100% + ${0.5*borderWidth - 0.5*height}px)`,
                width: `${width + 700}px`,
                height: `${height + 0.5*borderWidth + 600}px`
            }}>
                <svg
                    style={{WebkitTransform: 'translate3d(0,0,0)'}}
                    width={'100%'}
                    height={'100%'}>

                    <path
                        strokeWidth={0}
                        fill={'#008844'}
                        d={path}/>

                </svg>
            </div>


        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    width: 80%;
    margin: 20px auto;
    background-color: #303030;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, .7));
    border-radius: 6px;

    border: 1px solid #595959;

`