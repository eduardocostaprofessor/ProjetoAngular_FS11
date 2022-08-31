import { Injectable } from '@angular/core';
//imports auxiliares
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //injetar o HttpClient como dependência do service
  constructor(private httpClient: HttpClient) { }


  url = 'http://localhost:3000/signin2'
  
  // OPERAÇÕES
  
  // post - login
  login( usuario: User ):Observable<any>{

    return this.httpClient.post(this.url, JSON.stringify(usuario), {
      headers : new HttpHeaders({ "Content-Type" : "application/json"}),
      observe: "response"
    })
  }

}
