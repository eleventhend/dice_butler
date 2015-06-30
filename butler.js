function roller(pips) {
    result = Math.floor(Math.random() * (pips)) + 1;
    return result
}

//Outputs individual dice rolls for a given number of iterations and dice pips
function rollcall() { 
    pips = document.getElementById("pips").value;
    iterations = document.getElementById("iter").value;
    total = 0;
    roll_output = "";
    for (i = 1; i <= iterations; i++) {
        x = roller(pips);
        roll_output = ("1" + "D" + pips + ": " + x) + roll_output;
        total += x;
    }
    roll_output = "Total: " + total + "<br>" + roll_output;
    roll_output = "<p>" + roll_output + "</p>"
    output.innerHTML = roll_output + output.innerHTML
}

//Outputs a single attack and damage roll based on inputs from the "attack" form
function attack() {
    //Get input values from the attack form
    pips = document.getElementById("a_pips").value;
    iterations = document.getElementById("a_iter").value;
    bab = document.getElementById("bab").value;
    str = document.getElementById("str").value;
    chr = document.getElementById("chr").value;
    pallvl = document.getElementById("pallvl").value;
    
    //Initialize damage and other variables as 0
    //Initialize the output text as empty
    damage = 0;
    smitedmg = 0;
    attack_output = "";

    //Make damage rolls, ouput each roll and then total damage
    //This is done before the attack roll for the sake of visual clarity. Because everything appends from the top, this will make the damage roll appear after the attack roll on the webpage.
    for (i = 1; i <= iterations; i++) {
        x = roller(pips);
        attack_output = ("1" + "D" + pips + ": " + x + "<br>") + attack_output;
        damage += x;
        if (document.getElementById("smite").checked == true) {
            damage += Number(pallvl);
        }
    }
    attack_output = "Damage: " + damage + "<br>" + attack_output;
    
    //Make the attack roll
    y = roller(20);

    //If a natural 20 is rolled, print a little shamrock for visibility
    if (y == 20) {
        attack_output = ("1" + "D20: " + y + " &#9752" + "<br>") + attack_output;
    } else {
        attack_output = ("1" + "D20: " + y + "<br>") + attack_output;
    }

    //Add appropriate modifiers and output out the result of the attack roll.
    y += Number(bab) + Number(str);
    if (document.getElementById("smite").checked == true) {
        y += Number(chr);
    }
    attack_output = ("Attack Roll: " + y + "<br>") + attack_output;
    if (document.getElementById("smite").checked == true) {
        attack_output = "&#9841 Smite! <br>" + attack_output
    }
    //style on nat 20
        if (y == 20) {
        attack_output = '<p class="natural">' + attack_output + "</p>"
    } else {
        attack_output = "<p>" + attack_output + "</p>"
    }

    output.innerHTML = attack_output + output.innerHTML
}