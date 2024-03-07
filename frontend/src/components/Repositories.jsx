import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Radio,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import axios from "axios";
function Repositories() {
  const [repoName, setRepoName] = useState("");
  const [repos, setRepos] = useState([]);
  const [repoVisibility, setRepoVisibility] = useState("Public");
  const token = localStorage.getItem("authToken");

  const githubOAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/github");
      window.location.href = res.data.oauthUrl;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    githubOAuth();
  }, []);
  const getUserRepos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/github/repos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRepos(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserRepos();
  }, []);
  const handleCreateRepo = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/github/repos",
        { name: repoName, private: repoVisibility === "Private" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getUserRepos();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full mx-auto mt-11">
      <div className="text-center flex ml-44 mb-8">
        <input
          type="text"
          placeholder="enter a name for the repository you want to create"
          className="mr-3 ml-5 py-1 px-3 bg-slate-100 rounded outline-0 w-96"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
        <div className="flex gap-10">
          <div className="flex bg-slate-100 px-6 rounded-md font-semibold space-x-2 py-2">
            <Radio
              name="type"
              label="Private"
              value={"Private"}
              onChange={() => setRepoVisibility("Private")}
            />
            <Radio
              name="type"
              label="Public"
              value={"Public"}
              defaultChecked
              onChange={() => setRepoVisibility("Public")}
            />
          </div>
          <button
            className="ml-4 bg-indigo-500 py-1 px-5 text-white font-semibold rounded hover:bg-indigo-300"
            onClick={handleCreateRepo}
          >
            Create repository
          </button>
        </div>
      </div>
      <h2 className="text-center mt-5 font-extrabold text-white text-3xl">
        Your repositories:
      </h2>
      <div className="mt-5 flex flex-wrap justify-around mr-8">
        {repos.map((repo) => (
          <Card
            key={repo.name}
            className="mt-6 w-96 ml-11 rounded-lg bg-slate-800"
          >
            <CardBody>
              <Typography
                variant="h5"
                color="white"
                className="mb-2 font-bold mt-2 overflow-hidden overflow-ellipsis ml-2"
              >
                {repo.name}{" "}
                <span className="bg-gray-700 rounded-md px-2">
                  {repo.visibility}
                </span>
              </Typography>
              <Typography className="ml-3 font-semibold text-gray-400">
                {repo.description || "there is no description"}
              </Typography>
            </CardBody>
            <CardFooter className="py-10 pb-0">
              <p className="flex space-x-3 ml-8 mb-2">
                <Button className="rounded-md bg-indigo-500 hover:bg-indigo-400">
                  <a href={repo.repoUrl}>View</a>
                </Button>
                <Popover>
                  <PopoverHandler>
                    <Button>Clone</Button>
                  </PopoverHandler>
                  <PopoverContent className="font-semibold bg-slate-100 p-1">
                    {repo.cloneUrl}
                  </PopoverContent>
                </Popover>
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Repositories;
