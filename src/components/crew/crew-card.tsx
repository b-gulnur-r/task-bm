import React, { ReactElement } from "react"
import styled from "styled-components"
import { SvgTaxi } from "../ui/icons/taxi"
import { NumberOfCar } from "./number-of-car"

const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`

type Props = CrewInfoType & {
  onClick?: () => void
  style?: any
  isShowNumberOfCar?: boolean
}

export const CrewCard = ({
  style,
  onClick,
  car_mark,
  car_model,
  car_color,
  car_number,
  isShowNumberOfCar,
}: Props): ReactElement => (
  <Row onClick={onClick} style={style}>
    <SvgTaxi />
    <Column>
      <div>{`${car_mark} ${car_model}`}</div>
      <div>{car_color}</div>
      {isShowNumberOfCar && <NumberOfCar numberOfCar={car_number} />}
    </Column>
  </Row>
)
