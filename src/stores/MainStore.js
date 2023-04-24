import * as React from 'react';
import RequestsStore from './RequestsStore';
import ConfigStore from './ConfigStore';

class MainStore {
    constructor() {
        this.RequestsStore      = new RequestsStore(this);
        this.ConfigStore        = new ConfigStore(this);
    }
}
const StoresContext = React.createContext(new MainStore());

export const useStores = () => React.useContext(StoresContext);