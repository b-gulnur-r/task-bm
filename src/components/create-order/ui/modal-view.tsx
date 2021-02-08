import React from "react";
import styled from "styled-components";
import { CrewCard } from "../../crew/crew-card";

interface Props {
  myOrders: MyOrdersType;
  selectedCrew: CrewInfoType;
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: rgba(35, 35, 35, 0.8);
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: white;
`;
const Driver = styled.div`
  padding-top: 16px;
`;

export const ModalView = ({
  myOrders,
  selectedCrew,
}: Props): React.ReactElement => {
  return (
    <Overlay>
      <Modal>
        <div>Ваш заказ:</div>
        <CrewCard
          style={{ border: 0, padding: 10 }}
          isShowNumberOfCar
          {...selectedCrew}
        />
        <div>{myOrders.addresses.address}</div>
        <Driver>{`Водитель: ${selectedCrew.driver_name}`}</Driver>
      </Modal>
    </Overlay>
  );
};
