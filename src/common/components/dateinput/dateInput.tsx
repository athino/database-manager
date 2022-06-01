import React, {FC, useRef, useState} from 'react'
import styled from 'styled-components'

export const DateInput: FC = () => {

    const onMonthKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (['ArrowLeft', 'Backspace'].includes(event.key)) {
            if (month === '') {
                event.preventDefault()
                ref.current?.setSelectionRange(year.length,year.length)
                ref.current?.focus()
    
                return
            }
        }

    }




    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')

    const ref = useRef<HTMLInputElement>(null)

    return (
        <Frame>

            <input
                onChange={({target}) => setYear(target.value)}
                value={year}
                ref={ref}
                type={'text'}/>

            <input
                onChange={({target}) => setMonth(target.value)}
                value={month}
                onKeyDown={onMonthKeyDown}
                type={'text'}/>

        </Frame>
    )
}

const Frame = styled.div`
* {
    color: black;
}
`
