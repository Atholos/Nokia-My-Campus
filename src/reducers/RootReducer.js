/*
The root reducer where all redux reducers are combined and then called in index.js
*/
import { combineReducers } from 'redux';
import HeatMapReducer from './HeatMapReducer'
import UpdateReducer from './UpdateReducer'
import WidgetReducer from './WidgetReducer';
import WMenuReducer from "./WMenuReducer";
import MenuReducer from "./MenuReducer";
import EditModeRecuder from "./EditModeReducer";
import NewsReducer from "./NewsReducer";
import MsalReducer from "./MsalReducer";

// combines update, widget and heatmap reducers
const RootReducer = combineReducers({
    HeatMapReducer,
    UpdateReducer,
    WidgetReducer,
    WMenuReducer,
    MenuReducer,
    EditModeRecuder,
    NewsReducer,
    MsalReducer
});

export default RootReducer