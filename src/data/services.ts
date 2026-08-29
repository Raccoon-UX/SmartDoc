import { Service } from '../types/service';

export const services: Service[] = [
  // --- AADHAAR SERVICES ---
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

  // --- PAN CARD SERVICES ---
  {
    id: 'pan-new-application',
    documentId: 'pan-card',
    name: 'New PAN Card Application (Form 49A)',
    shortDescription: 'Apply for a 10-character alphanumeric Permanent Account Number issued by the Income Tax Department.',
    purpose: 'Essential for filing income tax returns, opening bank accounts, buying property, investing, and conducting financial transactions.',
    serviceType: 'creation',
    keywords: ['new pan', 'apply pan', 'form 49a', 'nsdl pan', 'protean pan', 'first pan card', 'pan card application'],
    detailedProcess: [
      'Visit the official Protean (NSDL) or UTIITSL online portal.',
      'Select Application Type as "Form 49A - Indian Citizen".',
      'Fill in applicant category (Individual, Company, etc.) and basic personal information.',
      'Submit the preliminary form to receive a 15-digit Token Number.',
      'Choose the submission mode: Digital e-KYC (paperless via Aadhaar OTP), Scanned Documents via e-Sign, or Physical Document Submission.',
      'Enter parent names, address, income source, and assessing officer (AO) code.',
      'Upload supporting documents and photograph/signature (if not using direct Aadhaar e-KYC).',
      'Pay the statutory fee online and note the 15-digit Acknowledgement Number.'
    ],
    requirements: [
      { id: 'req-poi-pan', title: 'Proof of Identity (PoI)', description: 'Aadhaar Card, Passport, Voter ID, Driving Licence, etc.', isMandatory: true, type: 'document' },
      { id: 'req-poa-pan', title: 'Proof of Address (PoA)', description: 'Aadhaar Card, Bank Account Statement, Utility Bill, Passport.', isMandatory: true, type: 'document' },
      { id: 'req-dob-pan', title: 'Proof of Date of Birth (DoB)', description: 'Birth Certificate, Matriculation Certificate, Aadhaar Card, Passport.', isMandatory: true, type: 'document' },
      { id: 'req-pic-pan', title: 'Photographs & Signature', description: 'Two recent passport-size photos and signature scan (if not using Aadhaar paperless mode).', isMandatory: false, type: 'document' }
    ],
    requiredDocuments: [
      'Aadhaar Card (covers PoI, PoA, and DOB simultaneously)',
      'Alternative PoI (Voter ID, Passport, DL) if Aadhaar not available',
      'Alternative PoA (Utility bill, Bank Passbook, Passport)',
      'Passport size colored photographs'
    ],
    officialPlatform: {
      name: 'Protean (NSDL) / UTIITSL / Income Tax e-Filing',
      portalName: 'Protean eGov TIN Portal',
      authorityName: 'Income Tax Department, Ministry of Finance',
      url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
      isVerified: true,
      note: 'Both Protean (NSDL) and UTIITSL are legally authorized by the Income Tax Department to process PAN applications.'
    },
    fee: {
      amount: '₹107 (Physical card within India) / ₹72 (e-PAN only)',
      details: '₹107 for physical delivery in India; ₹1,017 for dispatch outside India.',
      feeType: 'paid'
    },
    estimatedTime: '7 to 15 working days (e-PAN in 2-3 days)',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['pan-instant-epan', 'pan-link-aadhaar', 'pan-correction-update']
  },
  {
    id: 'pan-instant-epan',
    documentId: 'pan-card',
    name: 'Instant e-PAN via Aadhaar e-KYC',
    shortDescription: 'Generate a free, valid e-PAN instantly in under 10 minutes using your Aadhaar number and OTP.',
    purpose: 'Provides instant paperless PAN card issuance for first-time individual applicants with an Aadhaar-linked mobile.',
    serviceType: 'creation',
    keywords: ['instant pan', 'free pan', 'epan', 'e-pan', 'instant e-pan', 'aadhaar pan instant', 'paperless pan'],
    detailedProcess: [
      'Visit the Income Tax e-Filing portal (incometax.gov.in).',
      'Under Quick Links, click "Instant e-PAN".',
      'Click "Get New e-PAN".',
      'Enter your 12-digit Aadhaar number and confirm the declaration.',
      'Enter the 6-digit OTP received on the mobile phone linked to your Aadhaar.',
      'Validate your Aadhaar details (Name, DOB, Gender, Address, and Photo are fetched automatically).',
      'Submit the request and download the e-PAN PDF within minutes.'
    ],
    requirements: [
      { id: 'req-inst-aadh', title: 'Valid Aadhaar Number', description: 'Must have a valid Aadhaar not already linked with any PAN.', isMandatory: true, type: 'info' },
      { id: 'req-inst-mob', title: 'Aadhaar-Linked Mobile', description: 'Active mobile to receive e-KYC OTP.', isMandatory: true, type: 'info' },
      { id: 'req-inst-maj', title: 'Age Requirement', description: 'Applicant must be an individual adult (18+ years).', isMandatory: true, type: 'eligibility' }
    ],
    requiredDocuments: [
      'Only Aadhaar Number (No document uploads or physical submissions required)'
    ],
    officialPlatform: {
      name: 'Income Tax Department e-Filing Portal',
      portalName: 'Instant e-PAN Service',
      authorityName: 'Central Board of Direct Taxes (CBDT), Ministry of Finance',
      url: 'https://www.incometax.gov.in',
      isVerified: true,
      note: 'e-PAN is digitally signed and carries the same legal validity as a physical PAN card.'
    },
    fee: {
      amount: 'Free',
      details: 'Instant e-PAN service on the Income Tax portal is completely free.',
      feeType: 'free'
    },
    estimatedTime: 'Instant (10 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true,
    relatedServiceIds: ['pan-reprint-card', 'pan-link-aadhaar']
  },
  {
    id: 'pan-correction-update',
    documentId: 'pan-card',
    name: 'Change / Correction in PAN Data',
    shortDescription: 'Correct errors in name spelling, father’s name, date of birth, photo, or signature on your existing PAN.',
    purpose: 'Ensures consistency between your PAN card and other official documents like Aadhaar, Passport, and Bank records.',
    serviceType: 'updation',
    keywords: ['pan correction', 'pan update', 'change pan name', 'dob correction in pan', 'pan father name', 'update pan card'],
    detailedProcess: [
      'Visit the Protean (NSDL) or UTIITSL PAN correction portal.',
      'Select "Changes or Correction in existing PAN Data / Reprint of PAN Card".',
      'Enter your existing 10-digit PAN number and personal details to generate a Token Number.',
      'Fill out the form and check the specific box next to any field you want to modify.',
      'Upload supporting proof document for the correction (e.g., Aadhaar, Marriage certificate for name change, Birth Certificate for DOB).',
      'Pay the online processing fee and submit the acknowledgement.'
    ],
    requirements: [
      { id: 'req-corr-pan', title: 'Existing PAN Number', description: 'Valid 10-digit PAN number.', isMandatory: true, type: 'info' },
      { id: 'req-corr-prf', title: 'Proof of Requested Change', description: 'Official document proving the revised name, DOB, or relationship.', isMandatory: true, type: 'document' },
      { id: 'req-corr-poi', title: 'Proof of Identity and Address', description: 'Valid PoI and PoA corresponding to the corrected data.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Copy of Existing PAN Card / PAN Allotment Letter',
      'Proof of Identity, Address, and DOB',
      'Gazette Notification / Marriage Certificate (for legal name changes)'
    ],
    officialPlatform: {
      name: 'Protean eGov (NSDL) / UTIITSL Portal',
      portalName: 'PAN Change/Correction Services',
      authorityName: 'Income Tax Department',
      url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
      isVerified: true
    },
    fee: {
      amount: '₹107 (Physical card) / ₹72 (e-PAN only)',
      details: 'Standard government processing and courier fee for domestic addresses.',
      feeType: 'paid'
    },
    estimatedTime: '10 to 20 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['pan-link-aadhaar', 'pan-reprint-card']
  },
  {
    id: 'pan-link-aadhaar',
    documentId: 'pan-card',
    name: 'Link PAN with Aadhaar',
    shortDescription: 'Mandatory statutory linkage of your Permanent Account Number with your 12-digit Aadhaar.',
    purpose: 'Fulfills legal mandate under Section 139AA of the Income-tax Act to prevent multiple PAN cards and ensure tax compliance.',
    serviceType: 'verification',
    keywords: ['link pan aadhaar', 'pan aadhar link', 'link pan', 'section 139aa', 'link status pan', 'tax linkage'],
    detailedProcess: [
      'Visit the Income Tax e-Filing portal (incometax.gov.in).',
      'Under "Quick Links", click "Link Aadhaar".',
      'Enter your 10-character PAN number and 12-digit Aadhaar number.',
      'If fee payment is required under Section 234H, pay the fee on NSDL e-Pay Tax / Protean portal.',
      'After payment challan reflects, submit the Link Aadhaar request.',
      'Check linkage status under "Link Aadhaar Status" on the portal.'
    ],
    requirements: [
      { id: 'req-link-pan', title: 'Valid PAN and Aadhaar', description: 'Both records must have matching Name, Gender, and DOB.', isMandatory: true, type: 'info' },
      { id: 'req-link-fee', title: 'Late Fee Payment', description: 'Statutory late fee under Section 234H if not linked before deadline.', isMandatory: false, type: 'fee' }
    ],
    requiredDocuments: [
      'PAN Card details',
      'Aadhaar Card details'
    ],
    officialPlatform: {
      name: 'Income Tax Department e-Filing Portal',
      portalName: 'Link Aadhaar Portal',
      authorityName: 'Central Board of Direct Taxes (CBDT)',
      url: 'https://www.incometax.gov.in',
      isVerified: true
    },
    fee: {
      amount: '₹1,000 (Applicable late fee as per IT Act)',
      details: 'Payable online via e-Pay Tax before submitting the link request.',
      feeType: 'paid'
    },
    estimatedTime: '24 to 48 hours for verification',
    speedBracket: 'instant',
    isOnlineAvailable: true,
    relatedServiceIds: ['pan-correction-update']
  },

  // --- PASSPORT SERVICES ---
  {
    id: 'passport-fresh-application',
    documentId: 'passport',
    name: 'Fresh Passport Application',
    shortDescription: 'Apply for a new Indian Ordinary International Passport (36 or 60 pages).',
    purpose: 'Enables Indian citizens to travel abroad and serves as a universally recognized proof of nationality and identity.',
    serviceType: 'creation',
    keywords: ['new passport', 'apply passport', 'fresh passport', 'passport seva', 'tatkal passport', 'tatkaal', 'ordinary passport', 'psk appointment'],
    detailedProcess: [
      'Register on the Passport Seva Online Portal (passportindia.gov.in).',
      'Login and select "Apply for Fresh Passport / Re-issue of Passport".',
      'Fill in applicant details, family details, present residential address, and emergency contact.',
      'Select Passport Booklet Type (36 Pages standard or 60 Pages jumbo) and Scheme (Normal or Tatkaal).',
      'Pay the passport fee online and book an appointment at your nearest Passport Seva Kendra (PSK) / Post Office PSK (POPSK).',
      'Visit PSK on the appointment date with original documents for document verification, biometric capture, and photograph.',
      'Undergo local Police Verification at your jurisdiction.',
      'Receive passport via Speed Post.'
    ],
    requirements: [
      { id: 'req-pass-poi', title: 'Proof of Identity & Address (PoA)', description: 'Aadhaar Card, Electricity Bill, Water Bill, Voter ID, Bank Passbook, etc.', isMandatory: true, type: 'document' },
      { id: 'req-pass-dob', title: 'Proof of Date of Birth (DoB)', description: 'Birth Certificate issued by Municipal Authority/Registrar, or School Leaving/Matriculation Certificate.', isMandatory: true, type: 'document' },
      { id: 'req-pass-non-ecr', title: 'Non-ECR (Emigration Check Not Required) Proof', description: 'Matriculation (10th standard) certificate or higher degree, or income tax payer proof.', isMandatory: false, type: 'document' },
      { id: 'req-pass-pol', title: 'Police Verification', description: 'Clear report from local police station after background inquiry.', isMandatory: true, type: 'eligibility' }
    ],
    requiredDocuments: [
      'Proof of Present Address (Aadhaar, Utility Bill, Bank Passbook)',
      'Proof of Date of Birth (Birth Certificate, Transfer Certificate, Matriculation)',
      'Non-ECR Documentary Proof (10th Marksheet / Degree Certificate)',
      'Aadhaar Card (Original + Self-attested copy)'
    ],
    officialPlatform: {
      name: 'Passport Seva Portal',
      portalName: 'Consular, Passport & Visa (CPV) Division',
      authorityName: 'Ministry of External Affairs (MEA), Government of India',
      url: 'https://www.passportindia.gov.in',
      isVerified: true,
      note: 'Beware of fraudulent clone websites. Official portal is exclusively passportindia.gov.in.'
    },
    fee: {
      amount: '₹1,500 (Normal 36 pages) / ₹3,500 (Tatkaal 36 pages)',
      details: '₹1,500 for Normal 36 pages (10-year validity); ₹2,000 for Normal 60 pages; ₹3,500 for Tatkaal 36 pages.',
      feeType: 'paid'
    },
    estimatedTime: 'Normal: 15-30 days | Tatkaal: 1-3 days',
    speedBracket: 'extended',
    isOnlineAvailable: true,
    relatedServiceIds: ['passport-reissue-renewal', 'passport-police-clearance', 'passport-track-status']
  },
  {
    id: 'passport-reissue-renewal',
    documentId: 'passport',
    name: 'Passport Re-issue (Renewal)',
    shortDescription: 'Renew your expiring passport, replace an exhausted booklet, or update personal information.',
    purpose: 'Ensures continuous international travel validity before current passport expires (many countries require 6 months validity).',
    serviceType: 'renewal',
    keywords: ['passport renew', 'renew passport', 'passport renewal', 'reissue passport', 'expired passport', 'exhausted pages', 'passport update'],
    detailedProcess: [
      'Login to the official Passport Seva portal.',
      'Choose "Apply for Fresh Passport / Re-issue of Passport".',
      'Select "Re-issue" and specify the reason (Validity Expired within 3 years/Due to Expire, Exhaustion of Pages, Lost/Damaged, Change in Personal Particulars).',
      'Fill in the application form and pay the renewal fee online.',
      'Schedule an appointment at PSK/POPSK.',
      'Present your Old Original Passport along with self-attested copies of first and last pages.',
      'Complete verification at PSK; police verification will be determined based on address changes.'
    ],
    requirements: [
      { id: 'req-re-old', title: 'Old Original Passport', description: 'Current passport booklet (cancelled & returned at PSK).', isMandatory: true, type: 'document' },
      { id: 'req-re-addr', title: 'Proof of Current Address', description: 'Required if your residence address has changed since previous issue.', isMandatory: false, type: 'document' }
    ],
    requiredDocuments: [
      'Original Old Passport with copies of first two, last two, and ECR/Non-ECR pages',
      'Proof of Current Address (if address is different from old passport)',
      'Self-attested copies of valid documents supporting any changed personal details'
    ],
    officialPlatform: {
      name: 'Passport Seva Portal',
      portalName: 'Passport Re-issue System',
      authorityName: 'Ministry of External Affairs (MEA)',
      url: 'https://www.passportindia.gov.in',
      isVerified: true
    },
    fee: {
      amount: '₹1,500 (Normal 36-page) / ₹3,500 (Tatkaal)',
      details: 'Same fee structure as fresh passport application.',
      feeType: 'paid'
    },
    estimatedTime: 'Normal: 7 to 15 days | Tatkaal: 1 to 3 days',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['passport-fresh-application', 'passport-track-status']
  },
  {
    id: 'passport-police-clearance',
    documentId: 'passport',
    name: 'Police Clearance Certificate (PCC)',
    shortDescription: 'Official certificate required for emigration, employment, residency, or long-term visa abroad.',
    purpose: 'Certifies that an applicant has no criminal records or pending charges as per Indian police records.',
    serviceType: 'verification',
    keywords: ['pcc', 'police clearance', 'emigration check', 'visa clearance', 'work visa pcc', 'passport pcc'],
    detailedProcess: [
      'Login to the Passport Seva Portal and select "Apply for Police Clearance Certificate (PCC)".',
      'Select Country for which PCC is required and Purpose of PCC (Employment, Long-term Visa, Immigration).',
      'Pay the fee online and book an appointment at PSK/POPSK.',
      'Visit PSK with original passport and documents.',
      'Police station conducts inquiry and issues clearance.',
      'PCC is issued and dispatched.'
    ],
    requirements: [
      { id: 'req-pcc-pass', title: 'Valid Indian Passport', description: 'Passport with at least 6 months validity.', isMandatory: true, type: 'document' },
      { id: 'req-pcc-poa', title: 'Current Address Proof', description: 'Aadhaar / Utility Bill matching current residence.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Original Passport with self-attested copies',
      'Current Address Proof',
      'Employment Offer Letter / Visa Application / Emigration sponsorship document'
    ],
    officialPlatform: {
      name: 'Passport Seva Portal',
      portalName: 'PCC Application System',
      authorityName: 'Ministry of External Affairs (MEA)',
      url: 'https://www.passportindia.gov.in',
      isVerified: true
    },
    fee: {
      amount: '₹500',
      details: 'Fixed standard fee for PCC processing.',
      feeType: 'paid'
    },
    estimatedTime: '7 to 21 working days (subject to police verification)',
    speedBracket: 'extended',
    isOnlineAvailable: true,
    relatedServiceIds: ['passport-fresh-application']
  },
  {
    id: 'passport-track-status',
    documentId: 'passport',
    name: 'Track Passport Application Status',
    shortDescription: 'Check real-time status of your passport application, police verification, and speed post delivery.',
    purpose: 'Provides transparent progress updates across PSK scrutiny, police verification, printing, and postal tracking.',
    serviceType: 'download',
    keywords: ['track passport', 'passport status', 'check passport', 'file number status', 'speed post passport', 'tracking'],
    detailedProcess: [
      'Visit the Passport Seva portal and click "Track Application Status".',
      'Select Application Type as "Passport / PCC / IC / GEP".',
      'Enter your 15-character File Number (printed on PSK acknowledgement receipt).',
      'Enter your Date of Birth (DD/MM/YYYY) and click "Track Status".',
      'View current status stage (e.g. "Passport is under printing", "Passport has been dispatched with Speed Post Tracking No").'
    ],
    requirements: [
      { id: 'req-trk-file', title: 'Application File Number', description: '15-character file number received at PSK.', isMandatory: true, type: 'info' },
      { id: 'req-trk-dob', title: 'Date of Birth', description: 'Applicant date of birth as submitted.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: [
      'Acknowledgement Receipt / File Number'
    ],
    officialPlatform: {
      name: 'Passport Seva Portal',
      portalName: 'Track Application Status',
      authorityName: 'Ministry of External Affairs (MEA)',
      url: 'https://www.passportindia.gov.in',
      isVerified: true
    },
    fee: {
      amount: 'Free',
      details: 'Online application tracking is free.',
      feeType: 'free'
    },
    estimatedTime: 'Instant real-time lookup',
    speedBracket: 'instant',
    isOnlineAvailable: true,
    relatedServiceIds: ['passport-fresh-application', 'passport-reissue-renewal']
  },

  // --- DRIVING LICENCE SERVICES ---
  {
    id: 'dl-learners-licence',
    documentId: 'driving-licence',
    name: "Application for Learner's Licence (LL)",
    shortDescription: 'Initial 6-month provisional permit allowing you to learn driving motor vehicles under supervision.',
    purpose: 'Mandatory prerequisite before applying for a permanent driving licence in India.',
    serviceType: 'creation',
    keywords: ['learners licence', 'learner license', 'll application', 'parivahan ll', 'online ll test', 'driving permit', 'learner permit'],
    detailedProcess: [
      'Visit the official Sarathi Parivahan portal (parivahan.gov.in).',
      'Select your State and click "Apply for Learner Licence".',
      'Choose Aadhaar Authentication for contactless online application and online LL test (in supported states).',
      'Select vehicle classes (e.g., Motorcycle with Gear [MCWG], Light Motor Vehicle [LMV]).',
      'Upload medical self-declaration (Form 1) or Medical Certificate (Form 1A for applicants over 40).',
      'Upload Address and Age Proof (if not using Aadhaar e-KYC).',
      'Pay government test & licence fees online.',
      'Appear for the computer-based LL test online (or at RTO) covering traffic signs and road safety rules.',
      'Download and print your Learner’s Licence immediately upon passing.'
    ],
    requirements: [
      { id: 'req-ll-age', title: 'Age Eligibility', description: '16+ years for gearless two-wheelers (up to 50cc); 18+ years for light motor vehicles (cars/motorcycles); 20+ years for transport vehicles.', isMandatory: true, type: 'eligibility' },
      { id: 'req-ll-age-prf', title: 'Proof of Age', description: 'Birth Certificate, School Certificate, Passport, PAN Card, Aadhaar.', isMandatory: true, type: 'document' },
      { id: 'req-ll-poa', title: 'Proof of Address', description: 'Aadhaar Card, Passport, Voter ID, Electricity Bill, Ration Card.', isMandatory: true, type: 'document' },
      { id: 'req-ll-med', title: 'Medical Fitness (Form 1 / 1A)', description: 'Self-declaration Form 1; Form 1A signed by registered doctor if above 40 years.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Proof of Age (Birth Certificate, 10th Marksheet, PAN Card, Passport)',
      'Proof of Current Address (Aadhaar Card, Passport, Voter ID, Utility Bill)',
      'Passport size photographs and signature scan',
      'Medical Certificate Form 1 / 1A'
    ],
    officialPlatform: {
      name: 'Sarathi Parivahan Portal',
      portalName: 'Sarathi - Driving Licence Services',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://parivahan.gov.in',
      isVerified: true,
      isStateSpecific: true,
      note: 'State transport rules and online test modes vary slightly across Indian states.'
    },
    fee: {
      amount: '₹150 - ₹350 per class of vehicle (State dependent)',
      details: 'Varies by state: usually ₹150 for LL issue + ₹50 for test fee per vehicle class.',
      feeType: 'varies'
    },
    estimatedTime: 'Same day (Online Aadhaar test) or 1-3 days at RTO',
    speedBracket: 'instant',
    isOnlineAvailable: true,
    relatedServiceIds: ['dl-permanent-licence']
  },
  {
    id: 'dl-permanent-licence',
    documentId: 'driving-licence',
    name: 'Application for Permanent Driving Licence (DL)',
    shortDescription: 'Obtain an official Driving Licence Smart Card after passing the practical driving test.',
    purpose: 'Authorizes legal driving of private or commercial motor vehicles on public roads across India.',
    serviceType: 'creation',
    keywords: ['permanent driving licence', 'dl test', 'rto slot booking', 'driving smart card', 'car driving licence', 'bike licence'],
    detailedProcess: [
      'Ensure at least 30 days have passed since Learner Licence issue (and within LL 180-day validity).',
      'Visit Sarathi Parivahan and select "Apply for Driving Licence".',
      'Enter your Learner Licence Number and Date of Birth.',
      'Select vehicle classes you are testing for.',
      'Pay driving test and Smart Card issue fees.',
      'Book a convenient Driving Test Slot at the local RTO test track.',
      'Bring the vehicle of the applied category to the RTO and perform the driving test before the Motor Vehicle Inspector (MVI).',
      'Upon passing, your biometric photo/signature is recorded, and the DL Smart Card is dispatched to your address.'
    ],
    requirements: [
      { id: 'req-pdl-ll', title: 'Valid Learner Licence', description: 'Must hold an active LL for at least 30 days (max 180 days).', isMandatory: true, type: 'document' },
      { id: 'req-pdl-veh', title: 'Vehicle for Test', description: 'Road-worthy vehicle with valid insurance, PUC, and registration of the relevant class.', isMandatory: true, type: 'eligibility' },
      { id: 'req-pdl-test', title: 'Pass Practical Driving Test', description: 'Clear the reverse-S, 8-figure, parallel parking, and gradient restart tests.', isMandatory: true, type: 'biometric' }
    ],
    requiredDocuments: [
      'Original Learner Licence copy',
      'Proof of Age and Current Address',
      'Form 1 / 1A Medical Fitness',
      'Vehicle Registration Certificate (RC), Insurance, and Pollution (PUC) certificate of test vehicle'
    ],
    officialPlatform: {
      name: 'Sarathi Parivahan Portal',
      portalName: 'Sarathi Driving Licence Application',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://parivahan.gov.in',
      isVerified: true,
      isStateSpecific: true
    },
    fee: {
      amount: '₹700 - ₹1,000 (inclusive of test fee and Smart Card charges)',
      details: 'Varies by state (approx ₹200 DL fee + ₹300 test fee + ₹200 smart card fee).',
      feeType: 'varies'
    },
    estimatedTime: '7 to 15 working days post practical test',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['dl-learners-licence', 'dl-renewal']
  },
  {
    id: 'dl-renewal',
    documentId: 'driving-licence',
    name: 'Renewal of Driving Licence',
    shortDescription: 'Renew expired or expiring Driving Licence (valid for 20 years or until age 50).',
    purpose: 'Avoids heavy traffic penalties and maintains valid legal driving privileges.',
    serviceType: 'renewal',
    keywords: ['renew dl', 'driving licence renewal', 'expired licence', 'renew driving license', 'dl renewal online'],
    detailedProcess: [
      'Visit Sarathi Parivahan portal and choose "Apply for DL Renewal".',
      'Enter your DL Number and Date of Birth.',
      'Verify existing licence details and current address.',
      'Upload Medical Certificate Form 1A (compulsory for transport licence or applicants above 40 years).',
      'Upload copy of current Driving Licence and address proof (if address changed).',
      'Pay renewal fee online.',
      'If renewed within 1 year before/after expiry, no driving re-test is required.'
    ],
    requirements: [
      { id: 'req-rn-dl', title: 'Existing Driving Licence', description: 'Original DL details.', isMandatory: true, type: 'document' },
      { id: 'req-rn-med', title: 'Medical Certificate (Form 1A)', description: 'Signed by registered medical practitioner if applicant is above 40.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Original Driving Licence',
      'Medical Certificate (Form 1A)',
      'Proof of Address (if updating residential address)',
      'Passport size photos'
    ],
    officialPlatform: {
      name: 'Sarathi Parivahan Portal',
      portalName: 'DL Renewal Services',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://parivahan.gov.in',
      isVerified: true,
      isStateSpecific: true
    },
    fee: {
      amount: '₹400 - ₹600 (within grace period) + late fee per year if expired',
      details: '₹200 renewal fee + ₹200 smart card fee. Late fee of ₹300+ ₹1,000/yr applies if renewed >1 year post expiry.',
      feeType: 'varies'
    },
    estimatedTime: '7 to 14 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['dl-permanent-licence']
  },
  {
    id: 'dl-international-permit',
    documentId: 'driving-licence',
    name: 'International Driving Permit (IDP)',
    shortDescription: 'Official multilingual translation permitting you to drive vehicles in foreign treaty countries.',
    purpose: 'Required for renting cars or driving legally during foreign travel, valid for 1 year from issuance.',
    serviceType: 'creation',
    keywords: ['idp', 'international driving permit', 'drive abroad', 'foreign driving licence', 'rto idp'],
    detailedProcess: [
      'Visit Sarathi Parivahan and select "Issue International Driving Permit (IDP)".',
      'Enter your DL Number and Date of Birth.',
      'Fill in country of visit, visa details, air ticket details, and duration of stay.',
      'Upload copies of valid Passport, Visa, Air Ticket, and Medical Certificate Form 1A.',
      'Pay standard government fee (₹1,000) online.',
      'Visit the jurisdictional RTO with originals for verification (or contactless in states supporting e-KYC).',
      'Collect the printed International Driving Permit booklet.'
    ],
    requirements: [
      { id: 'req-idp-dl', title: 'Valid Indian Driving Licence', description: 'Must have at least 1 year validity remaining.', isMandatory: true, type: 'document' },
      { id: 'req-idp-pass', title: 'Valid Indian Passport & Visa', description: 'Proof of citizenship and valid visa for the destination country.', isMandatory: true, type: 'document' },
      { id: 'req-idp-air', title: 'Confirmed Flight Ticket', description: 'Air ticket proof of travel.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Valid Permanent Driving Licence',
      'Valid Passport and Destination Visa',
      'Air Ticket copy',
      'Medical Certificate (Form 1A)',
      '4 recent passport size photographs'
    ],
    officialPlatform: {
      name: 'Sarathi Parivahan Portal',
      portalName: 'Sarathi IDP Issuance',
      authorityName: 'Ministry of Road Transport and Highways (MoRTH)',
      url: 'https://parivahan.gov.in',
      isVerified: true
    },
    fee: {
      amount: '₹1,000',
      details: 'Fixed statutory fee across all RTOs in India.',
      feeType: 'paid'
    },
    estimatedTime: '3 to 7 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['dl-permanent-licence']
  },

  // --- VOTER ID SERVICES ---
  {
    id: 'voter-new-registration',
    documentId: 'voter-id',
    name: 'New Voter Registration (Form 6)',
    shortDescription: 'Enroll as a new general voter in the Indian Electoral Roll and receive an Electors Photo Identity Card (EPIC).',
    purpose: 'Enables Indian citizens who have turned 18 (or will turn 18 on qualifying dates) to exercise their constitutional right to vote.',
    serviceType: 'creation',
    keywords: ['new voter', 'apply voter id', 'form 6', 'election registration', 'epic apply', 'voter card new', 'first time voter'],
    detailedProcess: [
      'Visit the official Election Commission of India Voters’ Service Portal (voters.eci.gov.in).',
      'Sign up using your mobile number and email.',
      'Click on "Form 6 - Register as a new elector/voter".',
      'Select your State, District, and Assembly / Parliamentary Constituency.',
      'Enter personal details (Name, Relative’s name, Gender, Date of Birth).',
      'Provide current residential address with Ward / Village details.',
      'Upload clear photograph, Proof of Age, and Proof of Address.',
      'Submit the form and record the Reference Number for tracking.',
      'Booth Level Officer (BLO) may conduct home verification.',
      'Upon inclusion in electoral roll, receive EPIC card via Speed Post.'
    ],
    requirements: [
      { id: 'req-vot-cit', title: 'Indian Citizenship', description: 'Must be a bona fide citizen of India.', isMandatory: true, type: 'eligibility' },
      { id: 'req-vot-age', title: 'Age Criteria', description: 'Must be 18 years of age or older on the qualifying date (Jan 1, Apr 1, Jul 1, Oct 1).', isMandatory: true, type: 'eligibility' },
      { id: 'req-vot-res', title: 'Ordinary Residence', description: 'Must be an ordinary resident in the constituency applying from.', isMandatory: true, type: 'eligibility' }
    ],
    requiredDocuments: [
      'Proof of Age (Birth Certificate, Aadhaar, PAN, Passport, 10th Marksheet)',
      'Proof of Ordinary Residence (Aadhaar, Bank Passbook, Passport, Utility Bill, Rent Agreement)',
      '1 recent passport-size color photograph'
    ],
    officialPlatform: {
      name: 'Voters’ Service Portal',
      portalName: 'ECI Voters Portal',
      authorityName: 'Election Commission of India (ECI)',
      url: 'https://voters.eci.gov.in',
      isVerified: true,
      note: 'Official portal was transitioned from nvsp.in to voters.eci.gov.in.'
    },
    fee: {
      amount: 'Free',
      details: 'Voter registration and first physical EPIC card delivery are completely free of charge.',
      feeType: 'free'
    },
    estimatedTime: '20 to 45 working days (subject to electoral revision cycle)',
    speedBracket: 'extended',
    isOnlineAvailable: true,
    relatedServiceIds: ['voter-download-epic', 'voter-correction-form8', 'voter-track-status']
  },
  {
    id: 'voter-download-epic',
    documentId: 'voter-id',
    name: 'Download e-EPIC Digital Voter Card',
    shortDescription: 'Download a secure, portable, digitally verified PDF version of your Electors Photo Identity Card.',
    purpose: 'Provides an instant, tamper-proof electronic identity card that can be used at polling stations and as identity proof.',
    serviceType: 'download',
    keywords: ['download voter card', 'e-epic', 'eepic', 'digital voter id', 'download epic pdf', 'voter id download'],
    detailedProcess: [
      'Visit voters.eci.gov.in and click "e-EPIC Download".',
      'Login with your registered mobile number and password/OTP.',
      'Enter your 10-digit alphanumeric EPIC Number or Form Reference Number.',
      'Select your State and click "Search".',
      'Verify the displayed details and click "Send OTP" to receive verification on registered mobile.',
      'Enter OTP and click "Download e-EPIC".',
      'Save the digitally signed PDF containing your QR code, photograph, and constituency details.'
    ],
    requirements: [
      { id: 'req-epic-num', title: 'Valid EPIC Number / Form Reference', description: '10-character voter ID card number.', isMandatory: true, type: 'info' },
      { id: 'req-epic-mob', title: 'Mobile Number in Electoral Roll', description: 'Mobile number must be registered in voter database (updateable via Form 8).', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: [
      'EPIC Number or Form Reference Number (no physical documents needed)'
    ],
    officialPlatform: {
      name: 'Voters’ Service Portal',
      portalName: 'e-EPIC Download Portal',
      authorityName: 'Election Commission of India (ECI)',
      url: 'https://voters.eci.gov.in',
      isVerified: true
    },
    fee: {
      amount: 'Free',
      details: 'Digital e-EPIC download is completely free.',
      feeType: 'free'
    },
    estimatedTime: 'Instant (1-2 minutes)',
    speedBracket: 'instant',
    isOnlineAvailable: true,
    relatedServiceIds: ['voter-correction-form8']
  },
  {
    id: 'voter-correction-form8',
    documentId: 'voter-id',
    name: 'Correction of Entries & Shifting (Form 8)',
    shortDescription: 'Update address, change constituency, correct name spelling/DOB, or request a replacement EPIC card.',
    purpose: 'Ensures accurate electoral records when moving house, getting married, or correcting printing errors.',
    serviceType: 'updation',
    keywords: ['form 8', 'voter address change', 'shift constituency', 'voter name correction', 'replace voter card', 'epic correction'],
    detailedProcess: [
      'Login to voters.eci.gov.in and click "Form 8 - Shifting of Residence / Correction of Entries / Issue of Replacement EPIC".',
      'Choose whether applying for "Self" or "Other".',
      'Select the application purpose (Shifting of Residence, Correction of Entries, Issue of Replacement EPIC without correction, or Marking of PwD).',
      'Fill in the specific details to correct (Name, Gender, DOB, Relation, Address, Mobile, Photo).',
      'Upload supporting document proving the correction.',
      'Submit and track via the generated reference number.'
    ],
    requirements: [
      { id: 'req-f8-epic', title: 'Existing EPIC Number', description: 'Your current 10-digit Voter ID number.', isMandatory: true, type: 'info' },
      { id: 'req-f8-doc', title: 'Supporting Document', description: 'Document evidencing the corrected data (Aadhaar, Passport, Marriage certificate, etc.).', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Copy of existing Voter ID (EPIC)',
      'Proof of Address (for shifting of residence)',
      'Proof of Age / Identity / Name Change (for demographic corrections)'
    ],
    officialPlatform: {
      name: 'Voters’ Service Portal',
      portalName: 'Form 8 Services',
      authorityName: 'Election Commission of India (ECI)',
      url: 'https://voters.eci.gov.in',
      isVerified: true
    },
    fee: {
      amount: 'Free',
      details: 'All electoral roll updates and standard replacement EPIC issuances are free.',
      feeType: 'free'
    },
    estimatedTime: '15 to 30 working days',
    speedBracket: 'extended',
    isOnlineAvailable: true,
    relatedServiceIds: ['voter-download-epic', 'voter-track-status']
  },
  {
    id: 'voter-track-status',
    documentId: 'voter-id',
    name: 'Track Electoral Application Status',
    shortDescription: 'Track the status of Form 6, Form 6A, Form 7, or Form 8 submissions.',
    purpose: 'Provides live visibility across BLO assignment, field verification, and Electoral Registration Officer (ERO) approval.',
    serviceType: 'download',
    keywords: ['track voter id', 'voter status', 'form 6 status', 'form 8 status', 'blo verification tracking'],
    detailedProcess: [
      'Visit voters.eci.gov.in and select "Track Application Status".',
      'Enter your Reference Number and select your State.',
      'Click "Submit" to view step-by-step audit trail (Submitted -> Appointed BLO -> Field Verified -> Accepted/Rejected).'
    ],
    requirements: [
      { id: 'req-vt-ref', title: 'Reference Number', description: 'Submission acknowledgement code.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: [
      'Form Reference Number'
    ],
    officialPlatform: {
      name: 'Voters’ Service Portal',
      portalName: 'ECI Track Status',
      authorityName: 'Election Commission of India (ECI)',
      url: 'https://voters.eci.gov.in',
      isVerified: true
    },
    fee: {
      amount: 'Free',
      details: 'Free online tracking.',
      feeType: 'free'
    },
    estimatedTime: 'Instant real-time lookup',
    speedBracket: 'instant',
    isOnlineAvailable: true,
    relatedServiceIds: ['voter-new-registration', 'voter-correction-form8']
  },

  // --- BIRTH CERTIFICATE SERVICES ---
  {
    id: 'birth-new-registration',
    documentId: 'birth-certificate',
    name: 'Registration of Birth (Within 21 Days)',
    shortDescription: 'Statutory registration of a newborn birth with the Registrar of Births and Deaths / Municipal Authority.',
    purpose: 'Creates the primary legal proof of age, citizenship, parentage, and civil existence required throughout life.',
    serviceType: 'creation',
    keywords: ['birth registration', 'new birth certificate', 'hospital birth certificate', 'register newborn', 'crs birth', 'janam praman patra apply'],
    detailedProcess: [
      'For hospital/institutional births: The hospital administration reports the birth directly to the Municipal Authority / Registrar (CRS) within 21 days.',
      'Collect the hospital Discharge Summary / Form 2 (Birth Report) provided by the medical authority.',
      'For home births: The head of household or designated informant submits Form 2 to the local Municipal Registrar / Gram Panchayat within 21 days.',
      'Submit parents’ identification and address proof documents (Aadhaar / Marriage Certificate).',
      'Pay the nominal municipal processing fee.',
      'The Registrar registers the entry in the Civil Registration System (CRS) register and issues the initial official Birth Certificate.'
    ],
    requirements: [
      { id: 'req-bc-time', title: 'Timely Intimation', description: 'Must be reported within 21 days of birth for normal zero/low fee registration.', isMandatory: true, type: 'eligibility' },
      { id: 'req-bc-hosp', title: 'Hospital Discharge / Form 2', description: 'Birth slip / discharge summary issued by registered medical institution.', isMandatory: true, type: 'document' },
      { id: 'req-bc-par', title: 'Parents’ Identity & Marriage Proof', description: 'Aadhaar cards, PAN, Voter ID, and Marriage Certificate of parents.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Hospital Birth Slip / Discharge Summary / Form 2',
      'Parents’ Aadhaar Cards / Proof of Identity',
      'Parents’ Proof of Address',
      'Marriage Certificate of Parents (where applicable)'
    ],
    officialPlatform: {
      name: 'Civil Registration System (CRS) / State Municipal Portals',
      portalName: 'CRS Portal / State e-District & Urban Local Bodies',
      authorityName: 'Office of Registrar General & Census Commissioner, India / State Municipal Corporations',
      url: 'https://crsorgi.gov.in',
      isVerified: true,
      isStateSpecific: true,
      note: 'CRS (crsorgi.gov.in) covers nationwide registration in participating states; some states operate their own municipal portals (e.g., e-Nagar, Seva Sindhu, edistrict).'
    },
    fee: {
      amount: 'Free (Within 21 days) / Nominal ₹5-₹20 certificate copy fee',
      details: 'Registration within 21 days is free under the Registration of Births and Deaths Act.',
      feeType: 'free'
    },
    estimatedTime: '7 to 15 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['birth-search-download', 'birth-delayed-registration', 'birth-correction-record']
  },
  {
    id: 'birth-search-download',
    documentId: 'birth-certificate',
    name: 'Search & Download Birth Certificate Copy',
    shortDescription: 'Search municipal records and download a digitally signed / QR-coded certified copy of a birth certificate.',
    purpose: 'Provides authenticated birth proof for school admissions, passport applications, and identity issuance.',
    serviceType: 'download',
    keywords: ['download birth certificate', 'search birth record', 'birth certificate copy', 'duplicate birth certificate', 'online birth certificate download'],
    detailedProcess: [
      'Visit the Civil Registration System (crsorgi.gov.in) or your state/city municipal corporation portal (e.g. MCD, BBMP, BMC).',
      'Select "Search Birth Record / Download Certificate".',
      'Enter key search parameters: Date of Birth, Gender, Mother’s Name, Father’s Name, Hospital/Place of Birth, or Registration Number.',
      'Locate the matching record in the municipal database.',
      'Pay online copy fee if mandated by the municipal corporation.',
      'Download and print the digitally signed Birth Certificate with official QR verification seal.'
    ],
    requirements: [
      { id: 'req-bc-dob', title: 'Accurate Date & Place of Birth', description: 'Exact date, hospital/town where the birth occurred.', isMandatory: true, type: 'info' },
      { id: 'req-bc-pnames', title: 'Parents’ Names', description: 'Spelling of mother’s and father’s names as recorded during registration.', isMandatory: true, type: 'info' }
    ],
    requiredDocuments: [
      'Registration Number or exact search parameters (Hospital, Date, Parents’ names)'
    ],
    officialPlatform: {
      name: 'Civil Registration System (CRS) / Municipal Corporation Portals',
      portalName: 'CRS & Urban Local Body Digital Services',
      authorityName: 'Office of Registrar General of India & Respective Municipalities',
      url: 'https://crsorgi.gov.in',
      isVerified: true,
      isStateSpecific: true
    },
    fee: {
      amount: 'Free to ₹50 per copy (Municipal dependent)',
      details: 'Online verification is usually free; certified copies cost ₹10 to ₹50.',
      feeType: 'varies'
    },
    estimatedTime: 'Instant to 3 working days',
    speedBracket: 'instant',
    isOnlineAvailable: true,
    relatedServiceIds: ['birth-new-registration', 'birth-correction-record']
  },
  {
    id: 'birth-delayed-registration',
    documentId: 'birth-certificate',
    name: 'Delayed Registration of Birth',
    shortDescription: 'Register a birth that was not reported within 21 days or 1 year of occurrence.',
    purpose: 'Enables individuals whose births were never formally registered to obtain a legal birth certificate with magistrate sanction.',
    serviceType: 'creation',
    keywords: ['delayed birth', 'late birth registration', 'sdm order birth', 'nabc certificate', 'old birth certificate'],
    detailedProcess: [
      'If 21 to 30 days have passed: Apply to Registrar with late fee.',
      'If 30 days to 1 year have passed: Obtain written permission of the District Registrar / Sub-Divisional Magistrate (SDM) with late fee.',
      'If after 1 year of birth: File an application before the First Class Judicial Magistrate / Sub-Divisional Magistrate (SDM) in the jurisdiction.',
      'Submit Non-Availability of Birth Certificate (NABC) from municipal registrar, school certificate, affidavit, and parental identity proofs.',
      'Magistrate conducts inquiry and issues an order directing the Registrar to enter the birth in the register.',
      'Registrar issues the official Birth Certificate pursuant to court/SDM order.'
    ],
    requirements: [
      { id: 'req-del-nabc', title: 'Non-Availability Certificate (NABC)', description: 'Certificate from Municipal authority stating record does not exist.', isMandatory: true, type: 'document' },
      { id: 'req-del-aff', title: 'Sworn Affidavit', description: 'Notarized affidavit by parents or applicant stating date, place, and reason for delay.', isMandatory: true, type: 'document' },
      { id: 'req-del-sdm', title: 'SDM / Magistrate Order', description: 'Official judicial/executive order directing registration (for delay >1 year).', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Non-Availability of Birth Certificate (NABC)',
      'School Leaving Certificate / Matriculation Marksheet indicating DOB',
      'Affidavit of Date and Place of Birth',
      'Parents’ Identity & Address Proof',
      'SDM / Magistrate Order'
    ],
    officialPlatform: {
      name: 'State e-District / Revenue & Municipal Portals',
      portalName: 'e-District Revenue & Magistrate Services',
      authorityName: 'District Administration & Revenue Department',
      url: 'https://crsorgi.gov.in',
      isVerified: true,
      isStateSpecific: true
    },
    fee: {
      amount: '₹50 to ₹500 (inclusive of SDM court fees and municipal late charges)',
      details: 'Late fee scales depending on elapsed time (21-30 days: ₹2; 30d-1yr: ₹5; >1yr: court fee + ₹10).',
      feeType: 'varies'
    },
    estimatedTime: '30 to 60 working days (requires court/SDM verification)',
    speedBracket: 'extended',
    isOnlineAvailable: false,
    relatedServiceIds: ['birth-new-registration', 'birth-search-download']
  },
  {
    id: 'birth-correction-record',
    documentId: 'birth-certificate',
    name: 'Correction / Addition of Child Name in Birth Record',
    shortDescription: 'Add a child’s name to a blank birth certificate or correct clerical spelling errors in names/dates.',
    purpose: 'Allows parents to name the child post-birth or correct typographical mistakes to match school and identity records.',
    serviceType: 'updation',
    keywords: ['child name addition', 'correct birth certificate', 'spelling correction birth', 'add baby name birth certificate', 'birth name change'],
    detailedProcess: [
      'Visit the Municipal Corporation / Registrar of Births and Deaths office (or state e-district portal if available online).',
      'Submit Form for Name Addition / Correction of Entry.',
      'Attach original Birth Certificate copy issued without name.',
      'Provide parents’ Aadhaar cards and school admission/ID proof of child (if schooling started).',
      'Submit notarized affidavit confirming child’s full legal name.',
      'Registrar verifies records and issues updated Birth Certificate with updated name.'
    ],
    requirements: [
      { id: 'req-cr-orig', title: 'Original Birth Certificate', description: 'Existing issued certificate.', isMandatory: true, type: 'document' },
      { id: 'req-cr-aff', title: 'Notarized Affidavit', description: 'Affidavit by parents confirming the child’s name.', isMandatory: true, type: 'document' },
      { id: 'req-cr-par', title: 'Parents’ Identity Documents', description: 'Aadhaar / Voter ID / Passport.', isMandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Original Birth Certificate',
      'Parents’ Identity & Address Proof (Aadhaar, Passport, Voter ID)',
      'Notarized Affidavit',
      'School ID / Report Card (if child is already enrolled in school)'
    ],
    officialPlatform: {
      name: 'Civil Registration System / Municipal Portals',
      portalName: 'Municipal Health & Vital Statistics Department',
      authorityName: 'Registrar of Births and Deaths',
      url: 'https://crsorgi.gov.in',
      isVerified: true,
      isStateSpecific: true
    },
    fee: {
      amount: '₹10 - ₹100',
      details: 'Name addition within 1 year is free; nominal fee applies thereafter.',
      feeType: 'varies'
    },
    estimatedTime: '7 to 15 working days',
    speedBracket: 'standard',
    isOnlineAvailable: true,
    relatedServiceIds: ['birth-new-registration', 'birth-search-download']
  }
];
