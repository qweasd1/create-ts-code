import {TsNode, TsNodeBody} from "../model/TsNodeFactory";

export interface TsInterface {
  implements(...interfaces:string[]):TsInterface
  body(tsNode:TsNodeBody):TsInterface

  if(condition:boolean):TsInterface
  else():TsInterface
  endif():TsInterface
}