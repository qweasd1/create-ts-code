import {CreateCodeConfig, TsNodeFactory, If, TsNode, TsBodyNodeFactory} from "./TsNodeFactory";
import {tsNodeToLines} from './util';


export class TsBlockFactory extends TsBodyNodeFactory<TsBlockFactory> {


  public tsNodes:TsNode[] = []



  @If
  append(...tsNodes:TsNode[]){
    this.tsNodes.push(...tsNodes)
    return this
  }

  push(...tsNodes: TsNode[]) {
    this.tsNodes.push(...tsNodes)
  }

  remove(tsNode: TsNode) {
    this.tsNodes.splice(this.tsNodes.indexOf(tsNode),1)
  }



  _createCodeLines(config: CreateCodeConfig): string[] {

    return this.tsNodes.reduce((acc:string[],current:TsNode)=>{
      acc.push(...tsNodeToLines(current,config))
      return acc
    },[]) as string[]
  }

  // emitWhen(condition: boolean) {
  //   this.isEmit = condition
  //   return this
  // }
  //
  // loads(plugin: (self) => void){
  //   plugin(this)
  //   return this
  // }

}