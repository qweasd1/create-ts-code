import {TsNode} from "../model/TsNodeFactory";
import {ITsNode} from "./TsNode";

export interface TsImport extends ITsNode<TsImport>{
  imports(...items:string[]):TsImport
  importModule():TsImport
  importModuleAs(alias:string):TsImport

}