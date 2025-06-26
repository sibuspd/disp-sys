import React from "react";
import "./recordModal.css";

const RecordModal = () => {
  return (
    <div className="record-modal">
      <div className="student-modal-report">
        <div>Sabya</div>
        <div>sibuspd@gmail.com</div>
        <div>234</div>
      </div>

      <div className="student-details-scroll">
        <div className="student-modal-detail">
          <div className="student-modal-header">
            {new Date().toDateString()}
          </div>

          <div className="student-modal-body-student">
            <div className="student-modal-body-header">
              <div>Medicine Name</div>
              <div>Quantity</div>
            </div>

            <div className="student-modal-body-item">
              <div className="student-item-modal">
                <div>Acetaminophen</div>
                <div>23</div>
              </div>
              <div className="student-item-modal">
                <div>Cefixime & Potassium Clauvunate</div>
                <div>12</div>
              </div>
            </div>
          </div>
        </div>
        <div className="student-modal-detail">
          <div className="student-modal-header">
            {new Date().toDateString()}
          </div>

          <div className="student-modal-body-student">
            <div className="student-modal-body-header">
              <div>Medicine Name</div>
              <div>Quantity</div>
            </div>

            <div className="student-modal-body-item">
              <div className="student-item-modal">
                <div>Acetaminophen</div>
                <div>23</div>
              </div>
              <div className="student-item-modal">
                <div>Cefixime & Potassium Clauvunate</div>
                <div>12</div>
              </div>
            </div>
          </div>
        </div>
        <div className="student-modal-detail">
          <div className="student-modal-header">
            {new Date().toDateString()}
          </div>

          <div className="student-modal-body-student">
            <div className="student-modal-body-header">
              <div>Medicine Name</div>
              <div>Quantity</div>
            </div>

            <div className="student-modal-body-item">
              <div className="student-item-modal">
                <div>Acetaminophen</div>
                <div>23</div>
              </div>
              <div className="student-item-modal">
                <div>Cefixime & Potassium Clauvunate</div>
                <div>12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordModal;
