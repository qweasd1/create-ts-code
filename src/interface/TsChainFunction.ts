import {TsNode, TsNodeBody} from "../model/TsNodeFactory";

export interface TsChainFunction {
  call(functionName:string):TsChainFunction
  with(...args:string[]):TsChainFunction
  // directly concat with another string or node ()
  chain(tsNode:TsNode):TsChainFunction

  if(condition:boolean):TsChainFunction
  else():TsChainFunction
  endif():TsChainFunction
  singleline():TsChainFunction
  multiline():TsChainFunction
}