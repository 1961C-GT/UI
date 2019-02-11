export enum CustomMapType {
  STANDARD = "Standard",
  SILVER = "Silver",
  RETRO = "Retro",
  DARK = "Dark",
  NIGHT = "Night",
  AUBERGINE = "Aubergine"
}

export type IMapStyles = {
  [type in CustomMapType]: google.maps.MapTypeStyle[]
};
