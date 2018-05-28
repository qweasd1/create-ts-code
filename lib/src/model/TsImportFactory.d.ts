import { CreateCodeConfig, TsNodeFactory } from "./TsNodeFactory";
export declare class TsImportFacotry extends TsNodeFactory {
    private _importMap;
    private _literalImports;
    addLiteral(importLiteral: string): this;
    add(from: string, items: string[] | string): this;
    createCodeLines(config: CreateCodeConfig): string[];
}
