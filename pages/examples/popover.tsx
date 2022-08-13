import {Popover} from 'common/components/popover/popover'
import React from 'react'

export default function TooltipExample() {

    return (
        <>
            <Popover
                escape={5}
                layer={5}
                target={<button>ewfhuwiefhiuweh</button>}
                content={'h yg ygygu ef'.repeat(10)}/>
        </>
    )
}