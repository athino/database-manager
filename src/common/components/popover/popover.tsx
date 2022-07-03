import {ReactNode, FC} from "react"
import {PopoverTooltip} from "./popoverTooltip"
import {PopoverWrapper} from "./popoverWrapper"

type Props = {
    target: ReactNode
    content: ReactNode
    position?: 'top' | 'bottom'
    escape: number
    layer: number
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