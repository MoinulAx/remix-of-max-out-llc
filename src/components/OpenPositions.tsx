import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';

interface OpenPositionsProps {
  className?: string;
}

const OpenPositions: React.FC<OpenPositionsProps> = ({ className }) => {
  const positions = [
    {
      title: "Senior Photographer",
      department: "Photography",
      location: "Remote / On-site",
      type: "Full-time",
      description: "Looking for an experienced photographer to join our team for wedding and event photography."
    },
    {
      title: "Video Editor",
      department: "Video Production",
      location: "Remote",
      type: "Part-time",
      description: "Seeking a creative video editor with experience in wedding films and commercial content."
    },
    {
      title: "Frontend Developer",
      department: "Web Development",
      location: "Remote",
      type: "Contract",
      description: "React/TypeScript developer needed for client web development projects."
    },
    {
      title: "Social Media Manager",
      department: "Marketing",
      location: "Remote",
      type: "Part-time",
      description: "Manage our social media presence and help promote our creative work across platforms."
    }
  ];

  return (
    <section id="careers" className={cn('py-20 md:py-32 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're always looking for talented individuals to join our creative team. 
            Check out our current openings and become part of the RummSpace family.
          </p>
        </FadeIn>

        <FadeIn delay={150} className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {positions.map((position, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{position.title}</div>
                          <div className="text-sm text-gray-500 mt-1">{position.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{position.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{position.location}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex px-2 py-1 text-xs font-medium rounded-full",
                          position.type === "Full-time" && "bg-green-100 text-green-800",
                          position.type === "Part-time" && "bg-blue-100 text-blue-800",
                          position.type === "Contract" && "bg-purple-100 text-purple-800"
                        )}>
                          {position.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                          Apply Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see a position that fits? We're always open to hearing from talented individuals.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Send Us Your Resume
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default OpenPositions;