import { Document } from '../types/document';

export const documents: Document[] = [
  {
    id: 'aadhaar-card',
    name: 'Aadhaar Card',
    code: 'UIDAI-AADHAAR',
    category: 'identity',
    badgeText: 'Universal ID',
    shortDescription: '12-digit biometric and demographic unique identity number issued to all Indian residents.',
    fullDescription: 'Aadhaar is a 12-digit verifiable identification number issued by the Unique Identification Authority of India (UIDAI) on behalf of the Government of India. It serves as universal proof of identity and residence across India and is interconnected with essential civic and financial services.',
    iconName: 'Fingerprint',
    isPopular: true,
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
    estimatedProcessingTime: '15 - 30 days (Enrolment) | Instant (e-Aadhaar)',
    feeRange: 'Free for initial enrolment | ₹50 for demographic updates | ₹50 for PVC card',
    validityPeriod: 'Lifelong (Biometric update recommended every 10 years / at ages 5 & 15)',
    acceptanceLevel: 'National',
    keywords: [
      'aadhaar', 'aadhar', 'uidai', 'myaadhaar', 'biometric', 'fingerprint', 'iris', 
      'address change', 'demographic update', 'eaadhaar', 'e-aadhaar', 'pvc card', 
      'uid', 'eid', 'vid', 'mobile update', 'enrolment', 'identity proof', 'address proof'
    ],
    serviceTypes: ['creation', 'updation', 'download', 'replacement'],
    supportsStateSpecific: false,
    eligibility: [
      'Any individual residing in India for 182 days or more in the preceding 12 months',
      'No minimum or maximum age limit (Baal Aadhaar issued for children under 5)',
      'Non-Resident Indians (NRIs) holding valid Indian Passports'
    ],
    keyUses: [
      'Primary KYC proof for bank accounts, mutual funds, and mobile SIM cards',
      'Direct Benefit Transfer (DBT) for welfare schemes and LPG subsidies',
      'Mandatory linkage with PAN for income tax filing',
      'Paperless e-Sign and digital verification across government and private portals'
    ],
    availableServiceIds: [
      'aadhaar-enrolment',
      'aadhaar-update-demographic',
      'aadhaar-download-eaadhaar',
      'aadhaar-order-pvc'
    ],
    relatedDocumentIds: [
      'pan-card',
      'passport',
      'voter-id',
      'driving-licence',
      'birth-certificate'
    ],
    officialPlatform: {
      name: 'UIDAI myAadhaar Official Portal',
      portalName: 'myAadhaar Portal',
      authorityName: 'Unique Identification Authority of India, Ministry of Electronics & IT',
      url: 'https://myaadhaar.uidai.gov.in',
      isVerified: true,
      securityNote: 'Ensure the URL begins with myaadhaar.uidai.gov.in. UIDAI never requests OTPs over telephone calls or third-party SMS links.'
    }
  },
  {
    id: 'pan-card',
    name: 'PAN Card',
    code: 'CBDT-IT-PAN',
    category: 'financial',
    badgeText: 'Tax & Financial ID',
    shortDescription: '10-digit alphanumeric identifier essential for all financial transactions and income tax compliance.',
    fullDescription: 'Permanent Account Number (PAN) is a ten-digit unique alphanumeric identifier issued by the Income Tax Department under the supervision of the Central Board of Direct Taxes (CBDT). It is mandatory for tracking tax liability, opening bank accounts, property registrations, and stock trading.',
    iconName: 'CreditCard',
    isPopular: true,
    issuingAuthority: 'Income Tax Department, Ministry of Finance',
    estimatedProcessingTime: 'Instant (e-PAN in 10 mins) | 7 - 15 days (Physical Card)',
    feeRange: 'Free for Instant e-PAN | ₹107 for physical card in India | ₹1,017 for overseas delivery',
    validityPeriod: 'Lifelong for individuals and registered entities',
    acceptanceLevel: 'National',
    keywords: [
      'pan', 'pan card', 'tax', 'income tax', 'nsdl', 'protean', 'utiitsl', 'incometax', 
      'form 49a', 'epan', 'e-pan', 'instant pan', 'link aadhaar', 'reprint pan', 
      'pan correction', 'tax deduction', 'financial id', 'banking'
    ],
    serviceTypes: ['creation', 'updation', 'verification', 'replacement'],
    supportsStateSpecific: false,
    eligibility: [
      'Any individual citizen, minor (via guardian), or legal entity in India',
      'Non-Resident Indians (NRIs) and foreign entities conducting business in India',
      'Persons whose total income exceeds the taxable threshold or liable for TDS/TCS'
    ],
    keyUses: [
      'Filing Income Tax Returns (ITR) and claiming tax refunds',
      'Opening savings or current bank accounts and applying for credit cards',
      'Purchasing mutual funds, securities, shares, and high-value foreign exchange',
      'Registration of immovable property valued over statutory thresholds'
    ],
    availableServiceIds: [
      'pan-new-application',
      'pan-instant-epan',
      'pan-correction-update',
      'pan-link-aadhaar'
    ],
    relatedDocumentIds: [
      'aadhaar-card',
      'passport',
      'birth-certificate'
    ],
    officialPlatform: {
      name: 'Income Tax e-Filing & Protean (NSDL) / UTIITSL Portal',
      portalName: 'Income Tax e-Filing Portal / Protean TIN',
      authorityName: 'Central Board of Direct Taxes, Ministry of Finance',
      url: 'https://www.incometax.gov.in',
      isVerified: true,
      securityNote: 'Protean (formerly NSDL eGov) and UTIITSL are the authorized service providers for physical PAN cards. Instant e-PAN is provided on incometax.gov.in.'
    }
  },
  {
    id: 'passport',
    name: 'Indian Passport',
    code: 'MEA-CPV-PSP',
    category: 'travel',
    badgeText: 'International Travel',
    shortDescription: 'Official government travel document certifying international identity and Indian nationality.',
    fullDescription: 'The Indian Passport is issued by the Consular, Passport & Visa (CPV) Division of the Ministry of External Affairs under the Passports Act, 1967. It serves as supreme proof of Indian citizenship abroad and is essential for international travel, employment, education, and emigration.',
    iconName: 'Plane',
    isPopular: true,
    issuingAuthority: 'Ministry of External Affairs (MEA), Government of India',
    estimatedProcessingTime: 'Normal: 15 - 30 days | Tatkaal: 1 - 3 days',
    feeRange: '₹1,500 (Normal 36 pages) | ₹2,000 (Normal 60 pages) | ₹3,500 (Tatkaal 36 pages) | ₹500 (PCC)',
    validityPeriod: '10 years for adults (18+) | 5 years or until age 18 for minors',
    acceptanceLevel: 'International',
    keywords: [
      'passport', 'pass port', 'travel', 'international', 'mea', 'passport seva', 'psk', 
      'popsk', 'tatkaal', 'tatkal', 'reissue', 're-issue', 'renew', 'renewal', 
      'police clearance', 'pcc', 'visa', 'emigration', 'non ecr', 'foreign travel'
    ],
    serviceTypes: ['creation', 'renewal', 'verification', 'download'],
    supportsStateSpecific: false,
    eligibility: [
      'Bona fide citizens of India by birth, descent, or registration',
      'No pending criminal warrants or court travel restrictions',
      'Minors with consent of both parents/legal guardians'
    ],
    keyUses: [
      'International air/sea/land border crossing and visa applications',
      'Universal primary proof of citizenship and address worldwide',
      'Applying for foreign employment, international student admissions, and consular assistance',
      'Police Clearance Certificate (PCC) issuance for immigration'
    ],
    availableServiceIds: [
      'passport-fresh-application',
      'passport-reissue-renewal',
      'passport-police-clearance',
      'passport-track-status'
    ],
    relatedDocumentIds: [
      'aadhaar-card',
      'pan-card',
      'birth-certificate',
      'voter-id',
      'driving-licence'
    ],
    officialPlatform: {
      name: 'Passport Seva Online Portal',
      portalName: 'Passport Seva Online Portal',
      authorityName: 'Consular, Passport and Visa (CPV) Division, Ministry of External Affairs',
      url: 'https://www.passportindia.gov.in',
      isVerified: true,
      securityNote: 'Always verify you are on passportindia.gov.in. MEA does not charge appointment scheduling fees via third-party agencies.'
    }
  },
  {
    id: 'driving-licence',
    name: 'Driving Licence',
    code: 'MORTH-SARATHI-DL',
    category: 'transport',
    badgeText: 'Transport & Driving',
    shortDescription: 'Official authorization permit permitting the operation of motorized vehicles on public roads.',
    fullDescription: 'A Driving Licence is an official document issued by state Regional Transport Offices (RTOs) under the Motor Vehicles Act, 1988, through the centralized Sarathi Parivahan platform. It permits an individual to operate specific classes of motor vehicles (MCWG, LMV, Transport) on public highways.',
    iconName: 'Car',
    isPopular: true,
    issuingAuthority: 'State Regional Transport Offices (RTO) / MoRTH',
    estimatedProcessingTime: 'Learner Licence: Same day / 1-3 days | Driving Licence: 7 - 15 days post practical test',
    feeRange: '₹150 - ₹350 (Learner Licence) | ₹700 - ₹1,000 (Permanent DL Smart Card)',
    validityPeriod: 'Non-transport: 20 years or until age 40 (subsequent renewals: 10 yrs / 5 yrs) | Transport: 5 years',
    acceptanceLevel: 'National',
    keywords: [
      'driving licence', 'driving license', 'dl', 'll', 'learners licence', 'learner license', 
      'parivahan', 'sarathi', 'morth', 'rto', 'driving test', 'lmv', 'mcwg', 
      'renew dl', 'dl renewal', 'duplicate dl', 'international driving permit', 'idp', 'vehicle'
    ],
    serviceTypes: ['creation', 'renewal', 'updation'],
    supportsStateSpecific: true,
    eligibility: [
      '16+ years for gearless two-wheelers up to 50cc (with parental consent)',
      '18+ years for light motor vehicles (motorcycles with gear, private cars)',
      '20+ years for commercial / transport vehicles (with prior 1-year LMV licence)',
      'Must possess valid Learner’s Licence for minimum 30 days before permanent test'
    ],
    keyUses: [
      'Legal authorization to drive vehicles across all Indian states and Union Territories',
      'Recognized secondary identity and local address proof',
      'Eligibility for International Driving Permit (IDP) for driving abroad',
      'Mandatory document for motor insurance claim approvals'
    ],
    availableServiceIds: [
      'dl-learners-licence',
      'dl-permanent-licence',
      'dl-renewal',
      'dl-international-permit'
    ],
    relatedDocumentIds: [
      'aadhaar-card',
      'pan-card',
      'birth-certificate',
      'passport'
    ],
    officialPlatform: {
      name: 'Sarathi Parivahan National Portal',
      portalName: 'Sarathi Portal',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH) & State RTOs',
      url: 'https://parivahan.gov.in',
      isVerified: true,
      isStateSpecific: true,
      stateNote: 'State transport rules and online test modes vary slightly across Indian states.',
      securityNote: 'Online contactless services and slot bookings are processed through the official parivahan.gov.in portal.'
    }
  },
  {
    id: 'voter-id',
    name: 'Voter ID (EPIC)',
    code: 'ECI-EPIC',
    category: 'civic',
    badgeText: 'Electoral ID',
    shortDescription: 'Electors Photo Identity Card issued by the Election Commission for democratic franchise.',
    fullDescription: 'The Electors Photo Identity Card (EPIC), commonly known as Voter ID, is an identity document issued by the Election Commission of India (ECI) to adult citizens enrolled in the electoral rolls. It enables voting in municipal, state assembly, and general parliamentary elections.',
    iconName: 'Vote',
    isPopular: true,
    issuingAuthority: 'Election Commission of India (ECI)',
    estimatedProcessingTime: '20 - 45 days (Subject to electoral roll revision schedules)',
    feeRange: 'Free for new registration and digital e-EPIC download | Replacement physical cards: Free / Nominal',
    validityPeriod: 'Lifelong (Requires address/constituency update upon shifting residence)',
    acceptanceLevel: 'National',
    keywords: [
      'voter', 'voter id', 'epic', 'e-epic', 'eepic', 'election', 'eci', 'vote', 
      'form 6', 'form 8', 'electoral roll', 'blo', 'constituency', 'voter list', 
      'address change', 'voter registration', 'election card', 'elector'
    ],
    serviceTypes: ['creation', 'download', 'updation'],
    supportsStateSpecific: false,
    eligibility: [
      'Citizen of India',
      '18 years of age or older on the designated qualifying quarterly dates (Jan 1, Apr 1, Jul 1, Oct 1)',
      'Ordinary resident of the constituency applied from'
    ],
    keyUses: [
      'Constitutional right to vote in Indian democratic elections',
      'Officially accepted proof of identity, age, and residence across all public and private institutions',
      'Secondary KYC document for banking, SIM registration, and passport applications'
    ],
    availableServiceIds: [
      'voter-new-registration',
      'voter-download-epic',
      'voter-correction-form8',
      'voter-track-status'
    ],
    relatedDocumentIds: [
      'aadhaar-card',
      'birth-certificate',
      'pan-card',
      'passport'
    ],
    officialPlatform: {
      name: 'Voters’ Service Portal (ECI)',
      portalName: 'ECI Voters’ Service Portal',
      authorityName: 'Election Commission of India',
      url: 'https://voters.eci.gov.in',
      isVerified: true,
      securityNote: 'Voters can download digital e-EPIC directly without agent intervention on voters.eci.gov.in.'
    }
  },
  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    code: 'CRS-RBD-VITAL',
    category: 'certificates',
    badgeText: 'Vital Record',
    shortDescription: 'Primary permanent legal record of birth, parentage, date, and birthplace of an individual.',
    fullDescription: 'A Birth Certificate is the first and most fundamental legal identity document issued by the Registrar of Births and Deaths / Municipal Corporation under the Registration of Births and Deaths Act, 1969. It establishes age, date of birth, parentage, and place of birth.',
    iconName: 'Award',
    isPopular: true,
    issuingAuthority: 'Office of Registrar General of India & Respective Municipal Corporations / Gram Panchayats',
    estimatedProcessingTime: '7 - 15 working days (Hospital birth) | 30 - 60 days (Delayed registration)',
    feeRange: 'Free (Within 21 days) | ₹5 - ₹50 (Certified copy / Late fee)',
    validityPeriod: 'Permanent lifelong validity',
    acceptanceLevel: 'National',
    keywords: [
      'birth certificate', 'birth', 'janam praman patra', 'crs', 'registrar', 'vital records', 
      'municipal corporation', 'panchayat', 'dob proof', 'date of birth', 'hospital birth', 
      'child name addition', 'delayed registration', 'nabc', 'mcd', 'bbmp', 'bmc'
    ],
    serviceTypes: ['creation', 'download', 'updation'],
    supportsStateSpecific: true,
    eligibility: [
      'Any child born within Indian territorial jurisdiction (Institutional hospital or home birth)',
      'Parents or designated informants reporting within statutory timeframes'
    ],
    keyUses: [
      'Primary document for school and higher education admissions',
      'Indispensable proof of Date of Birth for Fresh Passport, Aadhaar, PAN, and Voter ID',
      'Establishing legal parentage, estate inheritance, and civil rights',
      'Mandatory requirement for government service appointments and social security benefits'
    ],
    availableServiceIds: [
      'birth-new-registration',
      'birth-search-download',
      'birth-delayed-registration',
      'birth-correction-record'
    ],
    relatedDocumentIds: [
      'aadhaar-card',
      'passport',
      'pan-card',
      'driving-licence',
      'voter-id'
    ],
    officialPlatform: {
      name: 'Civil Registration System (CRS) / Municipal Portals',
      portalName: 'CRS Portal / State Urban Local Body Services',
      authorityName: 'Office of Registrar General of India / State Health & Municipal Administration',
      url: 'https://crsorgi.gov.in',
      isVerified: true,
      isStateSpecific: true,
      stateNote: 'Registration is governed federally under RBD Act but administered locally by Municipal Corporations (e.g. MCD, BBMP, BMC) and Gram Panchayats.',
      securityNote: 'Ensure certificates downloaded online contain a verifiable digital signature or QR code.'
    }
  }
];
