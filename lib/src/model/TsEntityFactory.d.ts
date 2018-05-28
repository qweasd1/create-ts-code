import { CreateCodeConfig, TsNodeFactory, TsNode } from "./TsNodeFactory";
/**
 * Entity could be class, interface, enum
 */
export declare class TsEntityFactory extends TsNodeFactory {
    name: string;
    entityType: "interface" | "class" | "enum";
    isExport: boolean;
    private _fieldMap;
    private _literalFields;
    private _implements;
    private _extends;
    private _literalDecorators;
    constructor(name: string, entityType: "interface" | "class" | "enum", isExport?: boolean);
    addLiterals(...fieldLiteral: TsNode[]): this;
    add(name: string, field: TsNode): this;
    addDecoratorLiterals(...callExpr: TsNode[]): this;
    implements(...implementInterfaces: string[]): this;
    exntends(...exntends: string[]): this;
    export(): this;
    emptyLine(): this;
    createCodeLines(config: CreateCodeConfig): string[];
    protected buildEntityDecoratorLine(config: CreateCodeConfig): string[];
    protected buildEntityDeclaration(entityType: string): string;
    protected buildImplements(): string;
    protected buildExtends(): string;
}
