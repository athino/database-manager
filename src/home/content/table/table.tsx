import {Button} from 'common/components/button'
import React, {FC} from 'react'
import styled from 'styled-components'

type Props = {
    name: string
    columns: Array<{
        columnName: string
        type: string
    }>
    onRequestDeleteTable(): void
}

export const Table: FC<Props> = (props) => {

  return (
      <TableFrame>    
        <thead>
            <tr>
                <td style={{padding: '10px 50px 10px 10px'}}>{props.name}</td>
                {props.columns.map((column) => {
                    return (
                        <td key={column.columnName}>
                            {column.columnName} <ColumnType>{column.type}</ColumnType>
                        </td>
                    )
                })}
                <td>
                    <Button onClick={props.onRequestDeleteTable}>
                        Delete table
                    </Button>
                </td>
            </tr>
        </thead>
        <tbody>
            {[...Array(4)].map((_, idx) => {
                return (
                    <tr key={idx}>
                        <td/>
                        {props.columns.map((column) => {

                            return (
                                <td key={column.columnName}>
                                    {column.columnName}
                                </td>
                            )
                        })}
                        <td>*</td>
                    </tr>
                )
            })}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={5}>1 2 3 4</td>
            </tr>
        </tfoot>
      </TableFrame>
  )
}

const TableFrame = styled.table`
    border-collapse: collapse;
    color: #D4D4D4;
    margin: 0 0 50px 0;
    td {
        padding: 10px;
    }
    thead {
        tr {
            background-color: #2E2E2E;
        }
    }
    tbody {
        tr:nth-child(even) {
            background-color: #252526;
        }
    }
    tfoot {
        tr {
            background-color: #2E2E2E;
        }
    }
`

const ColumnType = styled.span`
    color: #757575;
`
