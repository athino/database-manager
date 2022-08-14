import {Button} from 'common/components/button'
import {Popover, TargetProps} from 'common/components/popover/popover'
import React from 'react'

export default function TooltipExample() {

    return (
        <>
            <Popover
                margin={'20px'}
                escape={0}
                layer={5}
                clickOutside={({closePopover}) => closePopover()}
                target={TargetButton}
                content={'h yg ygygu ef'.repeat(10)}/>
                <Button style={{position: 'relative'}}>gui</Button>
        </>
    )
}

const TargetButton = (props: TargetProps) => {

    const onClick = () => {
        props.popoverIsOpen
            ? props.closePopover()
            : props.openPopover()
    }

    return (
        <Button
            onClick={onClick}>
            Select database
        </Button>
    )

}