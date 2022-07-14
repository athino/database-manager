import React from 'react'
import {Tooltip} from "common/components/tooltip2"

export default function TooltipExample() {

    return (
        <>
            <Tooltip
                padding={'10px'}
                margin={'20px 30px 20px 50px'}
                arrow={'bottom'}>
                Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>

                Dette er en tooltip...
            </Tooltip>

        </>
    )
}