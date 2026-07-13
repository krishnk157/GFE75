import { useAuth } from "../contexts/AuthContext";

const DashbBoard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      DashbBoard
      <h1>Welcome , {user?.username}</h1>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
};

export default DashbBoard;
