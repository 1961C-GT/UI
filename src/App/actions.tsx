import { ITheme, IThemeAction, ThemeActionType } from "./types";

export const setTheme = (theme: ITheme): IThemeAction => ({
  type: ThemeActionType.SET_THEME,
  theme
});
