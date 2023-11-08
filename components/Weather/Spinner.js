import React from "react";
import Spinner from "../../public/Spinner.gif";
import Image from "next/image";
const Loader = () => {
  return (
    <>
      <Image className="w-[200px] m-auto block" src={Spinner} alt="loading" />
    </>
  );
};

export default Loader;
