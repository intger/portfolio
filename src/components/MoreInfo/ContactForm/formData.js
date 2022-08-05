export const formData = {
    formFields: {
        company: {
            required: true,
            isValid: false,
            type: 'text',
            placeholder: 'Company Name*',
            value: '',
            touched: false,
        },
        name: {
            required: true,
            isValid: false,
            type: 'text',
            placeholder: 'Full Name*',
            value: '',
            touched: false,
        },
        email: {
            required: true,
            isValid: false,
            type: 'email',
            placeholder: 'Email*',
            value: '',
            touched: false,
        },
        inquiry: {
            required: true,
            isValid: false,
            type: 'select',
            placeholder: '---*',
            value: '',
            options: ['Custom Website Development', 'E-commerce Development', 'Theme Customization', 'Plugin Customization', 'Other'],
            touched: false,
        },
        message: {
            required: false,
            isValid: true,
            type: 'textarea',
            placeholder: 'Additional Information',
            value: '',
            touched: false,
        },
    },
    formIsValid: false
};