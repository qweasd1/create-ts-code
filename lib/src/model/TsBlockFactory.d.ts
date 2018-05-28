import { CreateCodeConfig, TsNodeFactory, TsNode } from "./TsNodeFactory";
export declare class TsBlockFactory extends TsNodeFactory {
    prefix: TsNode;
    following: TsNode;
    tsNodes: TsNode[];
    append(...tsNodes: TsNode[]): this;
    createCodeLines(config: CreateCodeConfig): string[];
}
