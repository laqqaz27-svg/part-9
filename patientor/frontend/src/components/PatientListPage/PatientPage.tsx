import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import patientService from "../services/patients";
import type { Patient } from "../types";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      void patientService.getOne(id).then(patient => {
        setPatient(patient);
      });
    }
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">
        {patient.name}
      </Typography>

      <Typography>
        Date of birth: {patient.dateOfBirth}
      </Typography>

      <Typography>
        Gender: {patient.gender}
      </Typography>

      <Typography>
        Occupation: {patient.occupation}
      </Typography>

      <Typography>
        SSN: {patient.ssn}
      </Typography>
    </div>
  );
};

export default PatientPage;