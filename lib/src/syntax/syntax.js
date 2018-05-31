"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsImportFactory_1 = require("../model/TsImportFactory");
const TsConcatFactory_1 = require("../model/TsConcatFactory");
const TsBlockFactory_1 = require("../model/TsBlockFactory");
const TsEntityFactory_1 = require("../model/TsEntityFactory");
const TsChainFunctionFactory_1 = require("../model/TsChainFunctionFactory");
const TsFunctionDeclarationFactory_1 = require("../model/TsFunctionDeclarationFactory");
const TsArrayFactory_1 = require("../model/TsArrayFactory");
const TsObjectFactory_1 = require("../model/TsObjectFactory");
const util_1 = require("../model/util");
class NewFileContext {
    constructor() {
        this.rootBlockFactory = new TsBlockFactory_1.TsBlockFactory();
        this.bodyFactoryStack = [];
        this.$let = (name) => {
            const let_ = new TsConcatFactory_1.TsConcatFactory();
            let_.context = this;
            let_.concat("let ", name);
            this.currentBodyFactory.push(let_);
            return let_;
        };
        this.$const = (name) => {
            const const_ = new TsConcatFactory_1.TsConcatFactory();
            const_.context = this;
            const_.concat("const ", name);
            this.currentBodyFactory.push(const_);
            return const_;
        };
        this.$array_ = (...items) => {
            const result = new TsArrayFactory_1.TsArrayFactory(items);
            result.context = this;
            return result;
        };
        this.$obj_ = (literal) => {
            const result = new TsObjectFactory_1.TsObjectFactory(literal);
            result.context = this;
            return result;
        };
        this.$tstr_ = util_1.tstr;
        this.$sstr_ = util_1.sstr;
        this.$dstr_ = util_1.dstr;
        this.$str_ = util_1.dstr;
        this.$field = (name) => {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(name);
            result.context = this;
            this.currentBodyFactory.push(result);
            return result;
        };
        this.$line = (text) => {
            if (text === undefined || text === null) {
                this.currentBodyFactory.push("");
            }
            else if (typeof text === "number") {
                for (let i = 0; i < text; i++) {
                    this.currentBodyFactory.push("");
                }
            }
            else {
                this.currentBodyFactory.push(text);
            }
        };
        this.$class = (name) => {
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "class");
            entity.context = this;
            this.currentBodyFactory.push(entity);
            return entity;
        };
        this.$interface = (name) => {
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "interface");
            entity.context = this;
            this.currentBodyFactory.push(entity);
            return entity;
        };
        this.$enum = (name) => {
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "enum");
            entity.context = this;
            this.currentBodyFactory.push(entity);
            return entity;
        };
        this.$invoke = (name, ...args) => {
            const chain = new TsChainFunctionFactory_1.TsChainFunctionFactory();
            chain.invoke(name, ...args);
            this.currentBodyFactory.push(chain);
            return chain;
        };
        this.$invoke_ = (name, ...args) => {
            const chain = new TsChainFunctionFactory_1.TsChainFunctionFactory();
            chain.invoke(name, ...args);
            return chain;
        };
        this.$ref = (name) => {
            const chain = new TsChainFunctionFactory_1.TsChainFunctionFactory();
            chain.ref(name);
            this.currentBodyFactory.push(chain);
            return chain;
        };
        this.$method = (name) => {
            return createMethodBuilder(() => this.currentBodyFactory, this, name, "method");
        };
        this.$function = (name) => {
            return createMethodBuilder(() => this.currentBodyFactory, this, name, "function");
        };
        this.$function_ = (name = "") => {
            return createMethodBuilder(() => this.currentBodyFactory, this, name, "function", false, false);
        };
        this.$get = (name) => {
            return createMethodBuilder(() => this.currentBodyFactory, this, name, "get");
        };
        this.$set = (name) => {
            return createMethodBuilder(() => this.currentBodyFactory, this, name, "set");
        };
        this.$arrow = () => {
            return createMethodBuilder(() => this.currentBodyFactory, this, name, "arrow");
        };
        this.$arrow_ = () => {
            return createMethodBuilder(() => this.currentBodyFactory, this, name, "arrow", false, false);
        };
        this.$constructor = (...args) => {
            return createMethodBuilder(() => this.currentBodyFactory, this, "constructor", "method").args(...args);
        };
        this.$annotation = (name, ...args) => {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const chain = new TsChainFunctionFactory_1.TsChainFunctionFactory();
            // if annotation with object as input parameter, make it multiline
            if (args.length > 0 && typeof args[0] === "object") {
                args[0] = new TsObjectFactory_1.TsObjectFactory(args[0]).multiline();
            }
            chain.invoke(name, ...args);
            result.concat("@", chain);
            this.currentBodyFactory.push(result);
            return chain;
        };
        this.$$annotation = (name) => {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const chain = new TsChainFunctionFactory_1.TsChainFunctionFactory();
            chain.ref(name);
            result.concat("@", chain);
            this.currentBodyFactory.push(result);
            return chain;
        };
        this.$from = (from) => {
            const _import = new TsImportFactory_1.TsImportFactory(from);
            this.currentBodyFactory.push(_import);
            return _import;
        };
        this.currentBodyFactory = this.rootBlockFactory;
    }
    get $public() {
        const getCurrentBodyFactory = () => {
            return this.currentBodyFactory;
        };
        const context = this;
        return createScopeBuilder(getCurrentBodyFactory, context, "public");
    }
    get $protected() {
        const getCurrentBodyFactory = () => {
            return this.currentBodyFactory;
        };
        const context = this;
        return createScopeBuilder(getCurrentBodyFactory, context, "protected");
    }
    get $private() {
        const getCurrentBodyFactory = () => {
            return this.currentBodyFactory;
        };
        const context = this;
        return createScopeBuilder(getCurrentBodyFactory, context, "private");
    }
    get $static() {
        const getCurrentBodyFactory = () => {
            return this.currentBodyFactory;
        };
        const context = this;
        return createStaticBuilder(getCurrentBodyFactory, context);
    }
    get $abstract() {
        const getCurrentBodyFactory = () => {
            return this.currentBodyFactory;
        };
        const context = this;
        return createAbstractBuilder(getCurrentBodyFactory, context);
    }
    get $export() {
        const getCurrentBodyFactory = () => {
            return this.currentBodyFactory;
        };
        const context = this;
        return createExportBuilder(getCurrentBodyFactory, context);
    }
    push(body) {
        this.bodyFactoryStack.push(this.currentBodyFactory);
        this.currentBodyFactory = body;
    }
    pop() {
        this.currentBodyFactory = this.bodyFactoryStack.pop();
    }
    createTsCode(config) {
        return this.rootBlockFactory.createCode(config);
    }
}
exports.NewFileContext = NewFileContext;
function createScopeBuilder(getCurrentBodyFactory, context, scope) {
    const scopePrefix = `${scope} `;
    return {
        class(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "class");
            entity.context = context;
            result.concat(scopePrefix, entity);
            getCurrentBodyFactory().push(result);
            return entity;
        },
        interface(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "interface");
            entity.context = context;
            result.concat(scopePrefix, entity);
            getCurrentBodyFactory().push(result);
            return entity;
        },
        enum(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "enum");
            entity.context = context;
            result.concat(scopePrefix, entity);
            getCurrentBodyFactory().push(result);
            return entity;
        },
        field(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(scopePrefix, name);
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        },
        method(name) {
            return createMethodBuilder(getCurrentBodyFactory, context, name, "method");
        },
        get static() {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(scopePrefix, "static ");
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        },
        get abstract() {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(scopePrefix, "abstract ");
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        }
    };
}
function createStaticBuilder(getCurrentBodyFactory, context) {
    const scopePrefix = "static ";
    return {
        field(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(scopePrefix, name);
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        },
        method(name) {
            return createMethodBuilder(getCurrentBodyFactory, context, name, "method");
        },
    };
}
function createAbstractBuilder(getCurrentBodyFactory, context) {
    const scopePrefix = "abstract ";
    return {
        class(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "class");
            entity.context = context;
            result.concat(scopePrefix, entity);
            getCurrentBodyFactory().push(result);
            return entity;
        },
        field(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(scopePrefix, name);
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        },
        method(name) {
            return createMethodBuilder(getCurrentBodyFactory, context, name, "method", true);
        },
    };
}
function createExportBuilder(getCurrentBodyFactory, context) {
    const prefix = "export ";
    return {
        class(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "class");
            entity.context = context;
            result.concat(prefix, entity);
            getCurrentBodyFactory().push(result);
            return entity;
        },
        field(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(prefix, name);
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        },
        interface(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "interface");
            entity.context = context;
            result.concat(prefix, entity);
            getCurrentBodyFactory().push(result);
            return entity;
        },
        enum(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            const entity = new TsEntityFactory_1.TsEntityFactory(name, "enum");
            entity.context = context;
            result.concat(prefix, entity);
            getCurrentBodyFactory().push(result);
            return entity;
        },
        get default() {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(prefix, "default ");
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        },
        const(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(prefix, "const ", name);
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        },
        get abstract() {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(prefix, "abstract ");
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        },
        function(name) {
            return createMethodBuilder(getCurrentBodyFactory, context, name, "method");
        },
        let(name) {
            const result = new TsConcatFactory_1.TsConcatFactory();
            result.concat(prefix, "let ", name);
            result.context = context;
            getCurrentBodyFactory().push(result);
            return result;
        }
    };
}
function createMethodBuilder(getCurrentBodyFactory, context, name, type, isIgnoreBody = false, addToCode = true) {
    if (!name) {
        name = "";
    }
    const method = new TsFunctionDeclarationFactory_1.TsFunctionDeclarationFactory(name, type);
    method.isIgnoreBody = isIgnoreBody;
    method.context = context;
    method.multiline();
    if (addToCode) {
        getCurrentBodyFactory().push(method);
    }
    return method;
}
//# sourceMappingURL=syntax.js.map