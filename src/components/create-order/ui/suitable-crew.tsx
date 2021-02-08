import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";
import { CrewCard } from "../../crew/crew-card";
import { Grid } from "../../ui/grid";

const Label = styled.span`
  text-align: right;
`;

interface Props {
  selectedCrew: CrewInfoType;
  change: (
    name: "crew_id" | "addresses" | "source_time",
    value: number,
  ) => void;
}

export const SuitableCrew = ({
  selectedCrew,
  change,
}: Props): ReactElement => {
  useEffect(() => {
    selectedCrew && change("crew_id", selectedCrew.crew_id);
  }, [selectedCrew]);

  return (
    <Grid>
      <>
        <Label>Подходящий экипаж: </Label>
        <CrewCard
          style={{
            border: "1px solid black",
            width: 300,
            padding: 10,
            borderRadius: 5,
          }}
          {...selectedCrew}
          isShowNumberOfCar
        />
      </>
    </Grid>
  );
};
