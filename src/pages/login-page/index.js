import SignIn from "../../components/sign-in/sign-in";

import NavBar from "../../components/nav-bar/index";
import SignUp from "../../components/sign-up/sign-up";
import { useApplicationContext } from "../../context/app-context";
import loginBG from "../../icons/salary-wave.png";
import { LoginPagestyled } from "./style";

const LoginPage = () => {
  const { isSignIn } = useApplicationContext();

  // useEffect(() => {
  //   AxiosInstance.post(
  //     `/api/track-data/store3`,
  //     { path: Location.pathname },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then(async (response) => {
  //       const data = await response.data;

  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));

  //   //eslint-disable-next-line
  // }, []);

  return (
    <>
      <LoginPagestyled>
        <NavBar />

        <div className="main-container" style={{ height: "100vh" }}>
          <div
            className="left-container img_container"
            style={{
              backgroundImage: `url(${loginBG})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100vh",
              transform: "translate3d(0px, 0px, 0px)",
            }}
          ></div>
          <div className="right-container">
            <div className="right-sub-container">
              <div>{isSignIn ? <SignIn /> : <SignUp />}</div>
            </div>
          </div>
        </div>
      </LoginPagestyled>
    </>
  );
};

export default LoginPage;
