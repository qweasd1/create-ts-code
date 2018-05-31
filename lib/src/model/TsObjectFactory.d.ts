import { CreateCodeConfig, TsMultilineNodeFactory, TsNode } from "./TsNodeFactory";
import { TsObject } from "../interface/TsObject";
import { InternalFileContext } from "../syntax/syntax";
export declare class TsObjectFactory extends TsMultilineNodeFactory<TsObjectFactory> implements TsObject {
    context: InternalFileContext;
    objectLiteral: {
        [key: string]: TsNode;
    };
    constructor(objectLiteral?: {
        [key: string]: TsNode;
    });
    _createCodeLines(config: CreateCodeConfig): string[];
    set(key: string, value: TsNode): this;
    has(key: string): boolean;
}
