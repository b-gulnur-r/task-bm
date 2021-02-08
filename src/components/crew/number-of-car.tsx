import React, { ReactElement, CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  style?: CSSProperties;
  numberOfCar: string;
};

const Card = styled.div`
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
`;

export const NumberOfCar = ({
  numberOfCar,
  style,
}: Props): ReactElement => <Card style={style}>{numberOfCar}</Card>;
