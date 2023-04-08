import { makeAutoObservable } from "mobx";

export default class ConfigStore {

    url = "http://65.109.13.139:9191";
    token = "";
    isShow = false;
    err = "";

    constructor(MainStore) {
        makeAutoObservable(this);
        this.MainStore = MainStore;
    };

    setToken(token) {
        this.token = token;
    };

    setIsShow(show) {
        this.isShow = show;
    };

    setErr(err) {
        this.err = err;
    };
}