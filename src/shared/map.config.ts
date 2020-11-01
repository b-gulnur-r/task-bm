import { YMapsProps } from "react-yandex-maps"

export const otherPlacemark = {
    iconLayout: "default#image",
    iconImageHref: "/icons/placemark.svg",
    hideIconOnBalloonOpen: false,
}

export const optionsMyPlacemark = {
    iconLayout: "default#image",
    iconImageHref: "/icons/my-placemark.svg",
    hideIconOnBalloonOpen: false,
}

export const mapProviderProps: YMapsProps = {
    preload: true,
    query: {
      lang: "ru_RU",
      load: [
        "SuggestView",
        "suggest",
        "geocode",
        "Geolink",
        "geoQuery",
        "GeoObject",
        "geoObject.addon.hint",
        "geoObject.addon.balloon",
      ].join(","),
      apikey: "6ef74306-c1f4-4038-97b6-db5466378b6d",
    },
  }

export const suggestOptions = {
  results: 10,
  boundedBy: [
      [56.706918, 53.280274],
      [56.706918, 53.280274],
  ],
  strictBounds: true,
}