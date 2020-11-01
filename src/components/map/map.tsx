import React, { FC } from "react"
import { useDispatch } from "react-redux"
import { Map, Placemark, YMapsApi } from "react-yandex-maps"
import styled from "styled-components"
import { addMyAddress } from "../../redux/actions"
import { optionsMyPlacemark, otherPlacemark } from "../../shared/map.config"
import { getAddressByCoords } from "../../shared/map.service"

interface Props {
  recommendedCrew?: CrewInfoType[]
  myAddress?: MyAddressType
  ymaps?: YMapsApi
  change: any
}

const StyledMap = styled(Map)`
  flex: 2 0.5;
  border: 1px solid black;
`
export const Maps: FC<Props> = ({ recommendedCrew, myAddress, ymaps, change }) => {
  const dispatch = useDispatch()

  const handlerAddMyAddress = ({ obj, address} : any) => {
    dispatch(
      addMyAddress(obj)
    )
    change("address", address)
  }
  const handleClick = (event: any): void => {
    const coords = event.get("coords")

    try {
      if(ymaps){
        getAddressByCoords({
          ymaps,
          coords,
          fun: handlerAddMyAddress
        })
      }
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <StyledMap
      defaultState={{ center: [56.86657, 53.210579], zoom: 12 }}
      modules={["SuggestView"]}
      onClick={handleClick}
    >
      {recommendedCrew && recommendedCrew.map(({ lat, lon }, index) => {
        return <Placemark key={index} options={otherPlacemark} geometry={[lat, lon]} />
      })}
      {myAddress && (
        <Placemark
          key={myAddress.id}
          options={optionsMyPlacemark}
          geometry={[...myAddress.coords]}
        />
      )}
    </StyledMap>
  )
}
