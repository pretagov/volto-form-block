import { defineMessages } from 'react-intl';
import { useIntl } from 'react-intl';

const messages = defineMessages({
  form: {
    id: 'form',
    defaultMessage: 'Form',
  },
  title: {
    id: 'title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'description',
    defaultMessage: 'Description',
  },
  default_to: {
    id: 'form_to',
    defaultMessage: 'Recipients',
  },
  default_from: {
    id: 'form_default_from',
    defaultMessage: 'Default sender',
  },
  default_subject: {
    id: 'form_default_subject',
    defaultMessage: 'Mail subject',
  },
  submit_label: {
    id: 'form_submit_label',
    defaultMessage: 'Submit button label',
  },
  show_cancel: {
    id: 'form_show_cancel',
    defaultMessage: 'Show cancel button',
  },
  cancel_label: {
    id: 'form_cancel_label',
    defaultMessage: 'Cancel button label',
  },
  captcha: {
    id: 'captcha',
    defaultMessage: 'Captcha provider',
  },

  store: {
    id: 'form_save_persistent_data',
    defaultMessage: 'Store compiled data',
  },
  attachmentSendEmail: {
    id: 'form_attachment_send_email_info_text',
    defaultMessage: 'Attached file will be sent via email, but not stored',
  },
  send: {
    id: 'form_send_email',
    defaultMessage: 'Send email to recipient',
  },
  send_message: {
    id: 'form_send_message',
    defaultMessage: 'Message of sending confirmed',
  },
  send_message_helptext: {
    id: 'form_send_message_helptext',
    defaultMessage:
      'You can add the value of a filled field in the form by inserting its ID between curly brackets preceded by $, example: ${field_id}; you can add also html elements such as links <a>, new line <br />, bold <b> and italic <i> formatting.',
  },
});

export default (data) => {
  var intl = useIntl();

  return {
    title: intl.formatMessage(messages.form),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'title',
          'description',
          'default_to',
          'default_from',
          'default_subject',
          'submit_label',
          'show_cancel',
          ...(data?.show_cancel ? ['cancel_label'] : []),
          'captcha',
          'store',
          'send',
          'send_message',
        ],
      },
    ],
    properties: {
      title: {
        title: intl.formatMessage(messages.title),
      },
      description: {
        title: intl.formatMessage(messages.description),
        type: 'textarea',
      },
      default_to: {
        title: intl.formatMessage(messages.default_to),
      },
      default_from: {
        title: intl.formatMessage(messages.default_from),
      },
      default_subject: {
        title: intl.formatMessage(messages.default_subject),
      },
      submit_label: {
        title: intl.formatMessage(messages.submit_label),
      },
      show_cancel: {
        type: 'boolean',
        title: intl.formatMessage(messages.show_cancel),
        default: false,
      },
      cancel_label: {
        title: intl.formatMessage(messages.cancel_label),
      },
      captcha: {
        title: intl.formatMessage(messages.captcha),
        type: 'string',
        vocabulary: {
          '@id': 'collective.volto.formsupport.captcha.providers',
        },
      },
      store: {
        type: 'boolean',
        title: intl.formatMessage(messages.store),
      },
      send: {
        type: 'boolean',
        title: intl.formatMessage(messages.send),
        description: intl.formatMessage(messages.attachmentSendEmail),
      },
      send_message: {
        title: intl.formatMessage(messages.send_message),
        type: 'textarea',
        description: intl.formatMessage(messages.send_message_helptext),
      },
    },
    required: ['default_to', 'default_from', 'default_subject'],
  };
};
