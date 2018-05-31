import { TsNode } from "../model/TsNodeFactory";
import { TsClass } from "./TsClass";
import { TsInterface } from "./TsInterface";
import { TsEnum } from "./TsEnum";
import { TsFunctionDeclaration } from "./TsFunctionDeclaration";
import { TsChainFunction } from "./TsChainFunction";
export interface TsDeclaration {
    type(literal: string): TsDeclaration;
    equals: ((tsNode: TsNode) => TsDeclaration) | {
        invoke: (name: string) => TsChainFunction;
    } | any;
    if(condition: boolean): TsDeclaration;
    else(): TsDeclaration;
    endif(): TsDeclaration;
    emitWhen(condition: boolean): TsDeclaration;
    loads(plugin: (self: TsDeclaration) => void): TsDeclaration;
}
export interface TsStaticDeclaration {
    field(name: TsNode): TsDeclaration;
    method(name: string): TsFunctionDeclaration;
}
export interface TsAbstractDeclaration {
    class(name: string): TsClass;
    field(name: TsNode): TsDeclaration;
    method(name: string): TsFunctionDeclaration;
}
export interface TsScopeDeclaration extends TsAbstractDeclaration {
    readonly abstract: TsAbstractDeclaration;
    interface(name: string): TsInterface;
    enum(name: string): TsEnum;
}
export interface TsExportDefaultDeclaration {
    class(name: string): TsClass;
    interface(name: string): TsInterface;
    field(name: TsNode): TsDeclaration;
}
export interface TsExportDeclaration {
    class(name: string): TsClass;
    field(name: TsNode): TsDeclaration;
    readonly abstract: TsAbstractDeclaration;
    interface(name: string): TsInterface;
    enum(name: string): TsEnum;
    readonly default: TsExportDefaultDeclaration;
    const(name: string): TsDeclaration;
    let(name: string): TsDeclaration;
    function(name: string): TsFunctionDeclaration;
}
