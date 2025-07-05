import React from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Briefcase, // For Work Experience
  BookOpen,  // For Summary
  Code,      // For Skills
} from "lucide-react"; // Import Lucide icons
import { ResumeData } from "@/types/types";
// ResumeData interface is imported from "@/types/types" as per your setup.
// We will assume its structure based on the usage in your provided code.
// No new interfaces are defined here.

interface ModernResumeProps {
  data: ResumeData;
}

const ModernResume = React.forwardRef<HTMLDivElement, ModernResumeProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="
          w-full h-auto bg-white text-gray-800 font-inter
          shadow-lg rounded-lg overflow-hidden
          p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 /* Responsive padding */
          max-w-4xl mx-auto my-8 /* Center and constrain on larger screens */
          print:w-[210mm] print:h-auto print:p-[20mm] print:shadow-none print:rounded-none
        "
      >
        {/* Header - Name and Contact Info */}
        <header className="border-b-2 border-blue-500 pb-4 mb-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            {data.fullName}
          </h1>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-start items-center sm:items-start gap-x-4 gap-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-blue-600" /> {data.email}
            </p>
            <p className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-blue-600" /> {data.phone}
            </p>
            {data.linkedin && (
              <a
                href={data.linkedin}
                className="flex items-center gap-1 text-blue-600 hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            )}
            {data.github && (
              <a
                href={data.github}
                className="flex items-center gap-1 text-blue-600 hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
          </div>
        </header>

        {/* Main Content Area - Single Column for simplicity and responsiveness */}
        {/* Summary */}
        {data.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-1 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.workExperience && data.workExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-1 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Work Experience
            </h2>
            {data.workExperience.map((exp, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                  <h3 className="text-md font-semibold text-gray-800">
                    {exp.position} –{" "}
                    <span className="font-normal text-gray-700">
                      {exp.company}
                    </span>
                  </h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-snug">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-1 mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" /> Skills
            </h2>
            <ul className="flex flex-wrap gap-2 text-sm">
              {data.skills.map((skill, i) => (
                <li
                  key={i}
                  className="bg-blue-100 text-blue-800 rounded-md px-3 py-1 font-medium whitespace-nowrap"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }
);

ModernResume.displayName = "ModernResume";
export default ModernResume;
