import { SEARCH_CREW, ADD_MY_ADDRESS, CREATE_ORDER } from "./actions";
import { data } from "./states";

export const reducer = (
  state: DataTypes = data,
  action: { type: string; payload?: any },
): DataTypes => {
  switch (action.type) {
    case SEARCH_CREW:
      return { ...state, recommendedCrew: action.payload };
    case ADD_MY_ADDRESS:
      return { ...state, myAddress: action.payload };
    case CREATE_ORDER:
      return {
        ...state,
        myOrders: { ...state.myOrders, ...action.payload },
      };
    default:
      break;
  }
  return state;
};
