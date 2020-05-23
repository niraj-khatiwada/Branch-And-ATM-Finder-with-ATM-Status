import React from 'react'

import {
  Wrapper,
  GreenWrapper,
  Green,
  Working,
  RedWrapper,
  Red,
  NotWorking,
  Center,
} from './ATMLabel.styles'

export default function ATMLabel() {
  return (
    <Wrapper>
      <GreenWrapper>
        <Green></Green>
        <Working>Working</Working>
      </GreenWrapper>
      <RedWrapper>
        <Red></Red>
        <NotWorking>Not Working</NotWorking>
      </RedWrapper>
    </Wrapper>
  )
}
