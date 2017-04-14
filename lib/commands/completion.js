const os = require('os'),
  fs = require('fs'),
  stripIndent = require('strip-indent');

class Completion {

  constructor (shell = 'bash') {
    this.shell = shell;
  }

  show () {
    return `${this._instructions()}${os.EOL}${this._getCompletion()}${os.EOL}${this._footer()}`;
  }

  _getCompletion () {
    return (this.shell === 'bash') ? this._bash() : this._zsh();
  }

  /**
   * Generate the zsh script
   *
   * @private
   * @returns {string}
   */
  _zsh () {
    return stripIndent(`_clea_completion() {
      local words cword opts
      read -Ac words
      read -cn cword
      let cword-=1
      
      case $words[cword] in
        ${this._generateCommandsScript()}
          *) opts="" ;;
      esac
    
      setopt shwordsplit
      reply=($opts)
      unset shwordsplit
    }
    
    compctl -K _clea_completion clea`);
  }

  /**
   * Generate the bash script
   *
   * @private
   * @returns {string}
   */
  _bash () {
    const command = this._generateCommandsScript();

    return stripIndent(`_clea_completion() {
       local cword pword opts
      
       COMPREPLY=()
       cword=\${COMP_WORDS[COMP_CWORD]}
       pword=\${COMP_WORDS[COMP_CWORD - 1]}
      
       case \${pword} in
         ${command}
       esac
      
       COMPREPLY=( $(compgen -W '\${opts}' -- $cword) )
      
       return 0
      }
      
      complete -o default -F _clea_completion clea`);
  }

  /**
   * Generate the instruction on how to use the `clea completion` command
   *
   * @private
   * @returns {string}
   */
  _instructions () {
    return stripIndent(`
    ###-begin-clea-completion###
    #
    # clea command completion script
    #   This command supports 2 cases.
    #   1. (Default case) It prints a common completion initialisation for bash.
    #   2. Produce Bash completion: "clea completion -b" or "clea completion --bash".
    #   3. Produce Zsh completion: "clea completion -z" or "clea completion --zsh".
    #
    # Installation: clea completion -b >> ~/.bashrc
    #           or  clea completion -z >> ~/.zshrc
    #`);
  }

  /**
   * Print the footer of the zsh and bash script
   *
   * @private
   * @returns {string}
   */
  _footer () {
    return `###-end-clea-completion###`;
  }

  /**
   * Get all clea commands
   *
   * @private
   * @returns {string[]} Clea commands
   */
  _getCommands () {
    return fs.readdirSync('./lib/commands-options')
      .map((fileWithExtension) => fileWithExtension.slice(0, -3));
  }

  /**
   * Get name, option, and command for a specific command
   *
   * @private
   * @param   {string}                      command Command name
   * @returns {{name, options, commands}}
   */
  _getCommand (command) {
    const { name, options, commands } = require(`../commands-options/${command}`);

    return { name, options, commands };
  }

  /**
   * Generate script for each commands
   *
   * @private
   */
  _generateCommandsScript () {
    return this._getCommands()
      .map((c) => {
        const command = this._getCommand(c);
        let opts = '';

        if (command.commands || command.options) {
          opts = (command.commands || command.options)
            .map((el) => {
              // remove [text]
              return (el.command || el.option).replace(/ \[(.*)\]/, '');
            })
            .join(' ')
            .replace(/,/gi, '');
        }

        return `${command.name}) opts="${opts}";;`;
      }).join('\n');
  }
}

module.exports = Completion;
