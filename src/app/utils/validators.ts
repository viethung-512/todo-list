import * as yup from 'yup';

export const taskActionValidator = yup.object().shape({
  title: yup.string().required('Please enter the title'),
  dueDate: yup.date().min(new Date(), 'Date must be later than today.'),
  priority: yup.string().required('Please enter the priority'),
});
