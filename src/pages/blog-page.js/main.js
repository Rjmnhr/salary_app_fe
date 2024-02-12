import React from "react";

import NavBar from "../../components/nav-bar";
import { BlogContentArr } from "./blog-content-array";

const BlogsMainPage = () => {
  return (
    <>
      <NavBar />

      <div style={{ marginTop: "100px" }} className="position-relative "></div>

      <div
        class="container content-space-2 content-space-lg-3 text-start "
        id="article"
      ></div>
      <div class="container content-space-1 content-space-lg-3 mt-5">
        <div class="row justify-content-lg-between">
          <div class="col-lg-12 mb-10 mb-lg-0">
            <div class="d-grid gap-7 mb-7">
              {BlogContentArr.map((blog) => {
                return (
                  <div class="card p-3 m-3 text-left card-flush card-stretched-vertical">
                    <div class="row">
                      <div class="col-sm-5">
                        <img
                          class="card-img"
                          src={blog.imgPreview}
                          alt="Job compensation"
                        />
                      </div>

                      <div class="col-sm-7">
                        <div class="card-body">
                          <h4 class="card-title">
                            <strong>
                              <a
                                class="text-dark"
                                href={`/post?blog=${blog.main}`}
                              >
                                {blog.main}
                              </a>
                            </strong>
                          </h4>

                          <p class="card-text">{blog.subMain}</p>
                          <a href={`/post?blog=${blog.main}`}>
                            {" "}
                            <button className="btn  btn-primary w-25">
                              Read More
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div id="stickyBlockEndPoint"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsMainPage;
