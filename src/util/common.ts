
type Name = string | null | undefined;

export const Greet = (value: Name[] | Name): string => {
    const names = createNamesArray(value);
    let greetingMessage: string;

    greetingMessage = getGreeting(names);
    return `${greetingMessage}`;
}

export const createNamesArray = (value: Name | Name[]): Name[] => {
    const defaultPlaceholderName = 'friend';

    if(isName(value)) {
        let names: Name[];
        if(containsSeveralNames(value || defaultPlaceholderName)) {
            names = getCommaSeparatedNames(value || defaultPlaceholderName);
            return names;
        } else {
            names = [value || defaultPlaceholderName];
            return names;
        }
    } else {
        let names: Name[] = [];
        value.forEach(name => {
            const nameToUse: Name = name || defaultPlaceholderName;
            let potentiallySeveralNames: Name[];
            if(containsSeveralNames(nameToUse)) {
                potentiallySeveralNames = getCommaSeparatedNames(nameToUse);
                names = [...names, ...potentiallySeveralNames];
            } else {
                names.push(name);
            }
        })
        return names;
    }
}

export const containsSeveralNames = (value: Name): boolean => {
    const names = getCommaSeparatedNames(value);
    return !!names.length;
}

export const getCommaSeparatedNames = (value: Name): Name[] => {
    const defaultPlaceholderName = 'friend';
    let names = (value as string).split(',');
    names = names.map(name => trimWhitespace(name));
    names = names.map(name => {
        return name === 'null' ? defaultPlaceholderName : name; 
    })
    return names;
}

export const trimWhitespace = (value: string): string => {
    return value.replace(/\s/g, '');
}

export const isName = (name: Name | Name[]): name is Name => {
    return typeof(name) === "string" || name === null || typeof(name) === 'undefined';
}

export const isNames = (name: Name | Name[]): name is Name[] => {
    return Array.isArray(name) && !name.some(name => !isName(name));
}

export const getAllNamesConcatenated = (names: Name[]): string => {
    const lastIndex = names.length - 1;
    const secondToLastIndex = names.length - 2;
    let namesConcatenated = '';

    if(hasTwoNames(names)) {
        return names[0] + ' and ' + names[1];
    } else {
        names.forEach((name, index) => {
            if(index === secondToLastIndex) {
                namesConcatenated += (name) + ' and ';
            } else if(index === lastIndex) {
                namesConcatenated += (name);
            } else {
                namesConcatenated += (name) + ', ';
            }
        })
        return namesConcatenated;
    }

}

export const hasTwoNames = (names: Name[]): boolean => {
    return names.length === 2 && names.every(name => isName(name));
}

export const hasOneName = (names: Name[]): boolean => {
    return names.length === 1 && names.every(name => isName(name));
}

export const getGreeting = (names: Name[]): string => {
    const defaultPlaceholderName: string = 'friend';

    let upperCaseNames: Name[] = [];
    let lowerCaseNames: Name[] = [];
    
    names.forEach(name => {
        if(isUpperCaseName(name)) {
            upperCaseNames.push(name);
        } else {
            lowerCaseNames.push(name);
        }
    })
    let greeting = '';
    const shoutingGreeting = (upperCaseNames.length + lowerCaseNames.length) < 2 ? 'HELLO, ' : ' AND HELLO, ';
    greeting += lowerCaseNames.length ? `Hello, ${getAllNamesConcatenated(lowerCaseNames)}.` : '';
    greeting += upperCaseNames.length ? `${shoutingGreeting}${getAllNamesConcatenated(upperCaseNames)}!` : '';
    return greeting;
}

export const isUpperCaseName = (name: Name): boolean => {
    if(!name || !isName(name)) return false;
    return name === name.toUpperCase();
}

export const hasUpperCaseName = (names: Name[]): boolean => {
    if(!names || !isNames(names)) return false;
    return names.some(name => isUpperCaseName(name));
}
