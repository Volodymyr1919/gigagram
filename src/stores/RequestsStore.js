import { makeAutoObservable } from "mobx";

export default class RequestsStore {
    requestTypes = {
        post: 'POST',
        get: 'GET',
        put: 'PUT',
        delete: 'DELETE'
    };

    constructor(MainStore) {
        makeAutoObservable(this);
        this.MainStore = MainStore;
        // this.url = this.MainStore.ConfigStore.url || "";
        // this.next = next || function() { return; };
        // this.data = data || {};
        // this.headers = this.MainStore.ConfigStore.headers;
    };

    headers(token) {
        this.token = token;
        console.log(this.token);
        return {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token": this.token
        }
    };

    doPost(url, data) {
        this.url = url;
        this.data = data;
        return fetch(this.url, {
            method: this.requestTypes.post,
            headers: this.headers(),
            body: JSON.stringify(this.data)
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                return response;
            }
        })
        .then((response) => {
            return response;
        })
    };

    doGet(url, next) {
        this.url = url;
        this.next = next || function() { return; };
        return fetch(this.url, {
            method: this.requestTypes.get,
            headers: this.headers()
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                return response;
            }
        })
        .then((response) => {
            this.next(response);
        })
    };

    doPut() {
        fetch(this.url, {
            method: this.requestTypes.put,
            headers: this.headers,
            body: JSON.stringify(this.data)
        })
        .then((response) => {
            switch (response.status) {
                case 201:
                    return response.json();
                case !201:   
                    return response.status;
                default:
                    break;
            }
        })
        .then((response) => {
            return response;
        })
    };

    doDelete() {
        fetch(this.url, {
            method: this.requestTypes.delete,
            headers: this.headers
        })
        .then((response) => {
            switch (response.status) {
                case 201:
                    return response.json();
                case !201:   
                    return response.status;
                default:
                    break;
            }
        })
    };
}