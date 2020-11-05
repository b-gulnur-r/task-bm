import React, { ReactElement } from "react"
import styled from "styled-components"

interface Props {
  children: ReactElement
}

const View = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-gap: 10px;
  margin-bottom: 20px;
`

export const Grid = ({ children }: Props): ReactElement => {
  return <View>{children}</View>
}
