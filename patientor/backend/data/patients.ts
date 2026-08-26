import type { Patient } from '../src/types.ts';

const patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: 'male',
    occupation: 'New york city cop',
    entries: [
      {
        id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.'
        }
      }
    ]
  },
  {
  id: "d2773abc-f723-11e9-8f0b-362b9e155667",
  name: "Sarah Johnson",
  dateOfBirth: "1992-03-15",
  ssn: "150392-123A",
  gender: "female",
  occupation: "Software Developer",
  entries: [
    {
      id: 'd811e46e-70b3-4d90-b090-4535c7cf8fb1',
      date: '2019-08-05',
      type: 'OccupationalHealthcare',
      specialist: 'Dr. Smith',
      employerName: 'Acme Corporation',
      description: 'Annual occupational health check.'
    }
  ]
},
{
  id: "d2773abd-f723-11e9-8f0b-362b9e155667",
  name: "Michael Brown",
  dateOfBirth: "1988-11-22",
  ssn: "221188-456B",
  gender: "male",
  occupation: "Teacher",
  entries: []
},
{
  id: "d2773abe-f723-11e9-8f0b-362b9e155667",
  name: "Grace Williams",
  dateOfBirth: "1995-06-10",
  ssn: "100695-789C",
  gender: "female",
  occupation: "Nurse",
  entries: []
},
{
  id: "d2773abf-f723-11e9-8f0b-362b9e155667",
  name: "David Anderson",
  dateOfBirth: "1982-09-05",
  ssn: "050982-321D",
  gender: "male",
  occupation: "Engineer",
  entries: []
}

];

export default patients;
