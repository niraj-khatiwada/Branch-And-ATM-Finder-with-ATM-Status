import styled from 'styled-components'

export const ContentWrapper = styled.div`
  padding: 1rem;
`
export const BranchWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`

export const IconAndTitle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 4fr;
  align-items: center;
`
export const Heading = styled.h3`
  margin-left: 1rem;
  font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${(props) => (props.isAllDown ? 'red' : 'white')};
}
`

export const Image = styled.img`
  width: 100%;
`

export const BankWrapper = styled.div`
  border-top: 1px solid white;
  padding-top: 0.5rem;
`

export const ATMWrapper = BankWrapper

export const ATMGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-evenly;
  align-items: center;
`

export const ATMImage = styled.img`
  width: 100%;
  background-color: ${(props) => (props.atmStatus ? `green` : 'red')};
  padding: 8px;
  border-radius: 0.5rem;
`

export const ATMImageWrapper = styled.div`
  margin: 8px;
  border: 8px solid transparent;
`

export const Item = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem 0;
`
export const ItemHeading = styled.h4`
  margin: 0 0.5rem 0 0;
  font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`

export const P = styled.p`
  margin: 0;
  font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`
export const H4 = styled.h4`
  font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`

export const WithSpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
