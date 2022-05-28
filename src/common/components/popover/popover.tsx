import {FC} from "react"
import styled from "styled-components"
import { PopoverTooltip } from "./popoverTooltip"
import {PopoverWrapper} from "./popoverWrapper"

type Props = {
    target: React.ReactNode
    content: React.ReactNode
    options?: {
      preserve3dTransformStyleOnParents?: boolean
      position: 'top' | 'bottom'
      translateZPixels?: number
    }
}

export const Popover: FC<Props> = (props) => {

    return (
        <PopoverWrapper
            options={{
                position: 'top'
            }}
            target={props.target}
            content={(
                <PopoverTooltip>
                    {props.content}
                </PopoverTooltip>
            )}/>

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