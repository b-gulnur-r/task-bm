export const SEARCH_CREW = "SEARCH_CREW";
export const ADD_MY_ADDRESS = "ADD_MY_ADDRESS";
export const CREATE_ORDER = "CREATE_ORDER";

interface ActionProps {
  type: string;
  payload: any;
}

export function searchCrew(data: CrewInfoType[]): ActionProps {
  return {
    type: SEARCH_CREW,
    payload: data,
  };
}

export function addMyAddress(data: MyAddressType): ActionProps {
  return {
    type: ADD_MY_ADDRESS,
    payload: data,
  };
}

export function createOrder(data: MyOrdersType): ActionProps {
  return {
    type: CREATE_ORDER,
    payload: data,
  };
}
