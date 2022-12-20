// Command interpreter
//
// The command map is a map of commands (string) to their output
// TODO: Add cytoscape js in order to create a graph of my skills

import {Modal} from "./modal";
import drawSkills from "./competencesGraph";


export let cvModal = undefined;

export const terminalModal = new Modal({
    title: 'Terminal',
    body: '<div class="terminal__display"></div>\n' +
        '        <div class="prompt">\n' +
        '            <div class="prompt__user">user@localhost:~$</div>\n' +
        '            <div class="prompt__input">\n' +
        '                <span class="prompt__input__value"></span>\n' +
        '                <span class="prompt__input__cursor"></span>\n' +
        '                <input type="text" class="prompt__input__field" autofocus>\n' +
        '            </div>\n' +
        '        </div>',
}).render().addClass('terminal').show()

export const terminalDisplay = terminalModal.find('.terminal__display');

const commandMap = {
    "help": "Voici la liste des commandes disponibles :" +
        "\n- <span style='color:red;'>help</span> : Affiche la liste des commandes disponibles" +
        "\n- <span style='color:red;'>clear</span> : Efface l'écran" +
        "\n- <span style='color:red;'>cv</span> : Affiche les informations du CV" +
        "\n- <span style='color:red;'>competences</span> : Mes compétences acquises durant ma formation et mes expériences" +
        "\n- <span style='color:red;'>veille</span> : Sujet de veille technologique que je prepare dans le cadre de mon BTS SIO" +
        "\n- <span style='color:red;'>projets</span> : Liste des projets que j'ai réalisé" +
        "\n- <span style='color:red;'>contact</span> : Affiche les informations de contact" +
        "\n- <span style='color:red;'>about</span> : Affiche des informations sur moi" +
        "\n- <span style='color:red;'>source</span> : Redirige vers le code source du site",

    "about" : "<span style='font-weight:bold'>Je suis un étudiant en BTS SIO option SLAM (Solutions Logicielles et Applications Métiers) et :</span>\n" +
        "- <span style='font-style: italic;color:cyan;'>Je suis passionné par l'informatique et les nouvelles technologies.</span>\n" +
        "- <span style='font-style: italic;color:cyan'>Je suis autodidacte, j'aime apprendre de nouvelles choses et découvrir de nouvelles choses.</span>\n" +
        "- <span style='font-style: italic;color:cyan'>Je suis curieux et j'aime résoudre des problèmes.</span>\n" +
        "- <span style='font-style: italic;color:cyan'>Je sais travailler en équipe et je suis à l'écoute des autres.</span>\n" +
        "- <span style='font-style: italic;color:cyan'>Ma deuxième passion est la musculation \u{1F4AA}</span>" +
        "\n<span style='color: orangered'>Mon portfolio est encore en développement, d'autres fonctionnalités et corrections sont prévues.</span>",

    "clear" : () => {
        terminalDisplay.empty();
        displayOutput(commandMap.motd);
    },

    "motd":"Bienvenue dans le portfolio interactif de <a style='color:yellow;' href='https://www.linkedin.com/in/lucas-durbec-653597223' target='_blank'>Lucas DURBEC !</a>" +
        "\n<span style='font-weight: bold;color: #5e9ed6'>Ce portfolio est un portolio sous forme de terminal, vous pouvez utiliser les commandes suivantes pour naviguer dans le portfolio :</span>" +
        "\n\t-Pour obtenir de l'aide, tapez <span style='color:red;'>help</span>." +
        "\n\t-Pour en savoir plus sur moi, tapez <span style='color:red;'>about</span> ou <span style='color:red;'>cv</span>." +
        "\n\t-Pour me contacter, tapez <span style='color:red;'>contact</span>.",

    "contact": "Voici mes coordonnées :" +
        "\n- <span style='color:red;'>Email</span> : durbec.lucas@gmail.com" +
        "\n- <span style='color:red;'>Téléphone</span> : +33 6 48 54 27 26" +
        "\n- <span style='color:red;'>Ville</span> : 59121 Haulchin" +
        "\n- <span style='color:red;'>Linkedin</span> : <a href='https://www.linkedin.com/in/lucas-durbec-653597223/' target='_blank'>Voir</a>",

    "veille": '<div style="display:flex;align-items:center;flex-direction: row;justify-content: center">' +
        '<svg version="1.1" id="solidity" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
        '\t viewBox="0 0 652 652" style="enable-background:new 0 0 652 652;" xml:space="preserve">\n' +
        '<style type="text/css">\n' +
        '\t.st0{opacity:0.45;}\n' +
        '\t.st1{fill:#010101;}\n' +
        '\t.st2{opacity:0.6;}\n' +
        '\t.st3{opacity:0.8;}\n' +
        '\t.st4{fill:#020202;}\n' +
        '</style>\n' +
        '<g>\n' +
        '\t<g class="st0">\n' +
        '\t\t<g>\n' +
        '\t\t\t<polygon class="st1" points="377.2,71.9 320.3,173.1 206.4,173.1 263.3,71.9 \t\t\t"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g class="st2">\n' +
        '\t\t<g>\n' +
        '\t\t\t<polygon class="st1" points="320.3,173.1 434.1,173.1 377.2,71.9 263.3,71.9 \t\t\t"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g class="st3">\n' +
        '\t\t<g>\n' +
        '\t\t\t<polygon class="st1" points="263.3,274.3 320.3,173.1 263.3,71.9 206.4,173.1 \t\t\t"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g class="st0">\n' +
        '\t\t<g>\n' +
        '\t\t\t<polygon class="st1" points="263.9,426.1 320.8,324.9 434.7,324.9 377.7,426.1 \t\t\t"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g class="st2">\n' +
        '\t\t<g>\n' +
        '\t\t\t<polygon class="st1" points="320.8,324.9 207,324.9 263.9,426.1 377.7,426.1 \t\t\t"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<g class="st3">\n' +
        '\t\t<g>\n' +
        '\t\t\t<polygon class="st1" points="377.7,223.7 320.8,324.9 377.7,426.1 434.7,324.9 \t\t\t"/>\n' +
        '\t\t</g>\n' +
        '\t</g>\n' +
        '\t<path class="st4" d="M195.5,522.9c0,1.6,0.7,2.8,2,3.6c1.3,0.8,2.9,1.5,4.9,2c1.9,0.5,4,1,6.3,1.4c2.3,0.4,4.4,1,6.3,1.7\n' +
        '\t\tc1.9,0.8,3.5,1.8,4.9,3.2c1.3,1.3,2,3.2,2,5.5c0,2-0.5,3.7-1.4,5.1c-0.9,1.4-2.1,2.6-3.5,3.5c-1.4,0.9-3,1.6-4.7,2.1\n' +
        '\t\tc-1.7,0.5-3.5,0.7-5.1,0.7c-1.8,0-3.6-0.2-5.4-0.6c-1.8-0.4-3.4-1-4.8-1.9c-1.4-0.9-2.6-2-3.5-3.4c-0.9-1.4-1.4-3.2-1.4-5.3\n' +
        '\t\tc0-0.7,0.1-1.3,0.3-1.8c0.2-0.5,0.7-0.7,1.6-0.7c0.4,0,0.7,0.2,0.9,0.6c0.2,0.4,0.3,0.8,0.3,1.1c0,1.8,0.3,3.3,1,4.5\n' +
        '\t\tc0.7,1.2,1.5,2.1,2.7,2.7c1.1,0.7,2.4,1.1,3.9,1.4c1.5,0.3,2.9,0.4,4.5,0.4c1.2,0,2.5-0.2,3.9-0.5c1.4-0.3,2.6-0.8,3.8-1.5\n' +
        '\t\tc1.1-0.7,2.1-1.5,2.8-2.6c0.8-1.1,1.1-2.3,1.1-3.8c0-1.8-0.7-3.2-2-4.2c-1.3-1-2.9-1.8-4.9-2.3c-1.9-0.6-4-1.1-6.3-1.4\n' +
        '\t\tc-2.3-0.4-4.4-0.9-6.3-1.6c-1.9-0.7-3.5-1.6-4.9-2.8c-1.3-1.2-2-2.8-2-4.9c0-1.8,0.5-3.3,1.4-4.5c0.9-1.2,2.1-2.1,3.4-2.8\n' +
        '\t\tc1.4-0.7,2.9-1.2,4.5-1.4c1.6-0.3,3.2-0.4,4.6-0.4c1.7,0,3.5,0.2,5.2,0.5c1.7,0.4,3.3,0.9,4.6,1.7c1.4,0.8,2.5,1.9,3.4,3.3\n' +
        '\t\ts1.3,3.1,1.3,5.1c0,0.4-0.2,0.8-0.5,1c-0.4,0.3-0.7,0.4-1.1,0.4c-0.5,0-0.9-0.2-1.1-0.5c-0.2-0.4-0.3-0.7-0.3-1.1\n' +
        '\t\tc-0.3-1.6-0.8-2.9-1.6-3.9c-0.8-1-1.7-1.7-2.7-2.2c-1.1-0.5-2.2-0.9-3.4-1c-1.2-0.2-2.5-0.3-3.7-0.3c-1,0-2.1,0.1-3.4,0.2\n' +
        '\t\tc-1.2,0.1-2.4,0.4-3.5,0.9c-1.1,0.4-2.1,1-2.8,1.8C195.9,520.6,195.5,521.6,195.5,522.9"/>\n' +
        '\t<path class="st4" d="M253,513.4c2.5,0,4.9,0.5,7.1,1.6c2.2,1.1,4.1,2.5,5.6,4.2c1.6,1.7,2.8,3.8,3.7,6.1c0.9,2.3,1.3,4.7,1.3,7.1\n' +
        '\t\tc0,2.5-0.4,4.9-1.3,7.1c-0.9,2.3-2.1,4.3-3.7,6.1c-1.6,1.7-3.4,3.1-5.6,4.2c-2.2,1.1-4.5,1.6-7.1,1.6c-2.5,0-4.9-0.5-7-1.6\n' +
        '\t\tc-2.1-1.1-4-2.5-5.6-4.2c-1.6-1.7-2.8-3.8-3.7-6.1c-0.9-2.3-1.3-4.7-1.3-7.1c0-2.5,0.4-4.9,1.3-7.1c0.9-2.3,2.1-4.3,3.7-6.1\n' +
        '\t\tc1.6-1.7,3.4-3.1,5.6-4.2C248.1,514,250.5,513.4,253,513.4 M253,548.4c2.2,0,4.2-0.5,5.9-1.4c1.8-0.9,3.3-2.1,4.6-3.5\n' +
        '\t\tc1.3-1.5,2.3-3.1,2.9-5.1c0.7-1.9,1-3.9,1-5.9c0-2-0.3-4-1-5.9c-0.7-1.9-1.7-3.6-2.9-5c-1.3-1.5-2.8-2.6-4.6-3.5\n' +
        '\t\tc-1.8-0.9-3.8-1.4-5.9-1.4c-2.1,0-4.1,0.5-5.8,1.4c-1.8,0.9-3.3,2.1-4.6,3.5c-1.3,1.5-2.3,3.1-3,5c-0.7,1.9-1.1,3.9-1.1,5.9\n' +
        '\t\tc0,2,0.4,4,1.1,5.9c0.7,1.9,1.7,3.6,3,5.1c1.3,1.5,2.8,2.6,4.6,3.5C249,547.9,250.9,548.4,253,548.4"/>\n' +
        '\t<path class="st4" d="M286.7,483.9c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.4,0.7,0.4,1v63.9c0,0.4-0.1,0.7-0.4,1c-0.3,0.3-0.7,0.5-1.1,0.5\n' +
        '\t\ts-0.8-0.2-1.1-0.5c-0.3-0.3-0.4-0.7-0.4-1v-63.9c0-0.4,0.1-0.7,0.4-1C285.9,484,286.2,483.9,286.7,483.9"/>\n' +
        '\t<path class="st4" d="M306.2,503.8c0,0.7-0.3,1.2-0.8,1.7c-0.5,0.5-1.1,0.7-1.7,0.7c-0.7,0-1.3-0.2-1.8-0.7c-0.5-0.5-0.7-1-0.7-1.7\n' +
        '\t\tc0-0.7,0.2-1.3,0.7-1.8c0.5-0.5,1.1-0.7,1.8-0.7c0.7,0,1.2,0.2,1.7,0.7C305.9,502.5,306.2,503.1,306.2,503.8 M303.6,514.5\n' +
        '\t\tc0.4,0,0.7,0.2,1,0.5c0.3,0.3,0.5,0.7,0.5,1v33.2c0,0.4-0.2,0.7-0.5,1c-0.3,0.3-0.7,0.5-1,0.5c-0.4,0-0.8-0.2-1.1-0.5\n' +
        '\t\tc-0.3-0.3-0.4-0.7-0.4-1v-33.2c0-0.4,0.1-0.7,0.4-1C302.8,514.7,303.2,514.5,303.6,514.5"/>\n' +
        '\t<path class="st4" d="M353.4,483.8c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.4,0.7,0.4,1v63.8c0,1-0.5,1.5-1.5,1.5c-1,0-1.5-0.5-1.5-1.5v-7\n' +
        '\t\tc-1.5,2.8-3.6,5.1-6.3,6.9c-2.7,1.7-5.7,2.6-8.9,2.6c-2.5,0-4.9-0.5-7-1.6c-2.1-1.1-4-2.5-5.6-4.2c-1.6-1.7-2.8-3.8-3.7-6.1\n' +
        '\t\tc-0.9-2.3-1.3-4.7-1.3-7.1c0-2.5,0.4-4.9,1.3-7.1c0.9-2.3,2.1-4.3,3.7-6.1c1.6-1.7,3.4-3.1,5.6-4.2c2.1-1.1,4.5-1.6,7-1.6\n' +
        '\t\tc3.3,0,6.3,0.9,8.9,2.7c2.7,1.8,4.8,4.1,6.3,6.9v-38c0-0.4,0.1-0.7,0.4-1C352.6,483.9,353,483.8,353.4,483.8 M336.6,548.6\n' +
        '\t\tc2.2,0,4.2-0.5,5.9-1.4c1.8-0.9,3.3-2.1,4.6-3.5c1.3-1.5,2.3-3.1,2.9-5.1c0.7-1.9,1-3.9,1-5.9c0-2-0.3-4-1-5.9\n' +
        '\t\tc-0.7-1.9-1.7-3.6-2.9-5.1c-1.3-1.5-2.8-2.6-4.6-3.5c-1.8-0.9-3.8-1.4-5.9-1.4c-2.1,0-4.1,0.5-5.8,1.4c-1.8,0.9-3.3,2.1-4.6,3.5\n' +
        '\t\tc-1.3,1.5-2.3,3.1-3,5.1c-0.7,1.9-1.1,3.9-1.1,5.9c0,2,0.4,4,1.1,5.9c0.7,1.9,1.7,3.6,3,5.1c1.3,1.5,2.8,2.6,4.6,3.5\n' +
        '\t\tC332.5,548.1,334.5,548.6,336.6,548.6"/>\n' +
        '\t<path class="st4" d="M373.4,503.8c0,0.7-0.3,1.2-0.8,1.7c-0.5,0.5-1.1,0.7-1.7,0.7c-0.7,0-1.3-0.2-1.8-0.7c-0.5-0.5-0.7-1-0.7-1.7\n' +
        '\t\tc0-0.7,0.2-1.3,0.7-1.8c0.5-0.5,1.1-0.7,1.8-0.7c0.7,0,1.2,0.2,1.7,0.7C373.2,502.5,373.4,503.1,373.4,503.8 M370.9,514.5\n' +
        '\t\tc0.4,0,0.7,0.2,1,0.5c0.3,0.3,0.5,0.7,0.5,1v33.2c0,0.4-0.2,0.7-0.5,1c-0.3,0.3-0.7,0.5-1,0.5c-0.4,0-0.8-0.2-1.1-0.5\n' +
        '\t\tc-0.3-0.3-0.4-0.7-0.4-1v-33.2c0-0.4,0.1-0.7,0.4-1C370.1,514.7,370.5,514.5,370.9,514.5"/>\n' +
        '\t<path class="st4" d="M405.4,514.3c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.4,0.7,0.4,1c0,1-0.5,1.5-1.5,1.5h-8.2v32.1c0,0.4-0.1,0.7-0.4,1\n' +
        '\t\tc-0.3,0.3-0.7,0.5-1.1,0.5c-0.4,0-0.8-0.2-1.1-0.5c-0.3-0.3-0.4-0.7-0.4-1v-32.1h-7.9c-1,0-1.5-0.5-1.5-1.5c0-0.4,0.1-0.7,0.4-1\n' +
        '\t\tc0.3-0.3,0.7-0.5,1.1-0.5h7.9v-11.8c0-1,0.5-1.5,1.5-1.5c1,0,1.5,0.5,1.5,1.5v11.8H405.4z"/>\n' +
        '\t<path class="st4" d="M447.7,514.2c1,0,1.5,0.5,1.5,1.5c0,0.1-0.3,0.9-0.9,2.4c-0.6,1.5-1.3,3.5-2.2,5.9c-0.9,2.4-2,5.2-3.2,8.3\n' +
        '\t\tc-1.2,3.1-2.5,6.3-3.8,9.7c-1.3,3.3-2.6,6.6-3.8,9.8c-1.2,3.2-2.4,6.1-3.4,8.8c-1.1,2.7-1.9,4.9-2.7,6.8c-0.7,1.9-1.2,3-1.4,3.5\n' +
        '\t\tc-0.4,0.7-0.8,1-1.4,1c-0.4,0-0.7-0.2-1-0.5c-0.3-0.3-0.5-0.7-0.5-1c0-0.1,0.2-0.7,0.5-1.7c0.4-1,0.8-2.2,1.3-3.5\n' +
        '\t\tc0.5-1.4,1.1-2.9,1.7-4.5c0.7-1.6,1.3-3.2,1.9-4.7c0.6-1.5,1.1-2.8,1.5-3.9c0.4-1.1,0.7-1.8,0.9-2.2c-0.1-0.1-0.5-0.9-1.2-2.6\n' +
        '\t\tc-0.7-1.7-1.6-3.8-2.7-6.3c-1.1-2.5-2.2-5.2-3.3-8.1c-1.2-2.9-2.3-5.6-3.3-8.1c-1-2.5-1.9-4.6-2.6-6.3c-0.7-1.7-1-2.6-1-2.7\n' +
        '\t\tc0-1,0.5-1.5,1.5-1.5c0.7,0,1.2,0.3,1.4,0.9l12.7,30.9l12-30.8C446.5,514.5,447,514.2,447.7,514.2"/>\n' +
        '</g>\n' +
        '</svg>' +
        '<div>' +
        'Dans le cadre de mon BTS SIO, je dois réaliser une veille technologique sur le sujet de mon choix.' +
        'J\'ai choisi le language de programmation <span style="font-weight:bold">Solidity</span>\n\n' +
        '<span style="font-weight:bold">Solidity</span> est un langage de programmation orienté objet, qui permet de créer des contrats intelligents sur la blockchain Ethereum.\n' +
        'Le code est compilé en <span style="font-weight:bold">bytecode</span> et exécuté sur la blockchain Ethereum (EVM).\n' +
        '</div>' +
        '</div>\n',
    'cv': () => {
        if (!cvModal) {
            cvModal = new Modal({
                title: 'Curriculum Vitae',
                body: '<div class="modal__body"><iframe src="https://drive.google.com/file/d/1QYniUsk8Wdz-Pg7RxkN7T-NnCh7pQFWN/preview" width="100%" height="480" allow="autoplay" ></iframe></div>',
                resizable: {handles: 'e, w,', minWidth: 400},

            }).render();
        }
        cvModal.show();
        cvModal.css('z-index', 1000);
    },
    'ping': '<span style="color: #00ff00">pong</span>',
    'competences': () => {
        drawSkills($('<div style="width: 100%; height: 20vh;"></div>').appendTo(terminalDisplay));
    },
    'source': () => {
        window.open('https://github.com/Daemon0x00000000/mon-portfolio', '_blank');
    },
    'projets': '<span style="color: #00ff00">Mes projets seront bientôt disponible ici...\u{23F3}</span>',
};

export function displayOutput(output, color="white") {
    terminalDisplay.append("<span class='terminal__display__output' style='color:" + color + "'>" + output + "</span>");
    // Scroll to bottom of terminal
    terminalDisplay.scrollTop(terminalDisplay.prop("scrollHeight"));
}

export function commandInterpreter(command) {
    // Split the command into an array of words by non-breaking spaces
    const words = command.split("\u00a0");
    const commandName = words[0].toLowerCase();
    const args = words.slice(1);


    if (commandName in commandMap) {
        try {
            if (typeof commandMap[commandName] === "string") {
                displayOutput(commandMap[commandName]);
            } else {
                commandMap[commandName](args);
            }
        } catch (e) {
            displayOutput("Error: " + e.message, "red");
        }
    } else {
        displayOutput("Commande inconnue: " + commandName, "red");
    }
    $(".terminal__display__output").last().hide().fadeIn(1000);
}

