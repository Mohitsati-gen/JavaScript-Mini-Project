let buttons = document.querySelectorAll(".item")
let screen = document.querySelector(".screen")

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim()


        if (value == "AC") {
            screen.textContent = ""
        }


        else if (value == "DEL") {
            screen.textContent = screen.textContent.slice(0, -1);

        }
        else if (value == "=") {


            // percentage case handling
                if (screen.textContent.includes("%")) {
                let expr = screen.textContent;
                let newExpr = "";

                for (let i = 0; i < expr.length; i++) {
                    if (expr[i] === "%") {
                        // Find number before %
                        let j = i - 1;
                        let before = "";
                        while (j >= 0 && (expr[j] >= '0' && expr[j] <= '9' || expr[j] === '.')) {
                            before = expr[j] + before;
                            j--;
                        }

                        // Find number after %
                        let k = i + 1;
                        let after = "";
                        while (k < expr.length && (expr[k] >= '0' && expr[k] <= '9' || expr[k] === '.')) {
                            after += expr[k];
                            k++;
                        }

                        // Replace A%B with (A*B/100)
                        newExpr = expr.slice(0, j + 1) + `(${before}*${after}/100)` + expr.slice(k);
                        expr = newExpr;  // Update the expr in case of multiple %
                        i = j + 1; // Move index to start of inserted part
                    }
                }

                try {
                    screen.textContent = eval(expr);
                } catch (e) {
                    screen.textContent = "Error";
                }
            }




            // log case handling


            else if (screen.textContent.includes("log")) {

                if (screen.textContent.startsWith("log")) {
                    let num = screen.textContent.slice(3);  // Extract after 'log'
                    if (!isNaN(num) && num !== "") {
                        screen.textContent = Math.log10(parseFloat(num));
                    } else {
                        screen.textContent = "Error";
                    }
                } else {
                    let index = screen.textContent.indexOf("log");
                    let numStart = index + 3;
                    let num = "";

                    // Extract number after "log"
                    for (let i = numStart; i < screen.textContent.length; i++) {
                        let ch = screen.textContent[i];
                        if (!isNaN(ch) || ch === ".") {
                            num += ch;
                        } else {
                            break;
                        }
                    }

                    if (num === "") {
                        screen.textContent = "Error";
                    } else {
                        let logValue = Math.log10(parseFloat(num));
                        screen.textContent = screen.textContent.replace("log" + num, logValue);

                        try {
                            screen.textContent = eval(screen.textContent);
                        } catch (error) {
                            screen.textContent = "Error";
                        }
                    }
                }
            }


            //    other than log and percentage 


            else {

                screen.textContent = eval(screen.textContent);
            }
        }


        // outsider condition of the [else if (value == "=")]    

        else {
            screen.textContent += value
        }
    })


})


document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || "+-*/.%".includes(key)) {
        screen.textContent += key;
    } else if (key === "Enter") {
        document.querySelector(".equal").click(); // Simulate "=" button
    } else if (key === "Backspace") {
        screen.textContent = screen.textContent.slice(0, -1);
    } else if (key.toLowerCase() === "l") {
        screen.textContent += "log";
    } else if (key.toLowerCase() === "c") {
        screen.textContent = "";
    }
});
