import { FormEvent, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";

import { Diagnosis, Entry, NewEntry } from "../../types";
import patientService from "../../services/patients";

interface Props {
  patientId: string;
  diagnoses: Diagnosis[];
  onEntryAdded: (entry: Entry) => void;
  onCancel: () => void;
}

type EntryType = NewEntry["type"];

const AddHealthCheckEntryForm = ({ patientId, diagnoses, onEntryAdded, onCancel }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number | "">(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string>();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);

    const commonFields = {
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
    };

    let entry: NewEntry;
    switch (entryType) {
      case "HealthCheck":
        entry = {
          ...commonFields,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating as 0 | 1 | 2 | 3
        };
        break;
      case "OccupationalHealthcare":
        entry = {
          ...commonFields,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: sickLeaveStart && sickLeaveEnd
            ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
            : undefined
        };
        break;
      case "Hospital":
        entry = {
          ...commonFields,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;
    }

    try {
      const addedEntry = await patientService.addEntry(patientId, entry);
      onEntryAdded(addedEntry);
      onCancel();
    } catch {
      setError("Could not add entry. Check that all values are valid.");
    }
  };

  return (
    <Paper component="form" onSubmit={submit} variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h5" component="h2">New Entry</Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="entry-type-label">Entry type</InputLabel>
        <Select labelId="entry-type-label" label="Entry type" value={entryType} onChange={(event) => setEntryType(event.target.value as EntryType)}>
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>
      <TextField required fullWidth label="Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} InputLabelProps={{ shrink: true }} margin="normal" />
      <TextField required fullWidth label="Description" value={description} onChange={(event) => setDescription(event.target.value)} margin="normal" />
      <TextField required fullWidth label="Specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} margin="normal" />
      {entryType === "HealthCheck" ? (
        <FormControl fullWidth required margin="normal">
          <InputLabel id="health-check-rating-label">Health Check Rating</InputLabel>
          <Select
            labelId="health-check-rating-label"
            label="Health Check Rating"
            value={healthCheckRating}
            onChange={(event) => setHealthCheckRating(event.target.value as 0 | 1 | 2 | 3)}
          >
            <MenuItem value={0}>0 - Healthy</MenuItem>
            <MenuItem value={1}>1 - Low Risk</MenuItem>
            <MenuItem value={2}>2 - High Risk</MenuItem>
            <MenuItem value={3}>3 - Critical Risk</MenuItem>
          </Select>
        </FormControl>
      ) : null}
      {entryType === "OccupationalHealthcare" ? (
        <>
          <TextField required fullWidth label="Employer Name" value={employerName} onChange={(event) => setEmployerName(event.target.value)} margin="normal" />
          <TextField fullWidth label="Sick Leave Start" type="date" value={sickLeaveStart} onChange={(event) => setSickLeaveStart(event.target.value)} InputLabelProps={{ shrink: true }} margin="normal" />
          <TextField fullWidth label="Sick Leave End" type="date" value={sickLeaveEnd} onChange={(event) => setSickLeaveEnd(event.target.value)} InputLabelProps={{ shrink: true }} margin="normal" />
        </>
      ) : null}
      {entryType === "Hospital" ? (
        <>
          <TextField required fullWidth label="Discharge Date" type="date" value={dischargeDate} onChange={(event) => setDischargeDate(event.target.value)} InputLabelProps={{ shrink: true }} margin="normal" />
          <TextField required fullWidth label="Discharge Criteria" value={dischargeCriteria} onChange={(event) => setDischargeCriteria(event.target.value)} margin="normal" />
        </>
      ) : null}
      <FormControl fullWidth margin="normal">
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          multiple
          labelId="diagnosis-codes-label"
          label="Diagnosis Codes"
          value={diagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value as string[])}
          renderValue={(selected) => selected.join(", ")}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ marginRight: 1 }}>Add</Button>
      <Button type="button" onClick={onCancel}>Cancel</Button>
    </Paper>
  );
};

export default AddHealthCheckEntryForm;
