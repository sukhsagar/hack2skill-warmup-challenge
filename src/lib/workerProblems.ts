export interface CrowdSourcedIssue {
  id: string;
  source: 'Reddit r/india' | 'Reddit r/bangalore' | 'Reddit r/delhi' | 'All India Gig Workers Union (AIGWU)' | 'Telangana Gig Workers';
  workType: 'delivery' | 'cab_driver' | 'warehouse' | 'daily_wage' | 'general';
  platform?: string;
  title: string;
  description: string;
  category: 'delayed_wages' | 'unfair_deductions' | 'missing_incentives' | 'account_suspension' | 'workplace_safety' | 'welfare_schemes';
  workerQuote: string;
}

export const CROWDSOURCED_WORKER_PROBLEMS: CrowdSourcedIssue[] = [
  // 1. Zomato / Swiggy Delivery issues
  {
    id: 'reddit-del-1',
    source: 'Reddit r/bangalore',
    workType: 'delivery',
    platform: 'Swiggy',
    title: 'Rain Surge Incentive Denied After 24 Target Deliveries',
    category: 'missing_incentives',
    workerQuote: 'Completed 24 orders in heavy rain storm; app showed milestone reached but final weekly payout deducted the ₹600 rain bonus claiming "GPS anomaly".',
    description: 'Rider achieved the target milestone in rain surge conditions, but the bonus was withheld without notice or proof of violation.',
  },
  {
    id: 'reddit-del-2',
    source: 'Reddit r/delhi',
    workType: 'delivery',
    platform: 'Zomato',
    title: 'Instant Account Block After Customer Cancelled Late',
    category: 'account_suspension',
    workerQuote: 'Arrived at location, waited 20 minutes outside society gate in Gurgaon. Customer cancelled and claimed non-delivery. ID deactivated next morning without any appeal.',
    description: 'Sudden platform deactivation following a customer fraud complaint without affording the delivery partner a show-cause or fair hearing.',
  },
  {
    id: 'reddit-del-3',
    source: 'Reddit r/india',
    workType: 'delivery',
    platform: 'Zepto',
    title: 'Unfair 10-Minute Delivery Penalties & Withheld Wages',
    category: 'unfair_deductions',
    workerQuote: 'Got docked ₹250 per order because store packing was delayed by 7 minutes, yet the app marked it as rider delay.',
    description: 'Deductions levied on quick-commerce riders for warehouse dispatch bottlenecks outside rider control.',
  },

  // 2. Cab / Auto Driver issues
  {
    id: 'reddit-cab-1',
    source: 'Reddit r/bangalore',
    workType: 'cab_driver',
    platform: 'Uber',
    title: 'Withholding Airport Toll & Commission Spike Over 32%',
    category: 'unfair_deductions',
    workerQuote: 'I paid ₹140 toll out of pocket at KIAL airport, passenger paid through app, but the reimbursement never reflected in my weekly statement.',
    description: 'Failure to reimburse out-of-pocket tolls and unexpected platform commission jumps exceeding agreed rate cards.',
  },
  {
    id: 'reddit-cab-2',
    source: 'Telangana Gig Workers',
    workType: 'cab_driver',
    platform: 'Ola',
    title: 'Sudden Rating Drop Below 4.7 Resulted in Immediate Shadow-Ban',
    category: 'account_suspension',
    workerQuote: 'Two customers rated 1-star due to city traffic delays on Silk Board road. Account suspended without letting me submit trip GPS logs.',
    description: 'Algorithmic penalties and account throttling based solely on subjective customer ratings without manual human review.',
  },
  {
    id: 'reddit-cab-3',
    source: 'Reddit r/delhi',
    workType: 'cab_driver',
    platform: 'Rapido',
    title: 'Emergency Medical Cover Unresponsive After Night Shift Hit-and-Run',
    category: 'workplace_safety',
    workerQuote: 'Suffered shoulder injury during a bike-taxi drop in Noida. Emergency SOS in app gave an automated bot reply. Hospital bills had to be paid by taking local debt.',
    description: 'Platform on-duty group accident insurance is inaccessible or uncooperative when road incidents occur.',
  },

  // 3. Warehouse & Daily-Wage issues
  {
    id: 'aigwu-wh-1',
    source: 'All India Gig Workers Union (AIGWU)',
    workType: 'warehouse',
    platform: 'Blinkit',
    title: '14-Hour Shift Without Overtime Pay or Drinking Water Facilities',
    category: 'workplace_safety',
    workerQuote: 'Dark store manager forced 14-hour double shifts during festival sale with zero overtime allowance and no clean rest areas.',
    description: 'Violation of statutory daily working hour limits (Section 25 of Occupational Safety Code) and denial of basic hydration facilities.',
  },
  {
    id: 'reddit-gen-1',
    source: 'Reddit r/india',
    workType: 'daily_wage',
    platform: 'General / Contractor',
    title: 'Subcontractor Disappeared with 3 Weeks of Construction Wages',
    category: 'delayed_wages',
    workerQuote: '12 daily-wage laborers completed concrete casting work. Contractor turned phone off on payout Saturday. Pending ₹34,000 in total.',
    description: 'Non-payment of wages by labor supply intermediaries; recourse under the Payment of Wages Act and e-Shram unorganized worker registry.',
  },
  {
    id: 'reddit-welfare-1',
    source: 'Reddit r/india',
    workType: 'general',
    platform: 'Urban Company',
    title: 'e-Shram Registration Benefits & Platform Social Security Fund',
    category: 'welfare_schemes',
    workerQuote: 'How do I claim the ₹2 Lakh accidental insurance on e-Shram card if injured while doing home appliance repair service?',
    description: 'Navigating government welfare schemes, accidental death/disability coverage under PM Suraksha Bima Yojana, and state gig welfare boards.',
  },
];
