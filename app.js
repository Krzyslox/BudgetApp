
// BUDGET CONTROLLER
const budgetController = (() => {

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

    let data = {
        allItems: {
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
        epensesList: '.expenses__list'

    }

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
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



    const ctrlAddItem = () => {
        let input, newItem;

        // 1. Get the field input data

        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UIController.addListItem(newItem, input.type);

        // 4. Calculate the budget

        // 5. Display the budget on UI

    }

    return {
        init: () => {
            setupEventListeners();
        }
    }


})(budgetController, UIController)

controller.init();