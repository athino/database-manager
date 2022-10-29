import React, {useState} from 'react'
import { Accordion } from "common/components/accordion/accordion"

export default function Page () {

    const [expanded, setExpanded] = useState(false)

    return (
        <div>
            <Accordion
                expanded={expanded}
                content={() => <button>Hello</button>}
                header={() => (
                    <button
                        onClick={() => setExpanded((prev) => !prev)}>
                        expand
                    </button>
                )}/>

        </div>
    )
}