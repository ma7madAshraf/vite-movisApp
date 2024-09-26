import mLogo from "../assets/mlogo.png";

const Footer = () => {
  return (
    <section className=" mx-auto  px-4 sm:px-8 flex justify-between items-center fixed bottom-0 w-full h-7 bg-base-300 text-primary-content z-50 font-semibold text-sm">
      <div
        className={` flex items-center text-left uppercase text-neutral-content
        `}
      >
        Designed by
        <img alt="logo" src={mLogo} className="w-16 md:w-20" />
      </div>
      <div className={`right text-right flex items-end text-neutral-content `}>
        copyright
        <span className="year text-center font-semibold ml-1 text-primary  ">
          &copy;{new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
};

export default Footer;
