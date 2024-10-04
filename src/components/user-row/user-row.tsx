import { Link } from "react-router-dom";
import IUser from "../../types/user.type";

interface IUserProps {
  user: IUser;
  onDeleteUser: (id: number) => void;
}

const UserRow: React.FC<IUserProps> = ({ user, onDeleteUser }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.contact}</td>
      <td>
        <Link to={`user/update/${user.id}`}>
          <button type="button">Edit</button>
        </Link>

        <button type="button" onClick={() => onDeleteUser(user.id)}>
          Delete
        </button>

        <Link to={`user/view/${user.id}`}>
          <button type="button">View</button>
        </Link>
      </td>
    </tr>
  );
};

export default UserRow;
