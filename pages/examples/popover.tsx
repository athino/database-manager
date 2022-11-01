import React, {useState} from 'react'
import {Popover} from '@athino/popover'

export default function TooltipExample() {

    const [open, setOpen] = useState(true)

    return (
        <>
            <Popover
                margin={'20px'}
                open={open}
                target={(
                    <button onClick={() => setOpen((prev) => !prev)}>Hello</button>
                )}
                content={(
                    <button>Hello</button>
                )}/>
        </>
    )
}
