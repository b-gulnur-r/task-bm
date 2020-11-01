import React from "react"
import styled from "styled-components"

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.span`
  padding-right: 16px;
`

export const Input = ({ errorMessage, ...props }: any) => {
  return (
    <Row>
      <Label>Откуда</Label>
      <input
        {...props}
        style={{ flex: 1, width: 500 }}
        className="form-control"
        id="suggest"
      />
      {errorMessage && <span className="errorMessage">{errorMessage}</span>}
    </Row>
  )
}
