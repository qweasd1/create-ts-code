import { TsDeclaration, TsExportDeclaration, TsScopeDeclaration } from "../interface/TsDeclaration";
import { TsNode } from "../model/TsNodeFactory";
import { TsIf } from "../interface/TsIf";
import { TsClass } from "../interface/TsClass";
import { TsInterface } from "../interface/TsInterface";
import { TsFunctionDeclaration } from "../interface/TsFunctionDeclaration";
import { TsImport } from "../interface/TsImport";
import { TsChainFunction } from "../interface/TsChainFunction";
export declare type $Import = (from: string) => TsImport;
export declare type $Let = (name: string) => TsDeclaration;
export declare type $Field = (name: string) => TsDeclaration;
export declare type $Const = (name: string) => TsDeclaration;
export declare type $Line = (tsNode?: TsNode) => void;
export declare type $If = (tsNode: TsNode) => TsIf;
export declare type $Class = (name: string) => TsClass;
export declare type $Interface = (name: string) => TsInterface;
export declare type $Function = (name: string) => TsFunctionDeclaration;
export declare type $Method = (name: string) => TsFunctionDeclaration;
export declare type $Get = (name: string) => TsFunctionDeclaration;
export declare type $Set = (name: string) => TsFunctionDeclaration;
export declare type $ArrowFn = () => TsFunctionDeclaration;
export declare type $Call = (name: string) => TsChainFunction;
export interface Privacy {
}
export interface NewFileContext {
    $import(from: string): TsImport;
    $let: $Let;
    $const: $Const;
    $public: TsScopeDeclaration;
    $protect: TsScopeDeclaration;
    $private: TsScopeDeclaration;
    $export: TsExportDeclaration;
    $field: $Field;
    $line: $Line;
    $if: $If;
    $class: $Class;
    $interface: $Interface;
    $call: $Call;
    $method: $Method;
    $constructor(): TsFunctionDeclaration;
    $annotation(name: string, ...args: TsNode[]): any;
}
export declare type NewFileGenerator = (context: NewFileContext) => void;
