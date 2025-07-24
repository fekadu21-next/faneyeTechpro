
'use client';

import { useState } from 'react';

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const teamMembers = [
    {
      id: 1,
      name: 'Alemayehu Tadesse',
      role: 'Senior Full-Stack Developer',
      department: 'Engineering',
      experience: '6 years',
      location: 'Addis Ababa, Ethiopia',
      email: 'alemayehu@inhub.et',
      phone: '+251-911-234567',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'GraphQL'],
      projects: 24,
      rating: 4.9,
      bio: 'Passionate full-stack developer with expertise in modern web technologies. Leading multiple high-impact projects for Ethiopian businesses.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20software%20developer%20working%20on%20laptop%20in%20modern%20office%20environment%2C%20confident%20smile%2C%20business%20casual%20attire%2C%20warm%20lighting%2C%20professional%20headshot%20style%20photography&width=300&height=300&seq=dev1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Sara Mengistu',
      role: 'UX/UI Design Lead',
      department: 'Design',
      experience: '5 years',
      location: 'Addis Ababa, Ethiopia',
      email: 'sara@inhub.et',
      phone: '+251-911-345678',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
      projects: 21,
      rating: 4.8,
      bio: 'Creative designer focused on user-centered design principles. Expert in creating intuitive interfaces for complex business applications.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20UX%20designer%20working%20with%20design%20tools%20and%20sketches%20in%20creative%20studio%2C%20warm%20smile%2C%20modern%20workspace%20with%20design%20materials%2C%20professional%20portrait%20photography&width=300&height=300&seq=designer1&orientation=squarish'
    },
    {
      id: 3,
      name: 'David Kebede',
      role: 'DevOps Engineer',
      department: 'Engineering',
      experience: '4 years',
      location: 'Bahir Dar, Ethiopia',
      email: 'david@inhub.et',
      phone: '+251-911-456789',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform', 'Linux'],
      projects: 19,
      rating: 4.7,
      bio: 'Infrastructure specialist ensuring scalable and reliable deployment of applications. Expert in cloud technologies and automation.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20DevOps%20engineer%20working%20with%20cloud%20infrastructure%20and%20monitoring%20systems%2C%20focused%20expression%2C%20technical%20workspace%20with%20multiple%20monitors%2C%20professional%20photography&width=300&height=300&seq=devops1&orientation=squarish'
    },
    {
      id: 4,
      name: 'Meron Hailu',
      role: 'Project Manager',
      department: 'Management',
      experience: '7 years',
      location: 'Addis Ababa, Ethiopia',
      email: 'meron@inhub.et',
      phone: '+251-911-567890',
      skills: ['Agile', 'Scrum', 'JIRA', 'Risk Management', 'Stakeholder Management', 'Team Leadership'],
      projects: 18,
      rating: 4.8,
      bio: 'Experienced project manager with a track record of delivering complex projects on time and within budget. Expert in Agile methodologies.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20project%20manager%20leading%20team%20meeting%20in%20modern%20conference%20room%2C%20confident%20posture%2C%20business%20professional%20attire%2C%20collaborative%20workspace%20environment%2C%20leadership%20photography&width=300&height=300&seq=pm1&orientation=squarish'
    },
    {
      id: 5,
      name: 'Tadesse Bekele',
      role: 'Data Scientist',
      department: 'Analytics',
      experience: '3 years',
      location: 'Mekelle, Ethiopia',
      email: 'tadesse@inhub.et',
      phone: '+251-911-678901',
      skills: ['Python', 'R', 'Machine Learning', 'TensorFlow', 'SQL', 'Data Visualization'],
      projects: 16,
      rating: 4.6,
      bio: 'Data scientist specializing in machine learning and business intelligence. Helping organizations make data-driven decisions.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20data%20scientist%20analyzing%20complex%20data%20visualizations%20on%20large%20monitors%2C%20analytical%20expression%2C%20modern%20tech%20workspace%20with%20charts%20and%20graphs%2C%20professional%20photography&width=300&height=300&seq=data1&orientation=squarish'
    },
    {
      id: 6,
      name: 'Hanna Girma',
      role: 'Business Analyst',
      department: 'Business',
      experience: '4 years',
      location: 'Hawassa, Ethiopia',
      email: 'hanna@inhub.et',
      phone: '+251-911-789012',
      skills: ['Requirements Analysis', 'Process Modeling', 'Stakeholder Management', 'Documentation', 'SQL', 'Power BI'],
      projects: 22,
      rating: 4.7,
      bio: 'Business analyst with expertise in bridging the gap between business needs and technical solutions. Strong analytical and communication skills.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20business%20analyst%20presenting%20data%20insights%20in%20corporate%20boardroom%2C%20confident%20presentation%20style%2C%20business%20formal%20attire%2C%20professional%20presentation%20photography&width=300&height=300&seq=ba1&orientation=squarish'
    }
  ];

  const departments = ['all', 'Engineering', 'Design', 'Management', 'Analytics', 'Business'];

  const filteredMembers = teamMembers.filter(member => {
    if (activeTab === 'all') return true;
    return member.department === activeTab;
  });

  const departmentStats = {
    Engineering: { count: 2, color: 'bg-blue-100 text-blue-800' },
    Design: { count: 1, color: 'bg-purple-100 text-purple-800' },
    Management: { count: 1, color: 'bg-green-100 text-green-800' },
    Analytics: { count: 1, color: 'bg-orange-100 text-orange-800' },
    Business: { count: 1, color: 'bg-red-100 text-red-800' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1F3D3A] mb-4">
            Our Expert Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the talented professionals behind InHub's innovative solutions. Our diverse team brings together expertise in technology, design, and business strategy.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-[#1F3D3A]/5 rounded-xl">
              <div className="text-3xl font-bold text-[#1F3D3A] mb-2">{teamMembers.length}</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
              <div className="text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">120+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveTab(dept)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === dept 
                    ? 'bg-[#1F3D3A] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dept === 'all' ? 'All Team' : dept}
                {dept !== 'all' && (
                  <span className="ml-2 text-sm">
                    ({departmentStats[dept]?.count || 0})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover object-top mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#1F3D3A] font-medium">{member.role}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${departmentStats[member.department]?.color}`}>
                        {member.department}
                      </span>
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                        <span className="text-sm text-gray-600">{member.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <i className="ri-briefcase-line mr-2"></i>
                      <span className="text-sm">{member.experience} experience</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <i className="ri-map-pin-line mr-2"></i>
                      <span className="text-sm">{member.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <i className="ri-folder-line mr-2"></i>
                      <span className="text-sm">{member.projects} projects completed</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{member.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedMember(member)}
                    className="w-full bg-[#1F3D3A] text-white py-3 rounded-lg hover:bg-[#2a5248] transition-colors font-medium"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Team Member Profile</h2>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <img 
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-32 h-32 rounded-full object-cover object-top mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedMember.name}
                  </h3>
                  <p className="text-[#1F3D3A] font-medium mb-4">{selectedMember.role}</p>
                  
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-gray-600">
                      <i className="ri-mail-line mr-2"></i>
                      <span className="text-sm">{selectedMember.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="ri-phone-line mr-2"></i>
                      <span className="text-sm">{selectedMember.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="ri-map-pin-line mr-2"></i>
                      <span className="text-sm">{selectedMember.location}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">About</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedMember.bio}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                        <p className="text-2xl font-bold text-[#1F3D3A]">{selectedMember.experience}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Projects</h4>
                        <p className="text-2xl font-bold text-[#1F3D3A]">{selectedMember.projects}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Skills & Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, index) => (
                          <span key={index} className="bg-[#1F3D3A]/10 text-[#1F3D3A] px-3 py-1 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Performance</h4>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Overall Rating</span>
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 mr-1"></i>
                            <span className="font-semibold">{selectedMember.rating}/5.0</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className="bg-[#1F3D3A] h-2 rounded-full"
                            style={{ width: `${(selectedMember.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-[#1F3D3A]">{selectedMember.projects}</div>
                            <div className="text-sm text-gray-600">Projects Completed</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-[#1F3D3A]">98%</div>
                            <div className="text-sm text-gray-600">On-Time Delivery</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}