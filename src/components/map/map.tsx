import React, { FC } from "react";
import { Map, Placemark, YMapsApi } from "react-yandex-maps";
import styled from "styled-components";
import {
  optionsMyPlacemark,
  otherPlacemark,
} from "../../shared/map.config";
import { getAddressByCoords } from "../../shared/map.service";

interface Props {
  recommendedCrew?: CrewInfoType[];
  myAddress?: MyAddressType;
  ymaps?: YMapsApi;
  handlerAddMyAddress: (obj: AddressesType) => void;
}

const StyledMap = styled(Map)`
  flex: 2 0.5;
  border: 1px solid black;
`;
export const Maps: FC<Props> = ({
  recommendedCrew,
  myAddress,
  ymaps,
  handlerAddMyAddress,
}: Props) => {
  const handleClick = (event: Map<string, number[]>): void => {
    const coords = event.get("coords");

    try {
      if (ymaps && coords) {
        getAddressByCoords({
          ymaps,
          coords,
          fun: handlerAddMyAddress,
        });
      }
    } catch {}
  };

  return (
    <StyledMap
      defaultState={{ center: [56.86657, 53.210579], zoom: 12 }}
      modules={["SuggestView"]}
      onClick={handleClick}
    >
      {recommendedCrew &&
        recommendedCrew.map(({ lat, lon }, index) => {
          return (
            <Placemark
              key={index}
              options={otherPlacemark}
              geometry={[lat, lon]}
            />
          );
        })}
      {myAddress && (
        <Placemark
          key={myAddress.id}
          options={optionsMyPlacemark}
          geometry={[...myAddress.coords]}
        />
      )}
    </StyledMap>
  );
};
