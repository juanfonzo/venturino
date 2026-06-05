const fs = require("fs");
const Module = require("module");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
let registered = false;

function registerTypeScriptRuntime() {
  if (registered) return;

  let ts;
  try {
    ts = require("typescript");
  } catch (error) {
    throw new Error(
      "No se pudo cargar TypeScript para ejecutar módulos compartidos. Verificar que node_modules incluya typescript.",
    );
  }

  const previousResolveFilename = Module._resolveFilename;
  Module._resolveFilename = function resolveWithProjectAlias(request, parent, isMain, options) {
    if (typeof request === "string" && request.startsWith("@/")) {
      const absoluteRequest = path.join(PROJECT_ROOT, request.slice(2));
      return previousResolveFilename.call(this, absoluteRequest, parent, isMain, options);
    }
    return previousResolveFilename.call(this, request, parent, isMain, options);
  };

  const compileTypeScript = (module, filename) => {
    const source = fs.readFileSync(filename, "utf8");
    const output = ts.transpileModule(source, {
      fileName: filename,
      compilerOptions: {
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.CommonJS,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        resolveJsonModule: true,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText;

    module._compile(output, filename);
  };

  require.extensions[".ts"] = compileTypeScript;
  require.extensions[".tsx"] = compileTypeScript;
  registered = true;
}

function requireTypeScript(modulePath) {
  registerTypeScriptRuntime();
  const absolutePath = path.isAbsolute(modulePath) ? modulePath : path.join(PROJECT_ROOT, modulePath);
  return require(absolutePath);
}

module.exports = {
  registerTypeScriptRuntime,
  requireTypeScript,
};
