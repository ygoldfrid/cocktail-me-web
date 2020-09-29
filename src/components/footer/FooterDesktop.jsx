import React from "react";
import Media from "react-media";

import Footer from "./Footer";

function FooterDesktop() {
  return (
    <Media queries={{ desktop: "(min-width: 575px)" }}>
      {(matches) => matches.desktop && <Footer />}
    </Media>
  );
}

export default FooterDesktop;
