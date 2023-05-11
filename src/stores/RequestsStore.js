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
    };
    
    headers() {
        return {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token": localStorage.getItem("token") || ""
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
                return response.statusText;
            }
        })
        .then((response) => {
            return response;
        })
    };

    doGet(url) {
        this.url = url;
        return fetch(this.url, {
            method: this.requestTypes.get,
            headers: this.headers()
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                return response.statusText;
            }
        })
        .then((response) => {
            return response;
        })
    };

    doPut(url, data) {
        this.url = url;
        this.data = data;
        return fetch(this.url, {
            method: this.requestTypes.put,
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
    };

    doDelete(url) {
        this.url = url;
        return fetch(this.url, {
            method: this.requestTypes.delete,
            headers: this.headers()
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                return response.statusText;
            }
        })
        .then((response) => {
            return response;
        })
    };
}