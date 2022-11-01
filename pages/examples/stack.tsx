import React from 'react'
import {Stack} from '@athino/stack'

export default function StackExample() {

    return (
        <div>
            <div>
                <Stack escape={10} layer={12}>
                    <button>Hello</button>
                </Stack>
            </div>
        </div>
    )
}
