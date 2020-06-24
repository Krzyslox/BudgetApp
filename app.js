
// BUDGET CONTROLLER
const budgetController = (() => {

    let Expanse = (id, description, value) => {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = (id, description, value) => {
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

})();

//UI CONTROLLER
const UIController = (() => {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
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
        // 1. Get the field input data

        let input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

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