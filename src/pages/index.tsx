import { Auth } from "@/utils/AuthUtils";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard/enrollment";
import Login from "./login";

const Lobby = () => {
  const [isLogin, setLogin] = useState<boolean>(false);
  useEffect(()=> {
    setLogin(Auth.verifyToken());
  }, [])
  return isLogin ? <Dashboard/> : <Login/>
}

export default Lobby;