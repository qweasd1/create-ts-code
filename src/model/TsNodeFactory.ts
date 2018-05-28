import {TsArrayFactory} from "./TsArrayFactory";
import {TsObjectFactory} from "./TsObjectFactory";


export abstract class TsNodeFactory {
  isConditionTrue: boolean = true

  createCode(config: CreateCodeConfig): string {
    return this.createCodeLines(config).join(config.EOL)
  }

  public abstract createCodeLines(config: CreateCodeConfig): string[]

  if(condition: boolean) {
    this.isConditionTrue = condition
    return this
  }

  endIf() {
    this.isConditionTrue = true
    return this
  }

  else() {
    this.isConditionTrue = !this.isConditionTrue
    return this
  }


}

export abstract class TsMultilineNodeFactory extends TsNodeFactory{
  public isMultiline:boolean = false

  @If
  multiline(){
    this.isMultiline = true
    return this
  }

  @If
  singleline(){
    this.isMultiline = false
    return this
  }
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

export type TsNodeElem = string | TsNodeFactory
export type TsNode = TsNodeElem | TsNodeElem[] | { [key: string]: TsNodeElem }
export type TsNodeBody = TsNode | Function