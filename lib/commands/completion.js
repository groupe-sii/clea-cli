const { commands } = require('../commands-options/clea'),
  { stripIndent } = require('common-tags'),
  fs = require('fs');

/* eslint-disable no-console */

class Completion {

  constructor (shell = 'bash') {
    this.shell = shell;
  }

  start () {
    this._instructions();

    console.log(stripIndent`${this._getCompletion()}`);

    this._footer();
  }

  _getCompletion () {
    return (this.shell === 'bash') ? this._bash() : this._zsh();
  }

  /**
   * Generate the zsh script
   * @private
   */
  _zsh () {
    return `_clea_completion() {
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
    
    compctl -K _clea_completion clea`;
  }

  /**
   * Generate the bash script
   * @private
   */
  _bash () {
    const command = this._generateCommandsScript();

    return `_clea_completion() {
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
  
     complete -o default -F _clea_completion clea
   `;
  }

  /**
   * Print the instruction to use clea completion command
   * @private
   */
  _instructions () {
    console.log(stripIndent`
    ###-begin-clea-completion###
    #
    # clea command completion script
    #   This command supports 2 cases.
    #   1. (Default case) It prints a common completion initialisation for Zsh.
    #   2. Produce Bash completion: "clea completion -b" or "clea completion --bash".
    #   3. Produce Zsh completion: "clea completion -z" or "clea completion --zsh".
    #
    # Installation: clea completion -b >> ~/.bashrc
    #           or  clea completion -z >> ~/.zshrc
    #`);
  }

  /**
   * Get an array of all options for clea command
   * @private
   */
  _cleaOptions () {
    return commands.map((elt) => {
      return elt.command;
    }).join(' ');
  }

  /**
   * Print the footer of the zsh and bash script
   * @private
   */
  _footer () {
    console.log('###-end-clea-completion###');
  }

  /**
   * Get all clea commands
   *
   * @returns {string[]|Array.<String>} Clea commands
   * @private
   */
  _getCommands () {
    return fs.readdirSync('./lib/commands-options')
      .map((fileWithExtension) => fileWithExtension.slice(0, -3));
  }

  /**
   * Get name, option, and command for a specific command
   *
   * @param {string} command the specific command
   * @private
   */
  _getCommand (command) {
    if (!command) {
      throw new Error('command is not defined');
    }

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
