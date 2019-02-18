export enum ThemeType {
  STANDARD,
  SILVER,
  RETRO,
  DARK,
  NIGHT,
  AUBERGINE
}

export interface ITheme {
  appStyles: any;
  mapStyles: google.maps.MapTypeStyle[];
}

export interface IThemes {
  [type: number]: ITheme; // number should be ThemeType, but TS doesn't allow...
}
