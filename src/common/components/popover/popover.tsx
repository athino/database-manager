import {ReactNode, FC} from "react"
import {PopoverWrapper} from "./popoverWrapper"
import {Tooltip} from '@athino/tooltip'

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
                position: 'bottom'
            }}
            target={props.target}
            content={(
                <Tooltip>
                    {props.content}
                </Tooltip>
            )}/>

    )
}