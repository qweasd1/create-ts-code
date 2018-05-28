import {CreateCodeConfig, TsNodeFactory, If, TsNode} from "./TsNodeFactory";
import {tsNodeToLines} from './util';


export class TsBlockFactory extends TsNodeFactory {

  public prefix: TsNode
  public following: TsNode

  public tsNodes:TsNode[] = []



  @If
  append(...tsNodes:TsNode[]){
    this.tsNodes.push(...tsNodes)
    return this
  }

  createCodeLines(config: CreateCodeConfig): string[] {
    return this.tsNodes.reduce((acc:string[],current:TsNode)=>{
      acc.push(...tsNodeToLines(current,config))
      return acc
    },[]) as string[]
  }


}