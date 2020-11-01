interface MyAddressType {
    id: string
    address: string
    coords: number[]
}

interface AddressesType{
    address: string
    lat: number
    lon: number
}

interface MyOrdersType {
    source_time: string
    addresses: AddressesType
    crew_id: string
}

interface CrewInfoType {
    crew_id: number
    car_mark: string
    car_model: string
    car_color: string
    car_number: string
    driver_name: string
    driver_phone: string
    lat: number
    lon: number
}

interface DataTypes {
    crewInfo: CrewInfoType[]
    recommendedCrew: CrewInfoType[]
    myOrders: MyOrdersType | undefined
    myAddress: MyAddressType | undefined
}