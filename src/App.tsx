import React from "react"
import styled from "styled-components"
import { YMaps } from "react-yandex-maps"
import { CreateOrderForm } from "./components/create-order/create-order.form"
import { mapProviderProps } from "./shared/map.config"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.p`
  border-bottom:  1px solid black;
  padding-bottom: 10px;
`

function App() {
  return (
    <YMaps {...mapProviderProps}>
      <Container>
        <Title>Детали заказа</Title>
        <CreateOrderForm />
      </Container>
    </YMaps>
  )
}

export default App
