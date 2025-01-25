import React from 'react';

function Card({ title, value, color }: { title: string; value: string; color: string }) {
  const textColor = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600',
  }[color] || 'text-gray-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      <p className={`mt-2 text-3xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}

export default function DashboardOverview() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <Card title="Total Students" value="1,234" color="blue" />
      <Card title="Total Courses" value="56" color="green" />
      <Card title="Active Instructors" value="12" color="purple" />
      <Card title="Total Quizzes" value="12" color="yellow" />
    </section>
  );
}
