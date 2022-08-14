import {Button} from 'common/components/button'
import {Popover, TargetProps} from 'common/components/popover/popover'
import React, { Fragment } from 'react'

export default function TooltipExample() {

    return (
        <>
            <Popover
                margin={'20px'}
                escape={0}
                layer={5}
                clickOutside={({closePopover}) => closePopover()}
                target={TargetButton}
                content={<>{[...Array(10)].map((_, key) => <Fragment key={key}>{`vers-1.0.${key}`}<br/></Fragment>)}</>}/>
                <Button style={{position: 'relative'}}>Select database</Button>
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
            Select version
        </Button>
    )

}