import React, { useState } from "react"
import styled from "styled-components"
import { Grid } from "./grid"

const Label = styled.span`
  text-align: right;
`

export const Input = ({ errorMessage, value, onChangeData, ...props }: any) => {
  const [value1, setValue] = useState(value || "")
  return (
    <Grid>
      <>
        <Label>Откуда:</Label>
        <input
          {...props}
          value={value1}
          style={{ flex: 1, width: 500 }}
          className="form-control"
          id="suggest"
          onChange={(e) => {
            onChangeData(e)
            setValue(e.target.value)
          }}
        />
        {errorMessage && <span className="errorMessage">{errorMessage}</span>}
      </>
    </Grid>
  )
}
