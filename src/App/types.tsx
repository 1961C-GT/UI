import { CustomMapType } from "pages/MapPage/types";

export enum ThemeType {
  LIGHT,
  DARK
}

export type MapType = CustomMapType | google.maps.MapTypeId;

// State-related

export type IState = {
  readonly theme: ITheme;
};

export type ITheme = {
  readonly themeType: ThemeType;
  readonly mapType: MapType;
};

// Action-related

export enum ThemeAction {
  SET_THEME_TYPE,
  SET_MAP_TYPE
}

export type IThemeActionSetThemeType = {
  type: ThemeAction.SET_THEME_TYPE;
  themeType: ThemeType;
};

export type IThemeActionSetMapType = {
  type: ThemeAction.SET_MAP_TYPE;
  mapType: MapType;
};

export type IThemeAction = IThemeActionSetThemeType | IThemeActionSetMapType;
