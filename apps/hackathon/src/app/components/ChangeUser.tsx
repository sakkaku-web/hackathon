export interface ChangeUserProps {
  currentUser: string;
  onUserChange: (id: string) => void;
}

export function ChangeUser({ currentUser, onUserChange }: ChangeUserProps) {
  const users = ['0', '1', '2'];

  return (
    <div className="flex flex-row gap-2">
      {users.map((id) => (
        <button
          key={id}
          className="w-5 disabled:underline"
          disabled={id === currentUser}
          onClick={() => onUserChange(id)}
        >
          {id}
        </button>
      ))}
    </div>
  );
}

export default ChangeUser;
