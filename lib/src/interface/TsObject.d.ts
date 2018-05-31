import { TsNode } from "../model/TsNodeFactory";
import { ITsMultilineNode } from "./TsNode";
export interface TsObject extends ITsMultilineNode<TsObject> {
    set(key: string, tsNode: TsNode): TsObject;
}
