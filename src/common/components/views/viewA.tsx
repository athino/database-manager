import React, {FC} from 'react'
import styled from 'styled-components'
import {Sidebar} from './sidebar/sidebar'

type ListItemId = string | number

type ListItem = {
    id: ListItemId
    name: string
    isBeingUpdated: boolean
}

type Props = {
    headerComponent: React.ReactNode
    contentComponent: React.ReactNode
    footerComponent?: React.ReactNode
    sidebarContent: {
        onSelectItem(listItem: ListItem): void
        selectedId: ListItemId
        list: ListItem[]
        onCreateNew(name: string): void
    }
}

export const ViewA: FC<Props> = (props) => {

  return (
    <>
        <Header>
            {props.headerComponent}
        </Header>

        <Main>
            <Sidebar
                onCreateNew={props.sidebarContent.onCreateNew}
                onSelectItem={props.sidebarContent.onSelectItem}
                selectedId={props.sidebarContent.selectedId}
                list={props.sidebarContent.list}/>

            <ContentWrapper>
                {props.contentComponent}
            </ContentWrapper>
        </Main>

        <Footer>
            {props.footerComponent}
        </Footer>
    </>
  )
}

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  border-bottom: 1px solid #3B3B3C;
  background: #252526;
`

const Main = styled.div`
  position: relative;
  width: 100%;
  min-height: 200vh;
  background: #1F1F1F;
`

const ContentWrapper = styled.div`
  position: relative;
  padding-left: 260px;
  z-index: 1;
`

const Footer = styled.div`
  position: relative;
  width: 100%;
  height: 168px;
  box-sizing: border-box;
  border-top: 1px solid #3B3B3C;
  background: #252526;
`
