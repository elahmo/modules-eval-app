import {Backend} from "./backend";
import {Observable} from "rxjs";
import {Reducer, Store} from "./store";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export type User  = Object;
export type Module = Object;
export type CurrentModule = { module: Module, favourited: boolean};
export type State = { user: User, modules: Array<Module>, current_module:CurrentModule};

export type setUserAction      = { type: 'SET_USER',      user:   User };
export type setModuleAction    = { type: 'SET_MODULES',   modules: Array<Module> };
export type appendModuleAction = { type: 'APPEND_MODULE',    module: Module };
export type addModuleAction    = { type: 'ADD_MODULE',    module: Module };
export type removeModuleAction = { type: 'REMOVE_MODULE', module: Module };
export type putCurrentModule   = { type: 'PUT_CURRENT_MODULE', module: Module };
export type Action = setUserAction | setModuleAction | appendModuleAction | addModuleAction | removeModuleAction | putCurrentModule;

export const initState: State = {user:{username:"test_user"}, modules:[], current_module:{module:{}, favourited:false}};

export function reducer(): Reducer<State, Action> {
  return (store: Store<State, Action>, state: State, action: Action): State|Observable<State> => {
    switch (action.type) {
      case 'SET_USER':
        const newUser = action.user;
        return {...state, user:newUser}; 

      case 'SET_MODULES':
        const newModules = action.modules;
        return {...state, modules:newModules};

      case 'APPEND_MODULE':
        const updatedModule = [...state.modules, action.module];
        return {...state, modules:updatedModule};

      case 'ADD_MODULE':
        const addedModules = [...state.modules, {"_id":action.module}];
        return {...state, modules:addedModules};

      case 'REMOVE_MODULE':
        const deletedModules = state.modules.filter((mod) => mod['_id']._id !== action.module['_id']);
        return {...state, modules:deletedModules};

       case 'PUT_CURRENT_MODULE':
        const putModule = action.module;
        const favourited = state.modules.find((mod) => mod['_id']._id === action.module['_id']) ? true : false
        return {...state, current_module:{module:putModule, favourited:favourited}};

      default:
        return state;
    }
  }
}

function wrapIntoBehavior(init, obs) { 
  const res = new BehaviorSubject(init); 
  obs.subscribe(s => res.next(s)); 
  return res; 
}