import { test } from 'node:test';
import assert from 'node:assert';
import {
    helloWorld,
    getString,
    getLength,
    getFirst,
    getLast,
    pushElement,
    popElement,
    getAnimalDescription,
    getObjKeys,
    getObjValues,
    patchObj,
    deleteItem,
    multiplyByTwo,
    getAssessments,
    hasBoolean,
    isStringArray,
    return2007,
} from '../tasks/required.js';

const makeRandomString = () => String(Math.floor(Math.random() * 1001));
const makeRandomArr = () =>
    Array.from({ length: Math.floor(Math.random() * 30) + 1 }, () => Math.floor(Math.random() * 1001));
const makeRandomObj = () =>
    Object.fromEntries(
        Array.from({ length: Math.floor(Math.random() * 6) + 5 }, (_, i) => [`key${i}`, Math.floor(Math.random() * 1001)])
    );

const randomString = makeRandomString();
const randomArr = Object.freeze(makeRandomArr());
const randomObj = Object.freeze(makeRandomObj());


test('task-00 helloWorld', () => {
    assert.strictEqual(helloWorld(), 'Hello, World!');
});

test('task-01 getString', () => {
    assert.ok(typeof getString(randomString) === 'string');
    assert.ok(!(typeof getString(7) === 'string'));
    assert.ok(!(typeof getString([]) === 'string'));
    assert.ok(!(typeof getString({}) === 'string'));
    assert.ok(!(typeof getString() === 'string'));
    assert.ok(!(typeof getString(null) === 'string'));
    assert.ok(!(typeof getString(true) === 'string'));
    assert.strictEqual(getString(randomString), randomString);
});

test('task-02 getLength, getFirst, getLast, pushElement, popElement', async (t) => {
    const localString = makeRandomString();
    const arr = makeRandomArr();

    await t.test('getLength', () => {
        assert.strictEqual(getLength(arr), arr.length);
    })
    await t.test('getFirst', () => {
        assert.strictEqual(getFirst(arr), arr[0]);
    })
    await t.test('getLast', () => {
        assert.strictEqual(getLast(arr), arr[arr.length - 1]);
    })
    await t.test('pushElement', () => {
        const arr = [...randomArr];
        const expectedLength = arr.length + 1;

        const result = pushElement(arr, localString);

        assert.strictEqual(result.length, expectedLength);
        assert.strictEqual(result.at(-1), localString);
        assert.deepStrictEqual(result.slice(0, -1), [...randomArr]);
    })
    await t.test('popElement', () => {
        const arr = [...randomArr];
        const expected = arr.at(-1);

        assert.strictEqual(popElement(arr), expected);
    })
});

test('task-03 getAnimalDescription', () => {
    const animal = String(Math.floor(Math.random() * 1001));
    const legs = Math.floor(Math.random() * 1001);
    const color = String(Math.floor(Math.random() * 1001));
    const obj = {
        animal,
        legs,
        color,
    }

    assert.strictEqual(getAnimalDescription(obj), 'The ' + color + ' ' + animal + ' has ' + legs + ' legs');
    assert.ok(!getAnimalDescription(obj).includes('undefined'));
    assert.ok(!getAnimalDescription(obj).includes('null'));
});

test('task-04 getObjKeys, getObjValues', async (t) => {
    const obj = { ...randomObj };

    await t.test('getObjKeys', () => {
        assert.deepStrictEqual(getObjKeys(obj), Object.keys(obj));
    })
    await t.test('getObjValues', () => {
        assert.deepStrictEqual(getObjValues(obj), Object.values(obj))
    })
});

test('task-05 patchObj', () => {
    const baseObj = { ...randomObj };
    const randomObj2 = Object.fromEntries(
        Array.from({ length: Math.floor(Math.random() * 6) + 2 }, (_, i) => [`key${i + 3}`, Math.floor(Math.random() * 1001)])
    );
    const mergedObj = Object.assign(Object.assign({}, baseObj), randomObj2);

    assert.deepStrictEqual(patchObj(baseObj, randomObj2), mergedObj);
    assert.notEqual(patchObj(baseObj, randomObj2), baseObj);
});

test('task-06 deleteItem', async (t) => {
    const arr = [...randomArr];

    await t.test('delete non existing item', () => {
        assert.deepStrictEqual(deleteItem(arr, randomString), arr);
        assert.notEqual(deleteItem(arr, randomString), arr);
        assert.notEqual(deleteItem(arr, randomString), arr);
    })
    await t.test('delete existing item', () => {
        assert.notDeepStrictEqual(deleteItem(arr, arr[0]), arr);
        assert.notEqual(deleteItem(arr, arr[0]), arr);
        assert.strictEqual(deleteItem(arr, arr[0]).length, arr.length - 1);
    })
});

test('task-07 multiplyByTwo', () => {
    const arr = [...randomArr];

    assert.deepStrictEqual(multiplyByTwo(arr), arr.map(item => item * 2));
    assert.notEqual(multiplyByTwo(arr), arr);
});

test('task-08 getAssessments', () => {
    assert.deepStrictEqual(getAssessments([10, 5, 9, 3, 7, 7, 4, 8, 0, 5]), { 5: 1, 4: 2, 3: 4, 2: 3 });
    assert.deepStrictEqual(getAssessments([10, 5, 9, 3, 7, 7, 4]), { 5: 1, 4: 1, 3: 3, 2: 2 });
    assert.deepStrictEqual(getAssessments([10, 5, 9, 3, 7, 7, 4, 8, 0, 5, 0, 0, 7]), { 5: 1, 4: 2, 3: 5, 2: 5 });
});

test('task-09 hasBoolean, isStringArray', async (t) => {
    const arr = [...randomArr];

    await t.test('hasBoolean', () => {
        assert.ok(!hasBoolean(arr));
        assert.ok(!hasBoolean([]));
        assert.ok(hasBoolean([true]));
        assert.ok(hasBoolean([1, 2, 3, true]));
    })

    await t.test('isStringArray', () => {
        assert.ok(!isStringArray([]));
        assert.ok(isStringArray(['1', '2', '3']));
        assert.ok(!isStringArray(['1', '2', '3', []]));
    })
});

test('task-10 return2007', () => {
    assert.strictEqual(return2007('Всех Люблю!'), 'ФсЕх лЮбЛю!:*');
    assert.strictEqual(return2007('Верни мой две тысячи седьмой!'), 'ФеРнИ МоЙ ДфЕ ТыСяЧи сЕдЬмОй!:*');
});

