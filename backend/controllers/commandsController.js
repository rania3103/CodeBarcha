const { exec } = require('child_process');

const executeCommand = (req, res) => {
  const command = req.body.command;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: stderr });
    } else {
      res.json({ result: stdout });
    }
  });
};
module.exports = { executeCommand };
