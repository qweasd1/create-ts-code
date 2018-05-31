import {TsNodeBody} from "../model/TsNodeFactory";
import {ITsMultilineNode} from "./TsNode";

export interface TsFunctionDeclaration extends ITsMultilineNode<TsFunctionDeclaration>{
  args(...args:string[]):TsFunctionDeclaration
  returns(returnType:string):TsFunctionDeclaration
  body(body:TsNodeBody):TsFunctionDeclaration


  argsMultiline():TsFunctionDeclaration
  argsSingleline():TsFunctionDeclaration

}
