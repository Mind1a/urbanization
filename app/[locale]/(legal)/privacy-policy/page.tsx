const PrivacyPolicy = () => {
  return (
    <section
      aria-labelledby="privacy-heading"
      className="mx-[24px] mt-0 mb-[32px] md:mx-[32px] md:mb-[40px] lg:mx-[80px] lg:mt-[32px] lg:mb-[64px] flex justify-center items-center"
    >
      <div className="max-w-[1280px] w-full">
        <h1
          id="privacy-heading"
          className="font-bold text-[16px] md:text-[24px] lg:text-[32px] mt-[12px] mb-[16px] md:my-[20px] lg:my-[36px]"
        >
          Privacy Policy
        </h1>

        <div className="mb-3 md:mb-5 lg:mb-8">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            Last Update: <time dateTime="2026-03">March 2026</time>
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            This Privacy Policy outlines how the Urban Development and
            Architecture Department at Ilia State University handles data for
            this research archive.
          </p>
        </div>

        <div className="mb-3 md:mb-5 lg:mb-8">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            Data Collection
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            Because this is a public-facing research repository, we prioritize
            your privacy:
          </p>
          <ul className="list-disc pl-8 text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            <li>
              <strong>No Accounts:</strong> We do not require registration or
              personal accounts.
            </li>

            <li>
              <strong>Direct Downloads:</strong> When you download research
              PDFs, we do not collect your personal identity.
            </li>

            <li>
              <strong>Server Logs:</strong> Like all websites, our hosting
              server may log basic technical data (IP address, browser type) for
              security purposes and to count total visitors to the research
              project.
            </li>
          </ul>
        </div>

        <div className="mb-3 md:mb-5 lg:mb-9">
          <h2 className="font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-2 md:mb-4">
            Data Sharing
          </h2>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8">
            We do not sell, trade, or share any visitor data with third parties.
            This data is used exclusively to demonstrate the reach and impact of
            the Saburtalo research project to the University.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
