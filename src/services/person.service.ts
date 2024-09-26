import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";
import {Observable} from "rxjs";
import {Person} from "../models/Person"

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly _person: string;

  constructor(private http:HttpClient) {
    this._person =  environment.host + environment.apiMethods.Person;

  }
  getPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(this._person);
  }
   deletePerson(Id: string): Observable<Object> {
    return this.http.delete(this._person, {
      params: { id: Id }
    });
  }
   putPerson(person: Person): Observable<Object>{
    return this.http.put(this._person, person)
  }
   uploadFile(fromData: FormData): Observable<Object> {
    console.log(this._person)
    return this.http.post(this._person, fromData)
  }


}
