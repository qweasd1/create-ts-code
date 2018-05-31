import { CreateCodeConfig, TsMultilineNodeFactory, TsNode } from "./TsNodeFactory";
export declare type FunctionType = "function" | "arrow" | "ref" | "set" | "method";
export declare class TsFunctionFactory extends TsMultilineNodeFactory {
    name: string;
    type: FunctionType;
    private _args;
    private _body;
    isIgnoreBody: boolean;
    returnType: string;
    isArgsMultiline: boolean;
    constructor(name?: string, type?: FunctionType);
    setName(name: string): this;
    setType(type: FunctionType): this;
    setArgsMultiline(): this;
    addArgs(...args: TsNode[]): this;
    addBody(...args: TsNode[]): this;
    ignoreBody(): this;
    addReturnType(returnType: string): this;
    createCodeLines(config: CreateCodeConfig): string[];
}
