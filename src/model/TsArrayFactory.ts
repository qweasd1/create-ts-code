import {CreateCodeConfig, TsMultilineNodeFactory, If, TsNode} from "./TsNodeFactory";
import {tsNodeToLines} from "./util";

export class TsArrayFactory extends TsMultilineNodeFactory {


  leftBracket = "["
  rightBracket = "]"

  constructor(public arrayLiteral: TsNode[] = [], mode: "array" | "arguments" = "array") {
    super()
    // this mode is used to generate function calling or function declaration
    if (mode === "arguments") {
      this.leftBracket = "("
      this.rightBracket = ")"
    }
  }

  public createCodeLines(config: CreateCodeConfig): string[] {
    if (this.isMultiline) {
      const result = [this.leftBracket]
      this.arrayLiteral.forEach((x, index) => {
        tsNodeToLines(x, config).forEach((line) => {
          result.push(line)
        })
        if (index < this.arrayLiteral.length - 1) {
          result[result.length - 1] += ", "
        }
      })
      for (let i = 1; i < result.length; i++) {
        result[i] = config.indent + result[i]
      }

      result.push(this.rightBracket)
      return result
    }
    else {
      const result = []
      let line = ""
      this.arrayLiteral.forEach(x => {
        const lines = tsNodeToLines(x, config)
        line += (line ? ", " : "") + lines[0]

        for (let i = 1; i < lines.length; i++) {
          result.push(line)
          line = lines[i]
        }
      })
      result.push(line)
      result[0] = this.leftBracket + result[0]
      result[result.length - 1] = result[result.length - 1] + this.rightBracket

      // for(let i=1;i < result.length-1;i++){
      //   result[i] = config.indent + result[i]
      // }

      return result
    }
  }


  @If
  add(...tsNodes: TsNode[]) {
    this.arrayLiteral.push(...tsNodes)
    return this
  }

}