import {CreateCodeConfig, TsMultilineNodeFactory, If, TsNode, TsNodeBody, TsBodyNodeFactory} from "./TsNodeFactory";
import {TsArrayFactory} from "./TsArrayFactory";
import {tsNodesToLines} from './util';
import {TsFunctionDeclaration} from "../interface/TsFunctionDeclaration";
import {InternalFileContext} from "../syntax/syntax";
import {TsEntityFactory} from "./TsEntityFactory";


export type FunctionType = "function" | "arrow" | "set" | "get" | "method"

export class TsFunctionDeclarationFactory extends TsBodyNodeFactory<TsFunctionDeclarationFactory> implements TsFunctionDeclaration{
  public _context:InternalFileContext
  public get context(){
    return this._context
  }

  public set context(value){
    this._context = value
    // if inside interface, ignore body
    if(this.context.currentBodyFactory){
      if((this.context.currentBodyFactory instanceof TsEntityFactory) && this.context.currentBodyFactory.entityType === "interface"){
        this.isIgnoreBody = true
      }
    }
  }

  private _args:TsNode[] = []
  private _body:TsNode[] = []
  public isIgnoreBody = false
  public returnType:string
  public isArgsMultiline = false


  constructor(
    public name_:string = "",
    public type:FunctionType = "function",

  ){
    super()
  }

  // @If
  // name(name:string){
  //   this.name_ = name
  //   return this
  // }


  @If
  argsMultiline(){
    this.isArgsMultiline = true
    return this
  }

  @If
  argsSingleline(){
    this.isArgsMultiline = false
    return this
  }

  @If
  args(...args:string[]){
    this._args.push(...args)
    return this
  }

  @If
  body(tsNode:TsNodeBody){
    if(typeof tsNode === "function"){
      this.context.push(this)
      tsNode()
      this.context.pop()
    }
    else {
      this._body.push(tsNode)
    }
    return this
  }

  push(...tsNodes: TsNode[]) {
    this._body.push(...tsNodes)
  }

  remove(tsNode: TsNode) {
    this._body.splice(this._body.indexOf(tsNode),1)
  }


  @If
  returns(returnType:string){
    this.returnType = returnType
    return this
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
  // emitWhen(condition: boolean) {
  //   this.isEmit = condition
  //   return this
  // }
  //
  // loads(plugin: (self) => void){
  //   plugin(this)
  //   return this
  // }

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

  _createCodeLines(config: CreateCodeConfig): string[] {


    let result:string[]
    let bodyLines = tsNodesToLines(this._body, config).map((line:string)=>{
      if(line.endsWith(";")){
        return line
      }
      else {
        return line + ";"
      }
    })

    const argumentFactory = new TsArrayFactory(this._args,"arguments")
    argumentFactory.isMultiline = this.isArgsMultiline
    let argLines = argumentFactory.createCodeLines(config)

    let signaturePrefix = "";
    let signatureSuffix = "";
    const returnType = this.returnType ? ` : ${this.returnType}` : "";
    switch (this.type){
      case "arrow":
        signaturePrefix = ""
        signatureSuffix = " => {"
        break;
      case "function":
        signaturePrefix = `function ${this.name_}`
        signatureSuffix = " {"
        break;
      case "get":
        signaturePrefix = `get ${this.name_}`
        signatureSuffix = " {"
        break;
      case "set":
        signaturePrefix = `set ${this.name_}`
        signatureSuffix = " {"
        break;
      case "method":
        signaturePrefix = `${this.name_}`
        signatureSuffix = " {"
        break;

    }

    result = argLines

    result[0] = signaturePrefix + result[0]
    result[result.length-1] = result[result.length-1] + returnType


    if(this.isIgnoreBody){

      return result
    }

    result[result.length-1] = result[result.length-1] + signatureSuffix

    // this is for body multiline
    if(this.isMultiline){
      result[result.length-1] += " "
      if(bodyLines.length === 0){
        bodyLines.push("")
      }
      bodyLines.map(x=>config.indent + x+ " ").forEach((line)=>{
        result.push(line)
      })
      result.push("}")
    }
    else {
      const bodyLine = bodyLines.join(" ")
      result[result.length - 1] += ( (bodyLine ?" "+ bodyLine : "") + " }")
    }

    return result
  }

}