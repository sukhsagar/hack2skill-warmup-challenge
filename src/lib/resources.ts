import { OfficialResource } from '@/types';

export const OFFICIAL_RESOURCES: OfficialResource[] = [
  {
    name: 'National Consumer Helpline (NCH)',
    organization: 'Ministry of Consumer Affairs, Govt. of India',
    description: 'Toll-free grievance registration for service deficiency, unfair deduction, or deceptive platform practices.',
    url: 'https://consumerhelpline.gov.in',
    helpline: '1915 / SMS: 8800001915',
    category: 'unfair_deductions',
  },
  {
    name: 'e-Shram Portal (UAN for Unorganised Workers)',
    organization: 'Ministry of Labour & Employment, Govt. of India',
    description: 'National database of unorganised & gig workers. Provides accidental insurance coverage under PMSBY (up to ₹2 Lakh).',
    url: 'https://eshram.gov.in',
    helpline: '14434',
    category: 'welfare_schemes',
  },
  {
    name: 'SAMADHAN Portal (Labour Grievances)',
    organization: 'Ministry of Labour & Employment, Govt. of India',
    description: 'Conciliation and dispute settlement mechanism for industrial and employment-related disputes.',
    url: 'https://samadhan.labour.gov.in',
    helpline: '1800-180-1111',
    category: 'delayed_wages',
  },
  {
    name: 'Code on Social Security (Gig & Platform Workers)',
    organization: 'Govt. of India',
    description: 'Statutory framework recognizing platform workers and enabling social security funds and welfare boards.',
    url: 'https://labour.gov.in',
    category: 'welfare_schemes',
  },
  {
    name: 'State Gig Workers Welfare Boards (e.g., Rajasthan & Karnataka)',
    organization: 'State Labour Departments',
    description: 'State statutory boards offering social security registration, grievance redressal, and dispute mediation for gig workers.',
    url: 'https://rajlabour.nic.in',
    category: 'general',
  },
  {
    name: 'Platform Internal Grievance Officers',
    organization: 'Statutory Grievance Mechanism under IT Rules & Consumer Protection Rules',
    description: 'Mandatory grievance officers for intermediaries (Zomato, Swiggy, Uber, Ola, etc.) required to acknowledge within 48h.',
    url: 'https://www.meity.gov.in',
    category: 'account_suspension',
  },
];
