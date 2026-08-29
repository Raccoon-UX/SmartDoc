import { Document } from '../types/document';

export const documents: Document[] = [
  // ==========================================
  // 01 — IDENTITY & PERSONAL DOCUMENTS
  // ==========================================
  {
    id: 'aadhaar-card',
    name: 'Aadhaar Card',
    code: 'UIDAI-AADHAAR',
    category: 'identity',
    itemType: 'document',
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
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      securityNote: 'Ensure the URL begins with myaadhaar.uidai.gov.in. UIDAI never requests OTPs over telephone calls or third-party SMS links.'
    }
  },
  {
    id: 'ration-card',
    name: 'Ration Card (NFSA)',
    code: 'DFPD-NFSA-RC',
    category: 'identity',
    itemType: 'document',
    badgeText: 'Food Security & Address ID',
    shortDescription: 'Official document issued under NFSA providing subsidized foodgrains and recognized family identity.',
    fullDescription: 'The Ration Card is an official state-issued entitlement document under the National Food Security Act (NFSA), 2013, managed through the One Nation One Ration Card (ONORC) framework. It establishes family composition, economic entitlement category (AAY, PHH), and serves as an accepted proof of local address.',
    iconName: 'ShoppingBag',
    isPopular: true,
    issuingAuthority: 'Department of Food and Public Distribution, MoCA, F&PD & State Food & Civil Supplies',
    estimatedProcessingTime: '15 - 30 working days',
    feeRange: 'Free / Nominal ₹5 - ₹20 application fee (State dependent)',
    validityPeriod: '5 years / subject to periodic state verification',
    acceptanceLevel: 'National',
    keywords: [
      'ration card', 'ration', 'nfsa', 'onorc', 'one nation one ration card', 'food grains', 
      'aay', 'phh', 'bpl ration card', 'apl ration card', 'fair price shop', 'fps', 
      'rashan card', 'rashan', 'epds'
    ],
    serviceTypes: ['creation', 'updation', 'download'],
    supportsStateSpecific: true,
    eligibility: [
      'Head of family must be an Indian citizen (oldest female member designated as head of household under NFSA)',
      'Family must be resident in the respective state/UT jurisdiction and fulfill state income/exclusion criteria',
      'Members must not already be enrolled in another active ration card'
    ],
    keyUses: [
      'Subsidized food grain distribution at any Fair Price Shop across India under ONORC',
      'Standard address proof for domestic LPG connections and municipal utility connections',
      'Accepted eligibility verification for various state social welfare schemes'
    ],
    availableServiceIds: [
      'ration-new-application',
      'ration-download-digital',
      'ration-member-addition'
    ],
    relatedDocumentIds: ['aadhaar-card', 'income-certificate', 'birth-certificate'],
    officialPlatform: {
      name: 'National Food Security Portal (NFSA)',
      portalName: 'NFSA Portal',
      authorityName: 'Department of Food & Public Distribution, Ministry of Consumer Affairs',
      url: 'https://nfsa.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true,
      stateNote: 'Application submission and verification are administered through state civil supplies portals linked on nfsa.gov.in.'
    }
  },
  {
    id: 'udid-disability-card',
    name: 'Unique Disability ID (UDID)',
    code: 'MSJE-DEPwD-UDID',
    category: 'identity',
    itemType: 'document',
    badgeText: 'Disability & Welfare ID',
    shortDescription: 'National identity and medical certificate smart card for persons with disabilities (PwD).',
    fullDescription: 'The Unique Disability ID (UDID) project by the Department of Empowerment of Persons with Disabilities creates a national centralized database for PwDs, delivering a tamper-evident smart card that eliminates the need to carry multiple physical medical certificates.',
    iconName: 'Award',
    isPopular: false,
    issuingAuthority: 'Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment',
    estimatedProcessingTime: '30 - 45 days (Subject to District Medical Board assessment)',
    feeRange: 'Free of charge',
    validityPeriod: 'Permanent (for permanent disabilities) or Temporary (5-year review)',
    acceptanceLevel: 'National',
    keywords: [
      'udid', 'disability card', 'pwd card', 'swavlamban', 'disability certificate', 
      'divyangjan', 'medical board', 'railway concession disability', 'swavlambancard'
    ],
    serviceTypes: ['creation', 'download', 'renewal'],
    supportsStateSpecific: false,
    eligibility: [
      'Any citizen of India having a disability benchmark (40% or more) as defined under RPwD Act, 2016',
      'Assessed and certified by a competent District Medical Authority'
    ],
    keyUses: [
      'Universal proof of disability for railway, airline, and state transport concessions',
      'Streamlined access to government scholarship schemes and assistive device distribution',
      'Income tax deductions under Section 80U / 80DD'
    ],
    availableServiceIds: ['udid-new-application', 'udid-download-card'],
    relatedDocumentIds: ['aadhaar-card', 'income-certificate'],
    officialPlatform: {
      name: 'Swavlamban Portal (UDID)',
      portalName: 'Swavlamban Portal',
      authorityName: 'Department of Empowerment of Persons with Disabilities',
      url: 'https://www.swavlambancard.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'income-caste-domicile',
    name: 'State Revenue Certificates (Income, Caste & Domicile)',
    code: 'REV-STATE-CERTS',
    category: 'identity',
    itemType: 'document',
    badgeText: 'State Revenue Records',
    shortDescription: 'Statutory income, caste, and residence certificates issued by District Revenue / Tehsildar offices.',
    fullDescription: 'State Revenue Certificates (including Domicile / Residence Certificate, Income Certificate, Caste / SC / ST / OBC Certificate, and EWS Certificate) are statutory documents issued by the Sub-Divisional Magistrate (SDM) or Tehsildar under state revenue regulations.',
    iconName: 'FileCheck',
    isPopular: true,
    issuingAuthority: 'State Revenue Department & Sub-Divisional Magistrates (SDM / Tehsildar)',
    estimatedProcessingTime: '7 - 21 working days',
    feeRange: '₹10 - ₹50 (Government portal facilitation fee)',
    validityPeriod: 'Income: 1 financial year | Domicile: Permanent | Caste: Permanent',
    acceptanceLevel: 'National',
    keywords: [
      'caste certificate', 'income certificate', 'domicile certificate', 'residence certificate', 
      'ews certificate', 'obc certificate', 'sc st certificate', 'niwas praman patra', 
      'aay praman patra', 'jati praman patra', 'tehsildar', 'sdm', 'serviceplus', 'edistrict'
    ],
    serviceTypes: ['creation', 'download', 'verification'],
    supportsStateSpecific: true,
    eligibility: [
      'Bona fide residents of the applying state or district',
      'Fulfillment of category-specific income, ancestry, or land-holding documentation'
    ],
    keyUses: [
      'Reservation benefits in educational admissions and public recruitment',
      'Eligibility proof for fee-waivers and National Scholarship schemes',
      'Required for subsidized government housing and health schemes'
    ],
    availableServiceIds: ['revenue-apply-certificate', 'revenue-verify-certificate'],
    relatedDocumentIds: ['aadhaar-card', 'ration-card', 'birth-certificate'],
    officialPlatform: {
      name: 'National ServicePlus Portal / State e-District Portals',
      portalName: 'ServicePlus Framework',
      authorityName: 'National Informatics Centre (NIC) & State Revenue Departments',
      url: 'https://serviceonline.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true,
      stateNote: 'Applications are processed via state e-District portals or ServicePlus framework depending on the state.'
    }
  },

  // ==========================================
  // 02 — BANKING, TAX & FINANCE
  // ==========================================
  {
    id: 'pan-card',
    name: 'PAN Card',
    code: 'CBDT-IT-PAN',
    category: 'financial',
    itemType: 'document',
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
      name: 'Protean (NSDL) Online PAN Application Portal',
      portalName: 'Protean TIN PAN Portal',
      authorityName: 'Protean eGov Technologies & Income Tax Department',
      url: 'https://onlineservices.proteantech.in/paam/endUserRegisterContact.html',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-30',
      securityNote: 'Protean (formerly NSDL eGov) is the authorized sovereign service provider for new PAN applications and card re-prints under CBDT.'
    }
  },
  {
    id: 'income-tax-filing',
    name: 'Income Tax e-Filing & Returns (ITR)',
    code: 'CBDT-ITR-EFILING',
    category: 'financial',
    itemType: 'service',
    badgeText: 'Tax Returns & AIS',
    shortDescription: 'Official sovereign portal for filing Annual Income Tax Returns, Annual Information Statement (AIS), and Form 26AS.',
    fullDescription: 'The Income Tax e-Filing Portal is the official digital tax administration interface of the Government of India. Citizens can file ITR-1 through ITR-7, view tax credit statements (Form 26AS), verify Annual Information Statements (AIS), and claim statutory tax refunds.',
    iconName: 'Landmark',
    isPopular: true,
    issuingAuthority: 'Income Tax Department, Central Board of Direct Taxes (CBDT)',
    estimatedProcessingTime: 'Instant e-filing submission | 1 to 6 weeks for CPC intimation & refund processing',
    feeRange: 'Free on government portal (Statutory late fee under Sec 234F if filed post deadline)',
    validityPeriod: 'Annual compliance per Assessment Year (AY)',
    acceptanceLevel: 'National',
    keywords: [
      'itr', 'income tax return', 'itr 1', 'itr 2', 'form 16', 'form 26as', 'ais', 'tis', 
      'tax refund', 'cpc', 'tax e-filing', 'incometax.gov.in', 'tax rebate 87a', 'new tax regime'
    ],
    serviceTypes: ['creation', 'download', 'verification'],
    supportsStateSpecific: false,
    financialDisclaimer: 'SmartDoc is an informational discovery system. We do not provide chartered accountancy, investment, or legal tax advisory services.',
    eligibility: [
      'Individuals with gross total income exceeding basic exemption limit',
      'Salaried employees with TDS deductions seeking refunds',
      'Individuals with foreign assets, high electricity bills, or overseas travel spending'
    ],
    keyUses: [
      'Mandatory financial proof for Home Loans, Auto Loans, and Visa processing',
      'Claiming income tax refunds directly into verified bank accounts',
      'Compliance and avoiding penal notices under Income-tax Act, 1961'
    ],
    availableServiceIds: ['itr-file-return', 'itr-download-26as-ais'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'Income Tax e-Filing Official Portal',
      portalName: 'e-Filing Portal 2.0',
      authorityName: 'Directorate of Income Tax (Systems), CBDT',
      url: 'https://www.incometax.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'jan-dhan-banking',
    name: 'Pradhan Mantri Jan-Dhan Yojana (PMJDY Banking)',
    code: 'DFS-PMJDY-BANK',
    category: 'financial',
    itemType: 'scheme',
    badgeText: 'Zero Balance Banking',
    shortDescription: 'National mission for financial inclusion ensuring universal access to zero-balance savings bank accounts.',
    fullDescription: 'PMJDY provides universal access to banking facilities with at least one basic banking account for every unbanked adult, zero minimum balance requirement, RuPay Debit card with inbuilt accident insurance, and Direct Benefit Transfer (DBT) credit integration.',
    iconName: 'Banknote',
    isPopular: false,
    issuingAuthority: 'Department of Financial Services, Ministry of Finance & All Public/Private Commercial Banks',
    estimatedProcessingTime: 'Same day / 1 - 3 days for account activation',
    feeRange: 'Zero balance account (Free opening & maintenance)',
    validityPeriod: 'Lifelong',
    acceptanceLevel: 'National',
    keywords: [
      'jan dhan', 'pmjdy', 'zero balance account', 'rupay card', 'dbt account', 
      'basic savings bank', 'bsbda', 'bank account opening', 'financial inclusion'
    ],
    serviceTypes: ['creation', 'verification'],
    supportsStateSpecific: false,
    eligibility: [
      'Any Indian citizen aged 10 years and above who does not possess another bank account',
      'Simplified KYC documentation allowed for unbanked individuals'
    ],
    keyUses: [
      'Direct receipt of government subsidies (LPG, PM-Kisan, scholarships) via DBT',
      'Free RuPay debit card with complimentary ₹2 Lakh accident insurance cover',
      'Overdraft facility up to ₹10,000 to eligible account holders'
    ],
    availableServiceIds: ['pmjdy-account-guidance'],
    relatedDocumentIds: ['aadhaar-card', 'pan-card'],
    officialPlatform: {
      name: 'PMJDY National Portal',
      portalName: 'PM Jan-Dhan Yojana Portal',
      authorityName: 'Department of Financial Services, Ministry of Finance',
      url: 'https://pmjdy.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 03 — INSURANCE & PROTECTION
  // ==========================================
  {
    id: 'lic-insurance',
    name: 'Life Insurance Corporation of India (LIC)',
    code: 'LIC-STATUTORY-ORG',
    category: 'insurance',
    itemType: 'organization',
    badgeText: 'Regulated Life Insurer',
    shortDescription: 'Statutory public sector life insurance corporation offering life protection, pension, and endowment policies.',
    fullDescription: 'Life Insurance Corporation of India (LIC) is an Indian statutory insurance and investment corporation established under the LIC Act, 1956, supervised by the Insurance Regulatory and Development Authority of India (IRDAI). It provides individual life assurance, group insurance, and pension plans.',
    iconName: 'ShieldAlert',
    isPopular: true,
    issuingAuthority: 'Life Insurance Corporation of India (Regulated by IRDAI)',
    estimatedProcessingTime: 'Online premium payment: Instant | Claim settlement: 15 - 30 days',
    feeRange: 'Premium as per policy term and age',
    validityPeriod: 'Subject to policy tenure and regular premium payments',
    acceptanceLevel: 'National',
    keywords: [
      'lic', 'life insurance corporation', 'lic policy', 'lic premium online', 'lic portal', 
      'lic premium payment', 'jeevan labh', 'jeevan umang', 'lic revival', 'lic claim', 'life insurance'
    ],
    serviceTypes: ['verification', 'download', 'updation'],
    supportsStateSpecific: false,
    organizationName: 'Life Insurance Corporation of India',
    financialDisclaimer: 'SmartDoc is an independent information directory and is not an insurance intermediary or agent. All policy transactions occur strictly on LIC official systems.',
    eligibility: [
      'Indian residents and NRIs eligible as per individual LIC product underwriting guidelines',
      'Medical examination and age verification requirements apply depending on sum assured'
    ],
    keyUses: [
      'Financial security and life cover protection for family dependents',
      'Long-term savings, child education funds, and retirement annuity planning',
      'Tax deduction under Section 80C and tax-free death benefits under Section 10(10D)'
    ],
    availableServiceIds: ['lic-pay-premium', 'lic-policy-status'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card', 'bank-account-statement'],
    officialPlatform: {
      name: 'Life Insurance Corporation of India (LIC) Official Website',
      portalName: 'LIC Customer Portal',
      authorityName: 'Life Insurance Corporation of India',
      url: 'https://licindia.in',
      isVerified: true,
      sourceTier: 'regulated_org',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      securityNote: 'Ensure the domain is exactly licindia.in. Do not pay premiums through unverified third-party mobile applications.'
    }
  },
  {
    id: 'ayushman-bharat-pmjay',
    name: 'Ayushman Bharat (PM-JAY Health Cover)',
    code: 'NHA-AB-PMJAY',
    category: 'insurance',
    itemType: 'scheme',
    badgeText: '₹5 Lakh Health Cover',
    shortDescription: 'World’s largest government-funded health assurance scheme offering ₹5 lakh per family per year for secondary/tertiary hospitalization.',
    fullDescription: 'Pradhan Mantri Jan Arogya Yojana (PM-JAY), under Ayushman Bharat, provides cashless inpatient healthcare coverage of up to ₹5,00,000 per eligible family per year across empaneled public and private hospitals across India.',
    iconName: 'HeartPulse',
    isPopular: true,
    issuingAuthority: 'National Health Authority (NHA), Ministry of Health and Family Welfare',
    estimatedProcessingTime: 'Instant e-card generation post Aadhaar e-KYC validation',
    feeRange: '100% Free of cost',
    validityPeriod: 'Lifelong for eligible household members',
    acceptanceLevel: 'National',
    keywords: [
      'ayushman card', 'pmjay', 'ayushman bharat', 'golden card', '5 lakh health insurance', 
      'beneficiary nha', 'cashless treatment', 'hospital list pmjay', 'bis portal'
    ],
    serviceTypes: ['creation', 'download', 'verification'],
    supportsStateSpecific: true,
    eligibility: [
      'Families identified under Socio-Economic Caste Census (SECC 2011) rural and urban deprivation criteria',
      'Senior citizens aged 70+ (expanded universal cover under Ayushman Vay Vandana card)',
      'Active NFSA ration card holders in participating states'
    ],
    keyUses: [
      'Cashless hospital admission, surgeries, and diagnostics up to ₹5 Lakh/year',
      'Coverage for pre-existing diseases from day one with zero waiting periods',
      'Portable across all 27,000+ empaneled hospitals across India'
    ],
    availableServiceIds: ['pmjay-check-eligibility', 'pmjay-download-card'],
    relatedDocumentIds: ['ration-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'Ayushman Bharat Beneficiary Portal (NHA)',
      portalName: 'Beneficiary NHA Portal',
      authorityName: 'National Health Authority (NHA)',
      url: 'https://beneficiary.nha.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'social-security-insurance',
    name: 'Govt Social Insurance (PMJJBY & PMSBY)',
    code: 'DFS-PMJJBY-PMSBY',
    category: 'insurance',
    itemType: 'scheme',
    badgeText: 'Micro-Insurance Schemes',
    shortDescription: 'Affordable government life insurance (₹2 Lakh for ₹436/yr) and accidental insurance (₹2 Lakh for ₹20/yr).',
    fullDescription: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) offers life insurance cover of ₹2 Lakh for death due to any cause, while Pradhan Mantri Suraksha Bima Yojana (PMSBY) provides ₹2 Lakh cover for accidental death or permanent disability, auto-debited annually via bank accounts.',
    iconName: 'ShieldCheck',
    isPopular: false,
    issuingAuthority: 'Department of Financial Services, Ministry of Finance & Commercial Banks',
    estimatedProcessingTime: 'Instant enrolment via net banking / bank branch mandate',
    feeRange: 'PMJJBY: ₹436/year | PMSBY: ₹20/year',
    validityPeriod: '1 year (Renewable annually via bank auto-debit on June 1)',
    acceptanceLevel: 'National',
    keywords: [
      'pmjjby', 'pmsby', 'government life insurance', '436 insurance', '20 accidental insurance', 
      'pradhan mantri bima yojana', 'jansuraksha', 'bank insurance scheme'
    ],
    serviceTypes: ['creation', 'verification'],
    supportsStateSpecific: false,
    eligibility: [
      'PMJJBY: Bank/Post Office savings account holders aged 18 to 50 years',
      'PMSBY: Bank/Post Office savings account holders aged 18 to 70 years'
    ],
    keyUses: [
      'High-affordability life and accidental protection for self and breadwinner',
      'Direct claim settlement directly to registered nominee bank account'
    ],
    availableServiceIds: ['jansuraksha-enrol-guidance'],
    relatedDocumentIds: ['aadhaar-card', 'pan-card'],
    officialPlatform: {
      name: 'Jan Suraksha National Portal',
      portalName: 'Jan Suraksha Schemes',
      authorityName: 'Department of Financial Services, Ministry of Finance',
      url: 'https://financialservices.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 04 — INVESTMENTS & SAVINGS
  // ==========================================
  {
    id: 'mutual-funds-amfi',
    name: 'Mutual Funds & Systematic Investment (AMFI)',
    code: 'AMFI-MUTUAL-FUNDS',
    category: 'investments',
    itemType: 'organization',
    badgeText: 'Investor Education & AMFI',
    shortDescription: 'Authoritative industry directory and investor awareness platform for Mutual Funds and SIPs in India.',
    fullDescription: 'The Association of Mutual Funds in India (AMFI) is the apex industry body for all SEBI-registered Asset Management Companies (AMCs). It coordinates investor awareness (Mutual Funds Sahi Hai), provides daily NAV tracking, and guides verified KYC compliance.',
    iconName: 'TrendingUp',
    isPopular: true,
    issuingAuthority: 'Association of Mutual Funds in India (AMFI) / SEBI Regulated',
    estimatedProcessingTime: 'Online e-KYC: 1 - 2 business days | SIP execution: Scheduled per bank mandate',
    feeRange: 'Zero fee for AMFI investor guidance (Fund expense ratios apply per AMC scheme)',
    validityPeriod: 'Subject to active investment holding',
    acceptanceLevel: 'National',
    keywords: [
      'mutual fund', 'mutual funds', 'amfi', 'sip', 'systematic investment plan', 'nav', 
      'elss', 'sebi', 'mutual funds sahi hai', 'amc', 'cams', 'kfintech', 'investor kyc'
    ],
    serviceTypes: ['verification', 'download'],
    supportsStateSpecific: false,
    organizationName: 'Association of Mutual Funds in India (AMFI)',
    financialDisclaimer: 'SmartDoc is an educational discovery platform. We do not sell mutual fund units or provide personalized financial advisory. Mutual fund investments are subject to market risks.',
    eligibility: [
      'Any individual with a valid PAN, Aadhaar, and active Indian Bank Account',
      'Completed Mutual Fund KYC (verified through KRA)'
    ],
    keyUses: [
      'Long-term wealth creation, inflation-beating capital appreciation, and equity/debt diversification',
      'Tax-saving investment under Section 80C through Equity Linked Savings Schemes (ELSS)',
      'Disciplined compounding through automated monthly SIPs'
    ],
    availableServiceIds: ['amfi-check-kyc', 'amfi-track-nav'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'Association of Mutual Funds in India (AMFI)',
      portalName: 'AMFI Official Portal',
      authorityName: 'AMFI India',
      url: 'https://www.amfiindia.com',
      isVerified: true,
      sourceTier: 'regulated_org',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'national-pension-system',
    name: 'National Pension System (NPS)',
    code: 'PFRDA-NPS-CRA',
    category: 'investments',
    itemType: 'service',
    badgeText: 'Retirement & Pension',
    shortDescription: 'Government-sponsored voluntary, long-term retirement savings scheme regulated by PFRDA.',
    fullDescription: 'NPS is a voluntary defined-contribution pension system designed by the Government of India and regulated by PFRDA. It enables subscribers to systematically save during their working life, offering market-linked returns across equity, corporate bonds, and government securities.',
    iconName: 'Coins',
    isPopular: false,
    issuingAuthority: 'Pension Fund Regulatory and Development Authority (PFRDA) / Protean CRA',
    estimatedProcessingTime: 'Instant PRAN generation via Aadhaar e-KYC (10 - 15 minutes)',
    feeRange: '₹500 minimum initial contribution',
    validityPeriod: 'Till age 60 (Extendable up to age 75)',
    acceptanceLevel: 'National',
    keywords: [
      'nps', 'national pension system', 'pran', 'pfrda', 'enps', 'pension fund', 
      'tier 1 nps', 'tier 2 nps', '80ccd', 'retirement plan'
    ],
    serviceTypes: ['creation', 'download', 'updation'],
    supportsStateSpecific: false,
    financialDisclaimer: 'NPS investments are regulated by PFRDA and involve market asset allocation.',
    eligibility: [
      'Any Indian citizen (resident or non-resident) aged 18 to 70 years',
      'Compliant with standard KYC norms'
    ],
    keyUses: [
      'Building a substantial retirement corpus with lifetime pension annuity',
      'Exclusive additional tax deduction of ₹50,000 under Section 80CCD(1B) over and above Section 80C'
    ],
    availableServiceIds: ['nps-open-account', 'nps-download-pran'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'eNPS Official Registration Portal (Protean CRA / PFRDA)',
      portalName: 'eNPS Portal',
      authorityName: 'PFRDA / Central Recordkeeping Agency',
      url: 'https://enps.nsdl.com',
      isVerified: true,
      sourceTier: 'statutory',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'post-office-savings-ppf',
    name: 'Public Provident Fund (PPF) & Post Office Savings',
    code: 'DOP-INDIA-POST-SAVINGS',
    category: 'investments',
    itemType: 'service',
    badgeText: 'Govt Guaranteed Savings',
    shortDescription: 'Sovereign-backed small savings schemes including PPF, Sukanya Samriddhi, NSC, and Post Office Time Deposits.',
    fullDescription: 'Post Office Small Savings Schemes and the Public Provident Fund (PPF) are statutory sovereign savings instruments administered by the Department of Posts and Ministry of Finance. They offer risk-free, government-guaranteed interest rates revised quarterly.',
    iconName: 'PiggyBank',
    isPopular: true,
    issuingAuthority: 'Department of Posts, Ministry of Communications & Authorized Banks',
    estimatedProcessingTime: 'Same day for post office / net-banking opening',
    feeRange: 'PPF: Min ₹500/year, Max ₹1,50,000/year',
    validityPeriod: 'PPF: 15 years (extendable in blocks of 5 years)',
    acceptanceLevel: 'National',
    keywords: [
      'ppf', 'public provident fund', 'post office savings', 'nsc', 'kvp', 'kisan vikas patra', 
      'sukanya samriddhi', 'post office fd', 'india post banking', 'tax free savings'
    ],
    serviceTypes: ['creation', 'download', 'verification'],
    supportsStateSpecific: false,
    eligibility: [
      'Individual Indian residents (One PPF account per individual allowed)'
    ],
    keyUses: [
      'Completely tax-free returns under EEE (Exempt-Exempt-Exempt) tax category',
      'Guaranteed sovereign safety with no credit or market fluctuation risks'
    ],
    availableServiceIds: ['ppf-open-guidance', 'postoffice-savings-rules'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'India Post Official Banking Portal',
      portalName: 'India Post Savings Portal',
      authorityName: 'Department of Posts, Ministry of Communications',
      url: 'https://www.indiapost.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 05 — TRANSPORT & VEHICLES
  // ==========================================
  {
    id: 'driving-licence',
    name: 'Driving Licence',
    code: 'MORTH-SARATHI-DL',
    category: 'transport',
    itemType: 'document',
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
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true,
      stateNote: 'State transport rules and online test modes vary slightly across Indian states.',
      securityNote: 'Online contactless services and slot bookings are processed through the official parivahan.gov.in portal.'
    }
  },
  {
    id: 'vehicle-rc-vahan',
    name: 'Vehicle Registration Certificate (RC & Vahan)',
    code: 'MORTH-VAHAN-RC',
    category: 'transport',
    itemType: 'document',
    badgeText: 'Vehicle Ownership Record',
    shortDescription: 'Official proof of registration, ownership, road tax, and fitness for all motorized road vehicles.',
    fullDescription: 'The Registration Certificate (RC) is an official statutory record issued by state RTOs via the Vahan Parivahan centralized portal under the Motor Vehicles Act, establishing vehicle ownership, chassis number, engine number, emissions norm, and fitness validity.',
    iconName: 'Truck',
    isPopular: true,
    issuingAuthority: 'Ministry of Road Transport and Highways (MoRTH) & State RTOs',
    estimatedProcessingTime: '7 - 21 working days',
    feeRange: '₹300 - ₹1,500 + State Road Tax / Green Tax',
    validityPeriod: 'Private vehicles: 15 years (renewable for 5-year terms) | Commercial: Annual fitness',
    acceptanceLevel: 'National',
    keywords: [
      'rc', 'vehicle rc', 'registration certificate', 'vahan', 'parivahan rc', 'transfer rc', 
      'ownership transfer', 'hypothecation removal', 'hpa', 'duplicate rc', 'noc vehicle', 'fitness certificate'
    ],
    serviceTypes: ['creation', 'updation', 'download', 'renewal'],
    supportsStateSpecific: true,
    eligibility: [
      'Owner of a motor vehicle with valid sale certificate (Form 21), roadworthiness certificate (Form 22), and insurance'
    ],
    keyUses: [
      'Mandatory document for vehicle operation on public roads and selling vehicles',
      'Required for settling motor accident insurance claims',
      'Removal or addition of bank loan hypothecation (HPA / HPR)'
    ],
    availableServiceIds: ['vahan-transfer-ownership', 'vahan-download-rc'],
    relatedDocumentIds: ['driving-licence', 'pan-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'Vahan Parivahan National Portal',
      portalName: 'Vahan Citizen Services',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://vahan.parivahan.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    }
  },
  {
    id: 'echallan-traffic',
    name: 'E-Challan Traffic Enforcement & Payment',
    code: 'MORTH-ECHALLAN',
    category: 'transport',
    itemType: 'service',
    badgeText: 'Traffic Fine Portal',
    shortDescription: 'National digital traffic violation system for checking penalties, photographic evidence, and online payments.',
    fullDescription: 'The E-Challan digital portal connects transport enforcement officers and traffic police nationwide, providing transparent record-keeping of motor vehicle violations, online dispute filing, and fine settlement.',
    iconName: 'Receipt',
    isPopular: true,
    issuingAuthority: 'MoRTH & State Traffic Police Departments',
    estimatedProcessingTime: 'Instant real-time payment clearance',
    feeRange: 'Fine amount as per Motor Vehicles Amendment Act',
    validityPeriod: 'Case closure upon payment',
    acceptanceLevel: 'National',
    keywords: [
      'echallan', 'e challan', 'traffic fine', 'challan payment', 'speeding fine', 
      'parivahan challan', 'rto challan', 'virtual court', 'traffic police fine'
    ],
    serviceTypes: ['verification', 'download'],
    supportsStateSpecific: false,
    eligibility: [
      'Vehicle owners or driving licence holders with pending traffic compound fines'
    ],
    keyUses: [
      'Checking unpaid automated camera and on-road traffic compound fines',
      'Instant online receipt generation for RTO transactions and vehicle resale NOC'
    ],
    availableServiceIds: ['echallan-pay-fine'],
    relatedDocumentIds: ['driving-licence', 'vehicle-rc-vahan'],
    officialPlatform: {
      name: 'E-Challan National Portal',
      portalName: 'Digital Traffic Police Portal',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://echallan.parivahan.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 06 — PROPERTY & UTILITIES
  // ==========================================
  {
    id: 'land-records-bhulekh',
    name: 'Land Records & Property Registry (Bhulekh / NGDRS)',
    code: 'DOLR-NGDRS-LAND',
    category: 'property',
    itemType: 'service',
    badgeText: 'Digital Land Records',
    shortDescription: 'Digitized Records of Rights (RoR / Khasra-Khatauni), cadastral maps, and property registration.',
    fullDescription: 'The National Land Records Modernization Programme and the National Generic Document Registration System (NGDRS) facilitate state-wise digitization of Records of Rights (RoR), land ownership mutation, encumbrance checking, and deed registration.',
    iconName: 'Home',
    isPopular: true,
    issuingAuthority: 'Department of Land Resources, MoRD & State Revenue / Land Record Departments',
    estimatedProcessingTime: 'Instant online RoR download | 15 - 45 days for land mutation',
    feeRange: 'Free inspection | Nominal ₹10 - ₹50 for certified RoR copy',
    validityPeriod: 'Valid until subsequent registry mutation',
    acceptanceLevel: 'State',
    keywords: [
      'bhulekh', 'land records', 'khasra', 'khatauni', 'ror', 'record of rights', 
      'mutation', 'dakhil kharij', 'ngdrs', '7 12 utara', 'patta', 'chitta', 'property registry'
    ],
    serviceTypes: ['download', 'verification', 'updation'],
    supportsStateSpecific: true,
    eligibility: [
      'Agricultural and residential land parcel owners or prospective buyers conducting due diligence'
    ],
    keyUses: [
      'Establishing clear legal land title for bank agriculture/housing loans',
      'Verification of encumbrance before property purchase',
      'Mandatory document for PM-Kisan and crop insurance claims'
    ],
    availableServiceIds: ['bhulekh-search-records', 'ngdrs-property-registration'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'Department of Land Resources / National Generic Document Registration (NGDRS)',
      portalName: 'National Land Records Portal',
      authorityName: 'Department of Land Resources, Ministry of Rural Development',
      url: 'https://dolr.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true,
      stateNote: 'Individual state portals (e.g. UP Bhulekh, Mahabhulekh, Banglarbhumi, Bhoomi Karnataka) are accessed through verified state links.'
    }
  },
  {
    id: 'lpg-ujjwala-gas',
    name: 'Domestic LPG Services & PM Ujjwala Yojana',
    code: 'MOPNG-LPG-PMUY',
    category: 'property',
    itemType: 'scheme',
    badgeText: 'Clean Cooking Energy',
    shortDescription: 'Official domestic LPG gas cylinder connections, online refill bookings, subsidy linking, and PMUY.',
    fullDescription: 'Pradhan Mantri Ujjwala Yojana (PMUY) and centralized LPG portals of state oil marketing companies (Indane, Bharatgas, HP Gas) provide clean cooking fuel connections, safety inspection records, and Direct Benefit Transfer for LPG (PAHAL DBTL).',
    iconName: 'Flame',
    isPopular: false,
    issuingAuthority: 'Ministry of Petroleum and Natural Gas & Public Sector OMCs (IOCL, BPCL, HPCL)',
    estimatedProcessingTime: 'Connection release: 3 - 7 days | Refill delivery: 24 - 48 hours',
    feeRange: 'PMUY: Free connection | General: ₹2,000 - ₹3,500 security deposit',
    validityPeriod: 'Lifelong domestic subscription',
    acceptanceLevel: 'National',
    keywords: [
      'lpg', 'gas booking', 'ujjwala', 'pmuy', 'indane', 'bharatgas', 'hp gas', 
      'pahal', 'dbtl', 'cylinder booking', 'gas subsidy', 'new gas connection'
    ],
    serviceTypes: ['creation', 'download', 'updation'],
    supportsStateSpecific: false,
    eligibility: [
      'Adult women from BPL / underprivileged households for PMUY benefits',
      'Any adult Indian resident for regular domestic LPG connection'
    ],
    keyUses: [
      'Subsidized domestic cooking gas cylinder supply',
      'Accepted secondary proof of residence'
    ],
    availableServiceIds: ['lpg-new-connection', 'lpg-book-cylinder'],
    relatedDocumentIds: ['ration-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'PM Ujjwala Yojana Official Portal',
      portalName: 'PMUY Portal',
      authorityName: 'Ministry of Petroleum and Natural Gas',
      url: 'https://www.pmuy.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 07 — EDUCATION & ACADEMICS
  // ==========================================
  {
    id: 'digilocker-nad-abc',
    name: 'DigiLocker Academic Repository (NAD / ABC ID)',
    code: 'MEITY-NAD-ABC',
    category: 'education',
    itemType: 'service',
    badgeText: 'Digital Academic Vault',
    shortDescription: 'Sovereign digital repository providing legally verified academic degrees, marksheets, and Academic Bank of Credits (ABC).',
    fullDescription: 'The National Academic Depository (NAD), integrated with DigiLocker under the Ministry of Electronics & IT and UGC, provides 24x7 online permanent access to authentic, digitally signed academic awards, diplomas, marksheets, and student credit transfers (ABC ID).',
    iconName: 'GraduationCap',
    isPopular: true,
    issuingAuthority: 'Ministry of Electronics & IT, Ministry of Education & UGC',
    estimatedProcessingTime: 'Instant document fetch and ABC ID generation',
    feeRange: '100% Free of charge',
    validityPeriod: 'Permanent lifelong validity',
    acceptanceLevel: 'National',
    keywords: [
      'digilocker', 'nad', 'abc id', 'academic bank of credits', 'marksheet download', 
      'degree certificate', 'cbse marksheet', 'university marksheet', 'migration certificate', 'apaar'
    ],
    serviceTypes: ['download', 'verification', 'creation'],
    supportsStateSpecific: false,
    eligibility: [
      'Any student enrolled in recognized school boards (CBSE, CISCE, State Boards) or UGC/AICTE universities in India'
    ],
    keyUses: [
      'Legally valid digital proof of education under Section 4 of the Information Technology Act',
      'Seamless university transfers and higher education admissions through automated credit transfers',
      'Paperless background verification for employment and foreign education'
    ],
    availableServiceIds: ['nad-create-abc', 'nad-fetch-marksheet'],
    relatedDocumentIds: ['aadhaar-card', 'apaar-student-id'],
    officialPlatform: {
      name: 'DigiLocker National Academic Depository (NAD)',
      portalName: 'DigiLocker NAD',
      authorityName: 'Ministry of Electronics and Information Technology (MeitY)',
      url: 'https://nad.digilocker.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'national-scholarship-portal',
    name: 'National Scholarship Portal (NSP)',
    code: 'MEITY-NSP-GOV',
    category: 'education',
    itemType: 'service',
    badgeText: 'Central & State Scholarships',
    shortDescription: 'One-stop electronic platform for application, sanction, and Direct Benefit Transfer of government scholarships.',
    fullDescription: 'The National Scholarship Portal (NSP) is the central government gateway facilitating transparent welfare scholarship disbursals across Central Ministries (MoE, MoMA, MSJE, MoTA) and state governments directly to student bank accounts.',
    iconName: 'BookOpen',
    isPopular: true,
    issuingAuthority: 'Ministry of Electronics & Information Technology / Department of Higher Education',
    estimatedProcessingTime: 'Annual academic cycle (Application verification -> Institutional approval -> Disbursal)',
    feeRange: 'Free application',
    validityPeriod: 'Annual academic year renewal',
    acceptanceLevel: 'National',
    keywords: [
      'nsp', 'national scholarship portal', 'scholarships.gov.in', 'post matric scholarship', 
      'pre matric scholarship', 'merit scholarship', 'minority scholarship', 'pragati scholarship'
    ],
    serviceTypes: ['creation', 'verification', 'download'],
    supportsStateSpecific: true,
    eligibility: [
      'Indian students enrolled in recognized schools, colleges, or universities meeting scheme-specific merit and income limits'
    ],
    keyUses: [
      'Direct financial support for tuition, books, and maintenance allowances',
      'Track real-time scholarship disbursal via Public Financial Management System (PFMS)'
    ],
    availableServiceIds: ['nsp-apply-scholarship', 'nsp-track-status'],
    relatedDocumentIds: ['income-caste-domicile', 'aadhaar-card', 'bank-account-statement'],
    officialPlatform: {
      name: 'National Scholarship Portal (NSP)',
      portalName: 'NSP Portal',
      authorityName: 'Ministry of Electronics and Information Technology (MeitY)',
      url: 'https://scholarships.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'apaar-student-id',
    name: 'APAAR ID (One Nation One Student ID)',
    code: 'MOE-APAAR-EDU',
    category: 'education',
    itemType: 'document',
    badgeText: 'Lifelong Student ID',
    shortDescription: '12-digit lifelong unique identifier for all Indian students from pre-primary to higher education.',
    fullDescription: 'APAAR (Automated Permanent Academic Account Registry), conceptualized under NEP 2020 by the Ministry of Education, acts as a unified digital identity storing all academic credits, degrees, sports achievements, and scholarships seamlessly linked with DigiLocker.',
    iconName: 'IdCard',
    isPopular: false,
    issuingAuthority: 'Department of School Education & Literacy / Higher Education, Ministry of Education',
    estimatedProcessingTime: 'Instant generation via school/college portal',
    feeRange: 'Free of charge',
    validityPeriod: 'Lifelong educational identifier',
    acceptanceLevel: 'National',
    keywords: [
      'apaar', 'apaar id', 'one nation one student id', 'student id card', 'edu id', 
      'academic registry', 'nep 2020 student id', 'abc id apaar'
    ],
    serviceTypes: ['creation', 'download'],
    supportsStateSpecific: false,
    eligibility: [
      'Any student enrolled in a registered school, college, or university in India (with parental consent for minors)'
    ],
    keyUses: [
      'Seamless school/college admissions without repeating physical document verification',
      'Unified tracking of academic achievements, Olympiads, and co-curricular credits'
    ],
    availableServiceIds: ['apaar-generate-id'],
    relatedDocumentIds: ['aadhaar-card', 'digilocker-nad-abc'],
    officialPlatform: {
      name: 'APAAR Official Ministry of Education Portal',
      portalName: 'APAAR Registry',
      authorityName: 'Ministry of Education, Government of India',
      url: 'https://apaar.education.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 08 — EMPLOYMENT & SOCIAL SECURITY
  // ==========================================
  {
    id: 'epfo-uan-services',
    name: 'EPFO & Universal Account Number (UAN / EPF)',
    code: 'EPFO-MEMBER-UAN',
    category: 'employment',
    itemType: 'organization',
    badgeText: 'Provident Fund & Pension',
    shortDescription: 'Statutory social security organization managing employee provident funds, pensions (EPS), and insurance (EDLI).',
    fullDescription: 'The Employees’ Provident Fund Organisation (EPFO) administers mandatory provident fund and pension accounts for organized-sector employees. Members use a 12-digit Universal Account Number (UAN) to track balances, download passbooks, and submit online claims.',
    iconName: 'Briefcase',
    isPopular: true,
    issuingAuthority: 'Employees’ Provident Fund Organisation (EPFO), Ministry of Labour and Employment',
    estimatedProcessingTime: 'Passbook view: Instant | Online PF advance/withdrawal: 3 to 10 working days',
    feeRange: 'Free member service',
    validityPeriod: 'Lifelong employment portability',
    acceptanceLevel: 'National',
    keywords: [
      'epfo', 'uan', 'epf', 'pf balance', 'pf withdrawal', 'epf passbook', 'member passbook', 
      'form 19', 'form 31', 'form 10c', 'eps 95', 'provident fund', 'unified portal epfo'
    ],
    serviceTypes: ['verification', 'download', 'updation'],
    supportsStateSpecific: false,
    organizationName: 'Employees’ Provident Fund Organisation',
    eligibility: [
      'Salaried employees in establishments with 20 or more employees earning statutory wages'
    ],
    keyUses: [
      'Retirement retirement savings corpus with guaranteed compound interest',
      'Emergency partial withdrawals for medical treatment, home purchase, and child education',
      'Monthly lifelong employee pension (EPS-95) after 10 years of eligible service'
    ],
    availableServiceIds: ['epfo-check-passbook', 'epfo-online-claim'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card'],
    officialPlatform: {
      name: 'EPFO Unified Member Portal & Passbook Services',
      portalName: 'EPFO Unified Portal',
      authorityName: 'Employees’ Provident Fund Organisation',
      url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
      isVerified: true,
      sourceTier: 'statutory',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      securityNote: 'EPFO never asks members to share UAN passwords or OTPs over phone or third-party links.'
    }
  },
  {
    id: 'eshram-portal',
    name: 'e-Shram National Unorganised Workers Database',
    code: 'MOLE-ESHRAM-NDUW',
    category: 'employment',
    itemType: 'document',
    badgeText: 'Informal Sector Welfare',
    shortDescription: 'National database and 12-digit UAN card providing social security scheme integration for unorganized workers.',
    fullDescription: 'e-Shram is a comprehensive national database of unorganized workers (NDUW) created by the Ministry of Labour & Employment. It provides a Universal Account Number (UAN) card for migrant workers, gig workers, construction laborers, and domestic helpers to access social welfare schemes.',
    iconName: 'HardHat',
    isPopular: true,
    issuingAuthority: 'Ministry of Labour and Employment, Government of India',
    estimatedProcessingTime: 'Instant self-registration and e-card download',
    feeRange: '100% Free on official portal',
    validityPeriod: 'Lifelong validity',
    acceptanceLevel: 'National',
    keywords: [
      'eshram', 'e-shram', 'eshram card', 'unorganised worker', 'gig worker card', 
      'labour card', 'eshram registration', 'eshram.gov.in', 'shramik card'
    ],
    serviceTypes: ['creation', 'download', 'updation'],
    supportsStateSpecific: false,
    eligibility: [
      'Unorganized workers aged 16 to 59 years',
      'Not an income tax payer and not a member of EPFO/ESIC'
    ],
    keyUses: [
      'Direct social security benefits during national emergencies or disaster relief',
      'Integration with PM Suraksha Bima Yojana and Skill India training programs'
    ],
    availableServiceIds: ['eshram-new-registration', 'eshram-download-card'],
    relatedDocumentIds: ['aadhaar-card', 'ration-card'],
    officialPlatform: {
      name: 'e-Shram Official National Portal',
      portalName: 'e-Shram Portal',
      authorityName: 'Ministry of Labour and Employment',
      url: 'https://eshram.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 09 — HEALTH & MEDICAL
  // ==========================================
  {
    id: 'abha-health-id',
    name: 'ABHA Health ID (Ayushman Bharat Digital Mission)',
    code: 'NHA-ABDM-ABHA',
    category: 'health',
    itemType: 'document',
    badgeText: 'Digital Health ID',
    shortDescription: '14-digit unique digital health identifier for securely organizing and sharing personal medical records.',
    fullDescription: 'Ayushman Bharat Health Account (ABHA), created under the Ayushman Bharat Digital Mission (ABDM), provides citizens with a 14-digit health number and digital address (ABHA address) to digitally consent, access, and share electronic health records across hospitals, clinics, and labs.',
    iconName: 'Activity',
    isPopular: true,
    issuingAuthority: 'National Health Authority (NHA), Ministry of Health and Family Welfare',
    estimatedProcessingTime: 'Instant generation via Aadhaar or Driving Licence verification',
    feeRange: '100% Free of charge',
    validityPeriod: 'Permanent lifelong validity',
    acceptanceLevel: 'National',
    keywords: [
      'abha', 'abha id', 'abha card', 'health id', 'ayushman bharat health account', 
      'abdm', 'digital health record', 'abha address', 'phr app', 'abha.abdm.gov.in'
    ],
    serviceTypes: ['creation', 'download', 'updation'],
    supportsStateSpecific: false,
    eligibility: [
      'Any individual residing in India with a valid Aadhaar or mobile number'
    ],
    keyUses: [
      'Paperless registration and OPD token queue skip at participating government hospitals (Scan & Share)',
      'Securely linking diagnostic lab reports, prescriptions, and discharge summaries across different health systems'
    ],
    availableServiceIds: ['abha-create-number', 'abha-download-card'],
    relatedDocumentIds: ['aadhaar-card', 'ayushman-bharat-pmjay'],
    officialPlatform: {
      name: 'ABHA Official Portal (Ayushman Bharat Digital Mission)',
      portalName: 'ABHA Portal',
      authorityName: 'National Health Authority (NHA)',
      url: 'https://abha.abdm.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'cowin-uwin-vaccination',
    name: 'CoWIN / U-WIN Universal Immunization Records',
    code: 'MOHFW-COWIN-UWIN',
    category: 'health',
    itemType: 'service',
    badgeText: 'Vaccine Certificates',
    shortDescription: 'National digital immunization management portal for verified QR-coded vaccination certificates.',
    fullDescription: 'CoWIN and U-WIN represent India’s digital public infrastructure for universal immunization records, providing verified QR-coded electronic certificates for COVID-19, childhood routine immunizations, and maternal healthcare tracking.',
    iconName: 'Syringe',
    isPopular: false,
    issuingAuthority: 'Ministry of Health and Family Welfare, Government of India',
    estimatedProcessingTime: 'Instant certificate download via mobile OTP',
    feeRange: 'Free for government vaccinations',
    validityPeriod: 'Permanent digital record',
    acceptanceLevel: 'International',
    keywords: [
      'cowin', 'uwin', 'vaccination certificate', 'covid certificate', 'vaccine download', 
      'cowin portal', 'immunization certificate', 'u-win portal'
    ],
    serviceTypes: ['download', 'verification'],
    supportsStateSpecific: false,
    eligibility: [
      'Any vaccinated individual registered with mobile phone number on CoWIN/U-WIN'
    ],
    keyUses: [
      'Mandatory document for international travel immigration and airline check-in',
      'Universal digital tracking of infant immunization schedules'
    ],
    availableServiceIds: ['cowin-download-certificate'],
    relatedDocumentIds: ['aadhaar-card', 'passport'],
    officialPlatform: {
      name: 'CoWIN Official Digital Portal',
      portalName: 'CoWIN Portal',
      authorityName: 'Ministry of Health and Family Welfare',
      url: 'https://www.cowin.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 10 — TRAVEL & IMMIGRATION
  // ==========================================
  {
    id: 'passport',
    name: 'Indian Passport',
    code: 'MEA-CPV-PSP',
    category: 'travel',
    itemType: 'document',
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
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      securityNote: 'Always verify you are on passportindia.gov.in. MEA does not charge appointment scheduling fees via third-party agencies.'
    }
  },

  // ==========================================
  // 11 — CIVIC & GRIEVANCES
  // ==========================================
  {
    id: 'voter-id',
    name: 'Voter ID (EPIC)',
    code: 'ECI-EPIC',
    category: 'civic',
    itemType: 'document',
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
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      securityNote: 'Voters can download digital e-EPIC directly without agent intervention on voters.eci.gov.in.'
    }
  },
  {
    id: 'cpgrams-grievance',
    name: 'Central Public Grievance Portal (CPGRAMS)',
    code: 'DARPG-CPGRAMS-GOV',
    category: 'civic',
    itemType: 'service',
    badgeText: 'Govt Grievance Redressal',
    shortDescription: 'National public grievance redressal portal directly lodging citizen complaints with central/state ministries.',
    fullDescription: 'CPGRAMS (Centralised Public Grievance Redress and Monitoring System) is an online web-enabled system developed by NIC and DARPG allowing citizens to lodge grievances against any Central Ministry, Department, or State Government with time-bound resolution tracking.',
    iconName: 'MessageSquareCheck',
    isPopular: false,
    issuingAuthority: 'Department of Administrative Reforms and Public Grievances (DARPG), GoI',
    estimatedProcessingTime: 'Target resolution within 30 days',
    feeRange: '100% Free of cost',
    validityPeriod: 'Per grievance submission',
    acceptanceLevel: 'National',
    keywords: [
      'cpgrams', 'pgportal', 'public grievance', 'government complaint', 'darpg', 
      'complain against ministry', 'grievance redressal', 'track grievance'
    ],
    serviceTypes: ['creation', 'download'],
    supportsStateSpecific: false,
    eligibility: [
      'Any citizen having an unresolved service or administrative grievance with a public authority'
    ],
    keyUses: [
      'Escalating delayed pensions, administrative bottlenecks, or service deficiency with government bodies',
      'Transparent tracking and appeal against unsatisfactory grievance closure'
    ],
    availableServiceIds: ['cpgrams-lodge-grievance', 'cpgrams-track-status'],
    relatedDocumentIds: ['aadhaar-card'],
    officialPlatform: {
      name: 'Central Public Grievance Redress Portal (CPGRAMS)',
      portalName: 'CPGRAMS Portal',
      authorityName: 'Department of Administrative Reforms and Public Grievances',
      url: 'https://pgportal.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 12 — VITAL RECORDS & CERTIFICATES
  // ==========================================
  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    code: 'CRS-RBD-VITAL',
    category: 'certificates',
    itemType: 'document',
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
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true,
      stateNote: 'Registration is governed federally under RBD Act but administered locally by Municipal Corporations (e.g. MCD, BBMP, BMC) and Gram Panchayats.',
      securityNote: 'Ensure certificates downloaded online contain a verifiable digital signature or QR code.'
    }
  },
  {
    id: 'death-marriage-certificates',
    name: 'Death & Marriage Certificates (CRS / Sub-Registrar)',
    code: 'CRS-RBD-MARRIAGE',
    category: 'certificates',
    itemType: 'document',
    badgeText: 'Vital Legal Records',
    shortDescription: 'Statutory registration records of death and marriages issued under RBD Act & Special/Hindu Marriage Acts.',
    fullDescription: 'Death Certificates (establishing date and cause of death for legal settlement) and Marriage Certificates (statutory proof of marriage under Hindu Marriage Act, 1955 or Special Marriage Act, 1954) issued by Municipal Registrars or Sub-Divisional Magistrates.',
    iconName: 'FileBadge',
    isPopular: true,
    issuingAuthority: 'Office of Registrar General of India & State Inspector General of Registration (IGR)',
    estimatedProcessingTime: '7 - 30 working days',
    feeRange: '₹10 - ₹100 statutory court/registration fees',
    validityPeriod: 'Permanent lifelong record',
    acceptanceLevel: 'National',
    keywords: [
      'death certificate', 'marriage certificate', 'marriage registration', 'court marriage', 
      'shadi praman patra', 'mrityu praman patra', 'crs death', 'sub registrar marriage'
    ],
    serviceTypes: ['creation', 'download'],
    supportsStateSpecific: true,
    eligibility: [
      'Death: Close relatives/hospital informants reporting within statutory 21 days',
      'Marriage: Bridegroom (21+ yrs) and Bride (18+ yrs) residing in jurisdictional area'
    ],
    keyUses: [
      'Death: Claiming bank deposits, life insurance settlement, property mutation, and pension claims',
      'Marriage: Spouse visa application, joint home loans, and changing surname in passport/PAN'
    ],
    availableServiceIds: ['crs-register-death', 'crs-register-marriage'],
    relatedDocumentIds: ['aadhaar-card', 'pan-card'],
    officialPlatform: {
      name: 'Civil Registration System (CRS) / State IGR Portals',
      portalName: 'CRS & IGR Registration Portal',
      authorityName: 'Office of the Registrar General of India',
      url: 'https://crsorgi.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    }
  },

  // ==========================================
  // 13 — BUSINESS & PROFESSIONAL
  // ==========================================
  {
    id: 'udyam-msme-registration',
    name: 'Udyam MSME Registration Portal',
    code: 'MSME-UDYAM-GOV',
    category: 'business',
    itemType: 'service',
    badgeText: 'Zero-Cost MSME Portal',
    shortDescription: 'Official government registration certificate for Micro, Small and Medium Enterprises.',
    fullDescription: 'Udyam Registration is the only official Government of India online portal for registering an MSME under the Ministry of MSME. It generates a permanent Udyam Registration Number (URN) and dynamic QR-coded digital e-certificate without uploading paper documents.',
    iconName: 'Building2',
    isPopular: true,
    issuingAuthority: 'Ministry of Micro, Small & Medium Enterprises (MSME), Government of India',
    estimatedProcessingTime: 'Instant preliminary registration | 2 to 5 business days for certificate issue',
    feeRange: '100% Completely Free (No government fee)',
    validityPeriod: 'Permanent lifelong validity',
    acceptanceLevel: 'National',
    keywords: [
      'udyam', 'msme', 'udyam registration', 'msme registration', 'udyam certificate', 
      'msme certificate', 'small business registration', 'udyamregistration.gov.in', 'zero cost udyam'
    ],
    serviceTypes: ['creation', 'download', 'updation'],
    supportsStateSpecific: false,
    eligibility: [
      'Any individual enterprise, proprietorship, partnership, LLP, or private company operating in manufacturing or service sectors',
      'Investment in plant & machinery and turnover within defined MSME limits'
    ],
    keyUses: [
      'Priority Sector Lending and collateral-free bank loans under CGTMSE',
      'Subsidies on patent registration, trademark fees, and ISO certification',
      'Protection against delayed payments under MSME SAMADHAAN portal'
    ],
    availableServiceIds: ['udyam-new-registration', 'udyam-download-certificate'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card', 'gst-portal-services'],
    officialPlatform: {
      name: 'Udyam Official Government Portal (Ministry of MSME)',
      portalName: 'Udyam Registration Portal',
      authorityName: 'Ministry of Micro, Small & Medium Enterprises',
      url: 'https://udyamregistration.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      securityNote: 'BEWARE of fake clone sites charging fees. Official registration on udyamregistration.gov.in is completely FREE.'
    }
  },
  {
    id: 'gst-portal-services',
    name: 'Goods & Services Tax (GST Portal)',
    code: 'GSTN-CBIC-PORTAL',
    category: 'business',
    itemType: 'service',
    badgeText: 'Indirect Tax & GSTIN',
    shortDescription: 'Central portal for 15-digit GSTIN registration, GSTR monthly/quarterly returns, and e-Way bills.',
    fullDescription: 'The GST Portal (gst.gov.in) is the unified electronic tax network created by the GST Council and CBIC for national business tax compliance, input tax credit (ITC) reconciliation, return filing (GSTR-1, GSTR-3B), and taxpayer verification.',
    iconName: 'Receipt',
    isPopular: true,
    issuingAuthority: 'Goods and Services Tax Network (GSTN) / Central Board of Indirect Taxes & Customs',
    estimatedProcessingTime: 'New GST Registration: 3 to 7 working days post Aadhaar authentication',
    feeRange: 'Free on government portal',
    validityPeriod: 'Valid till active business operations / cancellation',
    acceptanceLevel: 'National',
    keywords: [
      'gst', 'gstin', 'gst registration', 'gst portal', 'gstr 1', 'gstr 3b', 'gstr 9', 
      'input tax credit', 'e-way bill', 'gst filing', 'gst.gov.in', 'gst search taxpayer'
    ],
    serviceTypes: ['creation', 'download', 'verification'],
    supportsStateSpecific: false,
    eligibility: [
      'Businesses crossing statutory aggregate turnover threshold (₹40L for goods / ₹20L for services in standard states)',
      'Mandatory for all inter-state suppliers and e-commerce sellers'
    ],
    keyUses: [
      'Legal authorization to collect GST and pass on Input Tax Credit (ITC)',
      'Essential for opening business current bank accounts and corporate tenders'
    ],
    availableServiceIds: ['gst-register-business', 'gst-search-taxpayer'],
    relatedDocumentIds: ['pan-card', 'aadhaar-card', 'udyam-msme-registration'],
    officialPlatform: {
      name: 'GST Common Portal (GSTN)',
      portalName: 'GST Portal',
      authorityName: 'Goods and Services Tax Network / CBIC',
      url: 'https://www.gst.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },

  // ==========================================
  // 14 — GOVERNMENT SCHEMES & BENEFITS
  // ==========================================
  {
    id: 'myscheme-portal',
    name: 'myScheme National Government Schemes Portal',
    code: 'MEITY-MYSCHEME-GOV',
    category: 'schemes',
    itemType: 'service',
    badgeText: 'National Scheme Finder',
    shortDescription: 'National unified discovery platform finding eligible government schemes based on citizen profile criteria.',
    fullDescription: 'myScheme is a national digital platform developed by the National e-Governance Division (NeGD) and MeitY. It provides a single-window search to discover government welfare schemes across central ministries and all state governments without visiting multiple portals.',
    iconName: 'Sparkles',
    isPopular: true,
    issuingAuthority: 'Ministry of Electronics & Information Technology, Government of India',
    estimatedProcessingTime: 'Instant scheme matching',
    feeRange: '100% Free public service',
    validityPeriod: 'Subject to respective scheme guidelines',
    acceptanceLevel: 'National',
    keywords: [
      'myscheme', 'government schemes', 'sarkari yojana', 'scheme finder', 'central schemes', 
      'state schemes', 'subsidy finder', 'myscheme.gov.in', 'yojana portal'
    ],
    serviceTypes: ['verification', 'download'],
    supportsStateSpecific: true,
    eligibility: [
      'Open to all Indian citizens (search filters match age, gender, caste, income, occupation)'
    ],
    keyUses: [
      'Discover personalized welfare schemes, scholarships, farmer subsidies, and pension entitlements',
      'Step-by-step guidance on official application procedures and verified destination links'
    ],
    availableServiceIds: ['myscheme-discover-benefits'],
    relatedDocumentIds: ['aadhaar-card', 'ration-card', 'income-caste-domicile'],
    officialPlatform: {
      name: 'myScheme National Portal (Government of India)',
      portalName: 'myScheme Portal',
      authorityName: 'Ministry of Electronics and Information Technology (MeitY)',
      url: 'https://www.myscheme.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  },
  {
    id: 'pm-kisan-portal',
    name: 'PM Kisan Samman Nidhi Portal',
    code: 'MOA-PMKISAN-GOV',
    category: 'schemes',
    itemType: 'scheme',
    badgeText: '₹6,000/yr Farmer Support',
    shortDescription: 'Direct income support scheme providing ₹6,000 annually in three equal installments to eligible landholding farmers.',
    fullDescription: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme with 100% funding from the Government of India, transferring ₹6,000 per year directly to bank accounts of small and marginal farmer families via DBT.',
    iconName: 'Sprout',
    isPopular: true,
    issuingAuthority: 'Ministry of Agriculture and Farmers Welfare, Government of India',
    estimatedProcessingTime: 'State verification -> Quarterly installment disbursals (April, August, December)',
    feeRange: '100% Free of charge',
    validityPeriod: 'Continuous annual benefit subject to active land record & e-KYC',
    acceptanceLevel: 'National',
    keywords: [
      'pm kisan', 'pmkisan', 'kisan samman nidhi', 'farmer subsidy', 'kisan ekyc', 
      'pm kisan installment', 'pm kisan status', 'pmkisan.gov.in', 'kisan portal'
    ],
    serviceTypes: ['creation', 'verification', 'download'],
    supportsStateSpecific: true,
    eligibility: [
      'Landholding farmer families with cultivable land in their names as per state land revenue records',
      'Completed mandatory Aadhaar e-KYC on the PM-KISAN portal'
    ],
    keyUses: [
      'Supplementary income support for purchasing agricultural inputs and crop maintenance',
      'Direct credit into Aadhaar-seeded bank accounts'
    ],
    availableServiceIds: ['pmkisan-new-registration', 'pmkisan-check-status'],
    relatedDocumentIds: ['land-records-bhulekh', 'aadhaar-card'],
    officialPlatform: {
      name: 'PM-KISAN Official Government Portal',
      portalName: 'PM-KISAN Portal',
      authorityName: 'Ministry of Agriculture & Farmers Welfare',
      url: 'https://pmkisan.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    }
  }
];
