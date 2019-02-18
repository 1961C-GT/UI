export interface IProps {}

export interface IState {
  settingsOpen: boolean;
}

export enum ThemeType {
  STANDARD = "Standard",
  SILVER = "Silver",
  RETRO = "Retro",
  DARK = "Dark",
  NIGHT = "Night",
  AUBERGINE = "Aubergine"
}

export interface ITheme {
  appStyles: any;
  mapStyles: google.maps.MapTypeStyle[];
}

export interface IThemes {
  [type: string]: ITheme; // string should be ThemeType, but TS doesn't allow...
}
