import { ResumeData } from '@/types/types';
import React from 'react'

interface coverLetterProps {
  data: ResumeData
}
const CoverLetter = React.forwardRef<HTMLDivElement, coverLetterProps>(({ data }, ref) => {
    const coverLetterContent = data.coverLetterData?.[0]?.coverLetterContent || '';

 return (
      <div
        ref={ref}
        className="
          bg-white text-gray-900 font-inter /* Changed font to Inter for consistency */
          w-full h-auto mx-auto
          p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 /* Responsive padding */
          leading-relaxed text-base /* Responsive font size */
          shadow-lg rounded-lg overflow-hidden /* Modern card-like appearance */
          my-8 /* Vertical spacing */
          max-w-4xl /* Max width for larger screens */
          print:w-[210mm] print:h-auto print:p-[20mm] print:shadow-none print:rounded-none
      "
      >
        <header className="mb-6">
          {/* <p className="text-sm">{fullName}</p>
          <p className="text-sm">{email} | {phone}</p>
          {linkedin && <p className="text-sm">{linkedin}</p>} */}
          {/* {address && <p className="text-sm">{address}</p>} */}
        </header>
        <pre className="whitespace-pre-wrap">{coverLetterContent}</pre>
      </div>
    );
})
CoverLetter.displayName = 'cover Letter'
export default CoverLetter