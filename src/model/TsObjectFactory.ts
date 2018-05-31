import {CreateCodeConfig, TsMultilineNodeFactory, If, TsNode} from "./TsNodeFactory";
import {tsNodeToLines} from "./util";
import {TsObject} from "../interface/TsObject";
import {TsChainFunctionFactory} from "./TsChainFunctionFactory";
import {TsFunctionDeclarationFactory} from "./TsFunctionDeclarationFactory";
import {InternalFileContext} from "../syntax/syntax";
import {type} from "os";

export class TsObjectFactory extends TsMultilineNodeFactory<TsObjectFactory> implements TsObject{

  context:InternalFileContext
  public objectLiteral:{[key:string]:TsNode}


  constructor(objectLiteral:{[key:string]:TsNode} = {}){
    super()
    this.objectLiteral = objectLiteral
  }

  _createCodeLines(config: CreateCodeConfig): string[] {

    if (this.isMultiline) {
      const result = ["{"]
      const keys = Object.keys(this.objectLiteral)
      keys.forEach((key,index)=>{
        tsNodeToLines(this.objectLiteral[key], config).forEach((line,i)=>{
          if(i === 0){
            result.push(key + ":"+ line)
          }
          else {
            result.push(line)
          }

        })
        if(index < keys.length - 1){
          result[result.length-1] += ", "
        }
      })
      for(let i=1;i < result.length;i++){
        result[i] = config.indent + result[i]
      }

      result.push("}")
      return result
    }
    else {
      const result = []
      let line = ""

      Object.keys(this.objectLiteral).forEach(key => {
        const values = tsNodeToLines(this.objectLiteral[key], config)
        line += (line ? ", " : "") + key + ":" +  values[0]

        for (let i = 1; i < values.length; i++) {
          result.push(line)
          line = values[i]
        }
      })
      result.push(line)
      result[0] = "{" + result[0]
      result[result.length - 1] = result[result.length - 1] + "}"

      return result
    }
  }

  @If
  set(key:string,value:TsNode){
    this.objectLiteral[key] = value
    return this
  }


  has(key:string){
    return key in this.objectLiteral
  }

  // if(condition: boolean) {
  //   this.isConditionTrue = condition
  //   return this
  // }
  //
  // endif() {
  //   this.isConditionTrue = true
  //   return this
  // }
  //
  // else() {
  //   this.isConditionTrue = !this.isConditionTrue
  //   return this
  // }
  //
  // emitWhen(condition: boolean) {
  //   this.isEmit = condition
  //   return this
  // }
  //
  // loads(plugin: (self) => void){
  //   plugin(this)
  //   return this
  // }
  //
  // @If
  // multiline(){
  //   this.isMultiline = true
  //   return this
  // }
  //
  // @If
  // singleline(){
  //   this.isMultiline = false
  //   return this
  // }


}