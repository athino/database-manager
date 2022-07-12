import React from 'react'
import {Tooltip2} from "common/components/tooltip2"

export default function TooltipExample() {

    return (
        <>
            <Tooltip2
                padding={'10px'}
                margin={'20px 30px 0 50px'}
                arrow={'bottom'}>
                Hei! <br/><br/>

                Dette er en tooltip...
            </Tooltip2>

        </>
    )
}