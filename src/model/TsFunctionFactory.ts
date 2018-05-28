import {CreateCodeConfig, TsMultilineNodeFactory, If, TsNode} from "./TsNodeFactory";
import {TsArrayFactory} from "./TsArrayFactory";
import {tsNodesToLines} from './util';


export type FunctionType = "function" | "arrow" | "get" | "set" | "method"

export class TsFunctionFactory extends TsMultilineNodeFactory{

  private _args:TsNode[] = []
  private _body:TsNode[] = []
  public isIgnoreBody = false
  public returnType:string
  public isArgsMultiline = false

  constructor(
    public name:string = "",
    public type:FunctionType = "function",

  ){
    super()
  }

  @If
  setName(name:string){
    this.name = name
    return this
  }

  @If
  setType(type:FunctionType){
    this.type = type
    return this
  }

  @If
  setArgsMultiline(){
    this.isArgsMultiline = true
    return this
  }

  @If
  addArgs(...args:TsNode[]){
    this._args.push(...args)
    return this
  }

  @If
  addBody(...args:TsNode[]){
    this._body.push(...args)
    return this
  }

  @If
  ignoreBody(){
    this.isIgnoreBody = true
    return this
  }

  @If
  addReturnType(returnType:string){
    this.returnType = returnType
    return this
  }

  createCodeLines(config: CreateCodeConfig): string[] {
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
        signaturePrefix = `function ${this.name}`
        signatureSuffix = " {"
        break;
      case "get":
        signaturePrefix = `get ${this.name}`
        signatureSuffix = " {"
        break;
      case "set":
        signaturePrefix = `set ${this.name}`
        signatureSuffix = " {"
        break;
      case "method":
        signaturePrefix = `${this.name}`
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