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
        const firstGeoObject = res.geoObjects.get(0),
          coords = firstGeoObject.geometry.getCoordinates()

        handlerAddMyAddress({
          address: firstGeoObject.getAddressLine(),
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

  const result = ymaps
    .geoQuery({
      type: "FeatureCollection",
      features: tempTaxi,
    })
    .sortByDistance(myAddress.coords)

  result.then(function () {
    const recommendedCrew: CrewInfoType[] = []
    result.each((item: any) => {
      const coord =  item.geometry.getCoordinates()
      const currentCrew = crewInfo.find((item) => {
        return item.lat === coord[0] && item.lon === coord[1]
      })
      currentCrew && recommendedCrew.push(currentCrew)
    })
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

      fun({
        address: address,
        lat: geometry.getCoordinates()[0],
        lon: geometry.getCoordinates()[1],
      })
    }
  })
  .catch(() => { })
}
