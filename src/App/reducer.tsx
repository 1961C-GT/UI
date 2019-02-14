import { combineReducers } from "redux";

import { ITheme, IThemeAction, ThemeAction, ThemeType } from "./types";
import { CustomMapType } from "pages/MapPage/types";

const themeInitialState: ITheme = {
  themeType: ThemeType.DARK,
  mapType: CustomMapType.DARK
};

const theme = (state: ITheme = themeInitialState, action: IThemeAction) => {
  switch (action.type) {
    case ThemeAction.SET_MAP_TYPE:
      return { ...state, mapType: action.mapType };
    default:
      return state;
  }
};

const appReducer = combineReducers({
  theme
});

export default appReducer;
