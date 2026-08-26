import { FormEvent, useState } from "react";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";

import { NewHealthCheckEntry } from "../../types";
import patientService from "../../services/patients";

interface Props {
  patientId: string;
  onEntryAdded: (entry: NewHealthCheckEntry & { id: string }) => void;
  onCancel: () => void;
}

const AddHealthCheckEntryForm = ({ patientId, onEntryAdded, onCancel }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [error, setError] = useState<string>();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);

    const entry: NewHealthCheckEntry = {
      type: "HealthCheck",
      date,
      description,
      specialist,
      healthCheckRating: Number(healthCheckRating) as NewHealthCheckEntry["healthCheckRating"],
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(",").map((code) => code.trim())
        : undefined
    };

    try {
      const addedEntry = await patientService.addEntry(patientId, entry);
      onEntryAdded(addedEntry as NewHealthCheckEntry & { id: string });
      onCancel();
    } catch {
      setError("Could not add entry. Check that all values are valid.");
    }
  };

  return (
    <Paper component="form" onSubmit={submit} variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h5" component="h2">New HealthCheck Entry</Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TextField required fullWidth label="Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} InputLabelProps={{ shrink: true }} margin="normal" />
      <TextField required fullWidth label="Description" value={description} onChange={(event) => setDescription(event.target.value)} margin="normal" />
      <TextField required fullWidth label="Specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} margin="normal" />
      <TextField required fullWidth label="Health Check Rating (0-3)" type="number" inputProps={{ min: 0, max: 3 }} value={healthCheckRating} onChange={(event) => setHealthCheckRating(event.target.value)} margin="normal" />
      <TextField fullWidth label="Diagnosis Codes (comma-separated)" value={diagnosisCodes} onChange={(event) => setDiagnosisCodes(event.target.value)} margin="normal" />
      <Button type="submit" variant="contained" sx={{ marginRight: 1 }}>Add</Button>
      <Button type="button" onClick={onCancel}>Cancel</Button>
    </Paper>
  );
};

export default AddHealthCheckEntryForm;
