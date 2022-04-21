export const isEmail = (email) => {
    // disabled eslint from picking regex up
    // eslint-disable-next-line
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    return regex.test(email);
}

export const validator = (value, type, isRequired) => {
    let isValid = true;

    if (isRequired) {
        if (type === 'text' || type === 'textarea' || type === 'select') {
            isValid = isValid && value.trim() !== '';
        }

        if (type === 'email') {
            isValid = isValid && isEmail(value); 
        }
    }

    return isValid;
}

export const errorStrings = (type) => {
    let string;

    if (type === 'text') {
        string = `Don't leave the field empty!`;
    }

    if (type === 'email') {
        string = `Invalid Email!`;
    }

    if (type === 'select') {
        string = `No value chosen!`;
    }

    return string;
}