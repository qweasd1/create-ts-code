import {CreateCodeConfig, TsNodeFactory, If, TsNode, TsMultilineNodeFactory} from "./TsNodeFactory";
import {tsNodeToLines} from './util';
import {TsConcatFactory} from "./TsConcatFactory";
import {TsArrayFactory} from "./TsArrayFactory";
import {TsChainFunction} from "../interface/TsChainFunction";
import {TsDeclaration} from "../interface/TsDeclaration";
import {TsArray} from "../interface/TsArray";

export declare type CallSegement = string | [string, TsNode[]]

export class TsChainFunctionFactory extends TsMultilineNodeFactory<TsChainFunctionFactory> implements TsChainFunction{


  public segements: CallSegement[] = []


  @If
  invoke(path: string, ...args: TsNode[]) {
    this.segements.push([path, args])
    return this
  }

  @If
  ref(path: string) {
    this.segements.push(path)
    return this
  }

  _createCodeLines(config: CreateCodeConfig): string[] {

    const concat = new TsConcatFactory()
    this.segements.forEach((segement, index) => {

      if (index > 0) {
        if (this.isMultiline) {
          concat.concat(config.EOL, config.indent, ".")
        }
        else {
          concat.concat(".")
        }

      }

      if (typeof segement === "string") {
        concat.concat(segement)
      }
      else {
        concat.concat(segement[0])
        concat.concat(new TsArrayFactory(segement[1], "arguments"))
      }

    })
    return concat.createCodeLines(config)

  }


  // if(condition: boolean) {
  //   this.isConditionTrue = condition
  //   return this
  // }
  //
  // else() {
  //   this.isConditionTrue = !this.isConditionTrue
  //   return this
  // }
  //
  // endif() {
  //   this.isConditionTrue = true
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
  //
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
}