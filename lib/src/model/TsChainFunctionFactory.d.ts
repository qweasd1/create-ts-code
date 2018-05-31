import { CreateCodeConfig, TsNode, TsMultilineNodeFactory } from "./TsNodeFactory";
import { TsChainFunction } from "../interface/TsChainFunction";
export declare type CallSegement = string | [string, TsNode[]];
export declare class TsChainFunctionFactory extends TsMultilineNodeFactory<TsChainFunctionFactory> implements TsChainFunction {
    segements: CallSegement[];
    invoke(path: string, ...args: TsNode[]): this;
    ref(path: string): this;
    _createCodeLines(config: CreateCodeConfig): string[];
}
