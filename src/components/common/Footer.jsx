import React from "react";

function Footer() {
  return (
    <footer className="footer d-flex justify-content-between">
      <div className="footer-column">
        <h6>Attribution</h6>
        <p>
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from{" "}
          <a href="https://www.flaticon.com/">www.flaticon.com</a>
        </p>
      </div>
      <div className="footer-column">
        <a href="https://github.com/ygoldfrid">
          <i class="fa fa-github fa-2x" aria-hidden="true" />
        </a>
        <a href="https://www.linkedin.com/in/ygoldfrid">
          <i class="fa fa-linkedin-square fa-2x" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
