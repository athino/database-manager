import React from 'react'
import styled from 'styled-components'
import {parseYearMonthDate} from './calendarUtils'

type Props = {
    year: number
    month: number
    date: number
}

export const Calendar = (props: Props) => {

    const days = parseYearMonthDate(props)

    return (
        <Frame>

            <Weekdays>
                {['MAN', 'TIR'].map((weekday, idx) => {
                    return <Weekday key={idx}>{weekday}</Weekday>
                })}
            </Weekdays>

            <Dates>
                {days.map((_, idx) => {
                    return <Date key={idx}>{idx}</Date>
                })}
            </Dates>

        </Frame>
    )
}

const Frame = styled.div`
    position: relative;
    height: 300px;
    width: 300px;
    background-color: red;
`

const Weekdays = styled.div`
    position: relative;
    display: flex;
`

const Weekday = styled.div`
    position: relative;
    background-color: green;
`

const Dates = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
`

const Date = styled.div`
    position: relative;
    background-color: blue;
`

