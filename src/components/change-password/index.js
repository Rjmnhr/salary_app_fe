import React from "react";

const ChangePassword = () => {
  return (
    <div>
      <div
        class="container  text-left p-3 mt-lg-5 mt-2"
        style={{
          minHeight: "100vh",
        }}
      >
        <h2>Change password</h2>
        <p>Protect your account with a unique password</p>

        <form class="php-email-form col-12 col-lg-8">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="Current password"
              id="Current password"
              placeholder="Current password"
              data-rule="minlen:4"
              data-msg="Please enter at least 8 chars of Current password"
            />

            <div className="d-flex justify-content-start mb-4">
              <a className="form-label-link" href="/forgot-password">
                Forgot Password?
              </a>
            </div>
          </div>

          <div class="form-group mb-3 ">
            <input
              type="text"
              class="form-control"
              name="New password"
              id="New password"
              placeholder="New password"
              data-rule="minlen:4"
              data-msg="Please enter at least 8 chars of New password"
            />
            <div class="validate"></div>
          </div>

          <div class="form-group mb-3">
            <input
              type="text"
              class="form-control"
              name="Re-enter new password"
              id="Re-enter new password"
              placeholder="Re-enter new password"
              data-rule="minlen:4"
              data-msg="Please enter at least 8 chars of Re-enter new password"
            />
            <div class="validate"></div>
          </div>
          <div class="text-left">
            <button type="submit" className="btn btn-primary w-25">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
