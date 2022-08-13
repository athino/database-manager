import { Button } from 'common/components/button'
import {Popover} from 'common/components/popover/popover'
import React from 'react'
import styled from 'styled-components'

export default function TooltipExample() {

    return (
        <>
            <Popover
                margin={'20px'}
                escape={5}
                layer={5}
                target={<Button>Select database</Button>}
                content={'h yg ygygu ef'.repeat(10)}/>
        </>
    )
}