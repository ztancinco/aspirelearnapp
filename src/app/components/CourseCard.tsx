import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Enroll</button>
    </div>
  );
};

export default CourseCard;
