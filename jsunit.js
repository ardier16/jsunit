/**
 * JS Unit
 * @author Maksym Shopynskyi
 * @version 1.0
 */


/** @global */
let JSUnit = function () {
    "use strict";

    
    /**
     * Variables declaration
     */


    /**
     * The number of decimals after the point in elapsed time.
     *  
     * @constant
     * @type {number}
     * @default
    */
    const ELAPSED_TIME_PRECISION = 3;


    /**
     * The root element id.
     *  
     * @constant
     * @type {string}
     * @default
    */
    const ROOT_ID = "jsunit";


    /**
     * The default module name.
     *  
     * @constant
     * @type {string}
     * @default
    */
    const DEFAULT_MODULE = "Common";


    /** 
     * The main tests array.
     * 
     * @private
     * @type {Test[]} 
     */
    let tests = [];


    /**
     * The callback for performing it before each test.
     *
     * @callback beforeCallback
     * @param {number} index An index of the current test.
     */

    /**
     * The before each test callback.
     * 
     * @private
     * @type {beforeCallback} 
     */
    let beforeEachFunc;


    /**
     * The callback for performing it after each test.
     *
     * @callback afterCallback
     * @param {number} index An index of the current test.
     */

    /**
     * The after each test callback.
     * 
     * @private
     * @type {afterCallback} 
     */
    let afterEachFunc = null;


    /** 
     * The root element for the tests.
     * 
     * @private
     * @type {HTMLElement}
     */
    let resultDiv = document.getElementById(ROOT_ID) || insertJSUnitDiv();

    /** 
     * The test module. Initial module is default.
     * 
     * @private
     * @type {string}
     */
    let testModule = DEFAULT_MODULE;




    /**
     * Test classes.
     */


    /** Class representing a test. */
    class Test {
        /**
         * Creates a test.
         * 
         * @param {string} title The test title.
         * @param {testCallback} func The test function.
         */
        constructor(title, func) {
            this.title = title;
            this.func = func;
            this.assert = new Assert();
            this.module = testModule;
            this.elapsedTime = 0;
        }


        /**
         * Gets the count of the passed asserts.
         * 
         * @returns {number} The count of the passed asserts.
         */
        get passedAssertsCount() {
            return this.assert.results.filter(result => !result.error &&
                result.result).length;
        }


        /**
         * Gets the count of all the asserts.
         * 
         * @returns {number} The count of all the asserts.
         */
        get assertsCount() {
            return this.assert.results.length;
        }


        /**
         * Runs the function of the test.
         */
        perform() {
            try {
                this.func.call(this, this.assert);
            } catch (e) {
                this.assert.results.push({
                    error: e.message
                });
            }
        }
    }


    /** Class representing an assert. */
    class Assert {
        /**
         * Creates an assert.
         */
        constructor() {
            this.results = [];
        }


        /**
         * Checks if the actual value is true in the logical context.
         * 
         * @param {Object} actual The actual value.
         * @param {string} msg The assert message.
         */
        ok(actual, msg) {
            this.results.push({
                expected: true,
                actual: actual,
                result: !!actual,
                message: msg
            });
        }


        /**
         * Checks if the actual value is not true in the logical context.
         * 
         * @param {Object} actual The actual value.
         * @param {string} msg The assert message.
         */
        notOk(actual, msg) {
            this.results.push({
                expected: false,
                actual: actual,
                result: !actual,
                message: msg
            });
        }


        /**
         * Checks if the actual value is true.
         * 
         * @param {Object} actual The actual value.
         * @param {string} msg The assert message.
         */
        isTrue(actual, msg) {
            this.results.push({
                expected: true,
                actual: actual,
                result: actual === true,
                message: msg
            });
        }


        /**
         * Checks if the actual value is false.
         * 
         * @param {Object} actual The actual value.
         * @param {string} msg The assert message.
         */
        isFalse(actual, msg) {
            this.results.push({
                expected: false,
                actual: actual,
                result: actual === false,
                message: msg
            });
        }


        /**
         * Checks if the actual value equals to the expected value.
         * 
         * @param {Object} actual The actual value.
         * @param {Object} expected The expected value.
         * @param {string} msg The assert message.
         */
        equal(actual, expected, msg) {
            this.results.push({
                expected: expected,
                actual: actual,
                result: actual == expected,
                message: msg
            });
        }


        /**
         * Checks if the actual value does not equal to the expected value.
         * 
         * @param {Object} actual The actual value.
         * @param {Object} expected The expected value.
         * @param {string} msg The assert message.
         */
        notEqual(actual, expected, msg) {
            this.results.push({
                expected: "NOT " + expected,
                actual: actual,
                result: actual != expected,
                message: msg
            });
        }


        /**
         * Checks if the actual value strictly equals to the expected value.
         * 
         * @param {Object} actual The actual value.
         * @param {Object} expected The expected value.
         * @param {string} msg The assert message.
         */
        strictEqual(actual, expected, msg) {
            this.results.push({
                expected: expected,
                actual: actual,
                result: actual === expected,
                message: msg
            });
        }


        /**
         * Checks if the actual value does not strictly equal to the expected value.
         * 
         * @param {Object} actual The actual value.
         * @param {Object} expected The expected value.
         * @param {string} msg The assert message.
         */
        notStrictEqual(actual, expected, msg) {
            this.results.push({
                expected: "NOT" + expected,
                actual: actual,
                result: actual !== expected,
                message: msg
            });
        }


        /**
         * Checks if the actual value is NaN (not a number).
         * 
         * @param {Object} actual The actual value.
         * @param {string} msg The assert message.
         */
        isNaN(actual, msg) {
            this.results.push({
                expected: NaN,
                actual: actual,
                result: isNaN(actual),
                message: msg
            });
        }


        /**
         * Checks if the actual value is not NaN (not a number).
         * 
         * @param {Object} actual The actual value.
         * @param {string} msg The assert message.
         */
        isNotNaN(actual, msg) {
            this.results.push({
                expected: "NOT NaN",
                actual: actual,
                result: !isNaN(actual),
                message: msg
            });
        }
    }




    /**
     * Private functions for working with tests.
     */


    /**
     * The callback for the test.
     *
     * @callback testCallback
     * @param {Assert} assert An assert for performing the test.
     */

    /**
     * Adds a new test to the tests array.
     *
     * @private
     * @param {string} title The test title.
     * @param {testCallback} fn The test callback.
     */
    function addTest(title, fn) {
        tests.push(new Test(title, fn));
    }


    /**
     * Performs all the tests.
     *
     * @private
     */
    function runAllTests() {
        for (let test of tests) {
            runTest(test);
        }
    }


    /**
     * Runs the test and shows its result on the page.
     *
     * @private
     * @param {Test} test The test for the performing.
     */
    function runTest(test) {
        let testIndex = tests.indexOf(test) + 1;

        if (beforeEachFunc) {
            beforeEachFunc.call(this, testIndex);
        }

        test.elapsedTime = roundNumber(
            getFunctionElapsedTime(test.perform, test),
            ELAPSED_TIME_PRECISION
        );

        showTestResult(test);

        if (afterEachFunc) {
            afterEachFunc.call(this, testIndex);
        }
    }




    /**
     * DOM functions.
     */


    /**
     * Creates and inserts the root element if it's missing.
     * 
     * @private
     * @returns {HTMLElement} Created root element.
     */
    function insertJSUnitDiv() {
        let resultDiv = document.createElement("div");
        resultDiv.id = ROOT_ID;
        document.body.insertBefore(resultDiv, document.body.firstChild);

        return resultDiv;
    }


    /**
     * Creates test result div and shows it on the page.
     *
     * @private
     * @param {Test} test The current test.
     */
    function showTestResult(test) {
        resultDiv.appendChild(createTestDiv(test));
    }


    /**
     * Creates a new HTML Element.
     *
     * @private
     * @param {string} tag The HTML tag for the element.
     * @param {string} content The element content (text or HTML markup).
     * @param {string} className The element class name.
     * @returns {HTMLElement} Created HTML element.
     */
    function createNode(tag, content, className = "") {
        let elem = document.createElement(tag);
        content[0] == "<" ? elem.innerHTML = content :
            elem.textContent = content;
        elem.className = className;

        return elem;
    }


    /**
     * Creates div block for the test.
     *
     * @private
     * @param {Test} test The test for the element.
     * @returns {HTMLElement} Created test block.
     */
    function createTestDiv(test) {
        let passed = test.passedAssertsCount;
        let asserts = test.assertsCount;
        let testClass = passed === asserts ?
            "jsunit-test-passed" : "jsunit-test-failed";

        let testDiv = createNode("div", "", "jsunit-test " + testClass);

        testDiv.appendChild(createNode("h2", test.title, "jsunit-title"));
        testDiv.appendChild(createNode("div", "<strong>" + passed + "/" +
            asserts + "</strong> passed", "jsunit-overall"));

        testDiv.appendChild(createTestInfoDiv(test));
        testDiv.appendChild(createTestAssertsDiv(test));

        return testDiv;
    }


    /**
     * Creates div block for the test info (inside the test block).
     *
     * @private
     * @param {Test} test The test for the element.
     * @returns {HTMLElement} Created test info block.
     */
    function createTestInfoDiv(test) {
        let testInfoDiv = createNode("div", "", "jsunit-info");
        testInfoDiv.appendChild(createNode("div", "<strong>Module: </strong>" +
            test.module, "jsunit-module"));
        testInfoDiv.appendChild(createNode("div", "<strong>Elapsed time: </strong>" +
            test.elapsedTime + " ms", "jsunit-elapsed"));

        return testInfoDiv;
    }


    /**
     * Creates div block for the test asserts (inside the test block).
     *
     * @private
     * @param {Test} test The test for the element.
     * @returns {HTMLElement} Created test asserts block.
     */
    function createTestAssertsDiv(test) {
        let assertsDiv = createNode("div", "", "jsunit-asserts");

        test.assert.results.forEach(function (result, i) {
            assertsDiv.appendChild(createAssertDiv(result, i));
        });

        return assertsDiv;
    }


    /**
     * Creates div block for the assert (inside the asserts block).
     *
     * @private
     * @param {Test} test The test for the element.
     * @param {number} assertIndex The index of the assert in the test.
     * @returns {HTMLElement} Created assert block.
     */
    function createAssertDiv(result, assertIndex) {
        let assertDiv = createNode("div", "", "jsunit-assert");
        let assertPassed = !result.error && result.result;
        let assertTitle = "#" + (assertIndex + 1) + " " +
            (result.message ? "- " + result.message : "");

        assertDiv.appendChild(createNode("h3", assertTitle,
            "jsunit-assert-title " + (assertPassed ? "jsunit-passed" : "jsunit-failed")));
        assertDiv.appendChild(createAssertResultDiv(result, assertPassed));

        return assertDiv;
    }


    /**
     * Creates div block for the assert result (inside the assert block).
     *
     * @private
     * @param {Object} result The assert result.
     * @param {boolean} assertPassed Shows if the assert is passed.
     * @returns {HTMLElement} Created assert result block.
     */
    function createAssertResultDiv(result, assertPassed) {
        let assertResultDiv = createNode("div", "", "jsunit-assert-result");

        if (result.error) {
            assertResultDiv.appendChild(createNode("div", "<strong>Error: </strong>" +
                result.error, "jsunit-assert-error"));
        } else {
            assertResultDiv.appendChild(createNode("div", "<strong>Expected: </strong>" +
                result.expected, "jsunit-assert-expected"));
            assertResultDiv.appendChild(createNode("div", "<strong>Actual: </strong>" +
                result.actual, "jsunit-assert-actual"));
            assertResultDiv.appendChild(createNode("div", "<strong>Passed: </strong>" +
                assertPassed, "jsunit-assert-passed"));
        }

        return assertResultDiv;
    }




    /**
     * Additional useful functions.
     */


    /**
     * Times the function running.
     *
     * @private
     * @param {Function} fn The calling function.
     * @param {Object} context The context for calling the function.
     * @param {...Object} args The function arguments.
     * @returns {number} The function elapsed time.
     */
    function getFunctionElapsedTime(fn, context, ...args) {
        let startTime = performance.now();
        fn.call(context, ...args);
        return performance.now() - startTime;
    }


    /**
     * Rounds the number to the specified precision.
     *
     * @private
     * @param {number} num The number to round.
     * @param {number} [decimalCount=0] The count of the decimals after the point.
     * @returns {number} The rounded number.
     */
    function roundNumber(num, decimalCount = 0) {
        let precision = 10 ** decimalCount;
        return Math.round(num * precision) / precision;
    }




    /**
     * Public functions.
     */


    /**
     * Adds a new test and runs it.
     *
     * @public
     * @param {string} title The test title.
     * @param {testCallback} fn The test callback.
     */
    function test(title, fn) {
        addTest(title, fn);
        runTest(tests[tests.length - 1]);
    }


    /**
     * Sets function running before each test.
     *
     * @public
     * @param {beforeCallback} fn The before callback.
     */
    function beforeEach(fn) {
        beforeEachFunc = fn;
    }


    /**
     * Sets function running after each test.
     *
     * @public
     * @param {afterCallback} fn The after callback.
     */
    function afterEach(fn) {
        afterEachFunc = fn;
    }


    /**
     * Sets module name of the tests.
     *
     * @public
     * @param {string} moduleName The test module name.
     */
    function module(moduleName) {
        if (moduleName && typeof moduleName == "string") {
            testModule = moduleName;
        }
    }




    /**
     * Export functions as JSUnit static methods 
     */
    return {
        test: (title, fn) => test(title, fn),
        beforeEach: fn => beforeEach(fn),
        afterEach: fn => afterEach(fn),
        module: mod => module(mod)
    }
}();