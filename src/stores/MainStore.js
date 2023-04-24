import * as React from 'react';
import RequestsStore from './RequestsStore';
import ConfigStore from './ConfigStore';
import SliderStore from './publicStores/SliderStore';

class MainStore {
    constructor() {
        this.RequestsStore      = new RequestsStore(this);
        this.ConfigStore        = new ConfigStore(this);
        this.SliderStore        = new SliderStore(this);
    }
}
const StoresContext = React.createContext(new MainStore());

export const useStores = () => React.useContext(StoresContext);