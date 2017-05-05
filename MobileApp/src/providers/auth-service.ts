import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// let apiUrl = 'http://localhost:8080/api/';
let apiUrl = 'https://modules-eval-app.herokuapp.com/api/';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  // login function
  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
        //   .subscribe(res => {
        //     resolve(res.json());
        //   }, (err) => {
        //     reject(err);
        //   });

        this.http.post(apiUrl+'auth', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }


  // register function
  register(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'signup', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            console.log("accept!");
          }, (err) => {
            console.log("reject!");
            reject(err);
          });
    });
  }

  //logout function
  logout(){
    console.log("coming into logout!");
    console.log(localStorage.getItem('token'));
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));
        // this.http.get(apiUrl+'user', {}, {headers: headers}).;
        this.http.get(apiUrl+'user',{headers: headers})
        // .map(res => res.json());
          .subscribe(res => {
            console.log("no error from logout!");
            localStorage.clear();
          }, (err) => {
            console.log("There is error from logout!");
            reject(err);
          });
    });
  }

    // getPosts(category, limit){
    //     return this.http.get(this.baseUrl + '/' + category +'/top.json?limit=' + limit)
    //     .map(res => res.json());
    // }

  get_module_by_id(){
    console.log("coming into get_module_by_id!");
    console.log(localStorage.getItem('token'));
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));
        // this.http.get(apiUrl+'user', {}, {headers: headers}).;
        this.http.get(apiUrl+'modules/' + '58e51e0475770423fccb1997',{headers: headers})
        // .map(res => res.json());
          .subscribe(res => {
            resolve(res.json());
            console.log("get module successfully");
            
          }, (err) => {
            console.log("failed get module");
            reject(err);
          });
    });
  }

// return this.load().map((data: any) => {
//       let day = data.schedule[dayIndex];
//       // count the number of sessions
//       day.shownSessions = 0;

//       queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
//       let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

//       day.groups.forEach((group: any) => {
//         group.hide = true;

//         group.sessions.forEach((session: any) => {
//           // check if this session should show or not
//           this.filterSession(session, queryWords, excludeTracks, segment);

//           if (!session.hide) {
//             // if this session is not hidden then this group should show
//             group.hide = false;
//             day.shownSessions++;
//           }
//         });

//       });

//       return day;
//     });

  get_module_by_name(queryText){
    console.log("coming into get_module_by_name!");
    console.log(localStorage.getItem('token'));
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));
        // this.http.get(apiUrl+'user', {}, {headers: headers}).;
        console.log(headers);
        this.http.get(apiUrl+'modules/find/' + queryText ,{headers: headers})
        // .map(res => res.json());
          .subscribe(res => {
            resolve(res.json());
            console.log(res.json());
            console.log("get module successfully");
            
          }, (err) => {
            console.log("failed get module");
            reject(err);
          });
    });
  }

  favourite(moduleId){
    console.log("coming into favourite!");
    console.log(localStorage.getItem('token'));
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('token'));
        // this.http.get(apiUrl+'user', {}, {headers: headers}).;
        // this.http.get(apiUrl+'favourite/' + moduleId ,{headers: headers})
        // // .map(res => res.json());
        //   .subscribe(res => {
        //     resolve(res.json());
        //     console.log(res.json());
        //     console.log("module added successfully");
            
        //   }, (err) => {
        //     console.log("failed to add module");
        //     reject(err);
        //   });

        this.http.post(apiUrl+'favourite/' + moduleId, {}, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            console.log(res.json());
            console.log("module added successfully");
          }, (err) => {
            console.log("failed to add module");
            reject(err);
          });
    });
  }

  unfavourite(){
    console.log("coming into favourite!");
    console.log(localStorage.getItem('token'));
  }

  rate(){
    console.log("coming into favourite!");
    console.log(localStorage.getItem('token'));
  }
}