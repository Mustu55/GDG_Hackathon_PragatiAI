export const mockIssues = [
  {
    id: "ISS-001",
    title: "Severe Water Contamination",
    category: "Water",
    location: "Ward 7",
    coordinates: [19.0760, 72.8777],
    severity: "Critical",
    affectedCitizens: 340,
    criticalInfrastructure: ["2 Schools", "1 PHC"],
    trend: "Increasing",
    status: "Open",
    department: "Water Supply",
    confidence: 96,
    description: "Multiple reports of contaminated water supply and broken pipelines. Requires immediate inspection.",
    recentComplaints: ["COMP-2024-001", "COMP-2024-005"]
  },
  {
    id: "ISS-002",
    title: "Major Potholes on Bypass",
    category: "Roads",
    location: "Bypass Road, Sector 4",
    coordinates: [19.0800, 72.8800],
    severity: "High",
    affectedCitizens: 120,
    criticalInfrastructure: [],
    trend: "Stable",
    status: "In Progress",
    department: "Public Works",
    confidence: 88,
    description: "Large potholes causing accidents. Road repair initiated.",
    recentComplaints: ["COMP-2024-002"]
  }
];
