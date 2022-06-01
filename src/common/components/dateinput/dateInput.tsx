import React, {FC, useRef, useState} from 'react'
import styled from 'styled-components'

export const DateInput: FC = () => {

    const onMonthKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (['ArrowLeft', 'Backspace'].includes(event.key)) {
            if (month === '') {
                event.preventDefault()
                yearRef.current?.setSelectionRange(year.length,year.length)
                yearRef.current?.focus()
    
                return
            }
        }
    }

    const onDateKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (['ArrowLeft', 'Backspace'].includes(event.key)) {
            if (date === '') {
                event.preventDefault()
                monthRef.current?.setSelectionRange(month.length,month.length)
                monthRef.current?.focus()
    
                return
            }
        }
    }

    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [date, setDate] = useState('')

    const yearRef = useRef<HTMLInputElement>(null)
    const monthRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    return (
        <Frame>

            <input
                onChange={({target}) => setYear(target.value)}
                value={year}
                ref={yearRef}
                onKeyDown={() => 1}
                type={'text'}/>

            <input
                onChange={({target}) => setMonth(target.value)}
                value={month}
                ref={monthRef}
                onKeyDown={onMonthKeyDown}
                type={'text'}/>

            <input
                onChange={({target}) => setDate(target.value)}
                value={date}
                ref={dateRef}
                onKeyDown={onDateKeyDown}
                type={'text'}/>

        </Frame>
    )
}

const Frame = styled.div`
* {
    color: black;
}
`
