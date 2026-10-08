import { registerHooks } from 'node:module';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// Compile the existing TypeScript for Node tests without a second test toolchain.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && /\.tsx?$/.test(context.parentURL ?? '') && !/\.[a-z]+$/i.test(specifier)) {
      for (const suffix of ['.ts', '.tsx', '/index.ts']) {
        try { return nextResolve(specifier + suffix, context); } catch { /* Try the directory index. */ }
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (!/\.tsx?$/.test(url)) return nextLoad(url, context);
    const source = ts.transpileModule(readFileSync(new URL(url), 'utf8'), {
      fileName: new URL(url).pathname,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    return { format: 'module', source, shortCircuit: true };
  },
});
