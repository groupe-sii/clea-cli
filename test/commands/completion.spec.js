const expect = require('chai').expect,

  Completion = require('../../lib/commands/completion');

describe ('Command::Generate', () => {

  it ('should generate bash completion by default', () => {
    let completion = new Completion();

    expect(completion._getCompletion()).to.contain('complete -o default -F _clea_completion clea');
  });

  it ('should generate bash completion', () => {
    let completion = new Completion('bash');

    expect(completion._getCompletion()).to.contain('complete -o default -F _clea_completion clea');
  });

  it ('should generate zsh completion', () => {
    let completion = new Completion('zsh');

    expect(completion._getCompletion()).to.contain('compctl -K _clea_completion clea');
  });

  it ('should generate instructions + completion + footer', () => {
    let completion = new Completion(),
      res = completion.show();

    expect(res).to.contain('###-begin-clea-completion###');
    expect(res).to.contain('complete -o default -F _clea_completion clea');
    expect(res).to.contain('###-end-clea-completion###');
  });

});
