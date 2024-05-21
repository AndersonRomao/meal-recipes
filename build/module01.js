"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// npm run dev = ts-node module01.ts
function add(x, y) {
    if (typeof x === "number" && typeof y === "number") {
        return x + y;
    }
    if (typeof x === "string" && typeof y === "string") {
        return x.concat(y);
    }
    throw new Error("Parameters must be numbers of strings!");
}
//console.log(add('one', 'two'));
//console.log(add(1, 2));
let randomValue = 10;
let multitype;
multitype = 20;
multitype = true;
let person = ["Marcia", 35];
let myIceCream = {
    flavor: "vanilla",
    scoops: 2,
    sauce: "caramel",
    nuts: true,
};
//console.log(myIceCream.scoops)
function tooManyScoops(dessert) {
    if (dessert.scoops >= 4)
        return dessert.scoops + " is too many scoops!";
    return "Your order will be ready soon!";
}
let myIceCreamArray;
myIceCreamArray = ["chocolate", "vanilla", "strawberry"];
let myStr = myIceCreamArray[0];
//console.log(myStr)
//*interface JavaScript API
const fetchURL = "https://jsonplaceholder.typicode.com/posts";
function fetchPosts(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(url);
        let body = yield response.json();
        return body;
    });
}
function showPost() {
    return __awaiter(this, void 0, void 0, function* () {
        let posts = yield fetchPosts(fetchURL);
        // * Display the contents of the first item in the response
        let post = posts[0];
        console.log("Post #" + post.id);
        // * If the userId is 1, then display a note that it's an administrator
        console.log("Author: " + (post.userId === 1 ? "Administrator" : post.userId.toString()));
        console.log("Title: " + post.title);
        console.log("Body: " + post.body);
    });
}
//showPost()
//*Classes
class Car {
    //*Constructor
    constructor(make, color, doors = 4) {
        this._make = make;
        this._color = color;
        if (doors % 2 == 0) {
            this._doors = doors;
        }
        else {
            throw new Error("Doors must be an even number");
        }
        Car.numberOfCars++;
    }
    //*Acessors
    get make() {
        return this._make;
    }
    set make(make) {
        this._make = make;
    }
    get color() {
        return "The color of the car is " + this._color;
    }
    set color(color) {
        this._color = color;
    }
    get doors() {
        return this._doors;
    }
    set doors(doors) {
        if (doors % 2 === 0) {
            this._doors = doors;
        }
        else {
            throw new Error("Doors must be an even number");
        }
    }
    //*Methods
    accelerate(speed) {
        return `${this.worker()} is accelerating to ${speed} MPH.`;
    }
    brake() {
        return `${this.worker()} is braking with the standard braking system.`;
    }
    turn(direction) {
        return `${this.worker()} is turning ${direction}`;
    }
    // This function performs work for the other method functions
    worker() {
        return this._make;
    }
    static getNumbersOfCars() {
        return Car.numberOfCars;
    }
}
//*Properties
Car.numberOfCars = 0;
let myCar = new Car("Cool Car Company", "blue", 2);
console.log(myCar.color);
//console.log(myCar._color)
let myCar2 = new Car("Galaxy Motors", "red");
console.log(myCar2.doors);
console.log(myCar2.accelerate(35));
console.log(myCar.brake());
console.log(myCar2.turn("right"));
console.log(Car.getNumbersOfCars());
class ElectricCar extends Car {
    //*Constructor
    constructor(make, color, range, doors = 2) {
        super(make, color, doors);
        this._range = range;
    }
    //*Accessors
    get range() {
        return this._range;
    }
    set range(range) {
        this._range = range;
    }
    //*Methods
    charge() {
        console.log(this.worker() + " is charging.");
    }
    brake() {
        return `${this.worker()} is braking with the regenerative braking system.`;
    }
}
let spark = new ElectricCar("Spark Motors", "silver", 124, 2);
let eCar = new ElectricCar("Electric Car Co.", "black", 263);
console.log(eCar.doors); // returns the default, 2
spark.charge(); // returns "Spark Motors is charging"
console.log(spark.brake());
//*async loadDog(id: number): Dog {
//*  return await (await fetch('demoUrl')).json() as Dog;
//*}
//* Class: active record pattern
class DogRecord {
    constructor({ name, age, description, id = 0 }) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.description = description;
    }
    //* static load(id: number): DogRecord {
    // code to load dog from database
    //* return dog;
    //*}
    save() {
        // code to save dog to database
    }
}
function identity(value, message) {
    // Return type is inferred
    let result = "";
    let typeValue = typeof value;
    if (typeof value === "number") {
        // Is it a number?
        result = value + value; // OK
    }
    else if (typeof value === "string") {
        // Is it a string?
        result = value + value; // OK
    }
    console.log(`The message is ${message} and the function returns a ${typeValue} value of ${result}`);
    return result;
}
let numberValue = identity(100, "Hello");
let stringValue = identity("100", "Hello");
console.log(numberValue); // Returns 200
console.log(stringValue); // Returns 100100
function getPets(pet, key) {
    return pet[key];
}
let pets1 = { cats: 4, dogs: 3, parrots: 1, fish: 6 };
let pets2 = { 1: "cats", 2: "dogs", 3: "parrots", 4: "fish" };
//console.log(getPets(pets1, "fish"));  // Returns 6
//console.log(getPets(pets2, 3));     // "3" = Error
