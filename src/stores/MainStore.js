import * as React from 'react';
import RequestsStore from './RequestsStore';
import ConfigStore from './ConfigStore';
import SliderStore from './publicStores/SliderStore';

class MainStore {
    constructor() {
        this.RequestsStore      = new RequestsStore(this);
        this.ConfigStore        = new ConfigStore(this);
        this.SliderStore        = new SliderStore(this);
        // this.FeedStore          = new FeedStore(this);
        // this.FollowersStore     = new FollowersStore(this);
        // this.FollowingsStore    = new FollowingsStore(this);
        // this.PostIdStore        = new PostIdStore(this);
        // this.EditStore          = new EditStore(this);
        // this.UserInfoStore      = new UserInfoStore(this);
        // this.UserPostsStore     = new UserPostsStore(this);
    }
}
const StoresContext = React.createContext(new MainStore());

export const useStores = () => React.useContext(StoresContext);