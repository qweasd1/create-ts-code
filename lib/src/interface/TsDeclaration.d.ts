import { TsNode } from "../model/TsNodeFactory";
import { TsClass } from "./TsClass";
import { TsInterface } from "./TsInterface";
import { TsEnum } from "./TsEnum";
export interface TsDeclaration {
    type(literal: string): TsDeclaration;
    equals(tsNode: TsNode): TsDeclaration;
    if(condition: boolean): TsDeclaration;
    else(): TsDeclaration;
    endif(): TsDeclaration;
}
export interface TsScopeDeclaration extends TsDeclaration {
    readonly static: TsScopeDeclaration;
    class(name: string): TsClass;
    interface(name: string): TsInterface;
    enum(name: string): TsEnum;
    field(name: TsNode): TsDeclaration;
}
export interface TsExportDefaultDeclaration {
    class(name: string): TsClass;
    interface(name: string): TsInterface;
    field(name: TsNode): TsDeclaration;
}
export interface TsExportDeclaration extends TsScopeDeclaration {
    readonly default: TsExportDefaultDeclaration;
    const(name: string): TsDeclaration;
    let(name: string): TsDeclaration;
}
