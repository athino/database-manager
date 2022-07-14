import React, { useEffect, useState } from 'react'
import {Tooltip} from "common/components/tooltip2"

export default function TooltipExample() {
    const [nox, setNox] = useState('')

    useEffect(() => {
        setInterval(() => {
            setNox((prev) => prev + ' fhui '.repeat(10))

        }, 1000)
    }, [])

    return (
        <>
            <Tooltip
                padding={'10px'}
                margin={'20px 30px 20px 50px'}
                arrow={'bottom'}>
                Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>Hei! <br/><br/>

                Dette er en tooltip...{nox}
            </Tooltip>

        </>
    )
}