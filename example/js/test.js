JSUnit.beforeEach(index => {
  console.log("Start test #" + index);
});

JSUnit.afterEach(index => {
  console.log("Finish test #" + index);
});


JSUnit.module("NaN")

JSUnit.test("IsNaN Function", assert => {
  assert.isTrue(isNaN(NaN), "NaN parameter");
  assert.isTrue(isNaN(+[5, 6]), "Convert filled array to number");
  assert.isFalse(isNaN(Infinity), "Infinity is not NaN");
});


JSUnit.module("Sum");

JSUnit.test("Sum Function", assert => {
  assert.equal(sum(4, 5), 9, "Simple add");
  assert.equal(sum("5", "6"), 11, "Add string nums");
  assert.equal(sum("5", 8), 13, "One string parameter");
  assert.equal(sum(5, 6, 8), 19, "Three arguments");
  assert.equal(sum(), 0, "No arguments");
  assert.equal(sum("5", 6, "-2"), 9, "Negative arguments");  
});


JSUnit.module("Power");

JSUnit.test("Power function", assert => {
  assert.equal(pow(2, 3), 8, "2**3 = 8");
  assert.equal(pow(3, 4), 81, "3**4 = 81");
  assert.isNaN(pow(2, -1), "NaN for negative exponents");
  assert.isNaN(pow(2, 1.5), "NaN for decimal exponents");
});