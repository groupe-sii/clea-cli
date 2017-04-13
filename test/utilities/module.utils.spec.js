const path = require('path'),
  fs = require('fs-extra'),
  expect = require('chai').expect,

  helper = new (require('../helper'))(),
  ModuleUtils = require('../../lib/utilities/module.utils');

const appDir = `src${path.sep}app`;

describe ('Utilities::ModuleUtils', () => {
  let project;

  beforeEach (() => helper.setup().then((pjt) => {
    project = pjt;
  }));

  it ('should find the app module', () => {
    const appModule = ModuleUtils.findAppModule(project, appDir);

    expect(fs.existsSync(appModule)).to.equal(true);
    expect(appModule).to.contain('app.module.ts');
  });

  it ('should find the app.module.ts has parent module', () => {
    const parentModule = ModuleUtils.findParentModule(project, appDir);

    expect(fs.existsSync(parentModule)).to.equal(true);
    expect(parentModule).to.contain('app.module.ts');
  });

  it ('should find the closest parent module', () => {
    // Create a fake module named `parent.module.ts`
    fs.mkdirSync(path.join(project.root, appDir, 'sub'));
    fs.ensureFileSync(path.join(project.root, appDir, 'sub', 'parent.module.ts'));
    process.chdir(path.join(appDir, 'sub'));

    const parentModule = ModuleUtils.findParentModule(project, path.join(appDir, 'sub'));

    expect(fs.existsSync(parentModule)).to.equal(true);
    expect(parentModule).to.contain('parent.module.ts');
  });

  it ('should find the app routing', () => {
    const appRouting = ModuleUtils.findParentRouting(project, appDir);

    expect(fs.existsSync(appRouting)).to.equal(true);
    expect(appRouting).to.contain('app.routing.ts');
  });

  it ('should find the closest parent routing file', () => {
    // Create a fake routing file named `parent.routing.ts`
    fs.mkdirSync(path.join(project.root, appDir, 'sub'));
    fs.ensureFileSync(path.join(project.root, appDir, 'sub', 'parent.routing.ts'));
    process.chdir(path.join(appDir, 'sub'));

    const parentModule = ModuleUtils.findParentRouting(project, path.join(appDir, 'sub'));

    expect(fs.existsSync(parentModule)).to.equal(true);
    expect(parentModule).to.contain('parent.routing.ts');
  });

  it ('should add the import statement in a module file', () => {
    const appModule = fs.readFileSync(ModuleUtils.findAppModule(project, appDir), 'utf8');

    const withoutBrackets = ModuleUtils.addImportToModule(appModule, 'WithoutBracketsComponent', './without-brackets.component.ts'),
      withBrackets = ModuleUtils.addImportToModule(appModule, 'WithBracketsComponent', './with-brackets.component.ts', true);

    expect(withoutBrackets).to.contain(`import WithoutBracketsComponent from './without-brackets.component.ts';`);
    expect(withBrackets).to.contain(`import { WithBracketsComponent } from './with-brackets.component.ts';`);
  });

  it (`shouldn't be able to add the import statement with a misformatted module file`, () => {
    expect(() => {
      ModuleUtils.addImportToModule('misformattedModuleFile', 'ThrowErrorComponent', './throw-error.component.ts');
    }).to.throw();
  });

  it ('should add the entity declaration in a module file', () => {
    const appModule = fs.readFileSync(ModuleUtils.findAppModule(project, appDir), 'utf8'),
      moduleWithDeclaration = ModuleUtils.addDeclarationToModule(appModule, 'MyNewComponent', 'myNewComponent', 'component');

    expect(moduleWithDeclaration).to.contain(`module.component('myNewComponent', MyNewComponent);`);
  });

  it (`shouldn't be able to add the entity declaration with a misformatted module file`, () => {
    expect(() => {
      ModuleUtils.addDeclarationToModule('misformattedModuleFile', 'ThrowErrorComponent', 'throwErrorComponent', 'component');
    }).to.throw();
  });

  it ('should lazy load the module in a routing file', () => {
    const appRouting = fs.readFileSync(ModuleUtils.findParentRouting(project, appDir), 'utf8'),
      routingWithLazyLoad = ModuleUtils.addDeclarationToRouting(appRouting, 'lazy-load', 'lazyLoad', './lazy-load/lazy-load.module');

    expect(routingWithLazyLoad).to.contain(`lazy-load`);
  });

  it (`shouldn't be able to lazy load the module with a misformatted routing file`, () => {
    expect(() => {
      ModuleUtils.addDeclarationToRouting('misformattedModuleFile', 'lazy-load', 'lazyLoad', './lazy-load/lazy-load.module');
    }).to.throw();
  });

  it ('should retrieve the module name', () => {
    const appModule = ModuleUtils.findAppModule(project, appDir);

    expect(ModuleUtils.getModuleName(appModule)).to.equal('AppModule');
  });

  it (`shouldn't find the module name`, () => {
    const notAModule = path.join(project.root, appDir, 'app.component.html');

    expect(() => {
      ModuleUtils.getModuleName(notAModule);
    }).to.throw();
  });

  it ('should throw an error if multiple module files were found', () => {
    fs.ensureFileSync(path.join(project.root, appDir, 'second.module.ts'));

    expect(() => {
      ModuleUtils._findParent(project, appDir, '.module.ts');
    }).to.throw();
  });

  it ('should throw an error if no module files were found', () => {
    fs.unlinkSync(path.join(project.root, appDir, 'app.module.ts'));

    expect(() => {
      ModuleUtils._findParent(project, appDir, '.module.ts');
    }).to.throw();
  });

  afterEach (() => helper.endup());

});
