import {CreateCodeConfig, TsNode} from "./model/TsNodeFactory";
import {EOL} from "os";
import {tsNodesToLines} from "./model/util";
import {INewFileContext, NewFileContext, NewFileGenerator} from "./syntax/syntax";

export function file(code: NewFileGenerator,config:CreateCodeConfig = {
  EOL,
  indent:"  "
}) {
  const context = new NewFileContext()
  code(context,context)
  return context.createTsCode(config)
}

