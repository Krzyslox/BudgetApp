
// BUDGET CONTROLLER
const budgetController = (() => {

    //Constructors for Expanse and Icome objects
    const Expanse = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //All the icomes and expanses calculated to the one variable
    let calculateTotal = (type) => {
        let sum = 0;
        data.allItems[type].forEach((cur) => {
            sum += cur.value;
        });
        data.totals[type] = sum;

    };

    let calculateBudget = () => {
        data.budget = data.totals.inc - data.totals.exp;
        if (data.totals.inc > 0) {
            data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
        } else {
            data.percentage = -1;
        }
    };

    //All the data budget, incomes and expanses
    let data = {
        budget: 0,
        percentage: 0,
        allItems: {
            //[1, 5, 7, 10]
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {

        addItem: (type, des, val) => {

            let newItem;
            let ID;

            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0;
            }

            //Create new item based on inc or exp type
            if (type === "exp") {
                newItem = new Expanse(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }
            //new Item added to table
            data.allItems[type].push(newItem);

            return newItem;
        },

        calculateBudget: function () {
            //calculate total income and expanse
            calculateTotal("exp");
            calculateTotal("inc");
            //Calculate the budget : income - expanses
            // Calculate the percentage of income that we spent
            calculateBudget();


        },




        //function that will only return objects with calculated budget
        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },


        testing: () => {
            return console.log(data);
        }




    }

})();

//UI CONTROLLER
const UIController = (() => {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeList: '.income__list',
        epensesList: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'

    }

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        // Przkazanie parametrów DOM do innego modułu, za pośrednictwem upublicznienia
        getDOMStrings: () => {
            return DOMstrings;
        },
        addListItem: (obj, type) => {
            let html, element;
            // Create HTML String with placeholder text
            if (type === 'inc') {
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMstrings.incomeList;
            } else if (type === 'exp') {
                console.log('Thats works');
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMstrings.epensesList;
            }
            //Replace the placeholder with some actual data
            let newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            // Insert HTML into the DOM
            return document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },
        clearFields: function () {
            let arrayToBeCleared, arraySliced;

            arrayToBeCleared = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            arraySliced = Array.prototype.slice.call(arrayToBeCleared);

            arraySliced.forEach(element => {
                element.value = "";
            });

            arrayToBeCleared[0].focus();

        },
        displayBudget: (obj) => {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        }
    }

})();


//GLOBAL APP CONTROLER
const controller = ((budgetCtrl, UICtrl) => {

    //Initialization Function
    let setupEventListeners = () => {
        const DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })
    }

    const updateBudget = () => {
        // 1. Calculate the budget

        budgetController.calculateBudget();

        // 2. Return the budget
        let budget = budgetController.getBudget();


        // 3. Display the budget on UI
        UIController.displayBudget(budget);
    }

    const ctrlAddItem = () => {
        let input, newItem;

        // 1. Get the field input data

        input = UICtrl.getInput();

        if (input.description !== "" && input.value > 0 && !isNaN(input.value)) {
            // 2. Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UIController.addListItem(newItem, input.type);

            // 4. Clear the fields
            UIController.clearFields();

            updateBudget();

        }


    };

    return {
        init: () => {
            setupEventListeners();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        }
    }


})(budgetController, UIController)

controller.init();