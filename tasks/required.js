
/*
    task-00
    Создайте функцию, которая возвращает строку "Hello, World!"
    - Создайте константу или переменную со значением "Hello, World!"
    - Выведите в консоль строку "Hello, World!"
    - Верните строку "Hello, World!"
*/

export const helloWorld = () => {
    const message = "Hello, World!";
    console.log(message);
    return message;
}

/*
    task-01
    Создайте функцию, которая принимает и возвращает эту же строку
*/

export const getString = (str) => {
    return str;

}

/*
    task-02 напишите несколько функций для работы с массивами
    1. getLength(arr)    возвращает длину 
    2. getFirst(arr)     возвращает первый элемент
    3. getLast(arr)      возвращает последний элемент
    4. pushElement(arr, elem)  добавляет элемент в конец массива и возвращает массив
    5. popElement(arr)   удаляет последний элемент и возвращает удаленный элемент
*/

export const getLength = (arr) => {
    return arr.length;

}

export const getFirst = (arr) => {
    return arr[0];

}

export const getLast = (arr) => {
    return arr[arr.length - 1];

}

export const pushElement = (arr, elem) => {
    arr.push(elem);
    return arr;
    

}

export const popElement = (arr) => {
    return arr.pop();
}

/*
    task-03 напишите функцию, которая принимает объект и склеивает из значений его свойст строку
    Используйте интерполяицию: https://code-basics.com/ru/languages/javascript/lessons/interpolation
    Используйте деструктуризацию: https://javascript.info/destructuring-assignment#object-destructuring

    Свойства объекта: 
    {
        animal: string,
        legs: number,
        color: string,
    }

    пример ответа: "The white cat has 4 legs"
*/

export const getAnimalDescription = (obj) => {
    const { animal, legs, color } = obj;
    return `The ${color} ${animal} has ${legs} legs`;
}

/*
    task-04 Напишите две функции, которые принимают объект и возвращают ключи и значения объекта в виде массива 
*/

export const getObjKeys = (obj) => {
    return Object.keys(obj);
}

export const getObjValues = (obj) => {
    return Object.values(obj);
}

/*
    task-05 Напишите две функцию, которая добавляет новое свойство в объект или меняет существующее
    Функция принимает два объекта: объект который нужно обновить и объект со свойствами которые нужно добавить
    Возвращает новый объект
    Попробуйте spread оператор: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax
*/

export const patchObj = (obj, updates) => {
    return { ...obj, ...updates };
}

/*
    task-06 Напишите функцию, которая принимает массив и элемент, который нужно удалить
    Функция возвращает новый массив и не мутирует исходный
    Если элемента нет в массиве просто возвращаем новую копию массива
*/

export const deleteItem = (arr, item) => {
    return arr.filter((element) => {
        return element !== item;
    });
}

/*
    task-07 Напишите функцию которая принимает массив чисел и возвращает новый массив где все числа умножены на 2
*/

export const multiplyByTwo = (arr) => {
    return arr.map((number) => {
        return number * 2;
    });
}

/*
    task-08 Напишите функцию которая принимает массив c количеством выполненных заданий и возвращает объект с оценками за задание
    Если студент выполнил все 10 заданий оценка будет 5
    Если 8-9 - 4
    Если 5-7 - 3
    Если 0-4 - 2

    Входной массив: [10, 5, 9, 3, 7, 7, 4, 8, 0, 5]
    Вывод функции: {5: 1, 4: 2, 3: 4, 2: 3}
*/

export const getAssessments = (arr) => {
    return arr.reduce((assessments, completedTasks) => {
        let grade;

        if (completedTasks === 10) {
            grade = 5;
        } else if (completedTasks >= 8) {
            grade = 4;
        } else if (completedTasks >= 5) {
            grade = 3;
        } else {
            grade = 2;
        }

        assessments[grade] = (assessments[grade] || 0) + 1;

        return assessments;
    }, {});
}

/*
    task-09 Напишите две функции которые принимают массив и возвращают значение типа boolean
    hasBoolean - true если в массиве хотя бы один элемент является boolean
    isStringArray - true если все элементы массива являются строками
    Для пустого массива isStringArray возвращает false
*/

export const hasBoolean = (arr) => {
    return arr.some((element) => typeof element === "boolean");
}

export const isStringArray = (arr) => {
    return arr.length > 0 && arr.every((element) => typeof element === "string");
}

/*
    task-10 Напишите функцию, которая принимает строку и возвращает измененную строку в эмо стиле
       "Всех Люблю!" -> "ФсЕх лЮбЛю!:*"
       Буква В заменяется на Ф
       Каждый четный символ - заглавныя буква
       В конце добавляется эмодзи поцелуйчика :*
       Используйте методы массива reduce, split, join
*/

export const return2007 = (str) => {
    return str
        .split("")
        .reduce((result, char, index) => {
            const replacedChar = char === "В" ? "Ф" : char === "в" ? "ф" : char;

            const styledChar = index % 2 === 0
                ? replacedChar.toUpperCase()
                : replacedChar.toLowerCase();

            result.push(styledChar);

            return result;
        }, [])
        .join("") + ":*";
}



