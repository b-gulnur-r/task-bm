import React from "react"
import styled from "styled-components"

interface Props {
  invalid: boolean
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CreateOrderBtn = styled.button`
  padding: 10px;
  width: 300px;
`

export const CreateOrderButton = ({ invalid }: Props) => {
  return (
    <Wrapper>
      <CreateOrderBtn type="submit" disabled={invalid}>
        Заказать
      </CreateOrderBtn>
    </Wrapper>
  )
}
