import React, { ReactElement } from "react"
import styled from "styled-components"
import { SvgTaxi } from "../ui/icons/taxi"

interface Props {
  crew: CrewInfoType[]
}

const Container = styled.div`
  flex: .5 1;
  margin-left: 16px;
  border: 1px solid black;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom:  1px solid black;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`

export const CrewList = ({ crew }: Props): ReactElement => {
  return (
    <Container>
      {crew.map((item) => {
          const name = `${item.car_mark} ${item.car_model}`
        return (
          <Row key={item.crew_id}>
            <SvgTaxi />
            <Column>
              <div>{name}</div>
              <div>{item.car_color}</div>
            </Column>
          </Row>
        )
      })}
    </Container>
  )
}
