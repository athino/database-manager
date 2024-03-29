import React, {FC} from 'react'
import styled from 'styled-components'

type Props = {

}

export const SvgTest: FC<Props> = (props) => {


  return (
    <Frame>

      fhierywfhuie<br/>


      <Svg>

      <rect
        fill='#303030'
        stroke='#595959'
        width="100%" height="100%"/>

        <path fill='#303030' stroke='#595959' d="M30.1406425,22.8869017 L30.1406425,23.3869017 C26.0378958,23.3869017 25.2134423,24.053935 23.5710423,25.4038768 C21.89562,26.7809607 20.2205994,28.5027375 18.5451927,30.2240764 C17.6324895,31.1618019 16.9413937,31.5958569 16.2634347,31.5958569 C15.5854758,31.5958569 14.8943799,31.1618019 13.9816767,30.2240764 C13.6298814,29.8626364 13.3147947,29.5313743 13.0134365,29.2145392 C11.8794858,28.0223517 10.9414378,27.0359146 8.95582717,25.4038768 C7.31909651,24.0585948 5.40934725,23.3869017 3.22726987,23.3869017 L3.22726987,23.3869017 L3.22726987,22.8869017 L30.1406425,22.8869017 Z"></path>


      </Svg>

    </Frame>
  )
}

const Frame = styled.div`
  position: relative;
`

const Svg = styled.svg`
  position: absolute;
  filter: drop-shadow(0px 0px 4px #00000050);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`

