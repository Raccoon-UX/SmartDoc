export interface StateInfo {
  code: string;
  name: string;
  type: 'state' | 'ut';
  rtoPortalName?: string;
  municipalPortalName?: string;
  guidanceNote?: string;
}

export const indianStates: StateInfo[] = [
  { code: 'AP', name: 'Andhra Pradesh', type: 'state', rtoPortalName: 'AP Transport (e-Pragati / Sarathi)', municipalPortalName: 'CDMA Andhra Pradesh' },
  { code: 'AR', name: 'Arunachal Pradesh', type: 'state', rtoPortalName: 'Department of Transport Arunachal', municipalPortalName: 'Arunachal e-Services' },
  { code: 'AS', name: 'Assam', type: 'state', rtoPortalName: 'Assam Transport Department', municipalPortalName: 'e-District Assam / Sewa Setu' },
  { code: 'BR', name: 'Bihar', type: 'state', rtoPortalName: 'Transport Department Bihar', municipalPortalName: 'RTPS Bihar (ServicePlus)' },
  { code: 'CG', name: 'Chhattisgarh', type: 'state', rtoPortalName: 'CG Transport (Sarathi)', municipalPortalName: 'e-District Chhattisgarh' },
  { code: 'GA', name: 'Goa', type: 'state', rtoPortalName: 'Directorate of Transport Goa', municipalPortalName: 'Goa Online Services' },
  { code: 'GJ', name: 'Gujarat', type: 'state', rtoPortalName: 'Commissioner of Transport Gujarat', municipalPortalName: 'e-Nagar Gujarat' },
  { code: 'HR', name: 'Haryana', type: 'state', rtoPortalName: 'Haryana Transport Department (Sarathi)', municipalPortalName: 'Saral Haryana' },
  { code: 'HP', name: 'Himachal Pradesh', type: 'state', rtoPortalName: 'HP Transport Department', municipalPortalName: 'e-District Himachal' },
  { code: 'JH', name: 'Jharkhand', type: 'state', rtoPortalName: 'Jharkhand Transport Department', municipalPortalName: 'JharSewa Jharkhand' },
  { code: 'KA', name: 'Karnataka', type: 'state', rtoPortalName: 'Karnataka Transport Department', municipalPortalName: 'Seva Sindhu / e-JanMa Karnataka' },
  { code: 'KL', name: 'Kerala', type: 'state', rtoPortalName: 'Motor Vehicles Department Kerala', municipalPortalName: 'Sevana Civil Registration Kerala' },
  { code: 'MP', name: 'Madhya Pradesh', type: 'state', rtoPortalName: 'MP Transport Department', municipalPortalName: 'e-Nagar Palika MP / MP e-District' },
  { code: 'MH', name: 'Maharashtra', type: 'state', rtoPortalName: 'Maharashtra Motor Vehicles Dept (Sarathi MH)', municipalPortalName: 'Aaple Sarkar / BMC / PMC Portals' },
  { code: 'MN', name: 'Manipur', type: 'state', rtoPortalName: 'Transport Department Manipur', municipalPortalName: 'e-District Manipur' },
  { code: 'ML', name: 'Meghalaya', type: 'state', rtoPortalName: 'Meghalaya Transport Department', municipalPortalName: 'Meghalaya e-District' },
  { code: 'MZ', name: 'Mizoram', type: 'state', rtoPortalName: 'Transport Department Mizoram', municipalPortalName: 'Mizoram Online Portal' },
  { code: 'NL', name: 'Nagaland', type: 'state', rtoPortalName: 'Motor Vehicles Department Nagaland', municipalPortalName: 'Nagaland e-Services' },
  { code: 'OR', name: 'Odisha', type: 'state', rtoPortalName: 'Odisha Transport (STA Odisha)', municipalPortalName: 'Odisha e-District / e-Municipality' },
  { code: 'PB', name: 'Punjab', type: 'state', rtoPortalName: 'Punjab Transport Department', municipalPortalName: 'e-Sewa Punjab' },
  { code: 'RJ', name: 'Rajasthan', type: 'state', rtoPortalName: 'Rajasthan Transport Department', municipalPortalName: 'Pehchan Rajasthan (Birth/Death)' },
  { code: 'SK', name: 'Sikkim', type: 'state', rtoPortalName: 'Motor Vehicles Division Sikkim', municipalPortalName: 'Sikkim e-District' },
  { code: 'TN', name: 'Tamil Nadu', type: 'state', rtoPortalName: 'Tamil Nadu Transport Department', municipalPortalName: 'TN e-Sevai / Greater Chennai Corp' },
  { code: 'TS', name: 'Telangana', type: 'state', rtoPortalName: 'Telangana Transport (T-App / Sarathi)', municipalPortalName: 'GHMC / CDMA Telangana' },
  { code: 'TR', name: 'Tripura', type: 'state', rtoPortalName: 'Transport Department Tripura', municipalPortalName: 'Tripura e-District' },
  { code: 'UP', name: 'Uttar Pradesh', type: 'state', rtoPortalName: 'UP Transport Department (Sarathi UP)', municipalPortalName: 'e-District UP / Nagar Nigam Portals' },
  { code: 'UK', name: 'Uttarakhand', type: 'state', rtoPortalName: 'Uttarakhand Transport Department', municipalPortalName: 'e-District Uttarakhand' },
  { code: 'WB', name: 'West Bengal', type: 'state', rtoPortalName: 'West Bengal Transport Department', municipalPortalName: 'Janma-Mrityu Tathya WB' },
  { code: 'DL', name: 'Delhi (NCT)', type: 'ut', rtoPortalName: 'Delhi Transport Department (Contactless Services)', municipalPortalName: 'MCD / NDMC / e-District Delhi' },
  { code: 'JK', name: 'Jammu and Kashmir', type: 'ut', rtoPortalName: 'J&K Motor Vehicles Department', municipalPortalName: 'e-UNNAT J&K' },
  { code: 'LA', name: 'Ladakh', type: 'ut', rtoPortalName: 'Ladakh Transport Department', municipalPortalName: 'Ladakh e-Services' },
  { code: 'CH', name: 'Chandigarh', type: 'ut', rtoPortalName: 'Chandigarh Transport Undertaking', municipalPortalName: 'Chandigarh Administration e-Services' },
  { code: 'PY', name: 'Puducherry', type: 'ut', rtoPortalName: 'Puducherry Transport Department', municipalPortalName: 'Puducherry e-District' },
  { code: 'GA_DD', name: 'Dadra and Nagar Haveli and Daman and Diu', type: 'ut', rtoPortalName: 'Transport Department DNH & DD', municipalPortalName: 'e-Services DNH & DD' },
  { code: 'AN', name: 'Andaman and Nicobar Islands', type: 'ut', rtoPortalName: 'Directorate of Transport A&N', municipalPortalName: 'A&N Administration Services' },
  { code: 'LD', name: 'Lakshadweep', type: 'ut', rtoPortalName: 'Lakshadweep Transport Department', municipalPortalName: 'Lakshadweep Portal' },
];

export function getStateByCode(code?: string): StateInfo | undefined {
  if (!code) return undefined;
  return indianStates.find((s) => s.code.toUpperCase() === code.toUpperCase());
}
