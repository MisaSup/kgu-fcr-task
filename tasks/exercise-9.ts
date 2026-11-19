/*

Intro:

    Our object-constructor library never took off.
    We are going back to the basics: writing actual classes.
    We already describe data with interfaces — now let's
    implement a class that follows an interface contract
    and hides its internals with access modifiers.

Exercise:

    Implement the class Person so that it implements IPerson:

      - private firstName: string;
      - private lastName: string;
      - protected birthDate: Date;
      - constructor(firstName: string, lastName: string, birthDate: Date);
      - public getFullName(): string — returns `${firstName} ${lastName}`.

    Access modifiers matter:
      - firstName / lastName must be private;
      - birthDate must be protected (accessible in subclasses).

*/

export interface IPerson {
    getFullName(): string;
}

export class Person implements IPerson {
    private firstName: string;
    private lastName: string;
    protected birthDate: Date;

    constructor(firstName: string, lastName: string, birthDate: Date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

const person = new Person('Max', 'Mustermann', new Date(1990, 0, 1));
console.log(person.getFullName());


// @ts-expect-error firstName is private and cannot be accessed from outside
console.log(person.firstName);

// @ts-expect-error birthDate is protected and cannot be accessed from outside
console.log(person.birthDate);

class Employee extends Person {
    public getBirthYear(): number {
        return this.birthDate.getFullYear();
    }

    public getFirstName(): string {
        // @ts-expect-error firstName is private and cannot be accessed in a subclass
        return this.firstName;
    }
}

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses
// https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility
// https://www.typescriptlang.org/docs/handbook/2/classes.html
