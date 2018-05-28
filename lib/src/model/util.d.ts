import { CreateCodeConfig, TsNode } from "./TsNodeFactory";
export declare function toArray<K, V>(map: Map<K, V>): any[];
export declare const EMPTY_LINE = "";
export declare function tsNodesToLines(tsNodes: TsNode[], config: CreateCodeConfig): string[];
export declare function tsNodeToLines(tsNode: TsNode, config: CreateCodeConfig): string[];
