export enum ThemeType {
  LIGHT,
  DARK
}

export enum ThemeActionType {
  SET_THEME
}

export interface ITheme {
  type: ThemeType;
}

export interface IThemeAction {
  type: ThemeActionType;
  theme: ITheme;
}
