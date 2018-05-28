import {TsNode} from "../model/TsNodeFactory";

export interface TsImport {
  imports(...items:string[]):TsImport
  importModule():TsImport
  importModuleAs(alias:string):TsImport

  if(condition:boolean):TsImport
  else():TsImport
  endif():TsImport
}