import { TsNodeBody } from "../model/TsNodeFactory";
export interface TsFunctionDeclaration {
    args(...args: string[]): TsFunctionDeclaration;
    returns(returnType: string): TsFunctionDeclaration;
    body(body: TsNodeBody): TsFunctionDeclaration;
    if(condition: boolean): TsFunctionDeclaration;
    else(): TsFunctionDeclaration;
    endif(): TsFunctionDeclaration;
    singleline(): TsFunctionDeclaration;
    multiline(): TsFunctionDeclaration;
}
export interface TsNamedFunctionDeclaration extends TsFunctionDeclaration {
    name(name: string): TsNamedFunctionDeclaration;
}
