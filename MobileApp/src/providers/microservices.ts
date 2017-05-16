import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {State, Action} from "../providers//model";
import {Store} from "../providers/store";
import 'rxjs/add/operator/map';

// let apiUrl = 'http://localhost:8080/api/';
let apiUrl = 'https://modules-eval-app.herokuapp.com/api/';

@Injectable()
export class MicroServices {
  constructor(
    private store: Store<State, Action>,
    public http: Http
    ) {}

  // login function
  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
         headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'auth', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            //when sucesfull, update the store with user data
            const data = res.json()
            this.store.sendAction({type: 'SET_USER', user: data.user});
            this.store.sendAction({type: 'SET_MODULES', modules: data.user.modules});
            //just for the sake of asynchrounous consistency save them there
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.user);
            resolve(data);
          }, (err) => {
            //when unsuccessful, dont save anything
            reject(err);
          });
    });
  }

  // register function
  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'signup', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            //when sucesfull, update the store with user data
            const data = res.json()
            this.store.sendAction({type: 'SET_USER', user: data.user});
            this.store.sendAction({type: 'SET_MODULES', modules: data.user.modules});
            localStorage.setItem('token', data.token);
            resolve(res.json());
          }, (err) => {
            //when unsuccessful, dont save anything
            reject(err);
          });
    });
  }


  sync_user_and_modules(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.get(apiUrl+'user',{headers: headers})
          .subscribe(res => {
            //when sucesfull, update the store with user data
            const data = res.json()
            this.store.sendAction({type: 'SET_USER', user: data.user});
            this.store.sendAction({type: 'SET_MODULES', modules: data.user.modules});
            resolve(res.json());
          }, (err) => {
            //when unsuccessful, dont save anything
            reject(err);
          });
    });
  }

  fetch_feedback(module, favourited){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));
        console.log(module)
        console.log(favourited)
        this.http.get(apiUrl+'modules/' + module['_id'],{headers: headers})
          .subscribe(res => {
             const data = res.json()
             this.store.sendAction({type: 'PUT_CURRENT_MODULE', module: data.module});
             //if favourtied, save the fetched feedback
             if (favourited) {
               this.store.sendAction({type: 'APPEND_MODULE', module: data.module});
             }
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  get_module_by_id(moduleId){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.get(apiUrl+'modules/' + moduleId,{headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  get_module_by_name(queryText){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.get(apiUrl+'modules/find/' + queryText ,{headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  selectItem(module){
    this.store.sendAction({type: 'PUT_CURRENT_MODULE', module: module});
    return;
  }

  favourite(module){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.post(apiUrl+'favourite/' + module._id, {}, {headers: headers})
          .subscribe(res => {
            this.store.sendAction({type: 'ADD_MODULE', module: module});
            this.store.sendAction({type: 'PUT_CURRENT_MODULE', module: module});
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  unfavourite(module){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.post(apiUrl+'unfavourite/' + module._id, {}, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            this.store.sendAction({type: 'REMOVE_MODULE', module: module});
            this.store.sendAction({type: 'PUT_CURRENT_MODULE', module: module});
          }, (err) => {
            reject(err);
          });
    });
  }

  feedback(module, favourited, current_user_feedback, data){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.put(apiUrl+'feedback/' + module['_id'], JSON.stringify(data), {headers: headers})
          .subscribe(res => {
             this.store.sendAction({type: 'APPEND_FEEDBACK', module: module, favourited: favourited, current_user_feedback: current_user_feedback, feedback: data});
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  notes(module, favourited, notes){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('token'));

        this.http.put(apiUrl+'notes/' + module['_id'], JSON.stringify({"notes":notes}), {headers: headers})
          .subscribe(res => {
              const appendedModule = {...module, NOTES:notes}
              this.store.sendAction({type: 'PUT_CURRENT_MODULE', module: appendedModule});
             //if favourtied, save the fetched feedback
             if (favourited) {
               this.store.sendAction({type: 'APPEND_MODULE', module: appendedModule});
             }
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
}
