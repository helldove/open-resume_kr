import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "components/fonts/lib";

const FontsEACSR = dynamic(() => import("components/fonts/FontsEA"), {
  ssr: false,
});

/**
 * Empty component to lazy load non-english fonts CSS conditionally
 *
 * Reference: https://prawira.medium.com/react-conditional-import-conditional-css-import-110cc58e0da6
 */
export const NonEnglishFontsCSSLazyLoader = () => {
  const [shouldLoadFontsEA, setShouldLoadFontsEA] = useState(false);

  useEffect(() => {
    if (
      getAllFontFamiliesToLoad().includes("NotoSansSC") ||
      getAllFontFamiliesToLoad().includes("IBMPlexSansKR")
    ) {
      setShouldLoadFontsEA(true);
    }
  }, []);

  return <>{shouldLoadFontsEA && <FontsEACSR />}</>;
};
