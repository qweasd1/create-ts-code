export declare abstract class TsNodeFactory {
    isConditionTrue: boolean;
    createCode(config: CreateCodeConfig): string;
    abstract createCodeLines(config: CreateCodeConfig): string[];
    if(condition: boolean): this;
    endIf(): this;
    else(): this;
}
export declare abstract class TsMultilineNodeFactory extends TsNodeFactory {
    isMultiline: boolean;
    multiline(): this;
    singleline(): this;
}
export interface CreateCodeConfig {
    indent: string;
    EOL: string;
}
/**
 * Annotation to let TsNodeFactory can generate content according to condition
 * @param target
 * @param {string} propertyKey
 * @param {PropertyDescriptor} descriptor
 * @constructor
 */
export declare function If(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export declare type TsNodeElem = string | TsNodeFactory;
export declare type TsNode = TsNodeElem | TsNodeElem[] | {
    [key: string]: TsNodeElem;
};
export declare type TsNodeBody = TsNode | Function;
