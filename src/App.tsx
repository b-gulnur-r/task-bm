import React from "react"
import { YMaps } from "react-yandex-maps"
import { CreateOrderForm } from "./components/create-order/create-order.form"
import { mapProviderProps } from "./shared/map.config"

function App() {
  return (
    <YMaps {...mapProviderProps}>
      <CreateOrderForm />
    </YMaps>
  )
}

export default App
