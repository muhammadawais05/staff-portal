export const legalStaTermsMock = () => ({
  activeStaContract: {
    webResource: {
      url: 'http://localhost:3000/platform/staff/contracts/277765',
      text: 'Rare Candy Collectables Client STA'
    },
    id: 'VjEtQ29udHJhY3QtMjc3NzY1',
    title: 'Rare Candy Collectables Client STA',
    status: 'SIGNED',
    kind: 'STA',
    signatureReceivedAt: '2022-02-24T05:12:50-05:00',
    staTerms: {
      id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTI1OTY1Nzk',
      standard: true,
      terminationPeriodInDays: 10,
      terminationPeriodApplicable: true
    }
  }
})
