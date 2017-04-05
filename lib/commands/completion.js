const { commands } = require('../commands-options/clea'),
  { stripIndent } = require('common-tags');

/* eslint-disable no-console */

class Completion {
  constructor (shell = 'zsh') {
    this._instructions();
    if (shell === 'bash') {
      this._bash();
    } else {
      this._zsh();
    }
    this._footer();
  }

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

  _cleaOptions () {
    return commands.map((elt) => {
      return elt.command;
    }).join(' ');
  }

  _zsh () {
    let cleaOptions = this._cleaOptions();

    console.log(stripIndent`_clea_completion() {
      local words cword opts
      read -Ac words
      read -cn cword
      let cword-=1
      
      case $words[cword] in 
        clea|help) opts="${cleaOptions}";;
          *) opts="" ;;
      esac
    
      setopt shwordsplit
      reply=($opts)
      unset shwordsplit
    }
    
    compctl -K _clea_completion clea`);
  }

  _bash () {
    let cleaOptions = this._cleaOptions();

    console.log(stripIndent`_clea_completion() {
       local cword pword opts
  
       COMPREPLY=()
       cword=\${COMP_WORDS[COMP_CWORD]}
       pword=\${COMP_WORDS[COMP_CWORD - 1]}
  
       case \${pword} in
         clea|help) opts="${cleaOptions}"
       esac
  
       COMPREPLY=( $(compgen -W '\${opts}' -- $cword) )
  
       return 0
     }
  
     complete -o default -F _clea_completion clea
   `);
  }

  _footer () {
    console.log('###-end-clea-completion###');
  }
}

module.exports = Completion;
