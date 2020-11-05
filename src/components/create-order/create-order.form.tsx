import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import { useDispatch } from "react-redux"
import { Field, Form } from "react-final-form"
import { useSelector } from "react-redux"
import { withYMaps, YMapsApi } from "react-yandex-maps"
import { addMyAddress, createOrder, searchCrew } from "../../redux/actions"
import { Input } from "../ui/input"
import { SuitableCrew } from "./ui/suitable-crew"
import styled from "styled-components"
import { CreateOrderButton } from "./ui/create-order-button"
import { CrewList } from "../crew/crew-list"
import { Maps } from "../map/map"
import { addEventSuggest, getObjSortByDistance } from "../../shared/map.service"
import { ModalView } from "./ui/modal-view"

interface Props {
  ymaps?: YMapsApi
}

const Container = styled.div`
  position: relative;
`

const Row = styled.div`
  display: flex;
  height: 400px;
  margin: 16px 0px;
`

const Title = styled.p`
  border-bottom: 1px solid black;
  padding-bottom: 10px;
`


const CreateOrder = ({ ymaps }: Props): React.ReactElement => {
  const dispatch = useDispatch()
  let data: DataTypes = useSelector((state: any) => state)
  const [selectedCrew, setSelectedCrew] = useState<CrewInfoType>()

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

  useEffect(() => {
    data.recommendedCrew && setSelectedCrew(data.recommendedCrew[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.recommendedCrew])

  const searchAddress = (handlerAddMyAddress: (obj: AddressesType) => void) => {
    if (ymaps) {
      addEventSuggest({
        ymaps,
        handlerAddMyAddress,
      })
    }
  }

  const handlerAddMyAddress = (change: (name: string, value: any) => void) => (
    obj: AddressesType
  ) => {
    change("addresses", obj)
    change("source_time", format(new Date(), "yyyyMMddhhmmSS"))
    dispatch(
      addMyAddress({
        id: "1",
        address: obj.address,
        coords: [obj.lat, obj.lon],
      })
    )
  }

  const onSubmit = async (values: MyOrdersType): Promise<void> => {
    dispatch(createOrder(values))
  }

  const required = (value: string) => {
    if (!value) {
      return "This field is required"
    }
  }

  const validate = (values: MyOrdersType) => {
    const errors: any = {}
    if (!values.source_time) {
      errors.crew_id = "Required"
    }
    if (!values.addresses) {
      errors.addresses = "Required"
    }
    if (!values.crew_id) {
      errors.addresses = "Required"
    }
    return errors
  }

  const renderInput = (props: any) => {
    const { input, meta, change } = props
    return (
      <Input
        {...input}
        value={input.value.address}
        type="text"
        onChangeData={(e: any) => {
          if (e.target.value.length > 3) {
            searchAddress(handlerAddMyAddress(change))
          }
        }}
        errorMessage={meta.touched && meta.error}
      />
    )
  }

  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={(props: any): React.ReactElement => {
          const { handleSubmit, invalid, form } = props
          return (
            <div>
              <Title>Детали заказа</Title>
              <form onSubmit={handleSubmit}>
                <Field
                  name="addresses"
                  component={renderInput}
                  validate={required}
                  change={form.change}
                />
                {selectedCrew && (
                  <SuitableCrew
                    selectedCrew={selectedCrew}
                    change={form.change}
                  />
                )}
                <Row>
                  <Maps
                    recommendedCrew={data.recommendedCrew}
                    myAddress={data.myAddress}
                    ymaps={ymaps}
                    handlerAddMyAddress={handlerAddMyAddress(form.change)}
                  />
                  <CrewList
                    crew={data.recommendedCrew}
                    setSelectedCrew={setSelectedCrew}
                    change={form.change}
                  />
                </Row>

                <CreateOrderButton invalid={invalid} />
              </form>
            </div>
          )
        }}
      />
      {data.myOrders && selectedCrew && (
        <ModalView myOrders={data.myOrders} selectedCrew={selectedCrew} />
      )}
    </Container>
  )
}

export const CreateOrderForm = withYMaps(CreateOrder)
