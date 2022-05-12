import styled from "styled-components"
import React from 'react'

export default function Lol() {

    const width = 30
    const height = width

    const borderWidth = 1

    const a = 6.55/12.22
    const b = 2.59/12.22

    const x = 0.5*width

    const borderPath = `M ${2*x} ${x} C ${x + a*x}, ${x} ${x + b*x}, ${2*x} ${x}, ${2*x} C ${x - b*x}, ${2*x} ${x - a*x}, ${x} 0, ${x}`

    const backgroundPath = `${borderPath} L 0 0 L ${2*x} 0 Z`



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
                width: `${width}px`,
                height: `${height + 0.5*borderWidth}px`
            }}>
                <svg
                    style={{WebkitTransform: 'translate3d(0,0,0)'}}
                    width={'100%'}
                    height={'100%'}>

                    <path
                        strokeWidth={0}
                        fill={'#303030'}
                        d={backgroundPath}/>

                    <path
                        strokeWidth={1}
                        fillOpacity={0}
                        stroke={'#595959'}
                        d={borderPath}/>
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