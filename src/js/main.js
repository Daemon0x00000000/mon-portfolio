import "./import-jquery";
import 'jquery-ui-dist/jquery-ui';
import 'jquery-ui-dist/jquery-ui.css';
import './commands';
import {commandInterpreter, cvModal, terminalModal} from "./commands";

$(document).ready(function() {
    const terminal = $(".terminal");
    const desktop = $(".desktop");
    terminal.css(
        "transform", "translateX(" + (desktop.width()/2 - terminal.width()/2) + "px)"
    );
    terminalModal.on("dragstop", function() {
        promptInputField.focus();
    });
    const display = $(".terminal__display");


    const prompt = $(".prompt");
    let promptInput = $(".prompt__input");
    const promptUser = $(".prompt__user");
    const promptInputCursor = $(".prompt__input__cursor");
    let promptInputField = $(".prompt__input__field");


    displayOutput(commandInterpreter("motd"));
    promptInputField.focus();


    // Lines system on prompt for user input in order to have wrapping
    let lines = [];
    let currentLine = 0;

    //TODO: Add a history system

    // Add a new line to the prompt
    function addLine(text="") {
        lines.push(text);
        prompt.append("<span class='prompt__input__value'>" + text + "</span>");
        prompt.append(promptInputCursor);
        promptInputField.val("");
        promptInputField.focus();
        currentLine++;
    }

    // Delete the current line
    function removeLine() {
        lines.pop();
        prompt.find(".prompt__input__value").last().remove();
        // Move cursor to end of last line or to prompt input if only one line
        if (lines > 1) {
            prompt.append(promptInputCursor);
        } else {
            promptInputField.focus();
            promptInputField.val(lines[0]);
        }
        currentLine--;
    }

    // Check width of prompt input and add a new line if needed
    function checkWidth() {
        if (lines.length > 1) {
            return ((prompt.find(".prompt__input__value").last().width() + promptInputCursor.width()*2) >= prompt.width());

        } else {
            return ((promptInput.width() + promptUser.width() + promptInputCursor.width()*2) >= prompt.width());
        }
    }



    $(document).on("click", function(e) {
        if (!terminal.is(e.target) && terminal.has(e.target).length === 0) {
            promptInputField.blur();
            promptInputCursor.addClass("not__focused");
        } else {
            promptInputField.focus();
            promptInputCursor.removeClass("not__focused");
        }
    });

    promptInputField.on("input", function(e) {

        // Replace spaces with non-breaking spaces
        promptInputField.val(promptInputField.val().replace(/ /g, "\u00a0"));
        lines[currentLine] = promptInputField.val();

        prompt.find(".prompt__input__value").last().text(promptInputField.val());
        if (promptInputField.val() === '') {
            if (currentLine !== 0) {
                removeLine();
                promptInputField.val(prompt.find(".prompt__input__value").last().text());
            }
        } else {
            checkWidth() && addLine();
        }


    });

    // Checks if enters is pressed
    promptInputField.on("keydown", function(e) {
        if (e.which === 13) {
            e.preventDefault();
            parseCommand(lines);
        }

        (e.which === 37 || e.which === 39) && e.preventDefault();
    });

    // Removes all lines at once
    function removeAllLines() {
        lines.length = 0;
        currentLine = 0;
        promptInputField.val("");
        prompt.find(".prompt__input__value").not(":first").remove();
        prompt.find(".prompt__input__value").first().text("");
    }


    // Parses the command and displays the output
    function parseCommand(lines) {
        const command = lines.join("");

        displayOutput(`user@localhost:~$${command}`);
        if (command) {
            const output = commandInterpreter(command);
            output === "clear" ? display.empty() && displayOutput(commandInterpreter('motd')) : typeof output === "string" ? displayOutput(output) : output.show();
            removeAllLines();

            $(".terminal__display__output").last().hide().fadeIn(1000);
        }
    }

    function displayOutput(output, color="white") {
        display.append("<span class='terminal__display__output' style='color:" + color + "'>" + output + "</span>");
        // Scroll to bottom of terminal
        display.scrollTop(display.prop("scrollHeight"));
        // Reset draggability of terminal and focus on drag stop
    }

    $(".desktop__icon__image").on("click", function() {
        terminal.fadeIn(250);
    });



    // Inspired by https://stackoverflow.com/questions/23284429/select-area-rectangle-in-javascript/23284608
    let square = $("<div class='square'></div>");
    desktop.append(square);
    let x1, y1, x2, y2;
    function reCalc() { //This will restyle the div
        let x3 = Math.min(x1,x2); //Smaller X
        let x4 = Math.max(x1,x2); //Larger X
        let y3 = Math.min(y1,y2); //Smaller Y
        let y4 = Math.max(y1,y2); //Larger Y
        square.css({
            left: x3,
            top: y3,
            width: x4-x3,
            height: y4-y3
        });
    }

    desktop.on("mousedown", function(e) {
        let timer = setTimeout(function() {

            x1 = e.pageX;
            y1 = e.pageY;
            x2 = e.pageX;
            y2 = e.pageY;
            square.css({
                left: x1,
                top: y1,
                width: 0,
                height: 0
            });
            reCalc()
            square.show();
            desktop.on("mousemove", function(e) {
                x2 = e.pageX;
                y2 = e.pageY;
                reCalc();
            });
        }, 100);

        desktop.on("mouseup", function(e) {
            clearTimeout(timer);
            square.hide();
            desktop.off("mousemove");
        });

    });



});