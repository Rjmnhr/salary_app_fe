import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { BlogPageStyled } from "./style";
import { useLocation } from "react-router-dom";
import { BlogContentArr } from "./blog-content-array";
import NavBar from "../../components/layout/nav-bar";
import FooterComponent from "../../components/layout/footer";
import { useApplicationContext } from "../../context/app-context";

const IndividualBlogPage = () => {
  const location = useLocation();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { isMobile } = useApplicationContext();

  useEffect(() => {
    // Get the blog name from the query parameter
    const blogName = location.search.replace("?blog=", "");

    if (blogName) {
      // Find the blog object in the array based on the blog name
      let decodedBlogName = decodeURIComponent(blogName);

      if (decodedBlogName === "How much is a Data Scientist worth?") {
        decodedBlogName = "How much is a Data Scientist worth";
      }
      if (decodedBlogName === "How much is a Data Analyst worth?") {
        decodedBlogName = "How much is a Data Analyst worth";
      }

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
                <strong>{selectedBlog.main} </strong>
              </h2>

              <h5 className="mb-3">{selectedBlog.subMain}</h5>
              {selectedBlog.subContent.map((item) => (
                <p className="mb-3">{item.content}</p>
              ))}

              {isMobile ? (
                <div className="col-lg-6">{selectedBlog.mainImg}</div>
              ) : (
                ""
              )}
              <p style={{ fontWeight: "bold" }}>{selectedBlog.footer}</p>

              <a href="/pay-pulse">
                <button className="btn btn-lg btn-primary">Click here</button>
              </a>
            </div>
            {isMobile ? (
              ""
            ) : (
              <div className="col-lg-6">{selectedBlog.mainImg}</div>
            )}
          </div>
        </div>
      </BlogPageStyled>
      <FooterComponent />
    </>
  );
};

export default IndividualBlogPage;
