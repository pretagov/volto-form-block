import config from '@plone/volto/registry';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  field_label: {
    id: 'form_field_label',
    defaultMessage: 'Label',
  },
  field_description: {
    id: 'form_field_description',
    defaultMessage: 'Description',
  },
  field_required: {
    id: 'form_field_required',
    defaultMessage: 'Required',
  },
  field_default: {
    id: 'form_field_default',
    defaultMessage: 'Default',
  },
  field_type: {
    id: 'form_field_type',
    defaultMessage: 'Field type',
  },
  field_type_text: {
    id: 'form_field_type_text',
    defaultMessage: 'Text',
  },
  field_type_textarea: {
    id: 'form_field_type_textarea',
    defaultMessage: 'Textarea',
  },
  field_type_select: {
    id: 'form_field_type_select',
    defaultMessage: 'List',
  },
  field_type_single_choice: {
    id: 'form_field_type_single_choice',
    defaultMessage: 'Single choice',
  },
  field_type_multiple_choice: {
    id: 'form_field_type_multiple_choice',
    defaultMessage: 'Multiple choice',
  },
  field_type_yes_no: {
    id: 'field_type_yes_no',
    defaultMessage: 'Yes/ No',
  },
  field_type_date: {
    id: 'form_field_type_date',
    defaultMessage: 'Date',
  },
  field_type_attachment: {
    id: 'form_field_type_attachment',
    defaultMessage: 'Attachment',
  },
  field_type_attachment_info_text: {
    id: 'form_field_type_attachment_info_text',
    defaultMessage: 'Any attachments can be emailed, but will not be saved.',
  },
  field_type_from: {
    id: 'form_field_type_from',
    defaultMessage: 'E-mail',
  },
  field_type_static_text: {
    id: 'form_field_type_static_text',
    defaultMessage: 'Static text',
  },
  field_type_hidden: {
    id: 'form_field_type_hidden',
    defaultMessage: 'Hidden',
  },
  field_validation_title: {
    id: 'form_field_validations',
    defaultMessage: 'Validations',
  },
  field_validation_item: {
    id: 'form_field_validation',
    defaultMessage: 'Validation',
  },
  field_validation_type: {
    id: 'form_field_validation',
    defaultMessage: 'Validation',
  },
  field_show_when_when: {
    id: 'form_field_show_when',
    defaultMessage: 'Show when',
  },
  field_show_when_is: {
    id: 'form_field_show_is',
    defaultMessage: 'Is',
  },
  field_show_when_to: {
    id: 'form_field_show_to',
    defaultMessage: 'To',
  },
  field_show_when_option_always: {
    id: 'form_field_show_when_option_',
    defaultMessage: 'Always',
  },
  field_show_when_option_value_is: {
    id: 'form_field_show_when_option_value_is',
    defaultMessage: 'equal',
  },
  field_show_when_option_value_is_not: {
    id: 'form_field_show_when_option_value_is_not',
    defaultMessage: 'not equal',
  },
});

const choiceTypes = ['select', 'single_choice', 'multiple_choice'];

// TODO: Anyway to inrospect this?
const fieldTypeDefaultValueTypeMapping = {
  yes_no: 'boolean',
  multiple_choice: 'array',
  date: 'date',
};

export default (props) => {
  var intl = useIntl();
  const baseFieldTypeChoices = [
    ['text', intl.formatMessage(messages.field_type_text)],
    ['textarea', intl.formatMessage(messages.field_type_textarea)],
    ['select', intl.formatMessage(messages.field_type_select)],
    ['single_choice', intl.formatMessage(messages.field_type_single_choice)],
    [
      'multiple_choice',
      intl.formatMessage(messages.field_type_multiple_choice),
    ],
    ['yes_no', intl.formatMessage(messages.field_type_yes_no)],
    ['date', intl.formatMessage(messages.field_type_date)],
    ['attachment', intl.formatMessage(messages.field_type_attachment)],
    ['from', intl.formatMessage(messages.field_type_from)],
    ['static_text', intl.formatMessage(messages.field_type_static_text)],
    ['hidden', intl.formatMessage(messages.field_type_hidden)],
  ];
  var attachmentDescription =
    props?.field_type === 'attachment'
      ? {
          description: intl.formatMessage(
            messages.field_type_attachment_info_text,
          ),
        }
      : {};

  var schemaExtender =
    config.blocks.blocksConfig.form.fieldTypeSchemaExtenders[props?.field_type];
  const schemaExtenderValues = schemaExtender
    ? schemaExtender({ intl, ...props })
    : { properties: [], fields: [], required: [] };

  const show_when_when_field =
    props.show_when_when && props.show_when_when
      ? props.formData?.subblocks?.find(
          (field) => field.field_id === props.show_when_when,
        )
      : undefined;

  const fieldSchemaFields = Object.keys(props);
  const validationFields =
    props.validations?.filter((validationId) =>
      fieldSchemaFields.includes(validationId),
    ) || [];

  return {
    title: props?.label || '',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'label',
          'description',
          'field_type',
          ...schemaExtenderValues.fields,
          'required',
          'validations',
          ...(validationFields.length > 0 ? ['validationSettings'] : []),
          ...(!['attachment', 'static_text', 'hidden'].includes(
            props.field_type,
          )
            ? ['default_value']
            : []),
          'show_when_when',
          ...(props.show_when_when && props.show_when_when !== 'always'
            ? ['show_when_is']
            : []),
          ...(props.show_when_when && props.show_when_when !== 'always'
            ? ['show_when_to']
            : []),
        ],
      },
    ],

    properties: {
      label: {
        title: intl.formatMessage(messages.field_label),
        send_to_backend: true,
      },
      description: {
        title: intl.formatMessage(messages.field_description),
      },
      field_type: {
        title: intl.formatMessage(messages.field_type),
        type: 'string',
        choices: [
          ...baseFieldTypeChoices,
          ...(config.blocks.blocksConfig.form.additionalFields?.map(
            (fieldType) => [fieldType.id, fieldType.label],
          ) ?? []),
        ],
        ...attachmentDescription,
      },
      required: {
        title: intl.formatMessage(messages.field_required),
        type: 'boolean',
        default: false,
      },
      validations: {
        title: intl.formatMessage(messages.field_validation_title),
        isMulti: true,
        vocabulary: {
          '@id': 'collective.volto.formsupport.Validators',
        },
      },
      default_value: {
        title: intl.formatMessage(messages.field_default),
        type: fieldTypeDefaultValueTypeMapping[props?.field_type]
          ? fieldTypeDefaultValueTypeMapping[props?.field_type]
          : 'string',
        ...(props?.field_type === 'yes_no' && {
          choices: [
            [true, 'Yes'],
            [false, 'No'],
          ],
          noValueOption: false,
        }),
        ...(['select', 'single_choice', 'multiple_choice'].includes(
          props?.field_type,
        ) && {
          choices: props?.formData?.subblocks
            .filter((block) => block.field_id === props.field_id)?.[0]
            ?.input_values?.map((input_value) => {
              return [input_value, input_value];
            }),
          noValueOption: false,
        }),
      },
      show_when_when: {
        title: intl.formatMessage(messages.field_show_when_when),
        type: 'string',
        choices: [
          [
            'always',
            intl.formatMessage(messages.field_show_when_option_always),
          ],
          ...(props?.formData?.subblocks
            ? props.formData.subblocks.reduce((choices, subblock, index) => {
                const currentFieldIndex = props.formData.subblocks.findIndex(
                  (field) => field.field_id === props.field_id,
                );
                if (index > currentFieldIndex) {
                  if (props.show_when_when === subblock.field_id) {
                    choices.push([subblock.field_id, subblock.label]);
                  }
                  return choices;
                }
                if (subblock.field_id === props.field_id) {
                  return choices;
                }
                choices.push([subblock.field_id, subblock.label]);
                return choices;
              }, [])
            : []),
        ],
        default: 'always',
      },
      show_when_is: {
        title: intl.formatMessage(messages.field_show_when_is),
        type: 'string',
        choices: [
          [
            'value_is',
            intl.formatMessage(messages.field_show_when_option_value_is),
          ],
          [
            'value_is_not',
            intl.formatMessage(messages.field_show_when_option_value_is_not),
          ],
        ],
        noValueOption: false,
        required: true,
      },
      show_when_to: {
        title: intl.formatMessage(messages.field_show_when_to),
        type: 'array',
        required: true,
        creatable: true,
        noValueOption: false,
        ...(show_when_when_field &&
          choiceTypes.includes(show_when_when_field.field_type) && {
            choices: show_when_when_field.input_values,
          }),
        ...(show_when_when_field &&
          show_when_when_field.field_type === 'yes_no' && {
            choices: [
              [true, 'Yes'],
              [false, 'No'],
            ],
          }),
      },
      validationSettings: {
        title: 'Validation settings',
        widget: 'object',
        collapsible: true,
        schema: {
          title: 'Validations result',
          fieldsets: validationFields
            .filter(
              (validationId) => Object.keys(props[validationId]).length > 0,
            )
            .map((validationId) => {
              return {
                id: validationId,
                title: validationId,
                fields: [...Object.keys(props[validationId])],
              };
            }),
          properties: validationFields.reduce((properties, validationId) => {
            const validationSettings = props[validationId];
            Object.entries(validationSettings).forEach(([settingId, value]) => {
              properties[settingId] = {
                title: settingId,
                value: value,
              };
            });

            return properties;
          }, {}),
          required: [],
        },
      },
      ...schemaExtenderValues.properties,
    },
    required: [
      'label',
      'field_type',
      'input_values',
      ...(props.show_when_when && props.show_when_when !== 'always'
        ? ['show_when_is', 'show_when_to']
        : []),
      ...schemaExtenderValues.required,
    ],
  };
};
