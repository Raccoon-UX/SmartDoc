import { Service } from '../types/service';

export const services: Service[] = [
  // ==========================================
  // 01 — AADHAAR SERVICES
  // ==========================================
  {
    id: 'aadhaar-enrolment',
    documentId: 'aadhaar-card',
    name: 'New Aadhaar Enrolment',
    shortDescription: 'Free initial enrolment for obtaining a 12-digit Unique Identification Number (Aadhaar).',
    purpose: 'Enables Indian residents of all ages to obtain an official biometric-backed unique identity card.',
    serviceType: 'creation',
    keywords: ['new aadhaar', 'first aadhaar', 'biometric enrolment', 'uidai centre', 'baal aadhaar', 'apply aadhaar', 'fresh aadhaar'],
    detailedProcess: [
      'Locate the nearest authorized Aadhaar Enrolment Center (Bank, Post Office, or UIDAI Seva Kendra).',
      'Book an online appointment on the myAadhaar portal to skip queues, or visit directly.',
      'Fill out the Enrolment Form and present valid Proof of Identity (PoI) and Proof of Address (PoA).',
      'Provide biometric data (10 fingerprints, both irises, and live photograph).',
      'Collect the printed Acknowledgement Slip with the 28-digit Enrolment ID (EID) to track status.'
    ],
    requirements: [
      { id: 'req-poi', title: 'Proof of Identity (PoI)', description: 'Passport, PAN Card, Voter ID, Ration Card, Driving Licence, etc.', isMandatory: true, type: 'document' },
      { id: 'req-poa', title: 'Proof of Address (PoA)', description: 'Electricity bill, Water bill, Bank passbook, Passport, Rent Agreement, etc.', isMandatory: true, type: 'document' },
      { id: 'req-pob', title: 'Proof of Date of Birth (DoB)', description: 'Birth Certificate, SSLC Book/Certificate, Passport, etc.', isMandatory: true, type: 'document' },
      { id: 'req-bio', title: 'Physical Biometric Capture', description: 'Fingerprints, Iris scan, and live photograph at an authorized center.', isMandatory: true, type: 'biometric' },
      { id: 'req-res', title: 'Residency Criteria', description: 'Must have resided in India for at least 182 days in the past 12 months.', isMandatory: true, type: 'eligibility' }
    ],
    requiredDocuments: [
      'Proof of Identity (PoI)',
      'Proof of Address (PoA)',
      'Proof of Date of Birth (DoB)',
      'Head of Family (HoF) document (if applying via HoF mode)'
    ],
    officialPlatform: {
      name: 'UIDAI myAadhaar Portal',
      portalName: 'myAadhaar',
      authorityName: 'Unique Identification Authority of India (UIDAI)',
      url: 'https://myaadhaar.uidai.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      note: 'Online appointment booking is available. Biometric capture requires a visit to an authorized Aadhaar Seva Kendra.'
    },
    fee: {
      amount: 'Free',
      details: 'New Aadhaar enrolment is completely free of charge at all official centers.',
      feeType: 'free'
    },
    estimatedTime: '15 to 30 working days',
    speedBracket: 'extended',
    isOnlineAvailable: false,
    relatedServiceIds: ['aadhaar-download-eaadhaar', 'aadhaar-update-demographic']
  },
  {
    id: 'aadhaar-update-demographic',
    documentId: 'aadhaar-card',
    name: 'Update Demographic Details',
    shortDescription: 'Update your Name, Address, Date of Birth, Gender, or Document proof in your Aadhaar record.',
    purpose: 'Keeps your official identification updated when you change residence, correct name spelling, or update proof documents.',
    serviceType: 'updation',
    keywords: ['address update', 'address change', 'name correction', 'spelling mistake', 'aadhaar correction', 'dob change', 'mobile update'],
    detailedProcess: [
      'Login to the myAadhaar portal using your 12-digit Aadhaar Number and OTP sent to your registered mobile number.',
      'Select "Update Aadhaar Online" or "Document Update".',
      'Choose the field to update (e.g. Address) and enter the correct updated details.',
      'Upload clear scanned copies of supporting proof documents (PoI / PoA).',
      'Pay the nominal government fee online (INR 50) and submit.',
      'Receive a Service Request Number (SRN) to track the verification progress.'
    ],
    requirements: [
      { id: 'req-mob', title: 'Registered Mobile Number', description: 'Active mobile number linked with Aadhaar to receive authentication OTP.', isMandatory: true, type: 'info' },
      { id: 'req-sup', title: 'Supporting Document', description: 'Valid PoA (for address change) or PoI (for name/DOB change) as per UIDAI list.', isMandatory: true, type: 'document' },
      { id: 'req-fee', title: 'Online Fee Payment', description: 'INR 50 for online update requests.', isMandatory: true, type: 'fee' }
    ],
    requiredDocuments: [
      'Valid Proof of Address (for Address Update)',
      'Valid Proof of Identity (for Name Update)',
      'Birth Certificate or Educational Certificate (for DOB correction)'
    ],
    officialPlatform: {
      name: 'UIDAI myAadhaar Portal',
      portalName: 'myAadhaar - Online Update Services',
      authorityName: 'Unique Identification Authority of India (UIDAI)',
      url: 'https://myaadhaar.uidai.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      note: 'Address and Document updates can be done online. Biometric and Mobile Number updates require an in-person visit to an Aadhaar Center.'
    },
    fee: {
      amount: '₹50 (Online) / ₹50-100 (Center)',
      details: '₹50 for demographic updates online or at center; ₹100 for biometric updates at centers.',
      feeType: 'paid'
    },
    estimatedTime: '5 to 15 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['aadhaar-download-eaadhaar', 'aadhaar-order-pvc']
  },
  {
    id: 'aadhaar-download-eaadhaar',
    documentId: 'aadhaar-card',
    name: 'Download e-Aadhaar',
    shortDescription: 'Download a digitally signed, legally valid electronic PDF copy of your Aadhaar card.',
    purpose: 'Provides instant access to your valid Aadhaar card anywhere, anytime for identity verification.',
    serviceType: 'download',
    keywords: ['download aadhaar', 'eaadhaar', 'e-aadhaar pdf', 'digital aadhaar', 'masked aadhaar', 'get aadhaar online'],
    detailedProcess: [
      'Visit the official myAadhaar portal and click "Download Aadhaar".',
      'Enter your 12-digit Aadhaar Number, 16-digit Virtual ID (VID), or 28-digit Enrolment ID (EID).',
      'Enter the captcha and click "Send OTP".',
      'Enter the 6-digit OTP received on your Aadhaar-registered mobile phone.',
      'Optionally choose "Masked Aadhaar" to hide the first 8 digits for enhanced privacy.',
      'Download the password-protected PDF (Password format: First 4 letters of name in CAPITAL + Year of birth).'
    ],
    requirements: [
      { id: 'req-num', title: 'Aadhaar / VID / EID Number', description: 'Your 12-digit Aadhaar, 16-digit VID, or 28-digit Enrolment number.', isMandatory: true, type: 'info' },
      { id: 'req-otp', title: 'Aadhaar-Linked Mobile', description: 'Active phone number to receive one-time security password.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: [
      'No physical documents needed if mobile number is already linked'
    ],
    officialPlatform: {
      name: 'UIDAI myAadhaar Portal',
      portalName: 'myAadhaar Download',
      authorityName: 'Unique Identification Authority of India (UIDAI)',
      url: 'https://myaadhaar.uidai.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      note: 'e-Aadhaar is legally equivalent to the physical printed Aadhaar card under the Aadhaar Act.'
    },
    fee: {
      amount: 'Free',
      details: 'Downloading e-Aadhaar PDF from the official portal is free of cost.',
      feeType: 'free'
    },
    estimatedTime: 'Instant (1-2 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true,
    relatedServiceIds: ['aadhaar-order-pvc']
  },
  {
    id: 'aadhaar-order-pvc',
    documentId: 'aadhaar-card',
    name: 'Order Aadhaar PVC Card',
    shortDescription: 'Order a durable, wallet-sized polyvinyl chloride (PVC) card with tamper-proof security features.',
    purpose: 'Provides a pocket-friendly, durable, weather-resistant plastic card with a secure QR code and hologram.',
    serviceType: 'replacement',
    keywords: ['pvc aadhaar', 'plastic aadhaar', 'order aadhaar card', 'reprint aadhaar', 'speed post aadhaar'],
    detailedProcess: [
      'Go to the myAadhaar portal and click "Order Aadhaar PVC Card".',
      'Enter your 12-digit Aadhaar Number or 28-digit EID and captcha.',
      'If your mobile is registered, request OTP; non-registered mobile numbers can also be used to receive OTP for PVC card delivery.',
      'Preview your demographic details (for registered mobile users).',
      'Pay ₹50 (inclusive of speed post delivery charges and GST) via UPI/Debit/Credit Card/Net Banking.',
      'Save the Service Request Number (SRN) and track delivery via Speed Post.'
    ],
    requirements: [
      { id: 'req-uid', title: 'Aadhaar Number / EID', description: 'Valid 12-digit Aadhaar or 28-digit EID.', isMandatory: true, type: 'info' },
      { id: 'req-fee-pvc', title: 'Service Fee', description: '₹50 payment via online gateway.', isMandatory: true, type: 'fee' }
    ],
    requiredDocuments: [
      'No documents required (details pulled from existing Aadhaar database)'
    ],
    officialPlatform: {
      name: 'UIDAI myAadhaar Portal',
      portalName: 'Order Aadhaar PVC Card',
      authorityName: 'Unique Identification Authority of India (UIDAI)',
      url: 'https://myaadhaar.uidai.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      note: 'Dispatched via India Post Speed Post directly to your registered address.'
    },
    fee: {
      amount: '₹50',
      details: 'Inclusive of printing, speed post delivery charges, and applicable taxes.',
      feeType: 'paid'
    },
    estimatedTime: '5 to 10 working days for delivery',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['aadhaar-download-eaadhaar']
  },

  // ==========================================
  // 02 — RATION CARD SERVICES
  // ==========================================
  {
    id: 'ration-new-application',
    documentId: 'ration-card',
    name: 'New Ration Card Application (NFSA)',
    shortDescription: 'Apply for a new family ration card under the National Food Security Act.',
    purpose: 'Enables eligible families to access subsidized foodgrain quotas and state welfare entitlements.',
    serviceType: 'creation',
    keywords: ['new ration card', 'apply ration', 'nfsa application', 'rashan card online', 'bpl card apply'],
    detailedProcess: [
      'Visit the National Food Security Portal (nfsa.gov.in) and navigate to your State Portal.',
      'Fill in Head of Household details (senior-most female member where applicable).',
      'Add all family members with their 12-digit Aadhaar numbers.',
      'Upload residential address proof, family income certificate, and gas connection status.',
      'Submit to local Food & Civil Supplies Inspector / District Supply Office for physical field verification.',
      'Collect digitized Ration Card or download e-Ration card post approval.'
    ],
    requirements: [
      { id: 'req-rc-aadh', title: 'Aadhaar of All Family Members', description: 'Mandatory Aadhaar seeding for NFSA subsidy.', isMandatory: true, type: 'document' },
      { id: 'req-rc-poa', title: 'Proof of Local Residence', description: 'Electricity bill, Rent agreement, Water bill.', isMandatory: true, type: 'document' },
      { id: 'req-rc-inc', title: 'Family Income Certificate', description: 'Certified income certificate issued by Tehsildar/Revenue authority.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Aadhaar Card copies of all family members',
      'Proof of Residence in the State',
      'Income Certificate / BPL Certificate',
      'Passport size photograph of the Head of Family'
    ],
    officialPlatform: {
      name: 'National Food Security Portal (NFSA)',
      portalName: 'NFSA Citizen Portal',
      authorityName: 'Department of Food & Public Distribution',
      url: 'https://nfsa.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    },
    fee: {
      amount: 'Free to ₹20 (State portal charge)',
      details: 'Nominal online service fee in some state portals.',
      feeType: 'free'
    },
    estimatedTime: '15 to 30 working days',
    speedBracket: 'extended',
    isOnlineAvailable: true,
    relatedServiceIds: ['ration-download-digital', 'ration-member-addition']
  },
  {
    id: 'ration-download-digital',
    documentId: 'ration-card',
    name: 'Download e-Ration Card (ONORC)',
    shortDescription: 'Download your digital e-Ration card and check monthly grain entitlement quotas.',
    purpose: 'Allows instant portability verification at Fair Price Shops nationwide under ONORC.',
    serviceType: 'download',
    keywords: ['download ration card', 'e ration card', 'check ration status', 'onorc card download'],
    detailedProcess: [
      'Visit your state Food & Civil Supplies portal or the Mera Ration mobile application.',
      'Enter your Ration Card Number or Aadhaar Number.',
      'Verify family member details and monthly foodgrain quota.',
      'Download and print the digital e-Ration Card with QR code.'
    ],
    requirements: [
      { id: 'req-rc-num', title: 'Ration Card Number / Aadhaar', description: 'Existing active ration card reference.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Ration Card Number or Aadhaar Number'],
    officialPlatform: {
      name: 'National Food Security Portal (NFSA)',
      portalName: 'NFSA Portal',
      authorityName: 'Department of Food & Public Distribution',
      url: 'https://nfsa.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Digital download is completely free.', feeType: 'free' },
    estimatedTime: 'Instant (1-2 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 03 — STATE REVENUE CERTIFICATES
  // ==========================================
  {
    id: 'revenue-apply-certificate',
    documentId: 'income-caste-domicile',
    name: 'Apply for Domicile / Income / Caste Certificate',
    shortDescription: 'Online application for statutory revenue certificates through ServicePlus / e-District portals.',
    purpose: 'Provides certified documentary proof of residence, annual family income, or constitutional caste status.',
    serviceType: 'creation',
    keywords: ['apply caste certificate', 'income certificate online', 'domicile apply', 'serviceplus', 'edistrict certificate'],
    detailedProcess: [
      'Register on the National ServicePlus portal (serviceonline.gov.in) or state e-District portal.',
      'Select the specific certificate required (Income, Domicile/Residence, SC/ST/OBC, or EWS).',
      'Fill in applicant details, parentage, residential address, and income/caste specifics.',
      'Upload self-declaration, Aadhaar card, ration card, and supporting property/school records.',
      'Pay the state facilitation fee (₹10 - ₹50) online.',
      'Application is routed to the local Patwari/Tehsildar for field verification before SDM digital signoff.'
    ],
    requirements: [
      { id: 'req-rev-aadh', title: 'Aadhaar Card', description: 'Identity and address proof.', isMandatory: true, type: 'document' },
      { id: 'req-rev-aff', title: 'Self-Declaration / Affidavit', description: 'Declaration of income/caste particulars.', isMandatory: true, type: 'document' },
      { id: 'req-rev-anc', title: 'Ancestral / Land Proof (for Caste/Domicile)', description: 'Land deed, older revenue records, or parent certificate.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Aadhaar Card / Voter ID',
      'Ration Card / Electricity Bill (Address Proof)',
      'Salary Slip / Form 16 / Land record (for Income Certificate)',
      'Parental Caste Certificate / School Transfer Certificate (for Caste Certificate)'
    ],
    officialPlatform: {
      name: 'ServicePlus National Framework (NIC)',
      portalName: 'ServicePlus Portal',
      authorityName: 'National Informatics Centre (NIC) & State Revenue Departments',
      url: 'https://serviceonline.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    },
    fee: { amount: '₹10 - ₹50', details: 'Statutory state facilitation fee.', feeType: 'paid' },
    estimatedTime: '7 to 21 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true
  },

  // ==========================================
  // 04 — INCOME TAX & FINANCE SERVICES
  // ==========================================
  {
    id: 'itr-file-return',
    documentId: 'income-tax-filing',
    name: 'File Annual Income Tax Return (ITR-1 / ITR-2 / ITR-4)',
    shortDescription: 'Electronic verification and filing of annual income tax returns on the official government portal.',
    purpose: 'Fulfills statutory annual tax compliance, reports incomes, claims exemptions (80C, 80D), and claims tax refunds.',
    serviceType: 'creation',
    keywords: ['file itr', 'income tax return online', 'itr 1 sahaj', 'itr 2', 'tax refund claim', 'incometax efiling'],
    detailedProcess: [
      'Login to incometax.gov.in with your PAN and password.',
      'Go to "e-File" -> "Income Tax Returns" -> "File Income Tax Return".',
      'Select Assessment Year and Filing Mode (Online recommended).',
      'Choose applicable ITR Form (ITR-1 for salaried individuals up to ₹50L income).',
      'Verify pre-filled salary, interest, and dividend income against AIS and Form 26AS.',
      'Confirm deductions under Section 80C, 80D, 80CCD and calculate final tax liability/refund.',
      'e-Verify return instantly using Aadhaar OTP or Net Banking.'
    ],
    requirements: [
      { id: 'req-itr-pan', title: 'PAN Linked with Aadhaar', description: 'Active PAN registered on e-filing portal.', isMandatory: true, type: 'info' },
      { id: 'req-itr-f16', title: 'Form 16 / Salary Certificates', description: 'TDS summary provided by employer.', isMandatory: true, type: 'document' },
      { id: 'req-itr-bank', title: 'Pre-validated Bank Account', description: 'Active bank account for direct refund credit.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: [
      'Form 16 (from Employer)',
      'Annual Information Statement (AIS) / Form 26AS',
      'Bank Account Statements & Interest Certificates',
      'Investment Proofs (ELSS, PPF, Life Insurance, Medical Insurance)'
    ],
    officialPlatform: {
      name: 'Income Tax Department e-Filing Portal',
      portalName: 'e-Filing 2.0',
      authorityName: 'Central Board of Direct Taxes (CBDT)',
      url: 'https://www.incometax.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Filing on official government portal is free (late fees under Sec 234F apply post-due date).', feeType: 'free' },
    estimatedTime: 'Instant filing | 1 to 6 weeks for refund processing',
    speedBracket: 'standard',
    isOnlineAvailable: true
  },
  {
    id: 'itr-download-26as-ais',
    documentId: 'income-tax-filing',
    name: 'View & Download Form 26AS / AIS / TIS',
    shortDescription: 'Download your consolidated Tax Credit Statement (26AS) and Annual Information Statement (AIS).',
    purpose: 'Provides a complete verified record of all tax deducted at source (TDS), high-value transactions, and bank interest.',
    serviceType: 'download',
    keywords: ['form 26as download', 'download ais', 'tis download', 'tds statement', 'trace tax credit'],
    detailedProcess: [
      'Login to incometax.gov.in.',
      'Click "e-File" -> "Income Tax Returns" -> "View Form 26AS" (routes to TRACES).',
      'Select Assessment Year and download PDF/HTML statement.',
      'To view AIS/TIS: Click "AIS" tab on top navigation to inspect comprehensive financial transaction reporting.'
    ],
    requirements: [
      { id: 'req-ais-pan', title: 'Valid PAN Credentials', description: 'Login access to e-Filing portal.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['PAN & e-Filing Login'],
    officialPlatform: {
      name: 'Income Tax e-Filing Portal / TRACES',
      portalName: 'e-Filing Portal',
      authorityName: 'CBDT / Directorate of Income Tax (Systems)',
      url: 'https://www.incometax.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Zero cost online download.', feeType: 'free' },
    estimatedTime: 'Instant (1 minute)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 05 — INSURANCE (LIC & PM-JAY)
  // ==========================================
  {
    id: 'lic-pay-premium',
    documentId: 'lic-insurance',
    name: 'Pay LIC Policy Premium Online',
    shortDescription: 'Official direct premium payment portal for all Life Insurance Corporation of India policies.',
    purpose: 'Enables policyholders to pay renewal premiums, loan interest, and view premium receipts without agent commission.',
    serviceType: 'updation',
    keywords: ['lic premium payment', 'pay lic online', 'lic direct pay', 'lic renewal premium', 'lic receipt download'],
    detailedProcess: [
      'Visit the official LIC portal (licindia.in).',
      'Click "Pay Premium Online" -> "Pay Direct (Without Login)" or login to Customer Portal.',
      'Select Renewal Premium / Loan Repayment.',
      'Enter Policy Number, Installment Premium amount (without tax), Date of Birth, and Mobile Number.',
      'Verify policy details and choose payment gateway (UPI, Net Banking, Debit Card).',
      'Download the official digitally generated LIC premium receipt immediately.'
    ],
    requirements: [
      { id: 'req-lic-pol', title: '9-Digit LIC Policy Number', description: 'Printed on policy bond or prior receipts.', isMandatory: true, type: 'info' },
      { id: 'req-lic-dob', title: 'Policyholder Date of Birth', description: 'Matches policy record.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Policy Number & Premium Amount'],
    officialPlatform: {
      name: 'Life Insurance Corporation of India (LIC) Direct Portal',
      portalName: 'LIC Pay Direct',
      authorityName: 'Life Insurance Corporation of India',
      url: 'https://licindia.in',
      isVerified: true,
      sourceTier: 'regulated_org',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Premium Amount as per policy', details: 'No additional transaction fee on government UPI gateways.', feeType: 'paid' },
    estimatedTime: 'Instant (1-2 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },
  {
    id: 'pmjay-check-eligibility',
    documentId: 'ayushman-bharat-pmjay',
    name: 'Check Ayushman Bharat Eligibility & Create Ayushman Card',
    shortDescription: 'Verify family eligibility under PM-JAY and generate the ₹5 Lakh cashless health card.',
    purpose: 'Provides instant verification of hospitalization coverage under the Ayushman Bharat scheme.',
    serviceType: 'creation',
    keywords: ['ayushman card apply', 'check pmjay eligibility', 'ayushman card ekyc', 'golden card download', 'pmjay beneficiary'],
    detailedProcess: [
      'Visit the Beneficiary NHA portal (beneficiary.nha.gov.in).',
      'Login as "Beneficiary" using your Mobile Number and OTP.',
      'Select your State, Scheme (PMJAY), and Search by (Aadhaar Number / Family ID / Ration Card).',
      'View family members listed under the scheme.',
      'Click "e-KYC" for any unverified member and complete Aadhaar OTP / Face authentication.',
      'Upon successful e-KYC matching, download the official Ayushman Card PDF.'
    ],
    requirements: [
      { id: 'req-pmjay-aadh', title: 'Aadhaar Number', description: 'Aadhaar linked with active mobile for OTP authentication.', isMandatory: true, type: 'info' },
      { id: 'req-pmjay-rat', title: 'Ration Card / Family ID', description: 'State ration card number.', isMandatory: false, type: 'info' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Ration Card'],
    officialPlatform: {
      name: 'National Health Authority Beneficiary Portal',
      portalName: 'NHA Beneficiary Portal',
      authorityName: 'National Health Authority (NHA)',
      url: 'https://beneficiary.nha.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free', details: 'Generation and download of Ayushman Card is completely free.', feeType: 'free' },
    estimatedTime: 'Instant (5 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 06 — INVESTMENTS & RETIREMENT (AMFI & NPS & EPFO)
  // ==========================================
  {
    id: 'amfi-check-kyc',
    documentId: 'mutual-funds-amfi',
    name: 'Check Mutual Fund KYC Status (AMFI / KRA)',
    shortDescription: 'Verify your mutual fund KYC compliance status across official SEBI-registered KRAs.',
    purpose: 'Ensures your KYC is validated and compliant with Aadhaar-PAN linking rules before investing in SIPs or lump sums.',
    serviceType: 'verification',
    keywords: ['mf kyc check', 'mutual fund kyc status', 'amfi kyc', 'cvl kra', 'cams kra', 'kra kyc status'],
    detailedProcess: [
      'Visit the AMFI Official portal (amfiindia.com) or a SEBI-registered KRA (CVL KRA / NDML / CAMS).',
      'Click "KYC Inquiry / Check KYC Status".',
      'Enter your 10-digit PAN number and complete captcha.',
      'Inspect your KYC status: "KYC Validated", "KYC Registered", or "KYC On Hold".',
      'If modification is needed, update address/email through the respective AMC or KRA portal.'
    ],
    requirements: [
      { id: 'req-mf-pan', title: '10-Digit PAN Number', description: 'Income tax PAN identifier.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['PAN Card details'],
    officialPlatform: {
      name: 'Association of Mutual Funds in India (AMFI)',
      portalName: 'AMFI India Portal',
      authorityName: 'AMFI / SEBI Regulated',
      url: 'https://www.amfiindia.com',
      isVerified: true,
      sourceTier: 'regulated_org',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'KYC status checks are free.', feeType: 'free' },
    estimatedTime: 'Instant real-time lookup',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },
  {
    id: 'nps-open-account',
    documentId: 'national-pension-system',
    name: 'Open National Pension System (NPS) Account Online',
    shortDescription: 'Instant paperless PRAN generation and Tier-I / Tier-II pension account registration.',
    purpose: 'Enables citizens to begin voluntary retirement savings with tax deductions under Section 80CCD.',
    serviceType: 'creation',
    keywords: ['open nps account', 'enps registration', 'pran generation', 'pfrda nps online', 'tier 1 nps account'],
    detailedProcess: [
      'Visit the official eNPS registration portal (enps.nsdl.com).',
      'Click "National Pension System" -> "Registration".',
      'Select "Individual Subscriber" and register using Aadhaar e-KYC or PAN/Bank verification.',
      'Fill in personal contact, bank account details, and nominee information.',
      'Select Pension Fund Manager (PFM) and Investment Choice (Auto Choice or Active Choice).',
      'Make initial contribution (minimum ₹500 for Tier-I).',
      'Receive Permanent Retirement Account Number (PRAN) instantly and download e-PRAN.'
    ],
    requirements: [
      { id: 'req-nps-aadh', title: 'Aadhaar / PAN', description: 'For paperless e-KYC verification.', isMandatory: true, type: 'info' },
      { id: 'req-nps-bank', title: 'Active Bank Account', description: 'For contribution debits and annuity payouts.', isMandatory: true, type: 'info' },
      { id: 'req-nps-init', title: 'Initial Contribution', description: 'Minimum ₹500 initial deposit.', isMandatory: true, type: 'fee' }
    ],
    requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Cancelled Cheque / Bank Passbook', 'Scanned Signature'],
    officialPlatform: {
      name: 'eNPS Official Registration Portal (Protean CRA / PFRDA)',
      portalName: 'eNPS Portal',
      authorityName: 'PFRDA / Central Recordkeeping Agency',
      url: 'https://enps.nsdl.com',
      isVerified: true,
      sourceTier: 'statutory',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '₹500 (Initial Investment)', details: '100% credited to your retirement pension corpus.', feeType: 'paid' },
    estimatedTime: 'Instant PRAN generation (15 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },
  {
    id: 'epfo-check-passbook',
    documentId: 'epfo-uan-services',
    name: 'View & Download EPFO Member Passbook',
    shortDescription: 'Access detailed monthly employee and employer provident fund contributions, interest, and balance.',
    purpose: 'Enables salaried employees to verify monthly PF credits deposited by employers and monitor retirement accumulations.',
    serviceType: 'download',
    keywords: ['epf passbook', 'check pf balance', 'epfo member passbook', 'epfo passbook login', 'uan balance'],
    detailedProcess: [
      'Visit the official EPFO Member Passbook portal (passbook.epfindia.gov.in).',
      'Login using your 12-digit Universal Account Number (UAN) and password.',
      'Select the specific Member ID associated with your current or previous employers.',
      'View total balance, employer share, employee share, and pension contribution.',
      'Download complete yearly PDF statement.'
    ],
    requirements: [
      { id: 'req-epf-uan', title: 'Activated 12-Digit UAN', description: 'UAN must be activated on Unified Portal.', isMandatory: true, type: 'info' },
      { id: 'req-epf-pass', title: 'UAN Password', description: 'Valid portal password.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['UAN & Password'],
    officialPlatform: {
      name: 'EPFO Member Passbook Portal',
      portalName: 'EPFO Passbook Services',
      authorityName: 'Employees’ Provident Fund Organisation',
      url: 'https://passbook.epfindia.gov.in',
      isVerified: true,
      sourceTier: 'statutory',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Zero charge for member passbook downloads.', feeType: 'free' },
    estimatedTime: 'Instant (1 minute)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 07 — TRANSPORT (VAHAN RC & E-CHALLAN)
  // ==========================================
  {
    id: 'vahan-transfer-ownership',
    documentId: 'vehicle-rc-vahan',
    name: 'Vehicle Ownership Transfer & Hypothecation Termination',
    shortDescription: 'Online application for transferring vehicle RC to buyer or removing bank loan endorsement.',
    purpose: 'Ensures legal compliance when buying/selling used vehicles and clearing hypothecation after loan closure.',
    serviceType: 'updation',
    keywords: ['rc transfer', 'transfer vehicle ownership', 'hypothecation removal', 'vahan online rc', 'form 29 form 30'],
    detailedProcess: [
      'Visit the official Vahan Parivahan portal (vahan.parivahan.gov.in).',
      'Enter Vehicle Registration Number and Chassis Number (last 5 digits).',
      'Select service: "Transfer of Ownership" (Form 29/30) or "Hypothecation Termination" (Form 35).',
      'Fill in buyer particulars or bank loan closure NOC reference.',
      'Pay statutory transfer/smart-card fee online.',
      'Book RTO appointment or upload Aadhaar e-KYC documents where supported.',
      'Submit original RC and forms to jurisdictional RTO.'
    ],
    requirements: [
      { id: 'req-vh-rc', title: 'Original Registration Certificate (RC)', description: 'Active vehicle RC.', isMandatory: true, type: 'document' },
      { id: 'req-vh-ins', title: 'Valid Vehicle Insurance & PUC', description: 'Must have active insurance and pollution under control certificate.', isMandatory: true, type: 'document' },
      { id: 'req-vh-noc', title: 'Bank NOC (for Hypothecation removal)', description: 'NOC from financing institution.', isMandatory: false, type: 'document' }
    ],
    requiredDocuments: [
      'Original RC Smart Card',
      'Form 29 and Form 30 (signed by buyer and seller)',
      'Valid Motor Insurance Certificate',
      'Pollution Under Control (PUC) Certificate',
      'Address proof and PAN card of buyer'
    ],
    officialPlatform: {
      name: 'Vahan Parivahan Citizen Portal',
      portalName: 'Vahan Citizen Services',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://vahan.parivahan.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    },
    fee: { amount: '₹300 - ₹800 + State Taxes', details: 'Statutory RTO transfer and smart card charges.', feeType: 'paid' },
    estimatedTime: '7 to 21 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true
  },
  {
    id: 'echallan-pay-fine',
    documentId: 'echallan-traffic',
    name: 'Check & Pay E-Challan Traffic Penalties',
    shortDescription: 'Look up pending traffic compound notices by Challan, Vehicle, or DL Number and pay fines online.',
    purpose: 'Resolves traffic enforcement violations with instant receipt generation.',
    serviceType: 'verification',
    keywords: ['pay challan', 'echallan payment', 'check traffic fine', 'parivahan echallan', 'traffic police challan online'],
    detailedProcess: [
      'Visit echallan.parivahan.gov.in and click "Check Challan Status".',
      'Enter Challan Number, Vehicle Number, or Driving Licence Number.',
      'View photographic evidence, date, location, and statutory section of violation.',
      'Click "Pay Now" and select preferred digital gateway (UPI / Cards / Net Banking).',
      'Download verified digital payment receipt instantly.'
    ],
    requirements: [
      { id: 'req-ch-num', title: 'Challan / Vehicle / DL Number', description: 'Valid reference identifier.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Vehicle Registration Number or DL Number'],
    officialPlatform: {
      name: 'MoRTH E-Challan National Portal',
      portalName: 'Digital Traffic Police Portal',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://echallan.parivahan.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Fine Amount as per offence', details: 'Set as per Motor Vehicles Act compound schedule.', feeType: 'paid' },
    estimatedTime: 'Instant real-time clearance',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 08 — EDUCATION (DIGILOCKER NAD & SCHOLARSHIPS)
  // ==========================================
  {
    id: 'nad-create-abc',
    documentId: 'digilocker-nad-abc',
    name: 'Generate Academic Bank of Credits (ABC ID)',
    shortDescription: 'Create your 12-digit ABC ID on DigiLocker NAD to digitally store and transfer university course credits.',
    purpose: 'Enables multidisciplinary student mobility and credit transfer across higher educational institutions under NEP 2020.',
    serviceType: 'creation',
    keywords: ['create abc id', 'academic bank of credits', 'digilocker abc id', 'nad student id', 'abc credit transfer'],
    detailedProcess: [
      'Visit the official DigiLocker portal (digilocker.gov.in) or NAD portal (nad.digilocker.gov.in).',
      'Sign in using your Aadhaar or mobile credentials.',
      'Search for "Academic Bank of Credits" in the search bar.',
      'Select your Institution Type (University, College, Skill Institute) and search your College name.',
      'Enter your Admission Year and Roll / Registration number.',
      'Click "Get Document" — your 12-digit ABC ID card is generated instantly and saved in Issued Documents.'
    ],
    requirements: [
      { id: 'req-abc-digi', title: 'DigiLocker Account', description: 'Aadhaar-verified DigiLocker account.', isMandatory: true, type: 'info' },
      { id: 'req-abc-roll', title: 'University Roll / Registration Number', description: 'Student identification from college.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Aadhaar Card', 'College Admission / Roll Number'],
    officialPlatform: {
      name: 'DigiLocker National Academic Depository (NAD)',
      portalName: 'DigiLocker NAD Portal',
      authorityName: 'Ministry of Electronics & Information Technology (MeitY)',
      url: 'https://nad.digilocker.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free', details: 'ABC ID creation is free.', feeType: 'free' },
    estimatedTime: 'Instant (1-2 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },
  {
    id: 'nsp-apply-scholarship',
    documentId: 'national-scholarship-portal',
    name: 'Apply for Central & State Government Scholarships',
    shortDescription: 'Submit common scholarship applications for Pre-Matric, Post-Matric, and Higher Education merit schemes.',
    purpose: 'Provides direct financial tuition and maintenance assistance to deserving and underprivileged students.',
    serviceType: 'creation',
    keywords: ['apply scholarship', 'nsp scholarship application', 'post matric apply', 'merit cum means scholarship', 'scholarship portal'],
    detailedProcess: [
      'Visit the National Scholarship Portal (scholarships.gov.in).',
      'Register as a new student with your Aadhaar and mobile number.',
      'Provide academic details (Board, Roll number, Course, Institute AISHE/DISE code).',
      'Enter family annual income details and bank account IFSC.',
      'System auto-suggests eligible schemes across Ministry of Education, Social Justice, Minority Affairs, and Tribal Affairs.',
      'Submit application and track institutional level-1 and district level-2 verification.'
    ],
    requirements: [
      { id: 'req-nsp-aadh', title: 'Aadhaar Number', description: 'Linked with student bank account for DBT.', isMandatory: true, type: 'info' },
      { id: 'req-nsp-inc', title: 'Income Certificate', description: 'Valid income certificate issued by competent revenue authority.', isMandatory: true, type: 'document' },
      { id: 'req-nsp-mrk', title: 'Previous Year Academic Marksheet', description: 'Proof of minimum required percentage.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Student Photograph',
      'Verified Income Certificate',
      'Caste / Minority Certificate (if applicable)',
      'Previous Year Marksheet / Passing Certificate',
      'Fee Receipt of Current Course Year',
      'Bank Account Passbook copy'
    ],
    officialPlatform: {
      name: 'National Scholarship Portal (NSP)',
      portalName: 'NSP Portal',
      authorityName: 'Ministry of Electronics and Information Technology (MeitY)',
      url: 'https://scholarships.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Zero application fee on government portal.', feeType: 'free' },
    estimatedTime: 'Seasonal academic cycle verification',
    speedBracket: 'extended',
    isOnlineAvailable: true
  },

  // ==========================================
  // 09 — HEALTH (ABHA ID)
  // ==========================================
  {
    id: 'abha-create-number',
    documentId: 'abha-health-id',
    name: 'Create 14-Digit ABHA Number & Digital Card',
    shortDescription: 'Generate your official Ayushman Bharat Health Account number and QR-coded digital health card.',
    purpose: 'Enables quick paperless hospital registration and consent-based sharing of diagnostic and medical histories.',
    serviceType: 'creation',
    keywords: ['create abha', 'generate health id', 'abha card apply', 'abha.abdm.gov.in create', 'digital health account'],
    detailedProcess: [
      'Visit the official ABHA portal (abha.abdm.gov.in).',
      'Click "Create ABHA Number".',
      'Select "Create using Aadhaar" (or Driving Licence).',
      'Enter your 12-digit Aadhaar number and agree to consent.',
      'Enter the 6-digit OTP received on your Aadhaar-linked mobile phone.',
      'Create your unique ABHA Address (e.g., yourname@abdm).',
      'Download and save the official ABHA Card PDF containing your unique QR code.'
    ],
    requirements: [
      { id: 'req-abh-aadh', title: 'Aadhaar with Linked Mobile', description: 'For instant paperless e-KYC authentication.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Aadhaar Number'],
    officialPlatform: {
      name: 'ABHA Official Portal (National Health Authority)',
      portalName: 'ABHA Portal',
      authorityName: 'National Health Authority (NHA)',
      url: 'https://abha.abdm.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free', details: 'ABHA generation is free of cost.', feeType: 'free' },
    estimatedTime: 'Instant (2 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 10 — BUSINESS (UDYAM & GST)
  // ==========================================
  {
    id: 'udyam-new-registration',
    documentId: 'udyam-msme-registration',
    name: 'Zero-Cost Udyam MSME Registration (Form 1)',
    shortDescription: 'Official government registration for Micro, Small and Medium Enterprises with permanent URN.',
    purpose: 'Enables businesses to receive government MSME certification, collateral-free credit, and subsidy benefits.',
    serviceType: 'creation',
    keywords: ['udyam registration online', 'msme registration free', 'udyam certificate apply', 'small enterprise registration'],
    detailedProcess: [
      'Visit the only official MSME portal (udyamregistration.gov.in).',
      'Click "For New Entrepreneurs who are not Registered yet as MSME".',
      'Enter Entrepreneur’s 12-digit Aadhaar Number and Name as per Aadhaar.',
      'Authenticate with OTP and validate PAN.',
      'Fill in enterprise name, unit location, plant & machinery investment, and turnover from ITR/GSTIN.',
      'Select National Industry Classification (NIC) codes for your business activities.',
      'Submit form — Udyam Registration Number (URN) is issued immediately and e-certificate is generated in 2-5 days.'
    ],
    requirements: [
      { id: 'req-udy-aadh', title: 'Aadhaar of Proprietor/Partner/Director', description: 'Mandatory for identity validation.', isMandatory: true, type: 'info' },
      { id: 'req-udy-pan', title: 'Business / Proprietor PAN', description: 'PAN is mandatory for Udyam registration.', isMandatory: true, type: 'info' },
      { id: 'req-udy-gst', title: 'GSTIN (if applicable)', description: 'Required for businesses liable for GST.', isMandatory: false, type: 'info' }
    ],
    requiredDocuments: ['Aadhaar Number', 'PAN Card Number', 'Bank Account details of enterprise'],
    officialPlatform: {
      name: 'Udyam Registration Portal (Ministry of MSME)',
      portalName: 'Udyam Registration',
      authorityName: 'Ministry of Micro, Small & Medium Enterprises',
      url: 'https://udyamregistration.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      securityNote: 'BEWARE of private fraudulent sites. Official Udyam registration on udyamregistration.gov.in is 100% FREE.'
    },
    fee: { amount: '100% Free (Zero Fee)', details: 'The Government of India charges zero fee for Udyam registration.', feeType: 'free' },
    estimatedTime: 'Instant submission | Certificate in 2-5 business days',
    speedBracket: 'standard',
    isOnlineAvailable: true
  },
  {
    id: 'gst-register-business',
    documentId: 'gst-portal-services',
    name: 'New GST Registration (REG-01)',
    shortDescription: 'Apply for a 15-character Goods and Services Tax Identification Number (GSTIN).',
    purpose: 'Mandatory statutory tax registration enabling businesses to legally collect GST, issue tax invoices, and pass Input Tax Credit.',
    serviceType: 'creation',
    keywords: ['new gst registration', 'apply gstin', 'form reg 01', 'gst portal registration', 'business tax registration'],
    detailedProcess: [
      'Visit the GST Common Portal (gst.gov.in) and click "Services" -> "Registration" -> "New Registration".',
      'Select "Taxpayer" and enter Business Legal Name, PAN, Email, and Mobile Number to generate Temporary Reference Number (TRN).',
      'Login with TRN and complete Part-B of Form REG-01.',
      'Enter trade name, constitution of business, principal place of business, and bank details.',
      'Upload proof of principal place of business (Electricity Bill / Rent Agreement + Consent Letter).',
      'Complete Aadhaar authentication of primary authorized signatory.',
      'Upon officer approval (or auto-approval post 7 days), receive GSTIN and Certificate of Registration (Form REG-06).'
    ],
    requirements: [
      { id: 'req-gst-pan', title: 'Permanent Account Number (PAN)', description: 'PAN of business or proprietor.', isMandatory: true, type: 'document' },
      { id: 'req-gst-poa', title: 'Proof of Principal Business Address', description: 'Electricity Bill / Municipal Tax Receipt / Rent Agreement.', isMandatory: true, type: 'document' },
      { id: 'req-gst-bnk', title: 'Bank Account Proof', description: 'Cancelled cheque / bank statement with account details.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'PAN Card of Business / Proprietor',
      'Aadhaar Card of Authorized Signatory',
      'Proof of Business Ownership / Rent Agreement & Electricity Bill',
      'Bank Account Statement / Cancelled Cheque',
      'Partnership Deed / Certificate of Incorporation (for entities)'
    ],
    officialPlatform: {
      name: 'GST Common Portal (GSTN)',
      portalName: 'GST Portal',
      authorityName: 'Goods and Services Tax Network / CBIC',
      url: 'https://www.gst.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Zero government application fee for GST registration.', feeType: 'free' },
    estimatedTime: '3 to 7 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true
  },

  // ==========================================
  // 11 — SCHEMES (MYSCHEME & PM-KISAN)
  // ==========================================
  {
    id: 'myscheme-discover-benefits',
    documentId: 'myscheme-portal',
    name: 'Discover Eligible Government Schemes on myScheme',
    shortDescription: 'Smart search engine matching your demographics with 2,000+ central and state welfare benefits.',
    purpose: 'Helps citizens find all eligible government subsidies, financial aids, and scholarships in one place.',
    serviceType: 'verification',
    keywords: ['find government schemes', 'myscheme search', 'sarkari yojana search', 'scheme eligibility check'],
    detailedProcess: [
      'Visit the official myScheme portal (myscheme.gov.in).',
      'Click "Find Schemes for You".',
      'Enter basic profile filters: Gender, Age, State, Residence (Urban/Rural), Caste category, Employment, and Income.',
      'View matched central and state schemes grouped by sector (Agriculture, Education, Health, Housing).',
      'Click any scheme to inspect detailed eligibility rules, required documents, and direct application links.'
    ],
    requirements: [
      { id: 'req-mysch-prof', title: 'Basic Demographic Profile', description: 'Age, income, and state information.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['No documents required to check eligibility'],
    officialPlatform: {
      name: 'myScheme National Portal',
      portalName: 'myScheme Portal',
      authorityName: 'Ministry of Electronics and Information Technology (MeitY)',
      url: 'https://www.myscheme.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free', details: 'Free public service portal.', feeType: 'free' },
    estimatedTime: 'Instant matching',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },
  {
    id: 'pmkisan-check-status',
    documentId: 'pm-kisan-portal',
    name: 'Check PM-Kisan Beneficiary Status & Complete e-KYC',
    shortDescription: 'Look up ₹2,000 installment credit status, verify Aadhaar e-KYC, and check land-seeding status.',
    purpose: 'Ensures uninterrupted receipt of ₹6,000 annual direct income support for farmer households.',
    serviceType: 'verification',
    keywords: ['pm kisan status', 'pm kisan ekyc', 'pm kisan beneficiary status', 'kisan samman nidhi installment'],
    detailedProcess: [
      'Visit the official PM-KISAN portal (pmkisan.gov.in).',
      'Under "Farmers Corner", click "Know Your Status".',
      'Enter your Registration Number (or search by Mobile Number / Aadhaar Number).',
      'View installment disbursal history, FTO generation status, and bank credit details.',
      'If e-KYC is pending, click "e-KYC" on homepage and authenticate via Aadhaar OTP.'
    ],
    requirements: [
      { id: 'req-pmk-reg', title: 'PM-Kisan Registration Number / Aadhaar', description: 'Beneficiary registration reference.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Aadhaar Number & Registered Mobile Phone'],
    officialPlatform: {
      name: 'PM-KISAN Official Government Portal',
      portalName: 'PM-KISAN Portal',
      authorityName: 'Ministry of Agriculture and Farmers Welfare',
      url: 'https://pmkisan.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Online tracking and OTP e-KYC are free.', feeType: 'free' },
    estimatedTime: 'Instant real-time lookup',
    speedBracket: 'instant',
    isOnlineAvailable: true
  }
];
