import {FC} from "react"
import styled from "styled-components"

type Props = {
}

export const PopoverTooltip: FC<Props> = (props) => {

    const width = 18
    const height = width

    const borderWidth = 1

    const borderPath = `M0 ${0.5*width} L${0.5*width} ${width}  L${width} ${0.5*width}`

    const backgroundPath = `M${0} ${0.5*width} L0 ${0.5*width} L${0.5*width} ${width} L${width} ${0.5*width} L${width} ${0.5*width} L${width} ${0} L${0} ${0} Z`

    return (
        <Frame style={{marginBottom: `${0.5*height}px`}}>
            <div style={{
                position: 'absolute',
                left: `calc(50% - ${0.5*width}px)`,
                top: `calc(100% + ${0.5*borderWidth - 0.5*height}px)`,
                width: `${width}px`,
                height: `${height + 0.5*borderWidth}px`
            }}>
                <svg
                    width={'100%'}
                    height={'100%'}>

                    <path
                        strokeWidth={0}
                        fill={'#00ffff'}
                        d={backgroundPath}/>

                    <path
                        strokeWidth={1}
                        fillOpacity={0}
                        stroke={'#595959'}
                        d={borderPath}/>
                </svg>
            </div>
            <div style={{position: 'relative'}}>
                {props.children}
            </div>
        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    width: 100%;
    background-color: #303030;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, .7));
    border-radius: 6px;
    border: 1px solid #595959;
`