import React, { useRef, useState } from "react";
import FacebookLogin from "react-facebook-login";
import "./App.css";
import { getTextFromPdf } from "./get-text-from-pdf";
import { parseQuizResults } from "./parse-quiz-results";

function App() {
  const pdfUpload: React.MutableRefObject<HTMLInputElement | null> = useRef(
    null
  );
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "" });
  const [picture, setPicture] = useState("");

  const responseFacebook = (response: any) => {
    console.log(response);
    setData(response);
    setPicture(response?.picture?.data?.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="container">
      <div style={{ width: "600px" }}>
        <div>
          {!login && (
            <FacebookLogin
              appId="2955360728083836"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          )}
          {login && <img src={picture} />}
        </div>
        {login && (
          <div>
            <div>
              <p>{data.name && data.name.length && data.name.split(/\s/)[0]}</p>
              <p>{data.email}</p>
            </div>
            <input
              type="file"
              ref={pdfUpload}
              onChange={() => {
                const fileList = pdfUpload.current?.files;
                if (fileList) {
                  const file = Array.from(fileList)[0];
                  getTextFromPdf(file)
                    .then((results) => {
                      console.log(results);
                      console.log(results.length);
                      console.log(parseQuizResults(results));
                    })
                    .catch(console.log);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
