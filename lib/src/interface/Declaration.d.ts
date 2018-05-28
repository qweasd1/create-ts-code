import { TsNode } from "../model/TsNodeFactory";
export interface Declaration {
    type(literal: string): Declaration;
    equals(tsNode: TsNode): Declaration;
    if(condition: boolean): Declaration;
    else(): Declaration;
    endif(): Declaration;
}
