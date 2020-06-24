
// BUDGET CONTROLLER
const budgetController = (() => {



})();

//UI CONTROLLER
const UIController = (() => {

    return {
        getInput: () => {
            return {
                type: document.querySelector('.add__type').value, //Will be inc or exp
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value
            }
        }
    }

})();


//GLOBAL APP CONTROLER
const controller = ((budgetCtrl, UICtrl) => {

    const ctrlAddItem = () => {
        // 1. Get the field input data

        let input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on UI

    }
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    })

})(budgetController, UIController)