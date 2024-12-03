import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import config from "../../auth_config.json";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  requestAccessToken() {
    return this.http.post(`${config.apiUri}/api/Product/auth/token`, {});
  }
}
