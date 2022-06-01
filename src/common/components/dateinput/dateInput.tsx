import React, {FC, useRef, useState} from 'react'
import styled from 'styled-components'

export const DateInput: FC = () => {

    const onYearKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (['ArrowRight'].includes(event.key)) {
            if (yearRef.current?.selectionEnd === yearRef.current?.selectionEnd) {
                if (yearRef.current?.selectionEnd === year.length) {
                    event.preventDefault()
                    monthRef.current?.setSelectionRange(0,0)
                    monthRef.current?.focus()
        
                    return
                }
            }
        }

    }

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
                onKeyDown={onYearKeyDown}
                type={'text'}
                placeholder={'YYYY'}/>

            <div>/</div>

            <input
                onChange={({target}) => setMonth(target.value)}
                value={month}
                ref={monthRef}
                onKeyDown={onMonthKeyDown}
                type={'text'}
                placeholder={'MM'}/>

            <div>/</div>

            <input
                onChange={({target}) => setDate(target.value)}
                value={date}
                ref={dateRef}
                onKeyDown={onDateKeyDown}
                type={'text'}
                placeholder={'DD'}/>

        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    display: flex;
    max-width: 450px;
    border: 1px solid #1A1A1A;
    border-radius: 4px;
    background-color: #1F1F1F;
    &:focus-within {
        border: 1px solid rgb(0, 95, 204);
    }
    * {
    background-color: #1F1F1F;
        appearance: none;
        border: none;
        outline: none;
        color: white;
    }
    input {
        flex-grow: 1;
    }
`
