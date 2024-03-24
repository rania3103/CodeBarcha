import { useEffect, useState } from "react";
import axios from "axios";

function CodeEditor() {
  const [workspaceUrl, setWorkspaceUrl] = useState('');
  const token = localStorage.getItem("authToken");
  const workspaceManagement = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/workspace/url",{
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkspaceUrl(result.data.workspaceUrl);
    } catch (error) {
      console.error(error);
    }

  };
  useEffect(() => {
    workspaceManagement();
  }, []);
  return (
    <div className="flex flex-col w-full h-full">
      <div>
        <iframe
          style={{ width: "100%", height: "100vh" }}
          src={workspaceUrl}
        ></iframe>
      </div>
    </div>
  );
}

export default CodeEditor;
