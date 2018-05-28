import { CreateCodeConfig, TsNodeFactory, TsNode } from "./TsNodeFactory";
export declare class TsConcatFactory extends TsNodeFactory {
    prefix: TsNode;
    following: TsNode;
    setPrefix(prefix: string): void;
    setFollwing(following: TsNode): void;
    createCodeLines(config: CreateCodeConfig): string[];
}
