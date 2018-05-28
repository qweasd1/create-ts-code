export interface TsFunction {
    args(...args: string[]): TsFunction;
    if(condition: boolean): TsFunction;
    else(): TsFunction;
    endif(): TsFunction;
}
