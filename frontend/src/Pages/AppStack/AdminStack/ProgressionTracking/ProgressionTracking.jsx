import React, { useState } from "react";
import BreadCrumb from "../../../../Components/BreadCrumb/BreadCrumb";
import ProgressionForm from "./ProgressionForm";
import ProgressionResults from "./ProgressionResultsDisplay";
import ProgressionChart from "./ProgressionChart";
import axios from "axios";
import Toaster from "../../../../Utils/Toaster/Toaster";

export default function ProgressionTracking() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://cognicare.dementiaguard.live/gateway/api/v1/progression-tracking-service/predict",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to predict progression");
      console.error("Error predicting progression:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <BreadCrumb
          page={"Progression Tracking"}
          icon={"fa-solid fa-percent"}
        />

        <div className="row mb-5">
          <div className="col-xl-12">
            <ProgressionForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              onReset={handleReset}
            />
          </div>
        </div>

        {results && (
          <>
            <div className="row mb-5">
              <div className="col-xl-12">
                <ProgressionChart results={results} />
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <ProgressionResults results={results} />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
