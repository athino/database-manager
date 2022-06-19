import React, {FC} from 'react'
import styled from 'styled-components'
import {Paginator} from './paginator'

type ListItemId = string | number | undefined

type ListItem = {
    id: ListItemId
    name: string
    isBeingUpdated: boolean
}

type Props = {
  onSelectItem(listItem: ListItem): void
  selectedId: ListItemId
  list: ListItem[]
  onCreateNew(name: string): void
}

export const Sidebar: FC<Props> = (props) => {

  return (
    <Frame>
      <InnerFrame>
          <Paginator
              onCreateNew={props.onCreateNew}
              onSelectItem={props.onSelectItem}
              selectedId={props.selectedId}
              list={props.list}/>
      </InnerFrame>
    </Frame>
  )
}

const Frame = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`

const InnerFrame = styled.div`
  position: sticky;
  width: 250px;
  height: 100vh;
  top: 0;
  box-sizing: border-box;
  border-right: 1px solid #3B3B3C;
  background: #252526;
`