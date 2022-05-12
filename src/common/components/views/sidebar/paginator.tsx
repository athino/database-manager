import React, {FC, ReactNode, useState} from 'react'
import styled from 'styled-components'
import {Button} from 'common/components/button'
import {TextInput} from 'common/components/textInput'
import {Numbers} from './numbers'
import {Loader} from '@athino/loader'
import {NewPopover} from '../../newpopover/newPopover'
import { SvgTest } from './testsvg'

type Props = {
  selectedId: string | number
  onSelectItem(item: any): void
  onCreateNew(name: string): void
  list: Array<{
    id: string | number
    name: string
    isBeingUpdated: boolean
  }>
}

export const Paginator: FC<Props> = (props) => {

  const [selectedPageState, setSelectedPageState] = useState(0)

  const content = props.list.reduce((acc, cur, idx) => {

    const selected = props.selectedId === cur.id
    const pageIndex = acc.pages.length
    const pageItemIndex = acc.page.length
    const selectedPage = selected ? pageIndex : acc.selectedPage

    acc.page.push((
      <Item
        key={`${pageIndex}-${pageItemIndex}-${cur.id}`}
        onClick={() => props.onSelectItem(cur)}
        selected={selected}>
        {cur.name} {!cur.isBeingUpdated
          ? <></>
          : <div style={{position: 'absolute', right: '22px', top: 0, bottom: 0, display: 'flex', alignItems: 'center'}}><Loader/></div>
        }
      </Item>
    ))

    const shouldAddPage = 
      acc.page.length === 3 ||
      props.list.length === idx + 1

    if (shouldAddPage) {
      acc.pages.push((
        <Page
          key={`${pageIndex}-${cur.id}`}
          style={{display: selectedPageState === pageIndex
            ? 'block'
            : 'none'}}>
          {acc.page}
        </Page>
      ))
    }

    return {
      selectedIndex: selected ? idx : acc.selectedIndex,
      pages: acc.pages,
      page: shouldAddPage ? [] : acc.page,
      selectedPage: selectedPage,
      pageCount: pageIndex
    }
  }, {
    selectedIndex: NaN,
    page: [] as ReactNode[],
    pages: [] as ReactNode[],
    selectedPage: NaN,
    pageCount: 0
  })

  const createNew = () => {
    const name = window.prompt('Enter new name', '')

    if (name) {
      props.onCreateNew(name)
    }

  }

  return (
    <Frame>
      <TextInput
        margin={'0 0 10px 0'}
        placeholder={'Filter databases'}
        value={''}
        onChange={() => 1}/>

      <Line margin={'0 0 10px 0'}/>

      <PageWrapper>
        {content.pages.length
          ? content.pages
          : (
            <div
              style={{
                position: 'absolute',
                right: '0',
                top: 0,
                bottom: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Loader/>
            </div>

          )
          
        }
      </PageWrapper>

      <Line margin={'10px 0 10px 0'}/>

      <Numbers
        pageCount={content.pageCount}
        selectedIndex={content.selectedPage}
        listLength={props.list.length}
        pageIndex={selectedPageState + 1}
        onSelect={(number) => setSelectedPageState(number - 1)}
        onLeft={() => setSelectedPageState((prev) => prev - 1)}
        onRight={() => setSelectedPageState((prev) => prev + 1)}/>

      <Line margin={'0 0 10px 0'}/>

      <NewPopover/>

    </Frame>
  )
}

const Frame = styled.div`
  position: relative;
  padding: 20px;
`

const PageWrapper = styled.div`
  position: relative;
  height: 90px;
`

const Page = styled.div`
  margin-bottom: 40px;
`

const Line = styled.div<{
  margin?: string
}>`
  position: relative;
  height: 1px;
  width: 100%;
  margin: 0 0 0 0;
  background-color: #3B3B3C;
  margin: ${({margin}) => margin};
`

const Item = styled.div<{
  selected: boolean
}>`
  position: relative;
  border-radius: 6px;
  padding: 6px;
  background: ${({selected}) => selected ? '#39393B' : 'none'};
  color: #FFFFFF;
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  margin: 0 0 5px 0;
`

