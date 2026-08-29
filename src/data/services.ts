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
    relatedServiceIds: ['ration-download-digital']
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
  // 03 — UDID DISABILITY SERVICES
  // ==========================================
  {
    id: 'udid-new-application',
    documentId: 'udid-disability-card',
    name: 'Apply for Unique Disability ID (UDID) Card',
    shortDescription: 'Online application for national disability certificate and UDID smart card.',
    purpose: 'Provides universal statutory verification for persons with disabilities to access welfare schemes and travel concessions.',
    serviceType: 'creation',
    keywords: ['apply udid', 'disability card apply', 'swavlamban card apply', 'udid registration', 'handicapped certificate'],
    detailedProcess: [
      'Visit the Swavlamban official portal (swavlambancard.gov.in).',
      'Click "Apply for Disability Certificate & UDID Card".',
      'Fill in personal details, address, educational and employment information.',
      'Select disability type and hospital for medical assessment.',
      'Upload Aadhaar Card, photograph, and signature/thumb impression.',
      'Attend the designated Chief Medical Officer (CMO) board assessment for disability percentage evaluation.',
      'Download digital e-UDID card and receive plastic smart card by post.'
    ],
    requirements: [
      { id: 'req-udid-aadh', title: 'Aadhaar Card', description: 'Identity and address proof.', isMandatory: true, type: 'document' },
      { id: 'req-udid-photo', title: 'Passport Size Photograph', description: 'Recent colour photo showing disability if visible.', isMandatory: true, type: 'document' },
      { id: 'req-udid-med', title: 'Medical Assessment', description: 'Physical assessment at District Medical Board.', isMandatory: true, type: 'eligibility' }
    ],
    requiredDocuments: [
      'Aadhaar Card / Voter ID',
      'Recent Passport Photograph',
      'Existing Disability Certificate (if applying for renewal/conversion)'
    ],
    officialPlatform: {
      name: 'Department of Empowerment of Persons with Disabilities (Swavlamban)',
      portalName: 'Swavlamban UDID Portal',
      authorityName: 'Ministry of Social Justice and Empowerment',
      url: 'https://www.swavlambancard.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Zero government application fee for UDID registration.', feeType: 'free' },
    estimatedTime: '30 to 60 working days',
    speedBracket: 'extended',
    isOnlineAvailable: true
  },

  // ==========================================
  // 04 — STATE REVENUE CERTIFICATES
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
  // 05 — PAN CARD SERVICES
  // ==========================================
  {
    id: 'pan-new-application',
    documentId: 'pan-card',
    name: 'Apply for New PAN Card (Form 49A)',
    shortDescription: 'Apply for a new 10-digit alphanumeric Permanent Account Number (PAN).',
    purpose: 'Mandatory financial identifier for opening bank accounts, tax filing, and high-value transactions.',
    serviceType: 'creation',
    keywords: ['new pan', 'apply pan', 'form 49a', 'pan card online', 'instant pan', 'income tax pan'],
    detailedProcess: [
      'Visit the official Income Tax e-Filing portal (incometax.gov.in) or Protean/UTIITSL.',
      'Fill Form 49A with applicant details, parentage, and address for card delivery.',
      'Choose paperless Aadhaar e-KYC mode for digital verification without physical forms.',
      'Pay statutory fee (₹107 for physical delivery in India).',
      'Download acknowledgement receipt with 15-digit coupon number to track status.'
    ],
    requirements: [
      { id: 'req-pan-aadh', title: 'Aadhaar Card', description: 'Aadhaar with linked mobile number for OTP.', isMandatory: true, type: 'document' },
      { id: 'req-pan-fee', title: 'Application Fee', description: '₹107 for dispatch within India.', isMandatory: true, type: 'fee' }
    ],
    requiredDocuments: ['Aadhaar Card'],
    officialPlatform: {
      name: 'Protean (NSDL) Online PAN Portal',
      portalName: 'Protean Form 49A Application',
      authorityName: 'Protean eGov Technologies & CBDT',
      url: 'https://onlineservices.proteantech.in/paam/endUserRegisterContact.html',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-30'
    },
    fee: { amount: '₹107 (Physical) / Free (e-PAN)', details: 'Instant e-PAN is free; physical laminated card is ₹107.', feeType: 'paid' },
    estimatedTime: 'Instant (e-PAN) | 7 to 15 days (Physical Card)',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['pan-instant-epan', 'pan-aadhaar-linking']
  },
  {
    id: 'pan-instant-epan',
    documentId: 'pan-card',
    name: 'Get Instant e-PAN using Aadhaar',
    shortDescription: 'Generate a digitally signed, completely free e-PAN in under 10 minutes using Aadhaar e-KYC.',
    purpose: 'Instant allotment of PAN for urgent financial, banking, or income tax compliance requirements.',
    serviceType: 'creation',
    keywords: ['instant epan', 'free pan card', 'instant pan aadhaar', 'download epan free'],
    detailedProcess: [
      'Visit the official Income Tax e-Filing portal (incometax.gov.in).',
      'Click "Instant e-PAN" -> "Get New e-PAN".',
      'Enter your 12-digit Aadhaar number and agree to declaration terms.',
      'Authenticate using 6-digit OTP received on Aadhaar-linked mobile.',
      'Validate Aadhaar details (Name, DOB, Gender, Address).',
      'PAN is generated within minutes; download digitally signed PDF copy.'
    ],
    requirements: [
      { id: 'req-epan-aadh', title: 'Aadhaar Number', description: 'Must have active mobile linked for OTP.', isMandatory: true, type: 'info' },
      { id: 'req-epan-no-old', title: 'No Prior PAN', description: 'Applicant must not possess an existing PAN.', isMandatory: true, type: 'eligibility' }
    ],
    requiredDocuments: ['Aadhaar Card only'],
    officialPlatform: {
      name: 'Income Tax Department e-Filing Portal',
      portalName: 'Instant e-PAN Service',
      authorityName: 'Central Board of Direct Taxes (CBDT)',
      url: 'https://www.incometax.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free', details: 'Zero fee on the official Income Tax portal.', feeType: 'free' },
    estimatedTime: 'Instant (5 to 10 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },
  {
    id: 'pan-aadhaar-linking',
    documentId: 'pan-card',
    name: 'Link PAN with Aadhaar & Check Link Status',
    shortDescription: 'Mandatory statutory linkage between PAN and Aadhaar under Section 139AA.',
    purpose: 'Keeps your PAN operative for filing tax returns and carrying out banking transactions.',
    serviceType: 'verification',
    keywords: ['link aadhaar pan', 'check pan aadhaar status', 'link pan online', 'pan inoperative link'],
    detailedProcess: [
      'Go to incometax.gov.in and click "Link Aadhaar Status" to verify existing status.',
      'If not linked, click "Link Aadhaar".',
      'Enter 10-digit PAN and 12-digit Aadhaar number.',
      'Verify details and authenticate via OTP.',
      'Check final linking confirmation.'
    ],
    requirements: [
      { id: 'req-link-pan', title: 'PAN Number', description: 'Valid 10-digit PAN.', isMandatory: true, type: 'info' },
      { id: 'req-link-aadh', title: 'Aadhaar Number', description: 'Valid 12-digit Aadhaar.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['PAN Card & Aadhaar Card'],
    officialPlatform: {
      name: 'Income Tax Department e-Filing Portal',
      portalName: 'Link Aadhaar Portal',
      authorityName: 'Central Board of Direct Taxes (CBDT)',
      url: 'https://www.incometax.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '₹1,000 (Late Fee under Sec 234H if unlinked)', details: 'Statutory government fee for late linking.', feeType: 'paid' },
    estimatedTime: 'Instant OTP verification | 2-4 days for status update',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 06 — INCOME TAX & FINANCE SERVICES
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
  // 07 — JAN DHAN BANKING (PMJDY)
  // ==========================================
  {
    id: 'pmjdy-open-account',
    documentId: 'jan-dhan-banking',
    name: 'Open Pradhan Mantri Jan Dhan Yojana (PMJDY) Account',
    shortDescription: 'Zero-balance basic savings bank account with RuPay Debit Card and inbuilt accident insurance.',
    purpose: 'Enables universal financial inclusion, Direct Benefit Transfer (DBT) receipt, and overdraft facilities.',
    serviceType: 'creation',
    keywords: ['open jan dhan account', 'pmjdy zero balance account', 'rupay debit card jan dhan', 'dbt bank account'],
    detailedProcess: [
      'Visit any authorized Public Sector / Private Commercial Bank or Bank Mitra (Customer Service Point).',
      'Fill in PMJDY Account Opening Application Form.',
      'Present Aadhaar Card for paperless e-KYC account opening.',
      'Account is activated immediately with zero minimum balance requirement.',
      'Collect PMJDY Passbook and personalized RuPay Debit Card with inbuilt ₹2 Lakh accident cover.'
    ],
    requirements: [
      { id: 'req-jdy-aadh', title: 'Aadhaar Card', description: 'Universal e-KYC document.', isMandatory: true, type: 'document' },
      { id: 'req-jdy-photo', title: 'Passport Photographs', description: '2 passport size photos.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: ['Aadhaar Card / Voter ID / NREGA Card'],
    officialPlatform: {
      name: 'Department of Financial Services (PMJDY)',
      portalName: 'PMJDY National Portal',
      authorityName: 'Ministry of Finance',
      url: 'https://pmjdy.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Zero (100% Free)', details: 'Zero opening charge and zero minimum balance penalty.', feeType: 'free' },
    estimatedTime: 'Same day account opening',
    speedBracket: 'instant',
    isOnlineAvailable: false
  },

  // ==========================================
  // 08 — INSURANCE (LIC & PM-JAY & SOCIAL SECURITY)
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
  {
    id: 'jansuraksha-enrol-guidance',
    documentId: 'social-security-insurance',
    name: 'Enrol in PMJJBY (Life) & PMSBY (Accident) Micro-Insurance',
    shortDescription: 'Low-cost government-backed social security insurance schemes (₹436/yr for PMJJBY, ₹20/yr for PMSBY).',
    purpose: 'Provides ₹2 Lakh life insurance and ₹2 Lakh accidental death cover with automatic annual bank auto-debit.',
    serviceType: 'creation',
    keywords: ['pmjjby application', 'pmsby application', 'jansuraksha apply', 'government life insurance 436', 'accident insurance 20'],
    detailedProcess: [
      'Login to your Bank’s Mobile App / Net Banking or visit your bank branch.',
      'Navigate to "Government Schemes / Social Security Schemes".',
      'Select PMJJBY (₹2 Lakh Life Cover) and PMSBY (₹2 Lakh Accident Cover).',
      'Confirm auto-debit bank savings account and nominate beneficiary.',
      'Receive instant Certificate of Insurance directly in your registered email/SMS.'
    ],
    requirements: [
      { id: 'req-js-bank', title: 'Active Bank Account', description: 'Savings bank account with auto-debit facility.', isMandatory: true, type: 'info' },
      { id: 'req-js-age', title: 'Age Criteria', description: '18-50 years for PMJJBY, 18-70 years for PMSBY.', isMandatory: true, type: 'eligibility' }
    ],
    requiredDocuments: ['Savings Bank Account & Nominee Details'],
    officialPlatform: {
      name: 'Department of Financial Services (Jan Suraksha)',
      portalName: 'Jan Suraksha National Portal',
      authorityName: 'Ministry of Finance',
      url: 'https://financialservices.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '₹436/year (PMJJBY) | ₹20/year (PMSBY)', details: 'Annual auto-debit premium.', feeType: 'paid' },
    estimatedTime: 'Instant net-banking enrolment',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 09 — INVESTMENTS & RETIREMENT (AMFI, NPS, PPF)
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
    id: 'ppf-open-guidance',
    documentId: 'post-office-savings-ppf',
    name: 'Open Public Provident Fund (PPF) & Small Savings Account',
    shortDescription: '15-year sovereign-backed tax-exempt savings account (EEE tax status) under Section 80C.',
    purpose: 'Long-term risk-free wealth creation offering compounding government-notified interest rates.',
    serviceType: 'creation',
    keywords: ['open ppf account', 'post office ppf', 'public provident fund online', 'post office savings scheme'],
    detailedProcess: [
      'Visit your nearest Department of Posts / Bank branch or use Net Banking (e.g. IPPB, SBI, PNB, HDFC).',
      'Fill Form-A (PPF Account Opening Form) and designate nominee.',
      'Submit Aadhaar and PAN KYC copies.',
      'Deposit initial investment (minimum ₹500, maximum ₹1.5 Lakh per financial year).',
      'Receive physical or digital PPF Passbook.'
    ],
    requirements: [
      { id: 'req-ppf-pan', title: 'PAN Card', description: 'Mandatory for PPF investments.', isMandatory: true, type: 'document' },
      { id: 'req-ppf-aadh', title: 'Aadhaar Card', description: 'Address and identity verification.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Passport Photos'],
    officialPlatform: {
      name: 'India Post Official National Portal',
      portalName: 'India Post Banking Services',
      authorityName: 'Department of Posts, Ministry of Communications',
      url: 'https://www.indiapost.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '₹500 (Minimum Initial Deposit)', details: '100% credited into your PPF account.', feeType: 'paid' },
    estimatedTime: 'Same day account activation',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 10 — TRANSPORT (SARATHI DL, VAHAN RC, E-CHALLAN)
  // ==========================================
  {
    id: 'dl-learners-licence',
    documentId: 'driving-licence',
    name: 'Apply for Learner’s Licence (LL)',
    shortDescription: 'Initial temporary driving permit required before appearing for permanent driving licence test.',
    purpose: 'Authorizes legal practice driving with an instructor on Indian roads for 6 months.',
    serviceType: 'creation',
    keywords: ['apply learners licence', 'll application', 'sarathi ll online', 'online ll test', 'learners licence parivahan'],
    detailedProcess: [
      'Visit the official Sarathi Parivahan portal (parivahan.gov.in).',
      'Select your State and click "Apply for Learner Licence".',
      'Fill in applicant personal details, blood group, and select vehicle class (MCWG, LMV).',
      'Upload Age Proof, Address Proof, and Form 1 (Self-Declaration of Medical Fitness).',
      'Pay the statutory state government fee online.',
      'Take the online Aadhaar-authenticated Computer Knowledge Test from home (in participating states) or at RTO.',
      'Download the Learner Licence approval slip immediately upon passing.'
    ],
    requirements: [
      { id: 'req-dl-age', title: 'Minimum Age', description: '18 years for Cars/Bikes with Gear; 16 years for Gearless Scooter (up to 50cc).', isMandatory: true, type: 'eligibility' },
      { id: 'req-dl-poa', title: 'Proof of Address & Age', description: 'Aadhaar, Passport, Voter ID, or School Leaving Certificate.', isMandatory: true, type: 'document' },
      { id: 'req-dl-med', title: 'Medical Self-Declaration (Form 1)', description: 'Self-declaration of physical fitness.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Age Proof Certificate', 'Self-Declaration Form 1'],
    officialPlatform: {
      name: 'Sarathi Parivahan Citizen Portal',
      portalName: 'Sarathi Citizen Services',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://parivahan.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    },
    fee: { amount: '₹150 - ₹350 (State Specific)', details: 'State RTO application and online test fee.', feeType: 'paid' },
    estimatedTime: 'Same day (Online Test) to 7 days',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },
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
  // 11 — PROPERTY & UTILITIES (LAND RECORDS & PM UJJWALA)
  // ==========================================
  {
    id: 'bhulekh-search-records',
    documentId: 'land-records-bhulekh',
    name: 'View & Download Digital Land Records (ROR / Khasra / Khatauni)',
    shortDescription: 'Access certified computerized Record of Rights (ROR), cadastral maps, and mutation status.',
    purpose: 'Provides official landowner verification for property transactions, bank agriculture loans, and legal verification.',
    serviceType: 'download',
    keywords: ['bhulekh online', 'download khasra khatauni', 'land records search', 'ror download', 'check land ownership'],
    detailedProcess: [
      'Visit the Department of Land Resources national portal (dolr.gov.in) and select your State Bhulekh Portal.',
      'Select District, Tehsil, and Village.',
      'Search land parcel by Khasra / Gata Number, Khata Number, or Landowner Name.',
      'Inspect digitized Record of Rights (ROR) including ownership share and encumbrances.',
      'Download or print digitally signed Khatauni copy.'
    ],
    requirements: [
      { id: 'req-bh-khas', title: 'Khasra / Khata / Owner Details', description: 'Land parcel reference.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Khasra Number / Owner Name'],
    officialPlatform: {
      name: 'Department of Land Resources (DoLR)',
      portalName: 'Digital Land Records National Portal',
      authorityName: 'Ministry of Rural Development',
      url: 'https://dolr.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    },
    fee: { amount: 'Free (View) / ₹10-₹30 (Signed Copy)', details: 'Free online viewing; nominal state fee for digitally certified copies.', feeType: 'free' },
    estimatedTime: 'Instant view',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },
  {
    id: 'pmuy-new-connection',
    documentId: 'lpg-ujjwala-gas',
    name: 'Apply for Deposit-Free LPG Connection (PM Ujjwala Yojana 2.0)',
    shortDescription: 'Deposit-free domestic LPG connection with free first cylinder and stove for eligible women.',
    purpose: 'Provides clean cooking fuel access to adult women from poor and vulnerable households.',
    serviceType: 'creation',
    keywords: ['apply ujjwala connection', 'pmuy 2.0 apply', 'free gas connection', 'ujjwala lpg online apply'],
    detailedProcess: [
      'Visit the official PM Ujjwala portal (pmuy.gov.in).',
      'Click "Apply for New Ujjwala 2.0 Connection".',
      'Choose preferred LPG Marketing Company (Indane, Bharatgas, or HP Gas).',
      'Fill in applicant adult female details and family member Aadhaar numbers.',
      'Upload Ration Card / BPL declaration and bank account IFSC.',
      'Distributor performs physical verification and releases connection.'
    ],
    requirements: [
      { id: 'req-uy-aadh', title: 'Aadhaar of Adult Woman', description: 'Female head of household.', isMandatory: true, type: 'document' },
      { id: 'req-uy-rat', title: 'Ration Card / Family Composition', description: 'State ration card proof.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Ration Card', 'Bank Passbook'],
    officialPlatform: {
      name: 'PM Ujjwala Yojana Official Portal',
      portalName: 'PMUY 2.0 Portal',
      authorityName: 'Ministry of Petroleum and Natural Gas',
      url: 'https://www.pmuy.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free (Deposit-Free)', details: 'Zero security deposit; first refill and stove provided free by Government.', feeType: 'free' },
    estimatedTime: '7 to 15 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true
  },

  // ==========================================
  // 12 — EDUCATION (DIGILOCKER NAD & SCHOLARSHIPS & APAAR)
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
  {
    id: 'apaar-generate-id',
    documentId: 'apaar-student-id',
    name: 'Generate One Nation One Student ID (APAAR ID)',
    shortDescription: 'Unique 12-digit lifelong identification number digitally linking student academic achievements.',
    purpose: 'Seamlessly connects all school and higher education records, transfer certificates, and scholarships under NEP 2020.',
    serviceType: 'creation',
    keywords: ['create apaar id', 'one nation one student id', 'apaar registration', 'student apaar card'],
    detailedProcess: [
      'Visit the official APAAR portal (apaar.education.gov.in).',
      'Click "Create APAAR" via DigiLocker.',
      'Provide student Aadhaar consent (parental consent for minors).',
      'System validates student demographic information and issues unique 12-digit APAAR number.',
      'Download and print APAAR QR card.'
    ],
    requirements: [
      { id: 'req-ap-aadh', title: 'Student Aadhaar & Parental Consent', description: 'Consent required for students under 18.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Aadhaar Number'],
    officialPlatform: {
      name: 'APAAR Official Portal (Ministry of Education)',
      portalName: 'APAAR Portal',
      authorityName: 'Ministry of Education & MeitY',
      url: 'https://apaar.education.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free', details: 'Zero charges for APAAR generation.', feeType: 'free' },
    estimatedTime: 'Instant (2 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 13 — EMPLOYMENT (EPFO & E-SHRAM)
  // ==========================================
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
  {
    id: 'eshram-new-registration',
    documentId: 'eshram-portal',
    name: 'Register on e-Shram Portal & Get UAN Card',
    shortDescription: 'National database registration for unorganised workers with 12-digit e-Shram Universal Account Number.',
    purpose: 'Provides direct access to government social security schemes and accident insurance cover.',
    serviceType: 'creation',
    keywords: ['eshram apply', 'eshram registration', 'unorganised worker card', 'eshram card download'],
    detailedProcess: [
      'Visit the official e-Shram portal (eshram.gov.in).',
      'Click "Register on e-Shram".',
      'Enter Aadhaar-linked mobile number and captcha.',
      'Complete Aadhaar e-KYC authentication via OTP.',
      'Fill in occupation details, primary skill, and bank account for DBT.',
      'Download the official e-Shram Card with 12-digit UAN instantly.'
    ],
    requirements: [
      { id: 'req-es-aadh', title: 'Aadhaar Card', description: 'Aadhaar with active mobile.', isMandatory: true, type: 'info' },
      { id: 'req-es-age', title: 'Age Criteria', description: '16 to 59 years old unorganised worker.', isMandatory: true, type: 'eligibility' }
    ],
    requiredDocuments: ['Aadhaar Number', 'Bank Account details'],
    officialPlatform: {
      name: 'Ministry of Labour & Employment (e-Shram)',
      portalName: 'e-Shram Citizen Portal',
      authorityName: 'Ministry of Labour & Employment',
      url: 'https://eshram.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free', details: 'Free registration on government portal.', feeType: 'free' },
    estimatedTime: 'Instant (5 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 14 — HEALTH (ABHA & COWIN)
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
  {
    id: 'cowin-download-certificate',
    documentId: 'cowin-uwin-vaccination',
    name: 'Download Digital Immunization Certificate (CoWIN / U-WIN)',
    shortDescription: 'Download digitally verified universal QR-coded vaccination certificates.',
    purpose: 'Provides verifiable proof of immunization for international travel, school admissions, and health records.',
    serviceType: 'download',
    keywords: ['download cowin certificate', 'covid certificate download', 'uwin certificate', 'vaccination certificate qr'],
    detailedProcess: [
      'Visit cowin.gov.in.',
      'Click "Register / Sign In" using your registered 10-digit mobile number.',
      'Enter the 6-digit OTP.',
      'View registered family members and click "Certificate" icon.',
      'Download official digitally signed PDF with secure QR code.'
    ],
    requirements: [
      { id: 'req-cw-mob', title: 'Registered Mobile Number', description: 'Number given at time of vaccination.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Registered Mobile Number'],
    officialPlatform: {
      name: 'Ministry of Health and Family Welfare (CoWIN / U-WIN)',
      portalName: 'CoWIN Portal',
      authorityName: 'Ministry of Health and Family Welfare',
      url: 'https://www.cowin.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Zero charge for downloading certificates.', feeType: 'free' },
    estimatedTime: 'Instant (1 minute)',
    speedBracket: 'instant',
    isOnlineAvailable: true
  },

  // ==========================================
  // 15 — TRAVEL & IMMIGRATION (PASSPORT)
  // ==========================================
  {
    id: 'passport-fresh-application',
    documentId: 'passport',
    name: 'Apply for Fresh Indian Passport',
    shortDescription: 'Application for standard 36-page or 60-page Type P Ordinary Indian Passport.',
    purpose: 'Statutory national travel document verifying identity and citizenship for international travel.',
    serviceType: 'creation',
    keywords: ['fresh passport', 'apply passport', 'passport seva online', 'new passport application', 'rpo appointment'],
    detailedProcess: [
      'Register on the official Passport Seva portal (passportindia.gov.in).',
      'Click "Apply for Fresh Passport / Re-issue of Passport".',
      'Fill in applicant details, family particulars, address, and two local references.',
      'Pay statutory fee (₹1,500 for 36-page normal booklet) online.',
      'Schedule appointment at your jurisdictional Passport Seva Kendra (PSK) or Post Office PSK (POPSK).',
      'Visit PSK with original documents for document verification, biometric capture, and photo.',
      'Complete local police verification and track Speed Post delivery.'
    ],
    requirements: [
      { id: 'req-ps-poi', title: 'Proof of Identity & Address', description: 'Aadhaar, Voter ID, Electricity Bill, Bank Passbook.', isMandatory: true, type: 'document' },
      { id: 'req-ps-dob', title: 'Proof of Date of Birth', description: 'Birth Certificate, School Leaving Certificate.', isMandatory: true, type: 'document' },
      { id: 'req-ps-non', title: 'Non-ECR Proof (if applicable)', description: 'Matriculation (10th) passing certificate or degree.', isMandatory: false, type: 'document' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Birth Certificate / 10th Marksheet', 'Proof of Address'],
    officialPlatform: {
      name: 'Passport Seva Portal (CPV Division)',
      portalName: 'Passport Seva',
      authorityName: 'Ministry of External Affairs (MEA)',
      url: 'https://www.passportindia.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '₹1,500 (36-page) / ₹2,000 (60-page)', details: 'Statutory government passport fee.', feeType: 'paid' },
    estimatedTime: '15 to 30 working days (Normal)',
    speedBracket: 'extended',
    isOnlineAvailable: true
  },

  // ==========================================
  // 16 — CIVIC & GRIEVANCES (VOTER ID & CPGRAMS)
  // ==========================================
  {
    id: 'voter-new-registration',
    documentId: 'voter-id',
    name: 'New Voter Registration (Form 6)',
    shortDescription: 'Enrol in the national electoral roll to obtain a 10-digit Voter ID (EPIC).',
    purpose: 'Enables Indian citizens aged 18+ to exercise constitutional voting rights in elections.',
    serviceType: 'creation',
    keywords: ['voter id apply', 'form 6 voter', 'voters portal', 'eci voter registration', 'new epic card'],
    detailedProcess: [
      'Visit the official Voters Service Portal (voters.eci.gov.in).',
      'Sign up using mobile number and OTP.',
      'Fill Form 6: State, District, Assembly Constituency, Personal Details, and Current Address.',
      'Upload passport photograph, Age Proof, and Address Proof.',
      'Submit online — Application reference number is issued.',
      'Booth Level Officer (BLO) performs field verification; EPIC card is delivered via Speed Post.'
    ],
    requirements: [
      { id: 'req-vt-age', title: 'Age Criteria', description: 'Must be 18 years on qualifying dates (Jan 1, Apr 1, Jul 1, Oct 1).', isMandatory: true, type: 'eligibility' },
      { id: 'req-vt-poa', title: 'Proof of Address & Age', description: 'Aadhaar, Passport, Ration Card, Water/Electricity Bill.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Passport Photograph', 'Address Proof'],
    officialPlatform: {
      name: 'Election Commission of India (ECI)',
      portalName: 'Voters Service Portal',
      authorityName: 'Election Commission of India',
      url: 'https://voters.eci.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: '100% Free', details: 'Zero fee for electoral registration.', feeType: 'free' },
    estimatedTime: '15 to 30 working days',
    speedBracket: 'extended',
    isOnlineAvailable: true
  },
  {
    id: 'cpgrams-lodge-grievance',
    documentId: 'cpgrams-grievance',
    name: 'Lodge Public Grievance on CPGRAMS Portal',
    shortDescription: 'Centralized online grievance redressal platform against Central and State Government departments.',
    purpose: 'Provides citizens with a direct official mechanism to lodge complaints and monitor administrative resolution.',
    serviceType: 'creation',
    keywords: ['cpgrams complaint', 'pgportal grievance', 'lodge government complaint', 'central grievance portal'],
    detailedProcess: [
      'Visit the official Central Public Grievance Redress and Monitoring System (pgportal.gov.in).',
      'Login or register with your mobile number.',
      'Click "Lodge Public Grievance".',
      'Select Ministry / Department / State Government.',
      'Write detailed grievance description and upload supporting PDF documents (up to 4MB).',
      'Submit and receive unique Registration Number to monitor action-taken reports.'
    ],
    requirements: [
      { id: 'req-cpg-desc', title: 'Grievance Description & References', description: 'Clear narrative of issue and prior correspondence.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: ['Supporting correspondence / proof documents'],
    officialPlatform: {
      name: 'Department of Administrative Reforms and Public Grievances (DARPG)',
      portalName: 'CPGRAMS Portal',
      authorityName: 'Government of India',
      url: 'https://pgportal.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29'
    },
    fee: { amount: 'Free', details: 'Zero cost public grievance mechanism.', feeType: 'free' },
    estimatedTime: '30 days resolution target',
    speedBracket: 'extended',
    isOnlineAvailable: true
  },

  // ==========================================
  // 17 — VITAL RECORDS (BIRTH & DEATH/MARRIAGE CRS)
  // ==========================================
  {
    id: 'birth-new-registration',
    documentId: 'birth-certificate',
    name: 'New Birth Certificate Registration (within 21 Days)',
    shortDescription: 'Mandatory statutory registration of birth under the Registration of Births and Deaths Act, 1969.',
    purpose: 'Primary legal document proving date and place of birth, parentage, and constitutional citizenship.',
    serviceType: 'creation',
    keywords: ['birth certificate apply', 'crs birth registration', 'municipal birth certificate', 'birth registration online'],
    detailedProcess: [
      'Institutional births: Hospital / Maternity center reports birth directly on CRS portal (crsorgi.gov.in).',
      'Domiciliary births (at home): Head of Family / parent must report within 21 days on CRS portal or to local Registrar / Gram Panchayat.',
      'Fill Form 1 with child name, parents’ Aadhaar, and hospital discharge slip.',
      'Registrar verifies records and issues certified Birth Certificate with QR code.'
    ],
    requirements: [
      { id: 'req-bc-hosp', title: 'Hospital Discharge / Birth Slip', description: 'Official medical record from hospital.', isMandatory: true, type: 'document' },
      { id: 'req-bc-par', title: 'Parents’ Aadhaar Cards', description: 'Identity and address proof of both parents.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: ['Hospital Birth Summary', 'Parents’ Aadhaar Cards', 'Marriage Certificate (optional)'],
    officialPlatform: {
      name: 'Civil Registration System (Office of RGI)',
      portalName: 'CRS Portal',
      authorityName: 'Office of the Registrar General & Census Commissioner, India',
      url: 'https://crsorgi.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    },
    fee: { amount: 'Free (within 21 Days)', details: 'Registration is completely free within 21 days.', feeType: 'free' },
    estimatedTime: '7 to 15 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true
  },
  {
    id: 'crs-register-death-marriage',
    documentId: 'death-marriage-certificates',
    name: 'Death & Marriage Registration (CRS / Municipal Portal)',
    shortDescription: 'Statutory registration of vital life events for legal succession, insurance settlement, and spousal rights.',
    purpose: 'Provides legally certified evidence of marriage solemnization or proof of death for asset settlement.',
    serviceType: 'creation',
    keywords: ['death certificate online', 'marriage registration crs', 'municipal marriage certificate', 'apply death certificate'],
    detailedProcess: [
      'Visit crsorgi.gov.in or your state Municipal Corporation / e-District portal.',
      'Select Death Registration or Marriage Registration.',
      'Upload institutional death slip / cremation slip (for death) or wedding card + joint photograph + witnesses (for marriage).',
      'Registrar verifies and issues digitized certificate with QR code.'
    ],
    requirements: [
      { id: 'req-crs-ev', title: 'Event Proof Document', description: 'Hospital death summary or Marriage invitation/hall receipt.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: ['Aadhaar Cards of parties/witnesses', 'Event evidence documents'],
    officialPlatform: {
      name: 'Civil Registration System (Office of RGI)',
      portalName: 'CRS Portal',
      authorityName: 'Office of the Registrar General & Census Commissioner, India',
      url: 'https://crsorgi.gov.in',
      isVerified: true,
      sourceTier: 'government',
      verificationStatus: 'verified',
      lastVerified: '2026-08-29',
      isStateSpecific: true
    },
    fee: { amount: 'Free to ₹100 (State specific)', details: 'Standard vital events registration fee.', feeType: 'free' },
    estimatedTime: '7 to 21 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true
  },

  // ==========================================
  // 18 — BUSINESS (UDYAM MSME & GST)
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
  // 19 — SCHEMES (MYSCHEME & PM-KISAN)
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
