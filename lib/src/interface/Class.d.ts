import { TsNodeBody } from "../model/TsNodeFactory";
export interface Class {
    implements(...interfaces: string[]): Class;
    extends(...baseClasses: string[]): Class;
    body(tsNode: TsNodeBody): Class;
    if(condition: boolean): Class;
    else(): Class;
    endif(): Class;
}
