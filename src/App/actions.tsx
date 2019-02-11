import { IThemeActionSetMapType, MapType, ThemeAction } from "./types";

export const setMapType = (mapType: MapType): IThemeActionSetMapType => ({
  type: ThemeAction.SET_MAP_TYPE,
  mapType
});
