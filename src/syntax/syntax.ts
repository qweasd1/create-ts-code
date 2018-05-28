import {TsDeclaration, TsExportDeclaration, TsScopeDeclaration} from "../interface/TsDeclaration";
import {TsNode} from "../model/TsNodeFactory";
import {TsIf} from "../interface/TsIf";
import {TsClass} from "../interface/TsClass";
import {TsInterface} from "../interface/TsInterface";
import {TsFunctionDeclaration} from "../interface/TsFunctionDeclaration";
import {TsImport} from "../interface/TsImport";
import {TsChainFunction} from "../interface/TsChainFunction";

// import
export type $Import = (from: string) => TsImport

// field declaration
export type $Let = (name: string) => TsDeclaration
export type $Field = (name: string) => TsDeclaration
export type $Const = (name: string) => TsDeclaration

// line
export type $Line = (tsNode?: TsNode) => void

// control flow
export type $If = (tsNode: TsNode) => TsIf


// class interface

export type $Class = (name: string) => TsClass
export type $Interface = (name: string) => TsInterface


// functions

export type $Function = (name: string) => TsFunctionDeclaration
export type $Method = (name: string) => TsFunctionDeclaration
export type $Get = (name: string) => TsFunctionDeclaration
export type $Set = (name: string) => TsFunctionDeclaration
export type $ArrowFn = () => TsFunctionDeclaration

// expression
export type $Call = (name: string) => TsChainFunction

export interface Privacy {

}

// new file
export interface NewFileContext {
  $import(from: string): TsImport

  $let: $Let
  $const: $Const
  $public: TsScopeDeclaration
  $protect: TsScopeDeclaration
  $private: TsScopeDeclaration
  $export: TsExportDeclaration

  $field: $Field
  $line: $Line

  $if: $If

  $class: $Class
  $interface: $Interface

  $call: $Call
  $method: $Method

  $constructor(): TsFunctionDeclaration

  $annotation(name: string, ...args: TsNode[])
}

export type NewFileGenerator = (context: NewFileContext) => void