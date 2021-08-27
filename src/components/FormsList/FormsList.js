import React from "react";
import { Link } from "react-router-dom";
import styles from "./FormsList.module.css";

// Mapping forms. Checking if its closed or open.
const FormsList = ({ data }) => {
  return (
    <div>
      {data.map(
        ({
          id,
          firstName,
          lastName,
          applicationNo,
          isClosed,
          createdAt,
          respondAt,
        }) => {
          return (
            <Link
              className={styles.user}
              key={id}
              to={`/admin/basvuru/${applicationNo}`}
            >
              <div className={styles.info}>
                <h2 className={isClosed ? styles.green : styles.red}>
                  {" "}
                  {`${firstName} ${lastName}`}
                </h2>
                <h2
                  className={isClosed ? styles.green : styles.red}
                >{`  ${(isClosed ? respondAt : createdAt)
                  .toDate()
                  .toLocaleDateString()} 
                 ${(isClosed ? respondAt : createdAt)
                   .toDate()
                   .toLocaleTimeString("tr-TR")}`}</h2>
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
};

export default FormsList;
