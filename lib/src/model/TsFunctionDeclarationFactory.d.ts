import { CreateCodeConfig, TsNode, TsNodeBody, TsBodyNodeFactory } from "./TsNodeFactory";
import { TsFunctionDeclaration } from "../interface/TsFunctionDeclaration";
import { InternalFileContext } from "../syntax/syntax";
export declare type FunctionType = "function" | "arrow" | "set" | "get" | "method";
export declare class TsFunctionDeclarationFactory extends TsBodyNodeFactory<TsFunctionDeclarationFactory> implements TsFunctionDeclaration {
    name_: string;
    type: FunctionType;
    _context: InternalFileContext;
    context: InternalFileContext;
    private _args;
    private _body;
    isIgnoreBody: boolean;
    returnType: string;
    isArgsMultiline: boolean;
    constructor(name_?: string, type?: FunctionType);
    argsMultiline(): this;
    argsSingleline(): this;
    args(...args: string[]): this;
    body(tsNode: TsNodeBody): this;
    push(...tsNodes: TsNode[]): void;
    remove(tsNode: TsNode): void;
    returns(returnType: string): this;
    _createCodeLines(config: CreateCodeConfig): string[];
}
