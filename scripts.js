const previousOperationText = document.querySelector("#ope_ant")
const currentOperationText = document.querySelector("#ope_atual")
const buttons = document.querySelectorAll("#botoes button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    // add digito a tela da calculadora
    addDigt(digit){
    
    // checar se a operação atual já tem um ponto
    if(digit === "." && this.currentOperationText.innerText.includes(".")){
        return;
    }
        this.currentOperation = digit;
        this.updateScreen();
    }

    // processar operações da calculadora
    processOperation(operation){
        // check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            if(this.previousOperationText.innerText !== "") {
                //mudar operação
                this.changeOperation(operation);
            }
            return;
        }
        
        // pegar os valores previos e atuais 
        let operationValue
        const previus = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
        case "+":
            operationValue = previus + current;
            this.updateScreen(operationValue, operation, current, previus);
            break;
        case "-":
            operationValue = previus - current;
            this.updateScreen(operationValue, operation, current, previus);
            break;
         case "/":
            operationValue = previus / current;
            this.updateScreen(operationValue, operation, current, previus);
            break;
        case "*":
            operationValue = previus * current;
            this.updateScreen(operationValue, operation, current, previus);
            break;
        case "DEL":
            this.processDelOperator();
            break;
        case "CE":
                this.processClearCurrentOperator();
                break;
        case "C":
                this.processClearOperator();
                break;  
        case "=":
                this.processEqualOperator();
                break;   
            default:
                return;
        }
    }
    
    //alterar valores da tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previos = null) {
       console.log(operationValue, operation, current, previos)
       
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //
            if(previos === 0){
                operationValue = current
            }

            //add curret value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // change math operation
    changeOperation(operation) {

        const mathOprations = ["*", "/", "+", "-"]

        if(!mathOprations.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Deletar um digito
    processDelOperator() {

        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Limpar processo atual
    processClearCurrentOperator(){

        this.currentOperationText.innerText = "";
    }

    //Limpar todos os processos
    processClearOperator(){

        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // operação de igual
    processEqualOperator(){

        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{

        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {

            calc.addDigt(value);
        } else{
            calc.processOperation(value);
        }
    });
});

