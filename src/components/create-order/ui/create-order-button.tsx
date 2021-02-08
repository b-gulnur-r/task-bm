import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  disabled: boolean;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CreateOrderBtn = styled.button`
  padding: 10px;
  width: 300px;
`;

export const CreateOrderButton: FC<Props> = ({ disabled }: Props) => (
  <Wrapper>
    <CreateOrderBtn type="submit" disabled={disabled}>
      Заказать
    </CreateOrderBtn>
  </Wrapper>
);
