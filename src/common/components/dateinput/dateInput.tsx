import React, {FC, useRef, useState} from 'react'
import styled from 'styled-components'

export const DateInput: FC = () => {

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'ArrowLeft') {
            event.preventDefault()
            ref.current?.setSelectionRange(4,4)
            ref.current?.focus()
        }

    }




    const [value, setValue] = useState('1234')
    const ref = useRef<HTMLInputElement>(null)

    return (
        <Frame>

            <input
                onChange={({target}) => setValue(target.value)}
                value={value}
                ref={ref}
                type={'text'}/>

            <input
                onKeyDown={onKeyDown}
                type={'text'}/>

        </Frame>
    )
}

const Frame = styled.div`
* {
    color: black;
}
`
