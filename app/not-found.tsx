import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-dvh text-center">
        <span className="font-bold text-[48px] md:text-[72px] lg:text-[96px] text-[#1E1E1E] leading-14 md:leading-20 lg:leading-25 mb-6">
          404
        </span>
        <p className="text-[14px] md:text-[18px] lg:text-[20px] mb-2 leading-5 md:leading-7 lg:leading-8 text-[#1E1E1E]">
          Oh no! This path goes nowhere...
        </p>
        <p className="text-[14px] md:text-[18px] lg:text-[20px] leading-5 md:leading-7 lg:leading-8 text-[#1E1E1E]">
          Feel free to return to{" "}
          <Link
            href="/"
            className="text-[#ED6502] text-[14px] md:text-[18px] lg:text-[20px] font-bold leading-5 md:leading-7 lg:leading-8"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
