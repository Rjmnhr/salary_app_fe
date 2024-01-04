import React from "react";
import NavBar from "../../components/nav-bar";
import { Helmet } from "react-helmet";
import blogImage from "../../icons/data science.png";
import { BlogPageStyled } from "./style";
const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Equipay Partners</title>
        <meta
          name="description"
          content="Insights, trends, and expertise – Explore the world of compensation with Equipay Blogs."
        />
        <meta
          property="og:description"
          content="Insights, trends, and expertise – Explore the world of compensation with Equipay Blogs."
        />
        {/* Add other meta tags, link tags, etc. as needed */}
      </Helmet>
      <NavBar />
      <BlogPageStyled>
        <div
          style={{ marginTop: "100px", borderTop: "1px solid black pb-3" }}
          className="container-fluid"
        >
          <div className="container p-2 p-lg-3 text-left mt-3">
            {/* Section 1: Demysti fying Job Compensation */}
            <h2 className="mb-3">
              {" "}
              <strong>How much is a Data Scientist worth? </strong>
            </h2>

            <h5 className="mb-3">
              Gone are the days of salary surveys or Glassdoor. How do you know
              how much to pay a Data Scientist and what skills demand more
              money?
            </h5>
            <p className="mb-3">
              The below is what a Data Scientist job with 2 years’ experience is
              typically looking for in Bangalore.
            </p>

            <img
              className="mb-3"
              style={{ width: "70%", height: "70%" }}
              src={blogImage}
              alt="job compensation"
            />
            <p>It also demonstrates how much each skillset is worth. </p>
            <p>
              The data is real-time based on location and can be drilled down to
              any skillsets.{" "}
            </p>
            <p style={{ fontWeight: "bold" }}>
              To try a sample role, simply register and try out our salary tool
              for free.{" "}
            </p>

            <a href="/price-a-job">
              <button className="btn btn-lg btn-primary">Click here</button>
            </a>
          </div>
        </div>
      </BlogPageStyled>
      <footer className="mt-5" id="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 footer-contact text-left">
                <h3>
                  Equipay Partners<span>.</span>
                </h3>

                <p>
                  <strong>Indian Headquarter:</strong>
                  <br />
                  11th Main Road, HAL 2nd Stage <br />
                  Indira Nagar, Bangalore,
                  <br />
                  Karnataka-560038
                  <br />
                  <strong>Email:</strong> team@equipaypartners.com
                  <br />
                </p>
              </div>

              <div class="col-lg-2 col-md-6 footer-links text-left">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i class="bx bx-chevron-right"></i> <a href="/#">Home</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#about">About us</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#services">Services</a>
                  </li>

                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="#faq">Frequently Asked Questions</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 footer-links text-left">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/price-a-job">Price a job</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/executive-compensation">Executive compensation</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="sales-incentive">Sales incentive</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i>{" "}
                    <a href="/training">Training</a>
                  </li>
                  <li>
                    <i class="bx bx-chevron-right"></i> <a href="/blog">Blog</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-4 col-md-6 footer-newsletter text-left">
                <h4>Join Our Newsletter</h4>
                <p>
                  Please enter your email if you are interested to read about
                  our regular work, live case studies, what's happening in
                  businesses around and some interesting trends
                </p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="container d-md-flex py-4">
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
    </>
  );
};

export default BlogPage;
