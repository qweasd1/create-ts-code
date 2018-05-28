import { TsNode, TsNodeBody } from "../model/TsNodeFactory";
export interface TsIf {
    $then(body: TsNodeBody): TsIf;
    $else(body: TsNodeBody): TsIf;
    $else(body: TsNodeBody): TsIf;
    $else_if(condition: TsNode): TsIf;
    if(condition: boolean): TsIf;
    else(): TsIf;
    endif(): TsIf;
    singleline(): TsIf;
    multiline(): TsIf;
}
