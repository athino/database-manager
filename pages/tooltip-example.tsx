import React from 'react'
import {Tooltip} from "common/components/tooltip"

export default function TooltipExample() {

    return (
        <>
            <Tooltip
                padding={'10px'}
                margin={'20px 30px 0 50px'}
                arrow={'bottom'}>
                Hei! <br/><br/>

                Dette er en tooltip...
            </Tooltip>

            <Tooltip
                padding={'10px'}
                margin={'0 30px 10px 50px'}
                arrow={'bottom'}>
                Hei! <br/><br/>

                Dette er en tooltip...
            </Tooltip>

        </>
    )
}