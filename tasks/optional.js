/*
    task-optional-00
    Напишите рекурсивную функцию, которая возвращает факториал числа
    Функция должна использовать рекурсию (вызывать саму себя)
    factorial(0) -> 1
    factorial(5) -> 120
*/

export const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

/*
    task-optional-01
    Напишите рекурсивную функцию, которая возвращает число Фибоначчи по его индексу
    Функция должна использовать рекурсию (вызывать саму себя)
    Если index < 0 возвращаем -1
    fibonacci(0) -> 0
    fibonacci(1) -> 1
    fibonacci(10) -> 55
*/

export const fibonacci = (index) => {
  if (index < 0) return -1;
  if (index === 0) return 0;
  if (index === 1) return 1;
  return fibonacci(index - 1) + fibonacci(index - 2);
};

/*
    task-optional-02
    Напишите функцию, которая принимает любое значение и определяет является ли это значение falsy 
    Если значение falsy -> false
    Если значение truthy -> true
*/

export const isFalsy = (value) => {
  return !value;
};

/*
    task-optional-03
    Напишите функцию, которая принимает строку и определяет является ли эта строка палиндромом
    Палиндром - это строка, которая читается одинаково слева направо и справа налево
    palindrome('abcba') -> true
    palindrome('abc') -> false
    пустые строки и строки из одного символа являются палиндромами
*/

export const palindrome = (str) => {
  return str === str.split('').reverse().join('');
};

/*
    task-optional-04
    Напишите функцию, которая принимает строку и оставляет только те символы,
    которые встречаются в строке больше одного раза
    Регистр не важен: 'A' и 'a' считаются одним и тем же символом
    Порядок символов сохраняется, повторяющиеся символы остаются на своих местах
    Предполагается, что строка состоит только из букв и цифр
    Используйте Map
    keepRepeated('aabbc') -> 'aabb'
    keepRepeated('Hello') -> 'll'
    keepRepeated('AaBb') -> 'AaBb'
    keepRepeated('a1a11') -> 'a1a11'
    keepRepeated('abcdef') -> ''
*/

export const keepRepeated = (str) => {
  const map = new Map();

  for (const char of str) {
    const key = char.toLowerCase();
    map.set(key, (map.get(key) || 0) + 1);
  }

  return [...str].filter((char) => map.get(char.toLowerCase()) > 1).join('');
};

/*
    task-optional-05
    Напишите функцию, которая принимает строку и возвращает строку из уникальных символов
    Каждый символ должен встречаться в результате ровно один раз
    Регистр не важен: 'A' и 'a' считаются одним и тем же символом
    Сохраняется порядок первого появления символа
    Предполагается, что строка состоит только из букв и цифр
    Используйте Set
    uniqueChars('aabbc') -> 'abc'
    uniqueChars('Hello') -> 'Helo'
    uniqueChars('AaBb') -> 'AB'
    uniqueChars('12321') -> '123'
    uniqueChars('') -> ''
*/

export const uniqueChars = (str) => {
  const seen = new Set();
  let result = '';

  for (const char of str) {
    const key = char.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result += char;
    }
  }

  return result;
};
