import JobPage from '../JobPage'

class CompanyInformation extends JobPage {
  get recruiterField() {
    return this.getField('Recruiter')
  }

  get salesOwnerField() {
    return this.getField('Sales Owner')
  }

  get recruiterEditButton() {
    return this.recruiterField.find('button')
  }

  get salesOwnerEditButton() {
    return this.salesOwnerField.find('button')
  }
}

export default CompanyInformation
