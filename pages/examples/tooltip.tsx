import React from 'react'
import {Tooltip} from '@athino/tooltip'

export default function TooltipExample() {

    return (
        <>
            <Tooltip
                arrowPosition={'top center'}
                margin={'20px'}
                padding={'10px'}>
                Hei! <br/><br/>

                Dette er en tooltip...
            </Tooltip>

            <Tooltip margin={'20px'} padding={'10px'}>
                Hei! <br/><br/>

                Dette er en tooltip...
            </Tooltip>

        </>
    )
}