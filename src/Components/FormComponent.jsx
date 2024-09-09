import { useLocation } from 'react-router-dom';
import DiscreetForm from './Forms/Discrete_Enquiry_Form';
import RadicalizationForm from './Forms/Radicalisation_Enquiry_Form';
import Lodge from './Forms/Lodge'
import HoaxCallForm from "./Forms/Hoax_Call_Form";
import MinutesOfMeetingForm from "./Forms/Minutes_of_meeting_Form";
import VitalInstallationForm from "./Forms/Vital_Installation_Form";
import ICPForm from "./Forms/Icp_Form";
import MadarsaForm from "./Forms/Madarsa_Form";


const FormComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formType = queryParams.get('type');

  return (
    <div>
      {formType === 'Discreet Enquiry' && <DiscreetForm />}
      {formType === 'Open Enquiry' && <DiscreetForm />}
      {formType === 'Radicalisation Enquiry' && <RadicalizationForm />}
      {formType === 'De-Radicalisation Enquiry' && <RadicalizationForm />}
      {formType === 'Lodged FIR Enquiry' && <Lodge/>}
      {formType === 'Missing Enquiry' && <Lodge/>}
      {formType === 'Minutes of Meeting' && <MinutesOfMeetingForm selectedEnquiry={formType}/>}
      {formType === 'Vital Installation' && <VitalInstallationForm selectedEnquiry={formType}/>}
      {formType === 'ICP (Emergency Certificate)' && <ICPForm selectedEnquiry={formType}/>}
      {formType === 'Hoax Call' && <HoaxCallForm selectedEnquiry={formType}/>}
      {formType === 'Madarsa' && <MadarsaForm selectedEnquiry={formType}/>}

      {!formType && <p>Please select a form type.</p>}
    </div>
  );
};

export default FormComponent;