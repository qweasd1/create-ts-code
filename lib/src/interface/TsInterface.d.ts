import { TsNodeBody } from "../model/TsNodeFactory";
import { ITsNode } from "./TsNode";
export interface TsInterface extends ITsNode<TsInterface> {
    implements(...interfaces: string[]): TsInterface;
    body(tsNode: TsNodeBody): TsInterface;
}
