import React from 'react';

export default function RecentActivities() {
  const activities = [
    { description: 'John Doe enrolled in "React for Beginners"', time: '5 minutes ago', status: 'Completed', statusColor: 'green' },
    { description: 'Jane Smith uploaded a new course: "Advanced Python"', time: '2 hours ago', status: 'Pending Approval', statusColor: 'blue' },
    { description: 'Michael Brown completed "Introduction to HTML"', time: '1 day ago', status: 'Certified', statusColor: 'green' },
  ];

  const statusColorClasses: { [key: string]: string } = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
      <h2 className="text-2xl font-semibold text-teal-800 mb-6">Recent Activities</h2>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <div>
              <p className="text-gray-700 font-medium">{activity.description}</p>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
            <span
              className={`${statusColorClasses[activity.statusColor]} text-sm font-semibold uppercase`}
            >
              {activity.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
