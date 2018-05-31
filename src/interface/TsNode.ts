import {InternalFileContext} from "../syntax/syntax";
import {TsNode} from "../model/TsNodeFactory";

export interface ITsNode<T> {
  if(condition:boolean):T
  else():T
  endif():T
  emitWhen(condition:boolean):T
  loads(plugin:(self:T)=>void):T
}

export interface ITsMultilineNode<T> extends ITsNode<T>{
  singleline():T
  multiline():T
}

export interface ITsBodyNodeFactory {
  push(...tsNodes:TsNode[])
  remove(tsNode:TsNode)
  context:InternalFileContext
}