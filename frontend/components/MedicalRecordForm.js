// Exemplo de payload para envio
const payload = {
    medicalRecordData: {
        medicalRecordNumber: "12345",
        auditorId: 1,
        auditorSectorId: 5,
        auditDate: "2024-01-15",
        patientId: 42,
        dischargeSectorId: 3,
        admissionStartDate: "2024-01-01",
        admissionEndDate: "2024-01-10"
    },
    failures: [
        {
            description: "Falha de medicação",
            formId: 2,
            inconsistencyTypeId: 5
        },
        {
            description: "Falha de procedimento",
            formId: 2,
            inconsistencyTypeId: 7
        }
    ]
}; 