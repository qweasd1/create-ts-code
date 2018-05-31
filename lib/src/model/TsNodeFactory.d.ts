import { InternalFileContext } from "../syntax/syntax";
import { TsChainFunction } from "../interface/TsChainFunction";
import { TsImport } from "../interface/TsImport";
import { TsIf } from "../interface/TsIf";
import { TsFunction } from "../../lib/src/interface/TsFunction";
import { TsAbstractDeclaration, TsDeclaration, TsExportDeclaration, TsScopeDeclaration } from "../interface/TsDeclaration";
import { TsArray } from "../interface/TsArray";
import { TsObject } from "../interface/TsObject";
import { ITsBodyNodeFactory } from "../interface/TsNode";
export declare abstract class TsNodeFactory<T> {
    protected isConditionTrue: boolean;
    protected isEmit: boolean;
    createCode(config: CreateCodeConfig): string;
    protected abstract _createCodeLines(config: CreateCodeConfig): string[];
    createCodeLines(config: CreateCodeConfig): string[];
    if(condition: boolean): T;
    endif(): T;
    else(): T;
    emitWhen(condition: boolean): T;
    loads(plugin: (self) => void): T;
}
export declare abstract class TsMultilineNodeFactory<T> extends TsNodeFactory<T> {
    isMultiline: boolean;
    multiline(): T;
    singleline(): T;
}
export declare abstract class TsBodyNodeFactory<T> extends TsMultilineNodeFactory<T> implements ITsBodyNodeFactory {
    abstract push(...tsNodes: TsNode[]): any;
    abstract remove(tsNode: TsNode): any;
    context: InternalFileContext;
}
export interface CreateCodeConfig {
    indent: string;
    EOL: string;
}
/**
 * Annotation to let TsNodeFactory can generate content according to condition
 * @param target
 * @param {string} propertyKey
 * @param {PropertyDescriptor} descriptor
 * @constructor
 */
export declare function If(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export declare type TsInterface = TsChainFunction | TsImport | TsIf | TsFunction | TsDeclaration | TsExportDeclaration | TsScopeDeclaration | TsAbstractDeclaration | TsAbstractDeclaration | TsArray | TsObject;
export declare type TsNodeElem = string | TsInterface | TsNodeFactory<any>;
export declare type TsNode = TsNodeElem | TsNodeElem[] | {
    [key: string]: TsNodeElem;
};
export declare type TsNodeBody = TsNode | Function;
