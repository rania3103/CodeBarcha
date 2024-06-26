import { useState } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function SignUp() {
    const [email, setEmail] = useState('');
    const [githubUserName, setGithubUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async() =>{
        try {
            await axios.post('http://localhost:3000/api/auth/register', {email:email, password:password, githubusername:githubUserName});
            navigate("/signin")
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);

        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-indigo-800">
          <div className="bg-slate-100 p-8 rounded shadow-md w-96 border-2 border-indigo-500">
            <h2 className="text-2xl font-bold mb-6 text-indigo-500 text-center">Sign Up</h2>
            <img src = "/img/logo.png" className="w-40 ml-16 mb-2"/>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" id="email" className="mt-1 p-2 w-full border rounded outline-blue-500 "  onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 ">Password</label>
              <input type="password" id="password" className="mt-1 p-2 w-full border rounded outline-blue-500"  onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="githubusername" className="block text-sm font-medium text-gray-600 ">Github username</label>
              <input type="text" id="githubusername" className="mt-1 p-2 w-full border rounded outline-blue-500"  onChange={(e) => setGithubUserName(e.target.value)} />
            </div>
            {error && (
              <p className="text-red-400 text-sm mb-4 font-semibold ml-2 bg-red-200 py-2 rounded-md text-center">
                {error}
              </p>
            )}
            <button className="bg-indigo-500 text-white px-5 py-1 font-bold rounded ml-24 hover:bg-indigo-400" onClick={handleSignUp}>Create account</button>
            <p className="text-sm font-medium text-gray-600 mt-6 ml-16">Do you have an account? <Link to ="/signin" className="font-bold ml-4 text-indigo-500 hover:text-indigo-700">Sign In</Link></p>
          </div>
        </div>
      )
    }
    

export default SignUp
