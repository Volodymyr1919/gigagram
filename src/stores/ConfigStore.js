import { makeAutoObservable } from "mobx";

export default class ConfigStore {

    url = "http://65.109.13.139:9191";
    token = "";
    updatePosts = false;
    updateMe = false;
    myPosts = [""];
    me = [""];
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
    setMe(me) {
        this.me = me
    }
    setMyPost(myPosts){
        this.myPosts = myPosts
    }

    setUpdateMe(updateMe) {
        this.updateMe = updateMe
    }
    setUpdatePosts(updatePosts) {
        this.updatePosts = updatePosts
    }
    setToken(token) {
        this.token = token;
    };

    setIsShow(isShow) {
        this.isShow = isShow;
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