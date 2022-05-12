import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  selectedIndex: number
  listLength: number
  onRight: () => void
  onLeft: () => void
  pageIndex: number
  onSelect(number: number): void
  pageCount: number
}

export const Numbers: FC<Props> = (props) => {

  const pages = [1,2,3,4]

  const canGoLeft = 1 < props.pageIndex
  const canGoRight = props.pageIndex < props.pageCount + 1

  const onLeft = () => {
    if (canGoLeft) {
      return props.onLeft()
    }
  }

  const onRight = () => {
    if (canGoRight) {
      return props.onRight()
    }
  }

  return (
    <Frame>
      <Item
        style={{color: canGoLeft ? 'white' : 'gray' }}
        selected={false} onClick={onLeft}>
        {'<'}
      </Item>

      {pages.map((number) => {
        const disabled = number - 1 > props.pageCount 

        return (
          <Item
            style={{color: disabled ? 'gray' : 'white' }}
            onClick={() => !disabled && props.onSelect(number)}
            key={number}
            selected={props.pageIndex === number}>
            {number}
          </Item>
        )
      })}

      <Item
        style={{color: canGoRight ? 'white' : 'gray' }}
        selected={false} onClick={onRight}>
        {'>'}
      </Item>
    </Frame>
  )
}

const Frame = styled.div`
  position: relative;
  display: flex;
  margin: 10px 0 10px 0;

  width: 100%;
`

const Item = styled.div<{
  selected: boolean
}>`
  background: ${({selected}) => selected ? '#696969' : '#39393B'};
  border-radius: 6px;
  padding: 6px;
  line-height: 1;
  font-size: 15px;
  width: 15px;
  text-align: center;
  color: #FFFFFF;
  cursor: pointer;
  margin: 0 10px 0 0;
  &:last-child {
    margin: 0 0 0 0;
  }
`
