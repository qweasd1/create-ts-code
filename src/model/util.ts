import {TsObjectFactory} from "./TsObjectFactory";
import {CreateCodeConfig, TsNode, TsNodeFactory} from "./TsNodeFactory";
import {TsArrayFactory} from "./TsArrayFactory";

export function toArray<K,V>(map:Map<K,V>){
  const iterator = map.values()
  const result = []
  while (true){
    let {value,done} = iterator.next()
    if(done){
      break
    }
    else {
      result.push(value)
    }
  }
  return result
}

export const EMPTY_LINE = ""

export function  tsNodesToLines(tsNodes: TsNode[], config: CreateCodeConfig): string[] {
  const result = []
  tsNodes.forEach((tsNode) => {
   result.push(...tsNodeToLines(tsNode,config))
  })

  return result
}

export function  tsNodeToLines(tsNode: TsNode, config: CreateCodeConfig): string[] {
  const result = []
  if (typeof tsNode === "string") {
    result.push(tsNode)
  }
  else if (Array.isArray(tsNode)) {
    new TsArrayFactory(tsNode).createCodeLines(config).forEach((line)=>{
      result.push(line)
    })
  }
  else if (tsNode instanceof TsNodeFactory) {
    tsNode.createCodeLines(config).forEach((line) => {
      result.push(line)
    })
  }
  else if (typeof tsNode === "object") {
    new TsObjectFactory(tsNode).createCodeLines(config).forEach((line)=>{
      result.push(line)
    })
  }
  return result;
}


