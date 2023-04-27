import { makeAutoObservable } from "mobx";

export default class ConfigStore {

    url = "http://65.109.13.139:9191";
    token = "";
    followings = [];
    updatePosts = false;
    updateMe = false;
    myPosts = [];
    me = "";
    isShow = false;
    isShowFollowers = false;
    isShowFollowings = false;
    isShowEditModal = false;
    isShowModalWindow = false;
    isShowSnack = false;
    snackSeverity = "";
    snackText = "";
    err = "";
    isShowSearchModal = false;
    loading = true;
    loadingData = true;
    userProfile = "";

    constructor(MainStore) {
        this.MainStore = MainStore;
        makeAutoObservable(this);
    };

    setFollowings(followings) {
        this.followings = followings;
    };

    setIsShowSnack(snack) {
        this.isShowSnack = snack;
    };

    setSnackSeverity(severity) {
        this.snackSeverity = severity;
    };

    setSnackText(text) {
        this.snackText = text;
    };
   
    setUserProfile(userProfile){
        this.userProfile = userProfile
    };
    
    setMe(me) {
        this.me = me
    };

    setMyPost(myPosts){
        this.myPosts = myPosts
    };

    setUpdateMe(updateMe) {
        this.updateMe = updateMe
    };

    setUpdatePosts(updatePosts) {
        this.updatePosts = updatePosts
    };

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

    setIsShowSearchModal(searchModal) {
        this.isShowSearchModal = searchModal
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
    
    setLoading(loading) {
        this.loading = loading
    };

    setLoadingData(loadingData) {
        this.loadingData = loadingData
    };
}