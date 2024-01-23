import React, { useEffect, useState } from "react";
import NavBar from "../../components/nav-bar";
import { Helmet } from "react-helmet";
import { BlogPageStyled } from "./style";
import { useLocation } from "react-router-dom";
import { BlogContentArr } from "./blog-content-array";

const IndividualBlogPage = () => {
  const location = useLocation();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Get the blog name from the query parameter
    const blogName = location.search.replace("?blog=", "");

    console.log("🚀 ~ useEffect ~ blogName:", blogName);

    if (blogName) {
      // Find the blog object in the array based on the blog name
      const decodedBlogName = decodeURIComponent(blogName);
      console.log("🚀 ~ useEffect ~ decodedBlogName:", decodedBlogName);
      const blog = BlogContentArr.find((item) => item.main === decodedBlogName);

      if (blog) {
        setSelectedBlog(blog);
      }
    }
    //eslint-disable-next-line
  }, []);

  if (!selectedBlog) {
    // Handle case where the blog is not found
    return <div>Blog not found!</div>;
  }

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
          className="container-fluid "
        >
          <div className="d-lg-flex container">
            <div className="container col-lg-6 p-2 p-lg-3 text-left mt-3">
              <h2 className="mb-3">
                {" "}
                <strong>{selectedBlog.main}? </strong>
              </h2>

              <h5 className="mb-3">{selectedBlog.subMain}</h5>
              {selectedBlog.subContent.map((item) => (
                <p className="mb-3">{item.content}</p>
              ))}

              {isMobile ? (
                <div className="col-lg-6">
                  <img
                    className="mb-3"
                    src={selectedBlog.mainImg}
                    alt="job compensation"
                  />
                </div>
              ) : (
                ""
              )}
              <p style={{ fontWeight: "bold" }}>{selectedBlog.footer}</p>

              <a href="/price-a-job">
                <button className="btn btn-lg btn-primary">Click here</button>
              </a>
            </div>
            {isMobile ? (
              ""
            ) : (
              <div className="col-lg-6">
                <img
                  className="mb-3"
                  src={selectedBlog.mainImg}
                  alt="job compensation"
                />
              </div>
            )}
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

export default IndividualBlogPage;
