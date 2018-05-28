import { TsNode } from "../model/TsNodeFactory";
export interface TsChainFunction {
    call(functionName: string): TsChainFunction;
    with(...args: string[]): TsChainFunction;
    chain(tsNode: TsNode): TsChainFunction;
    if(condition: boolean): TsChainFunction;
    else(): TsChainFunction;
    endif(): TsChainFunction;
    singleline(): TsChainFunction;
    multiline(): TsChainFunction;
}
