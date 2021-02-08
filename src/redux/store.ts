import { createStore } from "redux";
import { reducer } from "./reducer";

export const store: any = createStore(reducer)