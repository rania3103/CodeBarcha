const Docker = require('dockerode');
const docker = new Docker();
const db = require('../db/db');

const generateWorkspaceName = (userId) => {
  return `workspace-${userId}`;
};

const workspaceExist = async (workspaceName) => {
  try {
    const container = await docker.getContainer(workspaceName);
    await container.inspect();
    return true;
  } catch {
    return false;
  }
};

const createWorkspace = async (userId) => {
  try {
    const workspaceName = await generateWorkspaceName(userId);
    const port = Math.floor(Math.random() * 9000) + 3002;
    const hostconfig = {
      PortBindings: {
        '3000/tcp': [{ HostPort: String(port) }]
      }
    };
    const workspaceUrl = `http://localhost:${port}`;
    const container = await docker.createContainer({
      Image: 'portainer/dev-toolkit:2024.01',
      name: workspaceName,
      HostConfig: hostconfig
    });
    await container.start();
    await db.query('insert into workspace (workspacename, workspaceurl, userid) values ($1, $2, $3) returning *', [workspaceName, workspaceUrl, userId]);
  } catch (error) {
    console.error(error);
  }
};

const manageWorkspace = async (userId) => {
  const workspaceName = await generateWorkspaceName(userId);
  const exist = await workspaceExist(workspaceName);
  if (exist) {
    const container = await docker.getContainer(workspaceName);
    await container.start();
  } else {
    await createWorkspace(userId);
  }
};
const getWorkspaceUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query('select workspaceurl from workspace where userid = $1', [userId]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'workspaceurl not found' });
    } else {
      res.status(200).json({ workspaceUrl: result.rows[0].workspaceurl });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting workspace URL' });
  }
};
module.exports = { manageWorkspace, generateWorkspaceName, getWorkspaceUrl };
