import { TsNode, TsNodeBody } from "../model/TsNodeFactory";
import { ITsMultilineNode } from "./TsNode";
export interface TsIf extends ITsMultilineNode<TsIf> {
    $then(body: TsNodeBody): TsIf;
    $else(body: TsNodeBody): TsIf;
    $else_if(condition: TsNode): TsIf;
}
