import React from "react";
import Media from "react-media";

import Footer from "./Footer";

function FooterMobile() {
  return (
    <Media queries={{ mobile: "(max-width: 575px)" }}>
      {(matches) => matches.mobile && <Footer />}
    </Media>
  );
}

export default FooterMobile;
