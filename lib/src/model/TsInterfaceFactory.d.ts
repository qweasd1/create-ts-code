import { CreateCodeConfig, TsNodeFactory, TsNode } from "./TsNodeFactory";
export declare class TsInterfaceFactory extends TsNodeFactory {
    name: string;
    isExport: boolean;
    private _fieldMap;
    private _literalFields;
    private _implements;
    constructor(name: string, isExport?: boolean);
    addLiteral(fieldLiteral: TsNode): this;
    add(fieldName: string, field: TsNode): this;
    implements(...implementInterfaces: string[]): this;
    export(): this;
    protected createCodeLines(config: CreateCodeConfig): string[];
    protected buildEntityDeclaration(entityType: string): string;
    protected buildImplements(): string;
}
