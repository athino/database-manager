import React, {useState} from 'react'
import styled from 'styled-components'
import {Popover} from '@athino/popover'

export default function TooltipExample() {

    const [open, setOpen] = useState(true)

    return (
        <Frame>
            <Popover
                margin={'20px'}
                open={open}
                target={(
                    <button onClick={() => setOpen((prev) => !prev)}>Hello</button>
                )}
                content={(
                    <button>Hello</button>
                )}/>
        </Frame>
    )
}


const Frame = styled.div`
    background-color: ${(() => 'red')()};
`
