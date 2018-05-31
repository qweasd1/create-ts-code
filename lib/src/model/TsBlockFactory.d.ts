import { CreateCodeConfig, TsNode, TsBodyNodeFactory } from "./TsNodeFactory";
export declare class TsBlockFactory extends TsBodyNodeFactory<TsBlockFactory> {
    tsNodes: TsNode[];
    append(...tsNodes: TsNode[]): this;
    push(...tsNodes: TsNode[]): void;
    remove(tsNode: TsNode): void;
    _createCodeLines(config: CreateCodeConfig): string[];
}
