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
        const int = parseInt(value)
        if (int.toString() !== value) {return}

        setYear(value)

        monthRef.current?.focus()
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
        const int = parseInt(value)
        if (int.toString() !== value) {return}

        setMonth(value)

        dateRef.current?.focus()
    }

    const onMonthKeyDown = (key: string) => {
        if (key === 'ArrowRight') {
            dateRef.current?.focus()

            return
        }

        if (key === 'ArrowLeft') {
            yearRef.current?.focus()

            return
        }
    }

    const onDateInput = (value: string) => {
        const int = parseInt(value)
        if (int.toString() !== value) {return}

        setDate(value)

        yearRef.current?.focus()
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
            type={'text'}
            pattern={'[0-9]*'}
            placeholder={'DD'}/>

    </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    display: flex;
    border: 1px solid #1A1A1A;
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
`
