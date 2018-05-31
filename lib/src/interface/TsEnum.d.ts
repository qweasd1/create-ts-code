import { TsNodeBody } from "../model/TsNodeFactory";
import { ITsNode } from "./TsNode";
export interface TsEnum extends ITsNode<TsEnum> {
    body(tsNode: TsNodeBody): TsEnum;
}
