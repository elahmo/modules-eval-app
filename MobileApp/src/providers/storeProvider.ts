import {Store} from "./store";
import {reducer, initState} from "./model";

export function startFactory() {
	return  new Store(reducer(), initState)
}