import { CreateCodeConfig, TsMultilineNodeFactory, TsNode } from "./TsNodeFactory";
export declare class TsArrayFactory extends TsMultilineNodeFactory {
    arrayLiteral: TsNode[];
    leftBracket: string;
    rightBracket: string;
    constructor(arrayLiteral?: TsNode[], mode?: "array" | "arguments");
    createCodeLines(config: CreateCodeConfig): string[];
    add(...tsNodes: TsNode[]): this;
}
