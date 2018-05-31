import { TsNodeBody } from "../model/TsNodeFactory";
import { ITsNode } from './TsNode';
export interface TsClass extends ITsNode<TsClass> {
    implements(...interfaces: string[]): TsClass;
    extends(...baseClasses: string[]): TsClass;
    body(tsNode: TsNodeBody): TsClass;
}
