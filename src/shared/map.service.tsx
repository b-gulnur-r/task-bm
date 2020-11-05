import { replace } from "lodash"
import { YMapsApi } from "react-yandex-maps"
import { suggestOptions } from "./map.config"

interface addEventSuggestViewProps {
  ymaps: YMapsApi
  handlerAddMyAddress: (obj: AddressesType) => void
}

export const addEventSuggest = ({
  ymaps,
  handlerAddMyAddress,
}: addEventSuggestViewProps) => {
  const suggestView = new ymaps.SuggestView("suggest", suggestOptions)
  suggestView.events.add("select", (e: any) => {
    ymaps
      .geocode(e.get("item").displayName, {
        results: 1,
      })
      .then(function (res: any) {
        var firstGeoObject = res.geoObjects.get(0),
          coords = firstGeoObject.geometry.getCoordinates()

        const formatedAddress = replace(firstGeoObject.getAddressLine(), 'Россия, Удмуртская Республика, Ижевск, ', '')

        handlerAddMyAddress({
          address: formatedAddress,
          lat: coords[0],
          lon: coords[1],
        })
      })
  })
}

interface getObjSortByDistanceProps {
  ymaps: YMapsApi
  crewInfo: CrewInfoType[]
  myAddress: MyAddressType
  getSuitableCrews: (recommendedCrew: CrewInfoType[]) => void
}

export const getObjSortByDistance = ({
  ymaps,
  crewInfo,
  myAddress,
  getSuitableCrews,
}: getObjSortByDistanceProps) => {
  const tempTaxi = crewInfo.map((item) => {
    return {
      type: "Feature",
      properties: {
        balloonContent: item.car_model,
      },
      geometry: {
        type: "Point",
        coordinates: [item.lat, item.lon],
      },
    }
  })

  var result = ymaps
    .geoQuery({
      type: "FeatureCollection",
      features: tempTaxi,
    })
    .sortByDistance(myAddress.coords)

  result.then(function () {
    const recommendedCrew: CrewInfoType[] = []
    let i = 0
    while (result.getLength() > i && i < 4) {
      const coord = result.get(i).geometry.getCoordinates()
      const currentCrew = crewInfo.find((item) => {
        return item.lat === coord[0] && item.lon === coord[1]
      })
      currentCrew && recommendedCrew.push(currentCrew)
      i++
    }
    getSuitableCrews(recommendedCrew)
  })
}

interface getAddressByCoordsProps {
  ymaps: YMapsApi
  coords: number[]
  fun : (obj: AddressesType) => void
}

export const getAddressByCoords = ({ ymaps, coords, fun }: getAddressByCoordsProps) => {
  ymaps
  .geocode(coords, { results: 1 })
  .then((result: any): any => {
    const geoObject = result.geoObjects.get(0)
    if (geoObject) {
      const { geometry, properties } = geoObject
      const address = properties.get(
        "metaDataProperty.GeocoderMetaData.text",
        ""
      )

      const formatedAddress = replace(address, 'Россия, Удмуртская Республика, Ижевск, ', '')
      fun({
        address: formatedAddress,
        lat: geometry.getCoordinates()[0],
        lon: geometry.getCoordinates()[1],
      })
    }
  })
  .catch(() => { })
}
