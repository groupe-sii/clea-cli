class Command {
  static addCommands (program, commands) {
    commands.reduce((program, item) => {
      return program.command(item.command, item.doc, item.default);
    }, program);
  }

  static addOptions (program, options) {
    options.reduce((program, item) => {
      return program.command(item.command, item.doc, item.default);
    }, program);
  }
}

module.exports = Command;
