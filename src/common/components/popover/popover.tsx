import {ReactNode, FC, useState} from "react"
import {PopoverWrapper} from "./popoverWrapper"
import {Tooltip} from '@athino/tooltip'

export type TargetProps = {
    popoverIsOpen: boolean
    closePopover(): void
    openPopover(): void
}

export type ClickOutsideOptions = TargetProps & {
    target: EventTarget
}

type Props = {
    target: (props: TargetProps) => ReactNode
    content: ReactNode
    position?: 'top' | 'bottom'
    escape: number
    layer: number
    margin?: string
    clickOutside?(options: ClickOutsideOptions): void
}

export const Popover: FC<Props> = (props) => {

    const [popoverIsOpen, setPopoverIsOpen] = useState(false)

    const target = props.target({
        openPopover: () => setPopoverIsOpen(true),
        closePopover: () => setPopoverIsOpen(false),
        popoverIsOpen: popoverIsOpen
    })

    return (
        <PopoverWrapper
            clickOutside={props.clickOutside}
            popoverIsOpen={popoverIsOpen}
            closePopover={() => setPopoverIsOpen(false)}
            openPopover={() => setPopoverIsOpen(true)}
            margin={props.margin}
            options={{
                position: 'bottom'
            }}
            target={target}
            content={(
                <Tooltip
                    padding="10px"
                    marginOffset={{top: 'fromDoubleArrowLength'}}>
                    {props.content}
                </Tooltip>
            )}/>

    )
}