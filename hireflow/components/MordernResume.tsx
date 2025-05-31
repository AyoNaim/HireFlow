import html2pdf from 'html2pdf.js'
import { ResumeData } from "@/types/types"
import { useRef } from "react"

export default function ModernResume({ data }: { data: ResumeData }) {
    const resumeRef = useRef(null);
    const handleDownloadPDF = () => {
        const element = resumeRef.current;
    }
    return (
    <div>
      <div className="p-8 font-sans" ref={resumeRef}>
        <h1 className="text-3xl font-bold">{data.fullName}</h1>
        <h2 className="text-lg text-gray-600">{data.email}</h2>
        <p className="mt-4">{data.summary}</p>
  
        <section className="mt-6">
          <h3 className="text-xl font-semibold">Experience</h3>
          {data.workExperience.map((exp, i) => (
            <div key={i} className="mt-2">
              <strong>{exp.position}</strong> at {exp.company} ({exp.startDate})
              <p>{exp.endDate}</p>
            </div>
          ))}
        </section>
  
        {/* Education and Skills similarly */}
      </div>
      <button onClick={handleDownloadPDF} className="btn-primary">
        Download as PDF
      </button>
    </div>
    )
  }
  