import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Facultad } from "../models/facultad";


@Injectable({
    providedIn: 'root'
})
export class FacultadService {
    private apiUrl = 'http://localhost:8080/api/facultad';

    constructor(private http:HttpClient) { }

    getFacultades():Observable<Facultad[]>{
        return this.http.get<Facultad[]>(`${this.apiUrl}`);
    }
}