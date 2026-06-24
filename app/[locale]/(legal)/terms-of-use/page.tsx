const TermsOfUsePage = () => {
  return (
    <section
      aria-labelledby="terms-heading"
      className="mx-[24px] mt-[28px] mb-[32px] md:mx-[32px] md:mt-0 md:mb-[40px] lg:mx-[80px] lg:mt-[32px] lg:mb-[64px] flex justify-center items-center"
    >
      <div className="max-w-[1280px] w-full ">
        <h1
          id="terms-heading"
          className="font-bold text-[16px] md:text-[24px] lg:text-[32px] mt-[12px] mb-[16px] md:my-[20px] lg:my-[36px]"
        >
          Terms of Use &amp; Academic Disclaimer
        </h1>

        <div className="mb-3 md:mb-5 lg:mb-8">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            Ownership of Research
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            All materials—including text, archival photography, data
            visualizations, and PDF reports—are the intellectual property of
            Ilia State University (Urban Development and Architecture
            Department) and the respective researchers involved, unless
            otherwise cited.
          </p>
        </div>

        <div className="mb-3 md:mb-5 lg:mb-8">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            Permitted Use (Academic License)
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            Users are encouraged to use this information for educational and
            research purposes. You may download and print the provided PDF files
            under the following conditions:
          </p>
          <ul className="list-disc pl-7 text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            <li>
              Attribution: Any use of the data or imagery in external work must
              properly cite the Ilia State University research lab.
            </li>

            <li>
              Non-Commercial: The contents of this site may not be sold or used
              for commercial real estate, marketing, or development purposes
              without written consent from the Department.
            </li>
          </ul>
        </div>

        <div className="mb-3 md:mb-5 lg:mb-8">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            Nature of Information
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            This website represents a specific architectural and urban study of
            Saburtalo.
          </p>
          <ul className="list-disc pl-7 text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            <li>
              Historical Accuracy: While every effort is made to ensure the
              accuracy of the urban transformations documented, the University
              is not liable for minor historical discrepancies.
            </li>
            <li>
              No Legal Standing: The maps and data provided are for academic and
              illustrative purposes only. They do not constitute official
              cadastral data, legal property boundaries, or government zoning
              documents.
            </li>
          </ul>
        </div>

        <div className="mb-3 md:mb-5 lg:mb-9">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            Contact Information
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            For inquiries regarding the reuse of research data or specific
            questions about the urban lab&apos;s methodology, please contact the
            Urban Development and Architecture Department at Ilia State
            University.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfUsePage;
