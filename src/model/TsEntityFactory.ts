import {CreateCodeConfig, TsNodeFactory, If, TsNode} from "./TsNodeFactory";
import {EMPTY_LINE, toArray, tsNodesToLines} from './util';


/**
 * Entity could be class, interface, enum
 */
export class TsEntityFactory extends TsNodeFactory{

  private _fieldMap = new Map<string,TsNode>()
  private _literalFields:TsNode[] = []
  private _implements:Set<string> = new Set<string>()
  private _extends:Set<string> = new Set<string>()
  private _literalDecorators:TsNode[] = []
  // private _decoratorMap = new Map<string,TsNode>()



  constructor(
    public name:string,
    public entityType: "interface" | "class" | "enum",
    public isExport:boolean = false){
    super()
  }

  @If
  addLiterals(...fieldLiteral:TsNode[]){
    this._literalFields.push(...fieldLiteral)
    return this
  }

  @If
  add(name:string, field:TsNode){
    if(!this._fieldMap.has(name)){
      this._fieldMap.set(name,field)
    }

    return this
  }

  @If
  addDecoratorLiterals(...callExpr:TsNode[]){
    this._literalDecorators.push(...callExpr)
    return this
  }


  @If
  implements(...implementInterfaces:string[]){
    implementInterfaces.forEach(x=>this._implements.add(x))
    return this
  }

  @If
  exntends(...exntends:string[]){
    exntends.forEach(x=>this._extends.add(x))
    return this
  }

  @If
  export(){
    this.isExport = true
    return this
  }

  @If
  emptyLine(){
    this._literalFields.push(EMPTY_LINE)
    return this
  }

  public createCodeLines(config: CreateCodeConfig): string[] {
    let lines:string[] = []
    lines = lines.concat(this.buildEntityDecoratorLine(config))
    lines.push(`${this.buildEntityDeclaration(this.entityType)}${this.buildExtends()}${this.buildImplements()} {`)
    let body = tsNodesToLines(this._literalFields,config).map(x=>config.indent + x)
      .concat(tsNodesToLines(toArray(this._fieldMap),config).map(x=>config.indent + x))
    if(this.entityType === "enum"){
      for(let i=0;i < body.length - 1;i++){
        body[i] = body[i] + ","
      }
    }
    lines = lines.concat(body)
    lines.push("}")
    return lines
  }



  protected buildEntityDecoratorLine(config:CreateCodeConfig):string[]{
    console.log(this._literalDecorators);
    return tsNodesToLines(this._literalDecorators,config).map(x=>x)
  }

  protected buildEntityDeclaration(entityType:string) {
    return `${this.isExport ? "export " : ""}${entityType} ${this.name}`
  }

  protected buildImplements(){
    if(this._implements.size > 0){
      return ` implements ${Array.from(this._implements).join(", ")}`
    }
    else {
      return ""
    }
  }

  protected buildExtends(){
    if(this._extends.size > 0){
      return ` extends ${Array.from(this._extends).join(", ")}`
    }
    else {
      return ""
    }
  }
}