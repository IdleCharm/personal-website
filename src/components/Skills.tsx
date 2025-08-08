import React, { useState, useEffect } from "react";

import { CodeIcon, DatabaseIcon, GlobeIcon, SmartphoneIcon } from "./Icons";
import { Loader } from "./Loader";

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
}

const defaultSkills: Skill[] = [
  { name: "AWS", level: 98, icon: GlobeIcon },
  { name: "Database Design", level: 75, icon: DatabaseIcon },
  { name: "Java", level: 90, icon: CodeIcon },
  { name: "JavaScript", level: 82, icon: CodeIcon },
  { name: "Linux", level: 90, icon: CodeIcon },
  { name: "Node.js", level: 85, icon: DatabaseIcon },
  { name: "Python", level: 90, icon: CodeIcon },
  { name: "TypeScript", level: 90, icon: CodeIcon },
  { name: "Web Applications", level: 90, icon: SmartphoneIcon },
];

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300 group">
      <div className="flex items-center mb-4">
        <skill.icon className="h-8 w-8 text-purple-400 mr-3 group-hover:text-pink-400 transition-colors duration-300" />
        <span className="text-white font-semibold text-lg">{skill.name}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
}

const fetchSkills = async (
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch("http://localhost:3001/api/skills");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    setSkills(result as Skill[]);
  } catch (error) {
    if ((error as Error).message.includes("Failed to fetch")) {
      console.warn("Skills API not available, using default skills.");
    } else {
      console.error("Error fetching skills:", error);
    }
  } finally {
    setLoading(false);
  }
};

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchSkills(setSkills, setLoading);
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return (
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Skills & Expertise
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        <Loader />
      </div>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
