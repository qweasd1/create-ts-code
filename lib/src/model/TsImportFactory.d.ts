import { CreateCodeConfig, TsNodeFactory } from "./TsNodeFactory";
import { TsImport } from "../interface/TsImport";
export declare class TsImportFactory extends TsNodeFactory<TsImportFactory> implements TsImport {
    constructor(from: string);
    imports(...items: string[]): TsImport;
    importModule(): TsImport;
    importModuleAs(alias: string): TsImport;
    private items;
    private from;
    private mode;
    private alias;
    _createCodeLines(config: CreateCodeConfig): string[];
}
