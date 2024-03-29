import React, {FC, useRef, useState} from 'react'
import styled from 'styled-components'

export const DateInput: FC = (props) => {

    const yearRef = useRef<HTMLInputElement>(null)
    const monthRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [date, setDate] = useState('')

    const onYearInput = (value: string) => {
        if (value.length > 4) {
            monthRef.current?.focus()

            return
        }
        const int = parseInt(value)
        if (int.toString() !== value) {return}

        setYear(value)
    }

    const onYearKeyDown = (key: string) => {
        if (key === 'ArrowRight') {
            monthRef.current?.focus()

            return
        }

        if (key === 'ArrowLeft') {
            dateRef.current?.focus()

            return
        }
    }

    const onMonthInput = (value: string) => {
        yearRef.current?.setSelectionRange(1,3)
        yearRef.current?.focus()

        const int = parseInt(value)
        if (int.toString() !== value) {return}

        setMonth(value)

        if (value.length === 2) {
            dateRef.current?.focus()
        }
    }

    const onMonthKeyDown = (key: string) => {
        yearRef.current?.focus()
        yearRef.current?.setSelectionRange(4,4)

        return
        if (key === 'Backspace') {
            if (month.trim() === '') {
                yearRef.current?.focus()
            }
        }
        
        if (key === 'ArrowRight') {
            dateRef.current?.focus()

            return
        }

        if (key === 'ArrowLeft') {
            if (month.trim() === '') {

                yearRef.current!.selectionStart = 3
                yearRef.current!.selectionEnd = 3
                yearRef.current?.focus()

            }
            return
        }
    }

    const onDateInput = (value: string) => {
        const int = parseInt(value)
        if (int.toString() !== value) {return}

        setDate(value)

        if (value.length === 2) {
            yearRef.current?.focus()
        }
    }

    const onDateKeyDown = (key: string) => {
        if (key === 'Backspace') {
            if (date === '') {
                monthRef.current?.focus()
            }
        }

        if (key === 'ArrowRight') {
            yearRef.current?.focus()

            return
        }

        if (key === 'ArrowLeft') {
            monthRef.current?.focus()

            return
        }
    }


    return (
    <Frame>

        <input
            onChange={({target}) => onYearInput(target.value)}
            value={year}
            onKeyDown={({key}) => onYearKeyDown(key)}
            ref={yearRef}
            type={'text'}
            pattern={'[0-9]*'}
            placeholder={'YYYY'}/>

        <div>/</div>

        <input
            onChange={({target}) => onMonthInput(target.value)}
            value={month}
            ref={monthRef}
            onKeyDown={({key}) => onMonthKeyDown(key)}
            type={'text'}
            pattern={'[0-9]*'}
            placeholder={'MM'}/>

        <div>/</div>

        <input
            onChange={({target}) => onDateInput(target.value)}
            value={date}
            ref={dateRef}
            onKeyDown={({key}) => onDateKeyDown(key)}
            type={'text'}
            pattern={'[0-9]*'}
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
