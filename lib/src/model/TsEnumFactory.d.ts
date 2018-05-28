import { TsInterfaceFactory } from "./TsInterfaceFactory";
import { CreateCodeConfig } from "./TsNodeFactory";
export declare class TsEnumFactory extends TsInterfaceFactory {
    protected createCodeLines(config: CreateCodeConfig): string[];
}
