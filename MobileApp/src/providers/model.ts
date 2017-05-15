import {Backend} from "./backend";
import {Observable} from "rxjs";
import {Reducer, Store} from "./store";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export type User  = Object;
export type Module = Object;
export type Feedback = Object;
export type CurrentModule = { module: Module, favourited: boolean};
export type State = { user: User, modules: Array<Module>, current_module:CurrentModule};

export type setUserAction      = { type: 'SET_USER',      user:   User };
export type setModuleAction    = { type: 'SET_MODULES',   modules: Array<Module> };
export type appendModuleAction = { type: 'APPEND_MODULE',    module: Module };
export type addModuleAction    = { type: 'ADD_MODULE',    module: Module };
export type removeModuleAction = { type: 'REMOVE_MODULE', module: Module };
export type putCurrentModule   = { type: 'PUT_CURRENT_MODULE', module: Module };
export type appendFeedback     = { type: 'APPEND_FEEDBACK', module: Module, favourited:boolean, current_user_feedback:Object, feedback: Feedback, };

export type Action = setUserAction | setModuleAction | appendModuleAction | addModuleAction | removeModuleAction | putCurrentModule | appendFeedback;

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
      	const index = state.modules.findIndex((mod) => mod['_id']._id === action.module['_id'])
        const updatedModule = [...state.modules];
        updatedModule[index] = {"_id":action.module};
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

       case 'APPEND_FEEDBACK':
        //if feedback exists, append it
        const newFeedback = [...action.module['FEEDBACKS']]

        if (action.current_user_feedback !== null) {
       		const index = newFeedback.findIndex((feedback) => feedback['_id']._id === state.user['_id'])
       		newFeedback.splice(index, 1);
        }
        //in any case simply add the new feedback
        const feeback = {
          _id: {...state.user},
          feedback: action.feedback['feedback'],
          local_rating: action.feedback['rating']
        }
        newFeedback.push(feeback)

        const current_user_feedback = {
          feedback: action.feedback['feedback'],
          rating: action.feedback['rating']
        }

        let new_rating;
        if (action.current_user_feedback === null) {
          let new_num_raters = parseInt(action.module['rating'][1]) + 1
          let new_tot_score = parseFloat(action.module['rating'][0])*parseFloat(action.module['rating'][1]) + parseFloat(action.feedback['rating'])
          new_rating = [new_tot_score / new_num_raters, new_num_raters]
        //if user has already favourtie, substract the old rating from the total global and divived by the samen number of raters
        }else {
          let current_local_rating = action.current_user_feedback['rating']
          let new_num_raters =  parseInt(action.module['rating'][1])
          let new_tot_score = parseFloat(action.module['rating'][0])*parseFloat(action.module['rating'][1]) - parseFloat(current_local_rating) + parseFloat(action.feedback['rating'])
          new_rating = [new_tot_score/new_num_raters, new_num_raters]
        }

        //change both the whole feedback, global rating, and current_user_feedback
        const newModuleFeeded = {...action.module, FEEDBACKS: newFeedback, current_user_feedback: current_user_feedback, rating: new_rating}

        //if favourited, update the model list too
        if (action.favourited) {
          console.log("fabourited")
          console.log(action.favourited)
	      const index = state.modules.findIndex((mod) => mod['_id']._id === action.module['_id'])
	      const updatedModuleFeed = [...state.modules];
	      updatedModuleFeed[index] = {"_id": newModuleFeeded};
	      return {...state, modules:updatedModuleFeed, current_module:{module:newModuleFeeded, favourited:action.favourited}};
        //else update only the current list
        } else {
          return {...state, current_module:{module:newModuleFeeded, favourited:action.favourited}};
        }

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