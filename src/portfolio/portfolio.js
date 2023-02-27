import "./import-jquery";
import 'jquery-ui-dist/jquery-ui';
import 'jquery-ui-dist/jquery-ui.css';
import './commands';
import './desktopIcon';
import {commandInterpreter, displayOutput, terminalModal} from "./commands";
import {DesktopIcon} from "./desktopIcon";
import '../../public/css/portfolio.scss';
$(document).ready(function() {
    const desktop = $(".desktop");
    terminalModal.css(
        "transform", "translateX(" + (desktop.width()/2 - terminalModal.width()/2) + "px)"
    );
    terminalModal.on("dragstop", function() {
        promptInputField.focus();
    });

    const prompt = $(".prompt");
    let promptInput = $(".prompt__input");
    const promptUser = $(".prompt__user");
    const promptInputCursor = $(".prompt__input__cursor");
    let promptInputField = $(".prompt__input__field");


    commandInterpreter("motd");
    new DesktopIcon({title:"Terminal", icon:"img/terminal.png",action: () => {
        terminalModal.fadeIn(250);
    }}).render();
    new DesktopIcon({title:"Settings", icon:"img/settings.png",action: () => {
        alert("En cours de développement");
    }}).render();

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
        if (!terminalModal.is(e.target) && terminalModal.has(e.target).length === 0) {
            promptInputField.blur();
            promptInputCursor.addClass("not__focused");
        } else {
            promptInputField.focus();
            promptInputCursor.removeClass("not__focused");
        }
    });

    promptInputField.on("input", function() {

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
            commandInterpreter(command);
            removeAllLines();

        }
    }




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

    function selectIcons() {
        let selectedIcons = [];
        desktop.find(".desktop__icon").each(function() {
            let icon = $(this);
            let iconX = icon.offset().left;
            let iconY = icon.offset().top;
            let iconWidth = icon.width();
            let iconHeight = icon.height();
            if ((iconX >= x1 && iconX <= x2 && iconY >= y1 && iconY <= y2) || (iconX <= x1 && iconX + iconWidth >= x2 && iconY <= y1 && iconY + iconHeight >= y2)) {
                selectedIcons.push(icon);
            } else if (iconX + iconWidth >= x1 && iconX + iconWidth <= x2 && iconY >= y1 && iconY <= y2) {
                selectedIcons.push(icon);
            } else if (iconX >= x1 && iconX <= x2 && iconY + iconHeight >= y1 && iconY + iconHeight <= y2) {
                selectedIcons.push(icon);
            } else if (iconX + iconWidth >= x1 && iconX + iconWidth <= x2 && iconY + iconHeight >= y1 && iconY + iconHeight <= y2) {
                selectedIcons.push(icon);
            }
        });
        return selectedIcons;
    }

    function highlightIcons() {
        let selectedIcons = selectIcons();
        // Remove all highlights
        desktop.find(".desktop__icon").removeClass("selected");
        selectedIcons.forEach(function(icon) {
            icon.addClass("selected");
        });
    }

    desktop.on("mousedown", function(e) {

        $('.modal').css('pointer-events', 'none');

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
                highlightIcons();
            });
        }, 130);

        desktop.on("mouseup", function(e) {
            clearTimeout(timer);
            square.hide();
            desktop.off("mousemove");
            $('.modal').css('pointer-events', 'auto');
        });

    });




});
