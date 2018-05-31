import { TsNode } from "../model/TsNodeFactory";
import { ITsMultilineNode } from "./TsNode";
export interface TsArray extends ITsMultilineNode<TsArray> {
    push(...tsNodes: TsNode[]): TsArray;
}
