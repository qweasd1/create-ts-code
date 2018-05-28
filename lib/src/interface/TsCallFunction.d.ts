export interface TsCallFunction {
    call(functionName: string): TsCallFunction;
    with(...args: string[]): TsCallFunction;
    if(condition: boolean): TsCallFunction;
    else(): TsCallFunction;
    endif(): TsCallFunction;
    singleline(): TsCallFunction;
    multiline(): TsCallFunction;
}
