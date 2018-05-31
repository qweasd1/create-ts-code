import {
  TsAbstractDeclaration, TsDeclaration, TsExportDeclaration, TsScopeDeclaration,
  TsStaticDeclaration
} from "../interface/TsDeclaration";
import {CreateCodeConfig, TsBodyNodeFactory, TsNode} from "../model/TsNodeFactory";
import {TsIf} from "../interface/TsIf";
import {TsClass} from "../interface/TsClass";
import {TsInterface} from "../interface/TsInterface";
import {TsFunctionDeclaration} from "../interface/TsFunctionDeclaration";
import {TsImport} from "../interface/TsImport";
import {TsChainFunction} from "../interface/TsChainFunction";
import {TsImportFactory} from "../model/TsImportFactory";
import {TsConcatFactory} from "../model/TsConcatFactory";
import {TsBlockFactory} from "../model/TsBlockFactory";
import {TsEntityFactory} from "../model/TsEntityFactory";
import {TsEnum} from "../interface/TsEnum";
import {TsChainFunctionFactory} from "../model/TsChainFunctionFactory";
import {TsFunctionDeclarationFactory} from "../model/TsFunctionDeclarationFactory";
import {TsArray} from "../interface/TsArray";
import {TsArrayFactory} from "../model/TsArrayFactory";
import {TsObject} from "../interface/TsObject";
import {TsObjectFactory} from "../model/TsObjectFactory";
import objectContaining = jasmine.objectContaining;
import {ITsBodyNodeFactory} from "../interface/TsNode";


// import
export type $Import = (from: string) => TsImport

// field declaration
export type $Field = (name: string) => TsDeclaration
export type $Const = (name: string) => TsDeclaration

// line
export type $Line = (text?: string | number) => void

// control flow
export type $If = (tsNode: TsNode) => TsIf


// class interface

export type $Class = (name: string) => TsClass
export type $Interface = (name: string) => TsInterface
export type $Enum = (name: string) => TsEnum


// functions

export type $Function = (name?: string) => TsFunctionDeclaration
export type $Method = (name: string) => TsFunctionDeclaration
export type $Get = (name: string) => TsFunctionDeclaration
export type $Set = (name: string) => TsFunctionDeclaration
export type $ArrowFn = () => TsFunctionDeclaration


// new file
export interface INewFileContext {
  $from(from: string): TsImport

  $let(name: string): TsDeclaration

  $const(name: string): TsDeclaration

  $public: TsScopeDeclaration
  $protected: TsScopeDeclaration
  $private: TsScopeDeclaration
  $export: TsExportDeclaration
  $abstract: TsAbstractDeclaration
  $static: TsStaticDeclaration

  $field: $Field
  $line: $Line

  $if: $If

  $class: $Class
  $interface: $Interface
  $enum: $Enum

  $invoke: (name: string, ...args: TsNode[]) => TsChainFunction
  $invoke_: (name: string, ...args: TsNode[]) => TsChainFunction
  $ref: (name: string) => TsChainFunction

  $method: $Method
  $function: $Function
  $function_: $Function
  $get: $Method
  $set: $Method
  $arrow: $ArrowFn
  $arrow_: $ArrowFn

  $array_(...items: TsNode[]): TsArray

  $obj_(literal: { [key: string]: TsNode }): TsObject

  $constructor(): TsFunctionDeclaration

  $annotation(name: string, ...args: TsNode[]): TsChainFunction
}

export interface InternalFileContext {
  push(body: ITsBodyNodeFactory)

  currentBodyFactory: ITsBodyNodeFactory

  pop()
}

export type NewFileGenerator = (spreedContext: INewFileContext, context: INewFileContext) => void

export class NewFileContext implements INewFileContext, InternalFileContext {


  private rootBlockFactory: TsBlockFactory = new TsBlockFactory()
  public currentBodyFactory: ITsBodyNodeFactory
  public bodyFactoryStack: ITsBodyNodeFactory[] = []


  constructor() {
    this.currentBodyFactory = this.rootBlockFactory
  }

  $let = (name: string) => {
    const let_ = new TsConcatFactory()
    let_.context = this
    let_.concat("let ", name)
    this.currentBodyFactory.push(let_)
    return let_
  }
  $const = (name: string) => {
    const const_ = new TsConcatFactory()
    const_.context = this
    const_.concat("const ", name)
    this.currentBodyFactory.push(const_)
    return const_
  }

  get $public(): TsScopeDeclaration {
    const getCurrentBodyFactory = () => {
      return this.currentBodyFactory
    }
    const context = this
    return createScopeBuilder(getCurrentBodyFactory, context, "public")
  }

  get $protected(): TsScopeDeclaration {
    const getCurrentBodyFactory = () => {
      return this.currentBodyFactory
    }
    const context = this
    return createScopeBuilder(getCurrentBodyFactory, context, "protected")
  }

  get $private(): TsScopeDeclaration {
    const getCurrentBodyFactory = () => {
      return this.currentBodyFactory
    }
    const context = this
    return createScopeBuilder(getCurrentBodyFactory, context, "private")

  }

  get $static(): TsStaticDeclaration {
    const getCurrentBodyFactory = () => {
      return this.currentBodyFactory
    }
    const context = this
    return createStaticBuilder(getCurrentBodyFactory, context)
  }

  get $abstract(): TsAbstractDeclaration {
    const getCurrentBodyFactory = () => {
      return this.currentBodyFactory
    }
    const context = this
    return createAbstractBuilder(getCurrentBodyFactory, context)
  }

  get $export(): TsExportDeclaration {
    const getCurrentBodyFactory = () => {
      return this.currentBodyFactory
    }
    const context = this
    return createExportBuilder(getCurrentBodyFactory, context)
  }

  $array_ = (...items: TsNode[]) => {
    const result = new TsArrayFactory(items)
    result.context = this
    return result
  }

  $obj_ = (literal: { [key: string]: TsNode }) => {
    const result = new TsObjectFactory(literal)
    result.context = this
    return result
  }

  $field = (name: string) => {
    const result = new TsConcatFactory()
    result.concat(name)
    result.context = this
    this.currentBodyFactory.push(result)
    return result
  }
  $line = (text?: string | number) => {
    if (text === undefined || text === null) {
      this.currentBodyFactory.push("")
    }
    else if (typeof text === "number") {
      for (let i = 0; i < text; i++) {
        this.currentBodyFactory.push("")
      }
    }
    else {
      this.currentBodyFactory.push(text)
    }

  }

  $class = (name: string) => {
    const entity = new TsEntityFactory(name, "class")
    entity.context = this
    this.currentBodyFactory.push(entity)
    return entity
  }
  $interface = (name: string) => {
    const entity = new TsEntityFactory(name, "interface")
    entity.context = this
    this.currentBodyFactory.push(entity)
    return entity
  }

  $enum = (name: string) => {
    const entity = new TsEntityFactory(name, "enum")
    entity.context = this
    this.currentBodyFactory.push(entity)
    return entity
  }
  $invoke = (name: string, ...args: TsNode[]) => {
    const chain = new TsChainFunctionFactory()
    chain.invoke(name, ...args)
    this.currentBodyFactory.push(chain)
    return chain
  }

  $invoke_ = (name: string, ...args: TsNode[]) => {
    const chain = new TsChainFunctionFactory()
    chain.invoke(name, ...args)
    return chain
  }

  $ref = (name: string) => {
    const chain = new TsChainFunctionFactory()
    chain.ref(name)
    this.currentBodyFactory.push(chain)
    return chain
  }

  $method = (name: string) => {
    return createMethodBuilder(() => this.currentBodyFactory, this, name, "method")
  }

  $function = (name: string) => {
    return createMethodBuilder(() => this.currentBodyFactory, this, name, "function")
  }

  $function_ = (name: string = "") => {
    return createMethodBuilder(() => this.currentBodyFactory, this, name, "function", false, false)
  }

  $get = (name: string): TsFunctionDeclaration => {
    return createMethodBuilder(() => this.currentBodyFactory, this, name, "get")
  }
  $set = (name: string): TsFunctionDeclaration => {
    return createMethodBuilder(() => this.currentBodyFactory, this, name, "set")
  }
  $arrow = (): TsFunctionDeclaration => {
    return createMethodBuilder(() => this.currentBodyFactory, this, name, "arrow")
  }

  $arrow_ = (): TsFunctionDeclaration => {
    return createMethodBuilder(() => this.currentBodyFactory, this, name, "arrow", false, false)
  }

  $if: $If;

  $constructor = (): TsFunctionDeclaration => {
    return createMethodBuilder(() => this.currentBodyFactory, this, "constructor", "method")
  }

  $annotation = (name: string, ...args: TsNode[]): TsChainFunction => {
    const result = new TsConcatFactory()
    const chain = new TsChainFunctionFactory()
    // if annotation with object as input parameter, make it multiline
    if(args.length > 0 && typeof args[0] === "object"){
      args[0] = new TsObjectFactory(args[0] as any).multiline()
    }
    chain.invoke(name, ...args)
    result.concat("@", chain)
    this.currentBodyFactory.push(result)
    return chain
  }

  $from = (from: string): TsImport => {
    const _import = new TsImportFactory(from)
    this.currentBodyFactory.push(_import)
    return _import
  }

  push(body: ITsBodyNodeFactory) {
    this.bodyFactoryStack.push(this.currentBodyFactory)
    this.currentBodyFactory = body
  }

  pop() {
    this.currentBodyFactory = this.bodyFactoryStack.pop()
  }

  createTsCode(config: CreateCodeConfig) {
    return this.rootBlockFactory.createCode(config)
  }


}


function createScopeBuilder(getCurrentBodyFactory: () => ITsBodyNodeFactory, context: InternalFileContext, scope: "public" | "private" | "protected") {
  const scopePrefix = `${scope} `
  return {
    class(name: string) {
      const result = new TsConcatFactory()
      const entity = new TsEntityFactory(name, "class")
      entity.context = context
      result.concat(scopePrefix, entity)
      getCurrentBodyFactory().push(result)
      return entity
    },
    interface(name: string) {
      const result = new TsConcatFactory()
      const entity = new TsEntityFactory(name, "interface")
      entity.context = context
      result.concat(scopePrefix, entity)
      getCurrentBodyFactory().push(result)
      return entity
    },
    enum(name: string) {
      const result = new TsConcatFactory()
      const entity = new TsEntityFactory(name, "enum")
      entity.context = context
      result.concat(scopePrefix, entity)
      getCurrentBodyFactory().push(result)
      return entity
    },
    field(name: string) {
      const result = new TsConcatFactory()
      result.concat(scopePrefix, name)
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    },
    method(name: string) {
      return createMethodBuilder(getCurrentBodyFactory, context, name, "method")
    },
    get static() {
      const result = new TsConcatFactory()
      result.concat(scopePrefix, "static ")
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    },
    get abstract() {
      const result = new TsConcatFactory()
      result.concat(scopePrefix, "abstract ")
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    }
  }
}

function createStaticBuilder(getCurrentBodyFactory: () => ITsBodyNodeFactory, context: InternalFileContext) {
  const scopePrefix = "static "
  return {
    field(name: string) {
      const result = new TsConcatFactory()
      result.concat(scopePrefix, name)
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    },
    method(name: string) {
      return createMethodBuilder(getCurrentBodyFactory, context, name, "method")
    },

  }
}

function createAbstractBuilder(getCurrentBodyFactory: () => ITsBodyNodeFactory, context: InternalFileContext) {
  const scopePrefix = "abstract "
  return {
    class(name: string) {
      const result = new TsConcatFactory()
      const entity = new TsEntityFactory(name, "class")
      entity.context = context
      result.concat(scopePrefix, entity)
      getCurrentBodyFactory().push(result)
      return entity
    },
    field(name: string) {
      const result = new TsConcatFactory()
      result.concat(scopePrefix, name)
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    },
    method(name: string) {
      return createMethodBuilder(getCurrentBodyFactory, context, name, "method", true)
    },

  }
}

function createExportBuilder(getCurrentBodyFactory: () => ITsBodyNodeFactory, context: InternalFileContext): TsExportDeclaration {
  const prefix = "export "
  return {
    class(name: string) {
      const result = new TsConcatFactory()
      const entity = new TsEntityFactory(name, "class")
      entity.context = context
      result.concat(prefix, entity)
      getCurrentBodyFactory().push(result)
      return entity
    },
    field(name: string) {
      const result = new TsConcatFactory()
      result.concat(prefix, name)
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    },
    interface(name: string) {
      const result = new TsConcatFactory()
      const entity = new TsEntityFactory(name, "interface")
      entity.context = context
      result.concat(prefix, entity)
      getCurrentBodyFactory().push(result)
      return entity
    },
    enum(name: string) {
      const result = new TsConcatFactory()
      const entity = new TsEntityFactory(name, "enum")
      entity.context = context
      result.concat(prefix, entity)
      getCurrentBodyFactory().push(result)
      return entity
    },
    get default() {
      const result = new TsConcatFactory()
      result.concat(prefix, "default ")
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    },
    const(name: string) {
      const result = new TsConcatFactory()
      result.concat(prefix, "const ", name)
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    },
    get abstract() {
      const result = new TsConcatFactory()
      result.concat(prefix, "abstract ")
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    },
    function (name: string) {
      return createMethodBuilder(getCurrentBodyFactory, context, name, "method")
    },
    let(name: string) {
      const result = new TsConcatFactory()
      result.concat(prefix, "let ", name)
      result.context = context
      getCurrentBodyFactory().push(result)
      return result
    }
  }
}

function createMethodBuilder(getCurrentBodyFactory: () => ITsBodyNodeFactory, context: InternalFileContext, name: string, type: "method" | "arrow" | "function" | "get" | "set", isIgnoreBody: boolean = false, addToCode = true): TsFunctionDeclaration {
  if(!name){
    name = ""
  }
  const method = new TsFunctionDeclarationFactory(name, type)
  method.isIgnoreBody = isIgnoreBody
  method.context = context
  method.multiline()
  if (addToCode) {
    getCurrentBodyFactory().push(method)
  }

  return method
}