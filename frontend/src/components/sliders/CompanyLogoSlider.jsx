import React, { useEffect, useRef } from "react";
import { companyLogo } from "../../assets/assets";

const CompanyLogoSlider = () => {
  const logosRef = useRef(null);

  useEffect(() => {
    if (logosRef.current) {
      const clone = logosRef.current.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      logosRef.current.parentNode.appendChild(clone);
    }
  }, []);

  const logos = [
    { src: companyLogo.appleLogo, alt: "Apple" },
    { src: companyLogo.googleLogo, alt: "Google" },
    { src: companyLogo.hpLogo, alt: "HP" },
    { src: companyLogo.metaLogo, alt: "Meta" },
    { src: companyLogo.microsoftLogo, alt: "Microsoft" },
    { src: companyLogo.samsungLogo, alt: "Samsung" },
    { src: companyLogo.teslaLogo, alt: "Tesla" },
  ];

  return (
    <div className="relative min-h-[200px] flex items-center bg-white overflow-hidden font-manrope my-24">
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul
          ref={logosRef}
          className="flex items-center min-w-max animate-infinite-scroll gap-16 px-8"
        >
          {logos.map((logo, index) => (
            <li key={index} className="shrink-0">
              <img src={logo.src} alt={logo.alt} className="h-12 w-auto" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyLogoSlider;
