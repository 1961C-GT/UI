import { combineReducers } from "redux";
import { ITheme, IThemeAction, ThemeActionType, ThemeType } from "./types";

const theme = (
  state: ITheme = { type: ThemeType.DARK },
  action: IThemeAction
) => {
  switch (action.type) {
    case ThemeActionType.SET_THEME:
      return action.theme;
    default:
      return state;
  }
};

const appReducer = combineReducers({
  theme
});

export default appReducer;
