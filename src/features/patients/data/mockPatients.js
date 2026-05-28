export const MOCK_PATIENTS = [
  {
    id: 'PT-2026-00452',
    fileNo: 'FILE-OPD-9845',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'john.doe@example.com',
    aadhaar: 'XXXX-XXXX-4567',
    address: '123 Main St, Mumbai',
    bloodGroup: 'O+',
    dob: '1980-05-15',
    allergies: ['Penicillin'],
    chronicConditions: ['Hypertension', 'Diabetes'],
    doctor: 'Dr. Sharma',
    department: 'Cardiology',
    lastVisit: 'NA',
    payment: 'Paid',
    type: 'New',
    status: 'In Consultation',
    currentVisit: {
      token: 'T-001',
      doctor: 'Dr. Sharma',
      room: 'OPD-03',
      time: '09:00',
      status: 'In-consultation',
      pendingItems: 'No pending labs or follow-ups'
    },
    visits: [
      {
        date: '2026-04-15',
        doctor: 'Dr. Sharma',
        department: 'Cardiology',
        room: 'OPD-03',
        type: 'Offline',
        symptoms: 'Chest discomfort, mild palpitations',
        chiefComplaint: 'Chest discomfort',
        examinationFindings: 'Patient appears alert and oriented. Vitals stable. Cardiovascular exam reveals regular rate and rhythm.',
        assessment: 'Stable on current medications. No acute concerns identified.',
        diagnosis: 'Mild angina',
        treatmentPlan: 'Continue current medications. Lifestyle modifications advised.',
        followUp: '1 month',
        prescription: [
          { medicine: 'Isosorbide mononitrate 20mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' },
          { medicine: 'Aspirin 75mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' }
        ],
        labOrders: [
          { test: 'ECG', priority: 'Routine', status: 'Completed' },
          { test: 'Lipid Profile', priority: 'Routine', status: 'Completed' }
        ],
        attachments: ['ECG_Report.pdf', 'Lab_Result.pdf', 'Chest_Xray.jpg', 'Prescription']
      },
      {
        date: '2026-03-02',
        doctor: 'Dr. Kumar',
        department: 'General Medicine',
        room: 'OPD-02',
        type: 'Offline',
        symptoms: 'High BP readings at home',
        chiefComplaint: 'High BP',
        examinationFindings: 'Vitals: BP 150/95 mmHg, Pulse 82 bpm. Lungs clear, heart sounds normal.',
        assessment: 'Hypertension not well-controlled on current therapy.',
        diagnosis: 'Uncontrolled hypertension',
        treatmentPlan: 'Adjust dosage of antihypertensive medication. Monitor BP at home daily.',
        followUp: '2 weeks',
        prescription: [
          { medicine: 'Lisinopril 20mg', dosage: '1 tablet', frequency: 'Once daily', duration: '14 days' }
        ],
        labOrders: [
          { test: 'Renal function tests', priority: 'Routine', status: 'Completed' }
        ],
        attachments: ['Lab_Result_RFT.pdf']
      },
      {
        date: '2025-12-10',
        doctor: 'Dr. Rao',
        department: 'General Medicine',
        room: 'OPD-02',
        type: 'Online',
        symptoms: 'Routine check-up',
        chiefComplaint: 'Routine check-up',
        examinationFindings: 'Teleconsultation. Patient reports feeling well. No active physical complaints.',
        assessment: 'Diabetes mellitus type 2 - well controlled.',
        diagnosis: 'Healthy, continue current meds',
        treatmentPlan: 'Maintain current dietary regimen and exercise. Continue oral hypoglycemic agents.',
        followUp: '6 months',
        prescription: [
          { medicine: 'Continue Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '180 days' }
        ],
        labOrders: [
          { test: 'CBC', priority: 'Routine', status: 'Completed' },
          { test: 'HbA1c', priority: 'Routine', status: 'Completed' }
        ],
        attachments: ['HbA1c_Report.pdf']
      }
    ]
  },
  {
    id: 'PT-2026-00453',
    fileNo: 'FILE-OPD-9846',
    name: 'Sarah Johnson',
    age: 33,
    gender: 'Female',
    phone: '+91 98765 43211',
    email: 'sarah.j@example.com',
    aadhaar: 'XXXX-XXXX-8901',
    address: '456 Park Avenue, Mumbai',
    bloodGroup: 'A+',
    dob: '1993-08-24',
    allergies: ['Sulfa Drugs'],
    chronicConditions: ['Asthma'],
    doctor: 'Dr. Sharma',
    department: 'Cardiology',
    lastVisit: '2026-05-26',
    payment: 'Pending',
    type: 'Follow-up',
    status: 'Waiting',
    currentVisit: {
      token: 'T-002',
      doctor: 'Dr. Sharma',
      room: 'OPD-03',
      time: '09:30',
      status: 'Waiting',
      pendingItems: 'Pending billing clearance'
    },
    visits: [
      {
        date: '2026-05-26',
        doctor: 'Dr. Sharma',
        department: 'Cardiology',
        room: 'OPD-03',
        type: 'Offline',
        symptoms: 'Follow-up on palpitations, feels better.',
        chiefComplaint: 'Routine follow-up',
        examinationFindings: 'Heart sounds normal. BP 120/80 mmHg. Pulse 72 bpm.',
        assessment: 'Symptoms resolved. ECG looks normal.',
        diagnosis: 'Palpitations - Resolved',
        treatmentPlan: 'Discontinue temporary beta blocker. PRN usage only.',
        followUp: '2 months',
        prescription: [
          { medicine: 'Propranolol 10mg', dosage: '1 tablet', frequency: 'As needed (PRN)', duration: '60 days' }
        ],
        labOrders: [],
        attachments: ['ECG_Normal_May26.pdf']
      }
    ]
  },
  {
    id: 'PT-2026-00454',
    fileNo: 'FILE-OPD-9847',
    name: 'Michael Chen',
    age: 37,
    gender: 'Male',
    phone: '+91 98765 43212',
    email: 'm.chen@example.com',
    aadhaar: 'XXXX-XXXX-1234',
    address: '789 Link Road, Mumbai',
    bloodGroup: 'B+',
    dob: '1989-11-02',
    allergies: [],
    chronicConditions: [],
    doctor: 'Dr. Sharma',
    department: 'Cardiology',
    lastVisit: '2026-05-20',
    payment: 'Paid',
    type: 'New',
    status: 'Completed',
    currentVisit: null,
    visits: [
      {
        date: '2026-05-20',
        doctor: 'Dr. Sharma',
        department: 'Cardiology',
        room: 'OPD-03',
        type: 'Offline',
        symptoms: 'Chest muscle strain from gym',
        chiefComplaint: 'Chest pain on exertion',
        examinationFindings: 'Tenderness over chest wall muscles. Heart/lung exam unremarkable.',
        assessment: 'Musculoskeletal chest pain. Cardiac etiology ruled out.',
        diagnosis: 'Musculoskeletal chest strain',
        treatmentPlan: 'Rest from heavy lifting. Hot fermentation. Analgesics.',
        followUp: '1 week (if pain persists)',
        prescription: [
          { medicine: 'Ibuprofen 400mg', dosage: '1 tablet', frequency: 'Twice daily after food', duration: '5 days' },
          { medicine: 'Pantoprazole 40mg', dosage: '1 tablet', frequency: 'Once daily before food', duration: '5 days' }
        ],
        labOrders: [],
        attachments: ['Prescription_Strained_Muscle.pdf']
      }
    ]
  },
  {
    id: 'PT-2026-00455',
    fileNo: 'FILE-OPD-9848',
    name: 'Emily Rodriguez',
    age: 29,
    gender: 'Female',
    phone: '+91 98765 43213',
    email: 'emily.r@example.com',
    aadhaar: 'XXXX-XXXX-5678',
    address: '9A Bandra West, Mumbai',
    bloodGroup: 'AB-',
    dob: '1997-03-12',
    allergies: ['Peanuts'],
    chronicConditions: ['Migraine'],
    doctor: 'Dr. Kumar',
    department: 'General Medicine',
    lastVisit: '2026-05-25',
    payment: 'Pending',
    type: 'Follow-up',
    status: 'Waiting',
    currentVisit: {
      token: 'T-005',
      doctor: 'Dr. Kumar',
      room: 'OPD-02',
      time: '11:15',
      status: 'Waiting',
      pendingItems: '1 Pending Invoice Payment'
    },
    visits: [
      {
        date: '2026-05-25',
        doctor: 'Dr. Kumar',
        department: 'General Medicine',
        room: 'OPD-02',
        type: 'Offline',
        symptoms: 'Severe headache, aura, nausea',
        chiefComplaint: 'Migraine attack',
        examinationFindings: 'Photophobia present. Neurological screening normal. Vitals stable.',
        assessment: 'Acute migraine flare.',
        diagnosis: 'Migraine with Aura',
        treatmentPlan: 'Avoid bright lights. Take abortive therapy at onset.',
        followUp: '3 weeks',
        prescription: [
          { medicine: 'Sumatriptan 50mg', dosage: '1 tablet', frequency: 'At migraine onset', duration: '10 days' },
          { medicine: 'Domperidone 10mg', dosage: '1 tablet', frequency: 'Twice daily PRN', duration: '5 days' }
        ],
        labOrders: [],
        attachments: []
      }
    ]
  },
  {
    id: 'PT-2026-00456',
    fileNo: 'FILE-OPD-9849',
    name: 'David Kim',
    age: 52,
    gender: 'Male',
    phone: '+91 98765 43214',
    email: 'david.kim@example.com',
    aadhaar: 'XXXX-XXXX-9012',
    address: 'Flat 402, Green Meadows, Mumbai',
    bloodGroup: 'O-',
    dob: '1974-07-09',
    allergies: ['Aspirin'],
    chronicConditions: ['Hyperlipidemia'],
    doctor: 'Dr. Rao',
    department: 'General Medicine',
    lastVisit: '2026-05-18',
    payment: 'Paid',
    type: 'New',
    status: 'Completed',
    currentVisit: null,
    visits: [
      {
        date: '2026-05-18',
        doctor: 'Dr. Rao',
        department: 'General Medicine',
        room: 'OPD-02',
        type: 'Offline',
        symptoms: 'Annual physical, lipid check',
        chiefComplaint: 'Routine Annual Checkup',
        examinationFindings: 'BMI 27.2. Otherwise normal physical exam.',
        assessment: 'Hyperlipidemia under moderate control. Needs dietary improvement.',
        diagnosis: 'Mixed hyperlipidemia',
        treatmentPlan: 'Low fat, low carb diet. Aerobic exercises 30 mins/day.',
        followUp: '3 months',
        prescription: [
          { medicine: 'Atorvastatin 10mg', dosage: '1 tablet', frequency: 'Nightly', duration: '90 days' }
        ],
        labOrders: [
          { test: 'Lipid Panel', priority: 'Routine', status: 'Completed' }
        ],
        attachments: ['Lipid_Profile_May18.pdf']
      }
    ]
  },
  {
    id: 'PT-2026-00457',
    fileNo: 'FILE-OPD-9850',
    name: 'Priya Patel',
    age: 61,
    gender: 'Female',
    phone: '+91 98765 43215',
    email: 'priya.patel@example.com',
    aadhaar: 'XXXX-XXXX-3456',
    address: '101 Lotus Residency, Mumbai',
    bloodGroup: 'B-',
    dob: '1965-02-14',
    allergies: ['Contrast Dye'],
    chronicConditions: ['Osteoarthritis', 'Hypothyroidism'],
    doctor: 'Dr. Rao',
    department: 'General Medicine',
    lastVisit: '2026-05-10',
    payment: 'Paid',
    type: 'New',
    status: 'Archived',
    currentVisit: null,
    visits: [
      {
        date: '2026-05-10',
        doctor: 'Dr. Rao',
        department: 'General Medicine',
        room: 'OPD-02',
        type: 'Offline',
        symptoms: 'Bilateral knee pain, worse in morning',
        chiefComplaint: 'Joint Pain',
        examinationFindings: 'Mild swelling and crepitus in both knees. Range of motion slightly limited.',
        assessment: 'Knee Osteoarthritis, stable hypothyroidism.',
        diagnosis: 'Osteoarthritis of knee joints',
        treatmentPlan: 'Physiotherapy exercises. Weight management. Pain management.',
        followUp: '1 month',
        prescription: [
          { medicine: 'Levothyroxine 75mcg', dosage: '1 tablet', frequency: 'Morning empty stomach', duration: '90 days' },
          { medicine: 'Paracetamol 650mg', dosage: '1 tablet', frequency: 'Three times daily PRN', duration: '30 days' }
        ],
        labOrders: [
          { test: 'TSH level', priority: 'Routine', status: 'Completed' }
        ],
        attachments: ['Knee_Xray_Report.pdf', 'Thyroid_Profile.pdf']
      }
    ]
  }
];
