import {CreateCodeConfig, TsNodeFactory, If, TsNode} from "./TsNodeFactory";
import {tsNodeToLines} from './util';
import {
  TsAbstractDeclaration,
  TsDeclaration, TsExportDeclaration, TsExportDefaultDeclaration,
  TsScopeDeclaration
} from "../interface/TsDeclaration";
import {TsInterface} from "../interface/TsInterface";
import {TsEnum} from "../interface/TsEnum";
import {TsClass} from "../interface/TsClass";
import {TsFunctionDeclaration} from "../interface/TsFunctionDeclaration";
import {TsEntityFactory} from "./TsEntityFactory";
import {InternalFileContext} from "../syntax/syntax";
import {TsChainFunctionFactory} from "./TsChainFunctionFactory";
import {TsFunctionDeclarationFactory} from "./TsFunctionDeclarationFactory";


export class TsConcatFactory extends TsNodeFactory<TsConcatFactory> implements TsDeclaration, TsAbstractDeclaration, TsScopeDeclaration, TsExportDeclaration, TsExportDefaultDeclaration {

  public tsNodes: TsNode[] = []
  public context: InternalFileContext

  constructor() {
    super()

  }

  @If
  concat(...tsNodes: TsNode[]) {
    this.tsNodes.push(...tsNodes)
    return this
  }

  _createCodeLines(config: CreateCodeConfig): string[] {

    return this.tsNodes.reduce((acc: string[], current: TsNode) => {
      if (acc.length === 0) {
        acc.push(...tsNodeToLines(current, config))
      }
      else {
        const nextLines = tsNodeToLines(current, config)
        acc[acc.length - 1] += nextLines[0]
        acc.push(...nextLines.slice(1))
      }
      return acc
    }, []) as string[]
  }

  get static(): TsScopeDeclaration {
    this.tsNodes.push("static ")
    return this
  }

  get abstract(): TsAbstractDeclaration {
    this.tsNodes.push("abstract ")
    return this
  }

  get default(): TsExportDefaultDeclaration {
    this.tsNodes.push("default ")
    return this
  }

  get public(): TsScopeDeclaration {
    this.tsNodes.push("public ")
    return this
  }

  get protected(): TsScopeDeclaration {
    this.tsNodes.push("protected ")
    return this
  }

  get private(): TsScopeDeclaration {
    this.tsNodes.push("private ")
    return this
  }

  get export(): TsExportDeclaration {
    this.tsNodes.push("export ")
    return this
  }


  @If
  type(type: TsNode): TsDeclaration {
    this.tsNodes.push(": ", type)
    return this
  }

  @If
  equals(tsNode: TsNode): TsDeclaration {
    this.tsNodes.push(" = ", tsNode)
    return this;
  }


  interface(name: string): TsInterface {
    const interface_ = new TsEntityFactory(name, "interface");
    interface_.context = this.context
    this.tsNodes.push(interface_)
    return interface_
  }


  enum(name: string): TsEnum {
    const enum_ = new TsEntityFactory(name, "enum");
    enum_.context = this.context
    this.tsNodes.push(enum_)
    return enum_
  }


  class(name: string): TsClass {
    const class_ = new TsEntityFactory(name, "class");
    class_.context = this.context
    this.tsNodes.push(class_)
    return class_
  }

  function (name: string): TsFunctionDeclaration {
    return undefined;
  }

  @If
  field(name: TsNode): TsDeclaration {
    this.tsNodes.push(name)
    return this;
  }

  @If
  method(name: string): TsFunctionDeclaration {
    return undefined;
  }

  @If
  const(name: string): TsDeclaration {
    this.tsNodes.push("const ", name)
    return this;
  }

  @If
  let(name: string): TsDeclaration {
    this.tsNodes.push("let ", name)
    return this;
  }

  // if(condition: boolean): TsDeclaration {
  //   this.isConditionTrue = condition
  //   return this
  // }
  //
  // else(): TsDeclaration {
  //   this.isConditionTrue = !this.isConditionTrue
  //   return this
  // }
  //
  // endif(): TsDeclaration {
  //   this.isConditionTrue = true
  //   return this
  // }

  emitWhen(condition: boolean) {
    this.isEmit = condition
    return this
  }

  loads(plugin: (self) => void){
    plugin(this)
    return this
  }

}