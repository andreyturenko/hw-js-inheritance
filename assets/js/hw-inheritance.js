// // // Task: *JS. Спадкування

// // // Реалізувати ієрархію класів:
// // ПасажирськийТранспорт (PassengerTransport) =>ТранспортнийЗасіб (Vehicle)
// // (За бажанням:) Вантажний Транспорт (FreightTransport) => ТранспортнийЗасіб (Vehicle).
// // // Для базового класу Vehicle реалізувати:
// // - властивості:
// --- dimensions - габарити, brand - марка, model - модель,
// --- manufactureDate - дата виробництва (використовувати вбудований об'єкт Date).
class Vehicle {
  constructor(dimensions, brand, model, manufactureDate) {
    this.dimensions = dimensions;
    this.brand = brand;
    this.model = model;
    this._manufactureDate = new Date(manufactureDate);
  }
  // // - методи:
  // --- getFullInfo() - повертає рядок з інформацією про транспортний засіб: бренд, модель, вік;
  // --- getAge() - повертає кількість років із дня виробництва (буде плюсом реалізувати геттером).
  getFullInfo() {
    return `${this.brand}; ${this.model}; Age ${this.age} years; Dimensions: ${this.dimensions}`;
  }
  get age() {
    const currentYear = new Date().getFullYear();
    return currentYear - this._manufactureDate.getFullYear();
  }
}
// // Дочірній клас PassengerTransport розширюється:
// // - властивостями: passengerLimit - максимальна кількість пасажирських місць.
// ---  passengerCount - кількість зайнятих пасажирських місць.
class PassengerTransport extends Vehicle {
  constructor(dimensions, brand, model, manufactureDate, passengerLimit) {
    super(dimensions, brand, model, manufactureDate);
    this.passengerLimit = passengerLimit;
    this.passengerCount = 0;
  }
  // // - методом addPassenger() - додає ще одного пасажира, якщо ще є вільні місця;
  // повертає true (якщо пасажир доданий) або false (якщо не доданий, тобто вже не було вільних місць).
  addPassenger() {
    if (this.passengerCount < this.passengerLimit) {
      this.passengerCount++;
      return true;
    } else {
      return false;
    }
  }
  // Перевизначити метод getFullInfo: повертає рядок з інформацією про транспортний засіб:
  // бренд, модель, вік, максимальна кількість пасажирських місць.
  getFullInfo() {
    return `${super.getFullInfo()}; Max. passengers ${this.passengerLimit}`;
  }
}
// // (За бажанням:)
// // Дочірній клас FreightTransport розширюється: властивістю: capacity - вантажопідйомність
class FreightTransport extends Vehicle {
  constructor(dimensions, brand, model, manufactureDate, capacity) {
    super(dimensions, brand, model, manufactureDate);
    this.capacity = capacity;
  }
  // методом checkLoadingPossibility(weight)-перевіряє,чи можна завантажити масу weight.Повертає boolean.
  checkLoadingPossibility(weight) {
    return weight <= this.capacity;
  }
  // Перевизначити метод getFullInfo: бренд, модель, вік, вантажопідйомність.
  getFullInfo() {
    return `${super.getFullInfo()}; Capacity ${this.capacity} kg.`;
  }
}
// Створити об'єкти всіх класів ієрархії, протестувати роботу методів.
const car = new Vehicle("Compact", "Audi", "A8", "2014");
console.log(car.getFullInfo());

const bus = new PassengerTransport(
  "Medium",
  "Mercedes-Benz",
  "Sprinter",
  "2006",
  15
);
console.log(bus.getFullInfo());
console.log("Add passenger :>> ", bus.addPassenger());
console.log("Passenger count :>> ", bus.passengerCount);

const truck = new FreightTransport("Large", "Volvo", "FH", "2021", 15000);
console.log(truck.getFullInfo());
console.log("Loading possibility :>> ", truck.checkLoadingPossibility(12000));
