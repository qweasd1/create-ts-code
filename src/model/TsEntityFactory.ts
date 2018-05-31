import {CreateCodeConfig, TsNodeFactory, If, TsNode, TsNodeBody, TsBodyNodeFactory} from "./TsNodeFactory";
import {EMPTY_LINE, toArray, tsNodesToLines} from './util';
import {TsEnum} from "../interface/TsEnum";
import {TsInterface} from "../interface/TsInterface";
import {TsClass} from "../interface/TsClass";
import {INewFileContext, InternalFileContext, NewFileContext} from "../syntax/syntax";


/**
 * Entity could be class, interface, enum
 */
export class TsEntityFactory extends TsBodyNodeFactory<TsEntityFactory> implements TsClass, TsEnum, TsInterface {


  private _body: TsNode[] = []
  private _implements: Set<string> = new Set<string>()
  private _extends: Set<string> = new Set<string>()

  context: InternalFileContext

  constructor(public name: string,
              public entityType: "interface" | "class" | "enum") {
    super()
  }


  push(...tsNodes: TsNode[]) {
    this._body.push(...tsNodes)
  }

  remove(tsNode: TsNode) {
    this._body.splice(this._body.indexOf(tsNode),1)
  }


  @If
  implements(...implementInterfaces: string[]) {
    implementInterfaces.forEach(x => this._implements.add(x))
    return this
  }


  @If
  extends(...baseClasses: string[]): TsClass {
    baseClasses.forEach(x => this._extends.add(x))
    return this
  }

  @If
  body(tsNode: TsNodeBody) {
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


  _createCodeLines(config: CreateCodeConfig): string[] {
    let lines: string[] = []
    lines.push(`${this.buildEntityDeclaration(this.entityType)}${this.buildExtends()}${this.buildImplements()} {`)
    let body = tsNodesToLines(this._body, config).map(x => config.indent + x)
    if (this.entityType === "enum") {
      for (let i = 0; i < body.length - 1; i++) {
        body[i] = body[i] + ","
      }
    }
    lines = lines.concat(body)
    lines.push("}")
    return lines
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


  protected buildEntityDeclaration(entityType: string) {
    return `${entityType} ${this.name}`
  }

  protected buildImplements() {
    if (this._implements.size > 0) {
      return ` implements ${Array.from(this._implements).join(", ")}`
    }
    else {
      return ""
    }
  }

  protected buildExtends() {
    if (this._extends.size > 0) {
      return ` extends ${Array.from(this._extends).join(", ")}`
    }
    else {
      return ""
    }
  }


}