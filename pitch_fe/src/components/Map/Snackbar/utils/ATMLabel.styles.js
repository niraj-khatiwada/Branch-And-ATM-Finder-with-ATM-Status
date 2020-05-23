import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 12rem;
  margin-bottom: 1rem;
`
export const GreenWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 4fr;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const Green = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: green;
`

export const Working = styled.div`
  width: 100%;
`
export const RedWrapper = GreenWrapper

export const Red = styled(Green)`
  background-color: red;
`

export const NotWorking = Working
