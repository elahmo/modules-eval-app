//based on 
//https://vsavkin.com/managing-state-in-angular-2-applications-caf78d123d02
//https://github.com/corasla/angular2-tackling-state-rxjs/
/*
import { OpaqueToken,  } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

import { Action, setUserAction, addModuleAction} from './state-actions';

export class Module {
  constructor(public content: Object) {}
}

export class AppState {
  public user: Object;
  public modules: Array<Module>;
  constructor() {}
}

export const initState = new OpaqueToken('initState');
export const dispatcher = new OpaqueToken('dispatcher');
export const state = new OpaqueToken('state');

// this is what is actually injected in the app component when using 'providers: stateAndDispatcher'
export const stateAndDispatcher = [
  {
      provide: initState, 
      useValue: {
      	user:{},
      	modules:[{}]
      }
  }, 
  {
      provide: dispatcher, 
      useValue: new Subject<Action>()
  }, 
  {
      provide: state,
      useFactory: stateFn,
      deps: [initState, dispatcher]
  }
];

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> { 
  console.log("initState is")
  console.log(initState)
  console.log("actions is")
  console.log(actions)
  const combine = s => ({user: s[0], modules: s[1]});
  const appStateObs: Observable<AppState> = 
    updateSate(initState, actions)   
        //.zip(filter(initState.visibilityFilter, actions))
        .map(combine); 
  return wrapIntoBehavior(initState, appStateObs); 
}

function wrapIntoBehavior(init, obs) { 
  const res = new BehaviorSubject(init); 
  obs.subscribe(s => res.next(s)); 
  console.log("init is")
  console.log(init)
  console.log("obs is")
  console.log(obs)
  return res; 
}


function updateSate(initState: any, actions: Observable<Action>): Observable<AppState> {
    return actions.scan((state, action) => { 
      if        (action instanceof setUserAction) { 
        state.user = action.user
        return state; 
      } else if (action instanceof addModuleAction){
      	state.modules = [...state.modules, action.module]
        return state 
      } 
    }, initState); 
} 


function updateTodo(todo: ToDoItem, action: Action): ToDoItem {
  if (action instanceof ToggleTodoAction) {  
    return (action.id !== todo.id) ? todo : merge(todo, {completed: !todo.completed}); 
  } else { 
    return todo; 
  } 
}

function filter(initState: string, actions: Observable<Action>): Observable<string> { 
   return actions.scan((state, action) => { 
     if (action instanceof SetVisibilityFilter) { 
       return action.filter; 
     } else { 
       return state; 
     } 
   }, initState); 
}

function merge(todo: ToDoItem, props: any): any {
  return Object.assign({}, todo, props);
}
*/
