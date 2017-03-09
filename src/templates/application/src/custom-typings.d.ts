// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var CONFIG: string;

interface GlobalEnvironment {
  ENV: string;
  CONFIG: string;
}

// Extend typings
interface Global extends GlobalEnvironment  {}

// Webpack specific require methods
//-----------------------------------------

interface WebpackRequireFunction {
  (id: string): any;
}

interface WebpackRequire extends WebpackRequireFunction {
  resolve(id:string): string;
  context(file: string, flag?: boolean, exp?: RegExp): any;
  ensure(dependencies: Array<string>, func: Function): any;
  cache: any;
  extensions: any;
  main: any;
}
