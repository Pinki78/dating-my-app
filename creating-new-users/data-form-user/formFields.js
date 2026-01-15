export const formFields = [
  {
    id: 'fullName',
    label: 'Full Name',
    placeholder: 'Full Name',
    type: 'text',
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
  },
 {
  id: 'gender',
  label: 'Gender',
  placeholder: 'Genders',
  type: 'select',
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ],
},
  {
    id: 'phone',
    label: 'Phone Number',
    placeholder: 'Phone Number',
    type: 'phone',
  },
  {
    id: 'dob',
    label: 'DOB',
    placeholder: 'DD/MM/YYYY',
    type: 'date',
  },
  {
    id: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
  },
];
