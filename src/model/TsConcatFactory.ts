import {CreateCodeConfig, TsNodeFactory, If, TsNode} from "./TsNodeFactory";
import {tsNodeToLines} from './util';


export class TsConcatFactory extends TsNodeFactory {

  public prefix: TsNode
  public following: TsNode

  public tsNodes:TsNode[] = []



  @If
  concat(...tsNodes:TsNode[]){
    this.tsNodes.push(...tsNodes)
    return this
  }

  createCodeLines(config: CreateCodeConfig): string[] {

    return this.tsNodes.reduce((acc:string[],current:TsNode)=>{
      if(acc.length === 0){
        acc.push(...tsNodeToLines(current,config))
      }
      else {
        const nextLines = tsNodeToLines(current,config)
        acc[acc.length-1] += nextLines[0]
        acc.push(...nextLines.slice(1))
      }
      return acc
    },[]) as string[]
  }


}