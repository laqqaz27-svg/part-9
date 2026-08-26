import {
  HealthAndSafety,
  LocalHospital,
  Work
} from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";

import HealthRatingBar from "../HealthRatingBar";
import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const diagnosisList = entry.diagnosisCodes?.map((code) => (
    <li key={code}>
      {code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name ?? "Unknown diagnosis"}
    </li>
  ));

  const entryDetails = () => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <>
            <Typography>
              <HealthAndSafety /> Health check
            </Typography>
            <HealthRatingBar
              rating={entry.healthCheckRating}
              showText={false}
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <Typography>
              <Work /> Occupational healthcare
            </Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            {entry.sickLeave ? (
              <Typography>
                Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
              </Typography>
            ) : null}
          </>
        );
      case "Hospital":
        return (
          <>
            <Typography>
              <LocalHospital /> Hospital
            </Typography>
            <Typography>
              Discharge: {entry.discharge.date}, {entry.discharge.criteria}
            </Typography>
          </>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <Paper variant="outlined" sx={{ padding: 1, marginBottom: 1 }}>
      <Typography>
        {entry.date} <em>{entry.description}</em>
      </Typography>
      {entryDetails()}
      {diagnosisList && diagnosisList.length > 0 ? (
        <ul>{diagnosisList}</ul>
      ) : null}
      <Typography>diagnose by {entry.specialist}</Typography>
    </Paper>
  );
};

export default EntryDetails;
