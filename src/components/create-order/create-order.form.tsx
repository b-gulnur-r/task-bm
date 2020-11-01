import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Field, Form } from "react-final-form"
import { useSelector } from "react-redux"
import { withYMaps, YMapsApi } from "react-yandex-maps"
import { addMyAddress, searchCrew } from "../../redux/actions"
import { Input } from "../ui/input"
import { SuitableCrew } from "./ui/suitable-crew"
import styled from "styled-components"
import { CreateOrderButton } from "./ui/create-order-button"
import { CrewList } from "../crew/crew-list"
import { Maps } from "../map/map"
import { addEventSuggest, getObjSortByDistance } from "../../shared/map.service"

interface Props {
  ymaps?: YMapsApi
}

const Row = styled.div`
  display: flex;
  height: 400px;
  margin: 16px 0px;
`

const CreateOrder = ({ ymaps }: Props): React.ReactElement => {
  const dispatch = useDispatch()
  let data: DataTypes = useSelector((state: any) => state)

  const getSuitableCrews = (recommendedCrew: CrewInfoType[]) => {
    dispatch(searchCrew(recommendedCrew))
  }

  useEffect(() => {
    if (!!data.myAddress && ymaps) {
      getObjSortByDistance({
        ymaps,
        crewInfo: data.crewInfo,
        myAddress: data.myAddress,
        getSuitableCrews,
      })
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.myAddress])

  const handlerAddMyAddress = (obj: MyAddressType) => {
    dispatch(addMyAddress(obj))
  }

  const searchAddress = (fun: (props: string) => void) => {
    if (ymaps) {
      addEventSuggest({
        ymaps,
        fun: fun,
        addMyAddress: handlerAddMyAddress,
      })
    }
  }

  const onSubmit = async (values: any): Promise<void> => {
    console.log(JSON.stringify(values))
  }

  const required = (value: string) => {
    if (!value) {
      return "This field is required"
    }
  }

  // const allowedNames = (value: string) => {
  //     if (value === 'forbidden') {
  //         return "'forbidden name' is not a valid customer id"
  //     }
  // }

  const renderInput = (props: any) => {
    const { input, meta, change } = props
    return (
      <Input
        {...input}
        type="text"
        onChange={(e: any) => {
          input.onChange(e)
          if (e.target.value.length > 3) {
            const fun = () => change(input.name, e.target.value)
            searchAddress(fun)
          }
        }}
        errorMessage={meta.touched && meta.error}
      />
    )
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={values => {
        // TODO:
        const errors: any = {}
        if (!values.crew_id) {
          errors.crew_id = 'Required'
        }
        return errors
      }}
      render={(props: any): React.ReactElement => {
        const { handleSubmit, invalid, form } = props
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <Field
                name="address"
                component={renderInput}
                validate={required}
                change={form.change}
              />
              <SuitableCrew />
              <Row>
                <Maps
                  recommendedCrew={data.recommendedCrew}
                  myAddress={data.myAddress}
                  ymaps={ymaps}
                  change={form.change}
                />
                <CrewList crew={data.recommendedCrew} />
              </Row>

              <CreateOrderButton invalid={invalid} />
            </form>
          </div>
        )
      }}
    />
  )
}

// TODO: composeValidators

export const CreateOrderForm = withYMaps(CreateOrder)
