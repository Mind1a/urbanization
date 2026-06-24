const Cookies = () => {
  return (
    <section
      aria-labelledby="cookies-heading"
      className="mx-[24px] mt-0 mb-[32px] md:mx-[32px] md:mb-[40px] lg:mx-[80px] lg:mt-[32px] lg:mb-[64px] flex justify-center items-center"
    >
      <div className="max-w-[1280px] w-full">
        <h1
          id="cookies-heading"
          className="font-bold text-[16px] md:text-[24px] lg:text-[32px] mt-[12px] mb-[16px] md:my-[20px] lg:my-[36px]"
        >
          We are using Cookies!
        </h1>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 md:mb-4 lg:mb-8 leading-5 md:leading-7 lg:leading-8">
          This website uses “Essential Cookies” only.
        </p>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 md:mb-4 lg:mb-8 leading-5 md:leading-7 lg:leading-8">
          <strong>What we use:</strong> We use minimal, first-party session
          cookies to ensure the website loads correctly and that PDF downloads
          function as intended.
        </p>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 md:mb-4 lg:mb-8 leading-5 md:leading-7 lg:leading-8">
          <strong>Third-Party Tracking:</strong> This website does not use
          third-party tracking, advertising, or marketing cookies. We do not
          track your activity across other websites.
        </p>

        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 md:mb-4 lg:mb-9">
          <strong>Your Choice:</strong> Since we only use cookies necessary for
          the basic functioning of this academic archive, by using this site,
          you agree to these technical requirements.
        </p>
      </div>
    </section>
  );
};

export default Cookies;
