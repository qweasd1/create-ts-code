import { CreateCodeConfig, TsNodeFactory, TsNode } from "./TsNodeFactory";
export declare class TsConcatFactory extends TsNodeFactory {
    prefix: TsNode;
    following: TsNode;
    tsNodes: TsNode[];
    concat(...tsNodes: TsNode[]): this;
    createCodeLines(config: CreateCodeConfig): string[];
}
