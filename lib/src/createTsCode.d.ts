import { CreateCodeConfig, TsNode } from "./model/TsNodeFactory";
import { NewFileGenerator } from "./syntax/syntax";
export declare function generate(statements: TsNode[], config?: CreateCodeConfig): string;
export declare function file(code: NewFileGenerator): void;
export default name;
