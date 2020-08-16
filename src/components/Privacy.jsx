import React from "react";

import Footer from "./common/Footer";

function Privacy() {
  return (
    <>
      <div className="privacy">
        <h3>Privacy Policy</h3>
        <p>Last updated Sunday, August 16th, 2020</p>
        <h5>General Information</h5>
        <p>
          Cocktail Me app is a Free app. This service is provided at no cost and
          is intended for use as is.
        </p>
        <p>
          This page is used to inform visitors regarding policies with the
          collection, use, and disclosure of personal Information if anyone
          decided to use this service.
        </p>
        <p>
          If you choose to use this service, then you agree to the collection
          and use of information in relation to this policy.
        </p>
        <h5>Information Gathering and Usage</h5>
        <p>
          When you register for Cocktail Me we ask for information such as your
          name and e-mail address.
        </p>
        <div>
          <p>
            The information collected is used to improve the content of our Web
            pages and the quality of our service, and is not shared with or sold
            to other organizations for commercial purposes.
          </p>
          <p>
            The app does use third party services that may collect information
            used to identify you.
          </p>
          <p>
            Link to privacy policy of third party service providers used by the
            app:
          </p>
          <ul>
            <li>
              <a
                href="https://www.google.com/policies/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play Services
              </a>
            </li>
            <li>
              <a
                href="https://expo.io/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Expo
              </a>
            </li>
          </ul>
        </div>
        <h5>Cookies</h5>
        <p>
          A cookie is a small amount of data, which often includes an anonymous
          unique identifier, that is sent to your browser from a web site's
          computers and stored on your device's hard drive.
        </p>
        <p>Cookies are required to use the Cocktail Me service.</p>
        <p>
          We use cookies to record current session information, but do not use
          permanent cookies. You are required to re-login to your Cocktail Me
          account after a certain period of time has elapsed to protect you
          against others accidentally accessing your account contents.
        </p>

        <h5>Data Storage</h5>
        <p>
          Cocktail Me uses these third-party vendors and hosting partners to
          provide the necessary hardware, software, networking, storage, and
          related technology required to run Cocktail Me. The data collected by
          these services is laid out in the Information Gathering and Usage
          Section; it includes IP address, browser type and operating system
          (including mobile device information, if applicable), errors,
          performance metrics, and webpage and app interactions. This is a
          running list of vendors Cocktail Me uses:
        </p>
        <ul>
          <li>Bugsnag, Error logging</li>
          <li>GitHub, Code, bug reports, contributions</li>
          <li>Google, Cloud infrastructure for our Website & Services</li>
          <li>MongoDB, Cloud infrastructure for our Website & Services</li>
          <li>Sentry, Error logging</li>
        </ul>
        <p>
          These third parties have access to your personal information. The
          reason is to perform the tasks assigned to them on our behalf.
          However, they are obligated not to disclose or use the information for
          any other purpose.
        </p>
        <h5>Links to external sites</h5>
        <p>
          This Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the Privacy Policy of these websites. We have no control
          over and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </p>
        <h5>Children’s Privacy</h5>
        <p>
          These Services do not address anyone under the age of 18. We do not
          collect personally identifiable information from children under 18. If
          you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact us so that we
          will be able to do necessary actions.
        </p>
        <h5>Changes</h5>
        <p>
          Cocktail Me may periodically update this policy. Thus, you are advised
          to review this page periodically for any changes.
        </p>
        <h5>Contact</h5>
        <p>
          Any questions about this Privacy Policy should be addressed to
          cocktailme@yanivgoldfrid.com
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
