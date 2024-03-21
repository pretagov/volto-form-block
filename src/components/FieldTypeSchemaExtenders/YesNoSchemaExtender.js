import { defineMessages } from 'react-intl';
const messages = defineMessages({
  field_widget: {
    id: 'form_field_widget',
    defaultMessage: 'Widget',
  },
});

export const YesNoSchemaExtender = (intl) => {
  return {
    fields: ['widget'],
    properties: {
      widget: {
        title: intl.formatMessage(messages.field_widget),
        type: 'string',
        choices: [
          ['checkbox', 'Checkbox'],
          ['single_choice', 'Radio'],
        ],
        default: 'checkbox',
      },
    },
    required: ['widget'],
  };
};
