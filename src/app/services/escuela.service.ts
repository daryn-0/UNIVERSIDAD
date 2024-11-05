import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Escuela } from "../models/escuela";

@Injectable({
    providedIn : 'root'
})
export class EscuelaService {
    private apiUrl = 'http://localhost:8080/api/escuela';

    constructor(private http: HttpClient){ }

    getEscuelas():Observable<Escuela[]>{
        return this.http.get<Escuela[]>(`${this.apiUrl}`);
    }

    getEscuelaById(id:number):Observable<Escuela>{
        return this.http.get<Escuela>(`${this.apiUrl}/${id}`);
    }

    createEscuela(escuela: Escuela):Observable<Escuela>{
        return this.http.post<Escuela>(`${this.apiUrl}`, escuela);
    }

    deleteEscuela(id: number){
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    updateEscuela(escuela: Escuela, id: number):Observable<Escuela>{
        return this.http.put<Escuela>(`${this.apiUrl}/${id}`, escuela);
    }
}