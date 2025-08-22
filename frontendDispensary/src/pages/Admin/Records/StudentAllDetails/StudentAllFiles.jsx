import React from "react";

const StudentAllFiles = (props) => {
  console.log(props?.selectedAllDetails);
  return (
    <div className="record-modal">
      <div className="student-modal-report">
        <div>{props?.selectedAllDetails[0]?.student?.name}</div>
        <div>{props?.selectedAllDetails[0]?.student?.email}</div>
        <div>{props?.selectedAllDetails[0]?.student?.roll}</div>
      </div>

      <div className="student-details-scroll">
        {props.selectedAllDetails.map((item, index) => { // Usage on a particular date (Parent Map method)
          return (
            <div key={index} className="student-modal-detail">
              <div className="student-modal-header">
                {item.createdAt
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>

              <div className="student-modal-body-student">
                <div className="student-modal-body-header">
                  <div>Medicine Name</div>
                  <div>Quantity</div>
                </div>

                <div className="student-modal-body-item">
                  {item.medicines.map((item, index) => { // Usage of all medicines within a particular date (Child Map method)
                    return (
                      <div key={index} className="student-item-modal">
                        <div>{item?.name}</div>
                        <div>{item?.requiredQuantity}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentAllFiles;
