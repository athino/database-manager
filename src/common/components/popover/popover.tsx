import {ReactNode, FC} from "react"
import {PopoverWrapper} from "./popoverWrapper"
import {Tooltip} from '@athino/tooltip'

type Props = {
    target: ReactNode
    content: ReactNode
    position?: 'top' | 'bottom'
    escape: number
    layer: number
    margin?: string
}

export const Popover: FC<Props> = (props) => {

    return (
        <PopoverWrapper
            margin={props.margin}
            options={{
                position: 'bottom'
            }}
            target={props.target}
            content={(
                <Tooltip marginOffset={{top: 'fromDoubleArrowLength'}}>
                    {props.content}
                </Tooltip>
            )}/>

    )
}