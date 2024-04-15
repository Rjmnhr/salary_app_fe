import React from "react";

const FooterComponent = ({ setTrigger, trigger }) => {
  return (
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="d-lg-flex justify-content-center">
            <div class="col-lg-3 col-md-6 footer-contact text-left">
              <h3>
                Equipay Partners<span>.</span>
              </h3>

              <p>
                <strong>Indian Headquarter:</strong>
                <br />
                Bangalore, India
                <br />
                <strong>Email:</strong> team@equipaypartners.com
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="container d-md-flex py-4 justify-content-center">
        <div class="me-md-auto text-center text-md-left"></div>
        <div class="social-links text-center text-md-right pt-3 pt-md-0">
          {/* <a href="/#" class="twitter">
              <i class="bx bxl-twitter"></i>
            </a> */}
          <a
            href="https://www.facebook.com/profile.php?id=61554618998649"
            class="facebook"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-facebook"></i>
          </a>
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
    </footer>
  );
};

export default FooterComponent;
