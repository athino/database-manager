import styled from 'styled-components'

export const Button = styled.button<{
  red?: boolean
}>`
  border: 1px solid #252830;
  border-radius: 6px;
  padding: 6px;
  background: ${({red}) => red ? 'none' : 'rgb(0, 95, 204)'};
  border-color: ${({red}) => red ? '#3B3B3C' : 'rgb(0, 95, 204)'};
  color: ${({red}) => red ? '#DA3633' : '#FFFFFF'};
  width: 100%;
  cursor: pointer;
  &:disabled {
    background: #515562;
  }
`
