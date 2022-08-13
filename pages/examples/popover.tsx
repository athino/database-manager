import {Button} from 'common/components/button'
import {Popover} from 'common/components/popover/popover'
import React from 'react'

export default function TooltipExample() {

    return (
        <>
            <Popover
                margin={'20px'}
                escape={5}
                layer={5}
                target={<Button>Select database gy gyug guyg u</Button>}
                content={'h yg ygygu ef'.repeat(10)}/>
        </>
    )
}