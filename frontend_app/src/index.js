import React from "react";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { registerLicense } from "@syncfusion/ej2-base";

// Registering Syncfusion license key
registerLicense(
  "Mgo+DSMBaFt+QHJqVk1mQ1lbdF9AXnNBdFB1T2Bdbz4Nf1dGYl9RQXZWQF1gT35WckVrWg==;Mgo+DSMBPh8sVXJ1S0R+X1pCaVddX2NLfUN+T2BadV10ZDU7a15RRnVfR11qS35QcEVmXXhacw==;ORg4AjUWIQA/Gnt2VFhiQlJPcEBKQmFJfFBmTWlafFRzcEUmHVdTRHRcQlhjQHxTdUNjXHpZc3c=;MTk4ODI2MUAzMjMxMmUzMjJlMzNYZzhxQ25lR2VXUDN6Mm5udjJTeVI4MjczNGhEUTg4Uk4wTFhRU3lNVzJjPQ==;MTk4ODI2MkAzMjMxMmUzMjJlMzNsZlpZeEZpVEZaQXV1dHd5Q094VXlrL2lZN1JOSXVaQno0dGVpL3FRVjBvPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfVldVXxLflF1VWtTfF16d1FWACFaRnZdQV1mSXdRdkZlWXled3FQ;MTk4ODI2NEAzMjMxMmUzMjJlMzNWenBOL3RUUnlQVzdsUVdqZWU0ZlF2alQwS1lDL1JWVjdUVXN4dm5PRlp3PQ==;MTk4ODI2NUAzMjMxMmUzMjJlMzNUY09UWUcrcWYvbTdhMEN1UWFMVEJUOVRMNTlIQUk0K3lmUEQ4NGRxYWY4PQ==;Mgo+DSMBMAY9C3t2VFhiQlJPcEBKQmFJfFBmTWlafFRzcEUmHVdTRHRcQlhjQHxTdUNjX3lfd3A=;MTk4ODI2N0AzMjMxMmUzMjJlMzNPSWgrSWJQYlc2bXpnRE9UMnZhWEJBcW9BSmRqallwNzhOOVJjMmg4cjZvPQ==;MTk4ODI2OEAzMjMxMmUzMjJlMzNPdVRmcEdyQnpIU2xKSG1kbnFSZ3BmU3MzL2FuNnRtOHVFU1kvd09FOHNjPQ==;MTk4ODI2OUAzMjMxMmUzMjJlMzNWenBOL3RUUnlQVzdsUVdqZWU0ZlF2alQwS1lDL1JWVjdUVXN4dm5PRlp3PQ=="
);

const root = createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
