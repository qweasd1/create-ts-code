import { TsNode } from "../model/TsNodeFactory";
import { ITsMultilineNode } from "./TsNode";
export interface TsChainFunction extends ITsMultilineNode<TsChainFunction> {
    invoke(path: string, ...args: TsNode[]): TsChainFunction;
    ref(name: string): TsChainFunction;
}
