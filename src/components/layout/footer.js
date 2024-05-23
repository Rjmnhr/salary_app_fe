import React from "react";
import logo from "../../icons/logo192.png";

const FooterComponent = ({ setTrigger, trigger }) => {
  return (
    <footer id="footer">
      <div class="py-4">
        <div class="container">
          <div class="d-lg-flex justify-content-center">
            <div class="col-lg-3 col-md-6 footer-contact text-center">
              <img className="mb-3" src={logo} alt="" height={35} width={35} />
              <h3 className="mb-3">
                Equipay Partners<span>.</span>
              </h3>
            </div>
          </div>
          <div class="container d-md-flex  justify-content-center">
            <div class="social-links text-center text-md-right pt-3 pt-md-0">
              {/* <a href="/#" class="twitter">
              <i class="bx bxl-twitter"></i>
            </a> */}

              {/* <a href="/#" class="instagram">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="/#" class="google-plus">
              <i class="bx bxl-skype"></i>
            </a> */}
              <a
                href="https://www.linkedin.com/company/equipay-partners"
                class="linkedin"
                target="_blank"
                rel="noreferrer"
              >
                <i class="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
