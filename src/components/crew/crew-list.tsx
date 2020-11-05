import React, { Dispatch, ReactElement, SetStateAction } from "react"
import { Field } from "react-final-form"
import styled from "styled-components"
import { CrewCard } from "./crew-card"

interface Props {
  crew: CrewInfoType[]
  setSelectedCrew: Dispatch<SetStateAction<CrewInfoType | undefined>>
  change: any
}

const Container = styled.div`
  flex: 0.5 1;
  margin-left: 16px;
  border: 1px solid black;
`

export const CrewList = ({
  crew,
  setSelectedCrew,
  change,
}: Props): ReactElement => {
  return (
    <Container>
      {crew.map((item) => (
        <Field  key={item.crew_id} style={{ flex: 1 }} name="crew_id">
          {() => {
            return (
              <CrewCard
                onClick={() => {
                  setSelectedCrew(item)
                  change("crew_id", item.crew_id)
                }}
                {...item}
              />
            )
          }}
        </Field>
      ))}
    </Container>
  )
}
