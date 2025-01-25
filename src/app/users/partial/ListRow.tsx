import { User } from '@/app/api/interface/user';
import { useRouter } from 'next/navigation';

interface UserListRowProps {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserListRow({ user, onDelete }: UserListRowProps) {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/users/edit/${user.id}`);
  };

  const handleDeleteClick = async () => {
    const fullName = `${user.first_name} ${user.last_name}`;
    if (confirm(`Are you sure you want to delete this user "${fullName}"?`)) {
      try {
        await onDelete(user.id);
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <tr key={user.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
            user.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {user.is_active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={handleEditClick}
          className="text-blue-600 hover:text-blue-900 text-sm font-medium mr-4"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-900 text-sm font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
