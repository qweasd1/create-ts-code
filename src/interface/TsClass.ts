import {TsNode, TsNodeBody} from "../model/TsNodeFactory";

export interface TsClass {
  implements(...interfaces:string[]):TsClass
  extends(...baseClasses:string[]):TsClass
  body(tsNode:TsNodeBody):TsClass

  if(condition:boolean):TsClass
  else():TsClass
  endif():TsClass
}