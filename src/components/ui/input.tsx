import React, { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Grid } from "./grid";

const Label = styled.span`
  text-align: right;
`;

interface InputProps {
  errorMessage: string;
  value: string;
  onChangeData: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({
  errorMessage,
  value,
  onChangeData,
  ...props
}: InputProps) => {
  const [suggestValue, setSuggestValue] = useState(value || "");
  return (
    <Grid>
      <>
        <Label>Откуда:</Label>
        <input
          {...props}
          value={suggestValue}
          style={{ flex: 1, width: 500 }}
          className="form-control"
          id="suggest"
          onChange={(e) => {
            onChangeData(e);
            setSuggestValue(e.target.value);
          }}
        />
        {errorMessage && (
          <span className="errorMessage">{errorMessage}</span>
        )}
      </>
    </Grid>
  );
};
