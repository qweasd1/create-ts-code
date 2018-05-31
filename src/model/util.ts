import {TsObjectFactory} from "./TsObjectFactory";
import {CreateCodeConfig, TsNode, TsNodeFactory} from "./TsNodeFactory";
import {TsArrayFactory} from "./TsArrayFactory";

export function toArray<K, V>(map: Map<K, V>) {
  const iterator = map.values()
  const result = []
  while (true) {
    let {value, done} = iterator.next()
    if (done) {
      break
    }
    else {
      result.push(value)
    }
  }
  return result
}

export const EMPTY_LINE = ""

export function tsNodesToLines(tsNodes: TsNode[], config: CreateCodeConfig): string[] {
  const result = []
  tsNodes.forEach((tsNode) => {
    result.push(...tsNodeToLines(tsNode, config))
  })

  return result
}

export function tsNodeToLines(tsNode: TsNode, config: CreateCodeConfig): string[] {
  const result = []
  if (typeof tsNode === "number" || typeof tsNode === "boolean" || tsNode === undefined || tsNode === null) {
    result.push(String(tsNode))
  }
  else if (typeof tsNode === "string") {
    result.push(tsNode)
  }
  else if (Array.isArray(tsNode)) {
    new TsArrayFactory(tsNode).createCodeLines(config).forEach((line) => {
      result.push(line)
    })
  }
  else if (tsNode instanceof TsNodeFactory) {
    tsNode.createCodeLines(config).forEach((line) => {
      result.push(line)
    })
  }
  else if (typeof tsNode === "object") {
    new TsObjectFactory(tsNode as any).createCodeLines(config).forEach((line) => {
      result.push(line)
    })
  }
  return result;
}

const SINGLE_STRING_PATTERN = /['\\\n\r\u2028\u2029]/g
const DOUBLE_STRING_PATTERN = /["\\\n\r\u2028\u2029]/g
const TEMPLATE_STRING_PATTERN = /[`\\\n\r\u2028\u2029]/g

export function sstr(text: string) {
  return "'" + ('' + text).replace(SINGLE_STRING_PATTERN, function (character) {
    switch (character) {
      case "'":
      case '\\':
        return '\\' + character
      // Four possible LineTerminator characters need to be escaped:
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\u2028':
        return '\\u2028'
      case '\u2029':
        return '\\u2029'
    }
  }) + "'"
}

export function dstr(text: string) {
  return '"' + ('' + text).replace(DOUBLE_STRING_PATTERN, function (character) {
    switch (character) {
      case '"':
      case '\\':
        return '\\' + character
      // Four possible LineTerminator characters need to be escaped:
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\u2028':
        return '\\u2028'
      case '\u2029':
        return '\\u2029'
    }
  }) + '"'
}

export function tstr(text: string) {
  return "`" + ('' + text).replace(TEMPLATE_STRING_PATTERN, function (character) {
    switch (character) {
      case '`':
      case '\\':
        return '\\' + character
      // Four possible LineTerminator characters need to be escaped:
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\u2028':
        return '\\u2028'
      case '\u2029':
        return '\\u2029'
    }
  }) + "`"
}


