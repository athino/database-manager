import React from 'react'
import {Stack} from '@athino/stack'

export default function StackExample() {

    return (
        <div>
            <div>
                <Stack onEscaped={() => console.log(2)}>
                    <button>Hello</button>
                </Stack>
            </div>
        </div>
    )
}
