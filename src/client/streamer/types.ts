export type TwitchContentValueObject = {
  name: string;
  isSelected: boolean;
}
  
export type TwitchContentValue =  [[
  string,
  TwitchContentValueObject
]]
  
export type TwitchContentOptions = {
  dataType: string;
  value: TwitchContentValue;
}
  
export type TableOptions = Map<string, TwitchContentValueObject> | null;
  
export interface TwitchContent {
  options: TwitchContentOptions;
}
  
export interface BingoOptions {
  options: Map<string, TwitchContentValueObject>
}