import React from "react";

const MatchCountComponent = ({
  together,
  financial,
  industries,
  marketCap,
  totalAssets,
  sales,
  pat,
  selectedIndustries,
  isMobile,
}) => {
  return (
    <div>
      <section
        id="counts"
        class={`${isMobile ? "" : "counts"} `}
        style={{
          margin: "0",
          padding: "0",
          background: "white",
          width: "100%",
        }}
      >
        <div
          class={`container ${isMobile ? "d-flex" : "d-block"}`}
          data-aos="fade-up"
        >
          {financial && (marketCap || totalAssets || sales || pat) ? (
            isMobile ? (
              <div class="col-lg-12 col-md-6 mt-lg-5  mt-md-0">
                <div
                  class="count-box mb-3"
                  style={{
                    boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)",
                    padding: "8px",
                  }}
                >
                  <span data-toggle="counter-up">{financial}</span>
                  <p style={{ fontSize: "10px" }}>
                    {" "}
                    Companies match on Financial metrics
                  </p>
                </div>
              </div>
            ) : (
              <div class="col-lg-12 col-md-6 mt-lg-5  mt-md-0">
                <div
                  class="count-box mb-3"
                  style={{ boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)" }}
                >
                  <span data-toggle="counter-up">{financial}</span>
                  <p>Distinct companies matched on Financial metrics</p>
                </div>
              </div>
            )
          ) : (
            ""
          )}

          {industries && selectedIndustries.length > 0 ? (
            isMobile ? (
              <div class="col-lg-12 col-md-6 mt-lg-3 mt-md-0">
                <div
                  class="count-box mb-3"
                  style={{
                    boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)",
                    padding: "8px",
                  }}
                >
                  <span data-toggle="counter-up">{industries}</span>
                  <p style={{ fontSize: "10px" }}>
                    {" "}
                    Companies match on selected sectors{" "}
                  </p>
                </div>
              </div>
            ) : (
              <div class="col-lg-12 col-md-6 mt-lg-3 mt-md-0">
                <div
                  class="count-box mb-3"
                  style={{ boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)" }}
                >
                  <span data-toggle="counter-up">{industries}</span>
                  <p> Distinct companies matched on selected sectors </p>
                </div>
              </div>
            )
          ) : (
            ""
          )}

          {selectedIndustries.length > 0 &&
          (marketCap || totalAssets || sales || pat) ? (
            isMobile ? (
              <div class="col-lg-12 col-md-6 mt-lg-3 mt-md-0">
                <div
                  class="count-box mb-3"
                  style={{
                    boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)",
                    padding: "8px",
                  }}
                >
                  <span className="text-primary" data-toggle="counter-up">
                    {together}
                  </span>
                  <p style={{ fontSize: "10px" }}>
                    Companies match on both metrics and sectors
                  </p>
                </div>
              </div>
            ) : (
              <div class="col-lg-12 col-md-6 mt-lg-3 mt-md-0">
                <div
                  class="count-box mb-3"
                  style={{ boxShadow: " 0px 3px 3px 0px rgba(0, 0, 0, 0.08)" }}
                >
                  <span className="text-primary" data-toggle="counter-up">
                    {together}
                  </span>
                  <p>
                    Distinct companies matched based on both Financial metrics
                    and selected sectors
                  </p>
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
};

export default MatchCountComponent;
