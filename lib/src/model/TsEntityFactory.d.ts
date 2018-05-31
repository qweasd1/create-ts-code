import { CreateCodeConfig, TsNode, TsNodeBody, TsBodyNodeFactory } from "./TsNodeFactory";
import { TsEnum } from "../interface/TsEnum";
import { TsInterface } from "../interface/TsInterface";
import { TsClass } from "../interface/TsClass";
import { InternalFileContext } from "../syntax/syntax";
/**
 * Entity could be class, interface, enum
 */
export declare class TsEntityFactory extends TsBodyNodeFactory<TsEntityFactory> implements TsClass, TsEnum, TsInterface {
    name: string;
    entityType: "interface" | "class" | "enum";
    private _body;
    private _implements;
    private _extends;
    context: InternalFileContext;
    constructor(name: string, entityType: "interface" | "class" | "enum");
    push(...tsNodes: TsNode[]): void;
    remove(tsNode: TsNode): void;
    implements(...implementInterfaces: string[]): this;
    extends(...baseClasses: string[]): TsClass;
    body(tsNode: TsNodeBody): this;
    _createCodeLines(config: CreateCodeConfig): string[];
    protected buildEntityDeclaration(entityType: string): string;
    protected buildImplements(): string;
    protected buildExtends(): string;
}
