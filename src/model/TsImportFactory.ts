import {CreateCodeConfig, TsNodeFactory, If} from "./TsNodeFactory";





export class TsImportFacotry extends TsNodeFactory{


  private _importMap = new Map<string,Set<string>>()
  private _literalImports:string[] = []

  @If
  public addLiteral(importLiteral:string){
    this._literalImports.push(importLiteral)
    return this
  }

  @If
  public add(from:string, items:string[] | string){
    if(typeof items === "string"){
      items = [items]
    }

    if(!this._importMap.has(from)){
      this._importMap.set(from,new Set<string>())
    }
    items.forEach(x=>this._importMap.get(from).add(x))
    return this
  }



  public createCodeLines(config: CreateCodeConfig): string[] {
    const result:string[] = []
    this._importMap.forEach((items,from)=>{
      result.push(`import { ${Array.from(items).join(", ")} } from '${from}'`)
    })

    this._literalImports.forEach((line)=>result.push(line))
    return result.map(x=>x + ";")
  }

}