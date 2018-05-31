import { TsAbstractDeclaration, TsDeclaration, TsExportDeclaration, TsScopeDeclaration, TsStaticDeclaration } from "../interface/TsDeclaration";
import { CreateCodeConfig, TsNode } from "../model/TsNodeFactory";
import { TsIf } from "../interface/TsIf";
import { TsClass } from "../interface/TsClass";
import { TsInterface } from "../interface/TsInterface";
import { TsFunctionDeclaration } from "../interface/TsFunctionDeclaration";
import { TsImport } from "../interface/TsImport";
import { TsChainFunction } from "../interface/TsChainFunction";
import { TsConcatFactory } from "../model/TsConcatFactory";
import { TsEntityFactory } from "../model/TsEntityFactory";
import { TsEnum } from "../interface/TsEnum";
import { TsChainFunctionFactory } from "../model/TsChainFunctionFactory";
import { TsArray } from "../interface/TsArray";
import { TsArrayFactory } from "../model/TsArrayFactory";
import { TsObject } from "../interface/TsObject";
import { TsObjectFactory } from "../model/TsObjectFactory";
import { ITsBodyNodeFactory } from "../interface/TsNode";
import { dstr, sstr, tstr } from "../model/util";
export declare type $Import = (from: string) => TsImport;
export declare type $Field = (name: string) => TsDeclaration;
export declare type $Const = (name: string) => TsDeclaration;
export declare type $Line = (text?: string | number) => void;
export declare type $If = (tsNode: TsNode) => TsIf;
export declare type $Class = (name: string) => TsClass;
export declare type $Interface = (name: string) => TsInterface;
export declare type $Enum = (name: string) => TsEnum;
export declare type $Function = (name?: string) => TsFunctionDeclaration;
export declare type $Method = (name: string) => TsFunctionDeclaration;
export declare type $Get = (name: string) => TsFunctionDeclaration;
export declare type $Set = (name: string) => TsFunctionDeclaration;
export declare type $ArrowFn = () => TsFunctionDeclaration;
export interface INewFileContext {
    $from(from: string): TsImport;
    $let(name: string): TsDeclaration;
    $const(name: string): TsDeclaration;
    $public: TsScopeDeclaration;
    $protected: TsScopeDeclaration;
    $private: TsScopeDeclaration;
    $export: TsExportDeclaration;
    $abstract: TsAbstractDeclaration;
    $static: TsStaticDeclaration;
    $field: $Field;
    $line: $Line;
    $if: $If;
    $class: $Class;
    $interface: $Interface;
    $enum: $Enum;
    $invoke: (name: string, ...args: TsNode[]) => TsChainFunction;
    $invoke_: (name: string, ...args: TsNode[]) => TsChainFunction;
    $ref: (name: string) => TsChainFunction;
    $method: $Method;
    $function: $Function;
    $function_: $Function;
    $get: $Method;
    $set: $Method;
    $arrow: $ArrowFn;
    $arrow_: $ArrowFn;
    $array_(...items: TsNode[]): TsArray;
    $obj_(literal: {
        [key: string]: TsNode;
    }): TsObject;
    $str_(text: string): string;
    $dstr_(text: string): string;
    $sstr_(text: string): string;
    $tstr_(text: string): string;
    $constructor(...args: string[]): TsFunctionDeclaration;
    $annotation(name: string, ...args: TsNode[]): TsChainFunction;
    $$annotation(name: string): TsChainFunction;
}
export interface InternalFileContext {
    push(body: ITsBodyNodeFactory): any;
    currentBodyFactory: ITsBodyNodeFactory;
    pop(): any;
}
export declare type NewFileGenerator = (spreedContext: INewFileContext, context: INewFileContext) => void;
export declare class NewFileContext implements INewFileContext, InternalFileContext {
    private rootBlockFactory;
    currentBodyFactory: ITsBodyNodeFactory;
    bodyFactoryStack: ITsBodyNodeFactory[];
    constructor();
    $let: (name: string) => TsConcatFactory;
    $const: (name: string) => TsConcatFactory;
    readonly $public: TsScopeDeclaration;
    readonly $protected: TsScopeDeclaration;
    readonly $private: TsScopeDeclaration;
    readonly $static: TsStaticDeclaration;
    readonly $abstract: TsAbstractDeclaration;
    readonly $export: TsExportDeclaration;
    $array_: (...items: TsNode[]) => TsArrayFactory;
    $obj_: (literal: {
        [key: string]: TsNode;
    }) => TsObjectFactory;
    $tstr_: typeof tstr;
    $sstr_: typeof sstr;
    $dstr_: typeof dstr;
    $str_: typeof dstr;
    $field: (name: string) => TsConcatFactory;
    $line: (text?: string | number) => void;
    $class: (name: string) => TsEntityFactory;
    $interface: (name: string) => TsEntityFactory;
    $enum: (name: string) => TsEntityFactory;
    $invoke: (name: string, ...args: TsNode[]) => TsChainFunctionFactory;
    $invoke_: (name: string, ...args: TsNode[]) => TsChainFunctionFactory;
    $ref: (name: string) => TsChainFunctionFactory;
    $method: (name: string) => TsFunctionDeclaration;
    $function: (name: string) => TsFunctionDeclaration;
    $function_: (name?: string) => TsFunctionDeclaration;
    $get: (name: string) => TsFunctionDeclaration;
    $set: (name: string) => TsFunctionDeclaration;
    $arrow: () => TsFunctionDeclaration;
    $arrow_: () => TsFunctionDeclaration;
    $if: $If;
    $constructor: (...args: string[]) => TsFunctionDeclaration;
    $annotation: (name: string, ...args: TsNode[]) => TsChainFunction;
    $$annotation: (name: string) => TsChainFunction;
    $from: (from: string) => TsImport;
    push(body: ITsBodyNodeFactory): void;
    pop(): void;
    createTsCode(config: CreateCodeConfig): string;
}
