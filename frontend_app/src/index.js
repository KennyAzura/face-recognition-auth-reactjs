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
  "Mgo+DSMBaFt+QHJqVk1nQ1NEaV1CX2BZd1l0R2lddk4BCV5EYF5SRHBdQl1qS3xWdkJmXno=;Mgo+DSMBPh8sVXJ1S0R+X1pDaV1CQmFJfFBmTGlbfVR0fUU3HVdTRHRcQlthSX5adEdmWXhWcHE=;ORg4AjUWIQA/Gnt2VFhiQlJPcUBAXXxLflF1VWpTfVx6cFxWESFaRnZdQV1lS35Tf0dhXH9WcHRQ;MjQ3NTQxM0AzMjMxMmUzMDJlMzBpVHpUQlJ4YkdtUzRndmRBOEF4VnUxaDVoa2hTUklBY244TnlpK0pPcHkwPQ==;MjQ3NTQxNEAzMjMxMmUzMDJlMzBUeWgrOTFvRERjSTJzb3V0Z0ZuUFNFUC9RTGxzMVd5aml1cFNHY0hqMW80PQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfVhdX2NWfFN0RnNQdVxyflFPcC0sT3RfQF5jT3xTdkxhW3peeH1TQw==;MjQ3NTQxNkAzMjMxMmUzMDJlMzBQd1BIZmMyUnY1MzR3TVNnYVczUmd6RDEyaldZTERHTGxqSTJ6TEExQnAwPQ==;MjQ3NTQxN0AzMjMxMmUzMDJlMzBiOE1hNktudHloQVd2cmh0Nmw3RFpWSy9RV0hoUWcwTVR6MlVJR0ZKQnBnPQ==;Mgo+DSMBMAY9C3t2VFhiQlJPcUBAXXxLflF1VWpTfVx6cFxWESFaRnZdQV1lS35Tf0dhXH9XeHVQ;MjQ3NTQxOUAzMjMxMmUzMDJlMzBPZ1JYQU4yWmVqTFBiTkZUWmhGV3FUQSszUjJENDNJOTZsdnhIMUxhcnZBPQ==;MjQ3NTQyMEAzMjMxMmUzMDJlMzBKRlhNek5aWGZkVjg4YjVkK1I2VjBGbUlJdVczQnBiMmVmaVg4U1daV1ZnPQ==;MjQ3NTQyMUAzMjMxMmUzMDJlMzBQd1BIZmMyUnY1MzR3TVNnYVczUmd6RDEyaldZTERHTGxqSTJ6TEExQnAwPQ=="
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
