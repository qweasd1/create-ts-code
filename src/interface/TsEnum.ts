import {TsNode, TsNodeBody} from "../model/TsNodeFactory";

export interface TsEnum {
  body(tsNode:TsNodeBody):TsEnum

  if(condition:boolean):TsEnum
  else():TsEnum
  endif():TsEnum
}