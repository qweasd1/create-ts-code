import {CreateCodeConfig, TsNodeFactory, If} from "./TsNodeFactory";
import {TsImport} from "../interface/TsImport";





export class TsImportFactory extends TsNodeFactory<TsImportFactory> implements TsImport{

  constructor(from:string){
    super()
    this.from = from
  }

  @If
  imports(...items: string[]): TsImport {
    this.items.push(...items)
    return this;
  }

  @If
  importModule(): TsImport {
    this.mode = "module"
    return this
  }

  @If
  importModuleAs(alias: string): TsImport {
    this.mode = "alias"
    this.alias = alias
    return this
  }

  // if(condition: boolean):TsImport {
  //   this.isConditionTrue = condition
  //   return this
  // }
  //
  // endif() {
  //   this.isConditionTrue = true
  //   return this
  // }
  //
  // else() : TsImport {
  //   this.isConditionTrue = !this.isConditionTrue
  //   return this
  // }
  //
  // emitWhen(condition: boolean) {
  //   this.isEmit = condition
  //   return this
  // }
  //
  // loads(plugin: (self) => void){
  //   plugin(this)
  //   return this
  // }


  private items:string[] = []
  private from:string
  private mode: "items" | "alias" | "module" = "items"
  private alias = null


  _createCodeLines(config: CreateCodeConfig): string[] {
    switch (this.mode){
      case "items":
        if(this.items.length > 0){
          return [`import { ${this.items.join(", ")} } from '${this.from}'`]
        }
        else {
          return []
        }

      case "alias":
        return [`import * as ${this.alias} from '${this.from}'`]
      case "module":
        return [`import * as ${this.from} from '${this.from}'`]
    }

  }

}