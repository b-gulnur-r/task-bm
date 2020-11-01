import { YMapsApi } from "react-yandex-maps"
import { suggestOptions } from "./map.config"

interface addEventSuggestViewProps {
  ymaps: YMapsApi
  fun: (props: string) => void
  addMyAddress: (obj: MyAddressType) => void
}

export const addEventSuggest = ({
  ymaps,
  fun,
  addMyAddress,
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

        fun(firstGeoObject.getAddressLine())
        addMyAddress({
          id: "1",
          address: firstGeoObject.getAddressLine(),
          coords: coords,
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

interface funProps {
  obj: MyAddressType
  address: string
}

interface getAddressByCoordsProps {
  ymaps: YMapsApi
  coords: number[]
  fun : (props: funProps) => void
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
        obj: {
          id: "1",
          address,
          coords: geometry.getCoordinates(),
        },
        address,

      })
    }
  })
  .catch((error: any) => {
    // console.log(error)
  })
}
