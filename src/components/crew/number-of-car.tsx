import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
    numberOfCar: string
}

const Card = styled.div`
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
`

export const NumberOfCar = ({ numberOfCar }: Props): ReactElement => {
    return (
        <Card>
            {numberOfCar}
        </Card>
    );
};