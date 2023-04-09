import { makeAutoObservable } from "mobx";

export default class ConfigStore {

    url = "http://65.109.13.139:9191";
    token = "";
    isShow = false;
    isShowFollowers = false;
    isShowFollowings = false;
    isShowEditModal = false;
    isShowModalWindow = false;
    err = "";

    constructor(MainStore) {
        this.MainStore = MainStore;
        makeAutoObservable(this);
    };

    setToken(token) {
        this.token = token;
    };

    setIsShow(show) {
        this.isShow = show;
    };

    setIsShowFollowers(followers) {
        this.isShowFollowers = followers;
    };

    setIsShowFollowings(followings) {
        this.isShowFollowings = followings;
    };

    setIsShowEditModal(editModal) {
        this.isShowEditModal = editModal;
    };

    setIsShowModalWindow(modalWindow) {
        this.isShowModalWindow = modalWindow;
    };

    setErr(err) {
        this.err = err;
    };

}