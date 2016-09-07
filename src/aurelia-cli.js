export class AureliaCLI {
  async create(model) {
    let ProjectTemplate = System._nodeRequire('aurelia-cli/lib/commands/new/project-template').ProjectTemplate;

    let options = {
      hasFlag: function() {
        return false;
      }
    };

    let project = new ProjectTemplate(model, options);

    let configurePlatform = System._nodeRequire(`aurelia-cli/lib/commands/new/platforms/${model.platform.id}`);
    configurePlatform(project, options);

    let configureTranspiler = System._nodeRequire(`aurelia-cli/lib/commands/new/transpilers/${model.transpiler.id}`);
    configureTranspiler(project, options);

    let configureMarkupProcessor = System._nodeRequire(`aurelia-cli/lib/commands/new/markup-processors/${model.markupProcessor.id}`);
    configureMarkupProcessor(project, options);

    let configureCSSProcessor = System._nodeRequire(`aurelia-cli/lib/commands/new/css-processors/${model.cssProcessor.id}`);
    configureCSSProcessor(project, options);

    let configureUnitTestRunner = System._nodeRequire(`aurelia-cli/lib/commands/new/unit-test-runners/${model.unitTestRunner.id}`);
    configureUnitTestRunner(project, options);

    let configureEditor = System._nodeRequire(`aurelia-cli/lib/commands/new/editors/${model.editor.id}`);
    configureEditor(project, options);

    let pathToAddProject = model.path;
    await project.create({}, pathToAddProject);

    return project;
  }

  async install(model) {
    const path = System._nodeRequire('path');
    const NPM  = System._nodeRequire('aurelia-cli/lib/npm').NPM;
    let npm = new NPM();
    let npmOptions = {
      loglevel: 'error',
      color: 'always',
      save: true,
      'save-dev': true,
      workingDirectory: path.join(model.path, model.name)
    };

    try {
      return await npm.install([], npmOptions);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
