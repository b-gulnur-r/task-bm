import { createStore } from "redux";
import { reducer } from "./reducer";

export let store: any = createStore(reducer)