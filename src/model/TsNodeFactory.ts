import {TsArrayFactory} from "./TsArrayFactory";
import {TsObjectFactory} from "./TsObjectFactory";
import {InternalFileContext} from "../syntax/syntax";
import {TsChainFunction} from "../interface/TsChainFunction";
import {TsImport} from "../interface/TsImport";
import {TsIf} from "../interface/TsIf";
import {TsFunction} from "../../lib/src/interface/TsFunction";
import {
  TsAbstractDeclaration, TsDeclaration, TsExportDeclaration,
  TsScopeDeclaration
} from "../interface/TsDeclaration";
import {TsArray} from "../interface/TsArray";
import {TsObject} from "../interface/TsObject";
import {ITsBodyNodeFactory} from "../interface/TsNode";


export abstract class TsNodeFactory<T> {
  protected isConditionTrue: boolean = true
  protected isEmit:boolean = true

  public createCode(config: CreateCodeConfig): string {
    return this.createCodeLines(config).join(config.EOL)
  }

  protected abstract _createCodeLines(config: CreateCodeConfig): string[]

  createCodeLines(config: CreateCodeConfig): string[] {
    if(!this.isEmit){
      return []
    }
    else {
      return this._createCodeLines(config)
    }
  }

  if(condition: boolean) :T {
    this.isConditionTrue = condition
    return <any>this
  }

  endif() : T {
    this.isConditionTrue = true
    return <any>this
  }

  else() : T {
    this.isConditionTrue = !this.isConditionTrue
    return <any>this
  }

  emitWhen(condition: boolean): T {
    this.isEmit = condition
    return <any>this
  }

  loads(plugin: (self) => void): T {
    plugin(this)
    return <any>this
  }

}

export abstract class TsMultilineNodeFactory<T> extends TsNodeFactory<T>{
  public isMultiline:boolean = false

  @If
  multiline() : T{
    this.isMultiline = true
    return <any>this
  }

  @If
  singleline() : T{
    this.isMultiline = false
    return <any>this
  }

}

export abstract class TsBodyNodeFactory<T> extends TsMultilineNodeFactory<T> implements ITsBodyNodeFactory{
  abstract push(...tsNodes:TsNode[])
  abstract remove(tsNode:TsNode)
  context:InternalFileContext
}



export interface CreateCodeConfig {
  indent: string
  EOL: string
}

/**
 * Annotation to let TsNodeFactory can generate content according to condition
 * @param target
 * @param {string} propertyKey
 * @param {PropertyDescriptor} descriptor
 * @constructor
 */
export function If(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originMethod = descriptor.value
  descriptor.value = function (...args) {
    if (this.isConditionTrue) {
      originMethod.apply(this, args)
    }
    return this
  }
};
export type TsInterface = TsChainFunction | TsImport | TsIf  | TsFunction | TsDeclaration | TsExportDeclaration | TsScopeDeclaration | TsAbstractDeclaration | TsAbstractDeclaration | TsArray | TsObject
export type TsNodeElem =  TsInterface | TsNodeFactory<any> | string | number | boolean | undefined | null
export type TsNode = TsNodeElem | TsNodeElem[] | { [key: string]: TsNodeElem }
export type TsNodeBody = TsNode | Function