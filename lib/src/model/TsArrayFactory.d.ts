import { CreateCodeConfig, TsMultilineNodeFactory, TsNode } from "./TsNodeFactory";
import { TsArray } from "../interface/TsArray";
import { InternalFileContext } from "../syntax/syntax";
export declare class TsArrayFactory extends TsMultilineNodeFactory<TsArrayFactory> implements TsArray {
    arrayLiteral: TsNode[];
    context: InternalFileContext;
    leftBracket: string;
    rightBracket: string;
    constructor(arrayLiteral?: TsNode[], mode?: "array" | "arguments");
    _createCodeLines(config: CreateCodeConfig): string[];
    push(...tsNodes: TsNode[]): TsArray;
}
