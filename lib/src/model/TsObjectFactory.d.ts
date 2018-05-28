import { CreateCodeConfig, TsMultilineNodeFactory, TsNode } from "./TsNodeFactory";
export declare class TsObjectFactory extends TsMultilineNodeFactory {
    objectLiteral: {
        [key: string]: TsNode;
    };
    constructor(objectLiteral?: {
        [key: string]: TsNode;
    });
    createCodeLines(config: CreateCodeConfig): string[];
    set(key: string, value: TsNode): this;
    has(key: string): boolean;
}
