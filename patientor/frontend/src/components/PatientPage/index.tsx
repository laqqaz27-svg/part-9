import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { Gender, Patient } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id) {
      void patientService.getOne(id).then(setPatient);
    }
  }, [id]);

  if (!patient) {
    return <Typography>Loading patient information...</Typography>;
  }

  const genderIcon = patient.gender === Gender.Female
    ? <Female />
    : patient.gender === Gender.Male
      ? <Male />
      : <Transgender />;

  return (
    <div>
      <Typography variant="h4" component="h1">
        {patient.name} {genderIcon}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography>
      <Typography variant="h5" component="h2" sx={{ marginTop: "1em" }}>
        entries
      </Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries</Typography>
      ) : (
        patient.entries.map((entry, index) => (
          <Typography key={index}>{JSON.stringify(entry)}</Typography>
        ))
      )}
    </div>
  );
};

export default PatientPage;
