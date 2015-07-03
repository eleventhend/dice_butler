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
function fullattack() {
    //Get input values from the attack form
    pips = document.getElementById("a_pips").value;
    iterations = document.getElementById("a_iter").value;
    bab1 = document.getElementById("bab1").value;
    bab2 = document.getElementById("bab2").value;
    bab3 = document.getElementById("bab3").value;
    bab4 = document.getElementById("bab4").value;
    str = document.getElementById("str").value;
    chr = document.getElementById("chr").value;
    pallvl = document.getElementById("pallvl").value;

    if (bab1 != 0) {
        a1 = attack(bab1);
        a_out = a1
    }

    if (bab2 != 0) {
        a2 = attack(bab2);
        a_out += a2;
    }

    if (bab3 != 0) {
        a3 = attack(bab3);
        a_out += a3;
    }

    if (bab4 != 0) {
        a4 = attack(bab4);
        a_out += a4;
    }

    output.innerHTML = '<div class="attack">' + a_out + "</div>" + "<br>" + output.innerHTML
}

function attack(bab) {
    //Initialize damage and other variables as 0
    //Initialize the output text as empty
    damage = 0;
    smitedmg = 0;
    attack_output = "";

    //Make damage rolls, ouput each roll and then total damage
    //This is done before the attack roll for the sake of visual clarity. Because everything appends from the top, this will make the damage roll appear after the attack roll on the webpage.
    for (i = 1; i <= iterations; i++) {
        x = roller(pips);
        attack_output = ("<tr> <td>" + "1" + "D" + pips + ": " + x + "</td> </tr>") + attack_output;
        damage += x;
        if (document.getElementById("smite").checked == true) {
            damage += Number(pallvl);
        }
    }
    //attack_output = "<tr>" + attack_output

    attack_output = '<tr> <td rowspan="' + iterations+1 + '">' + "Damage: " + damage + "</td></tr>" + attack_output;
    
    //Make the attack roll
    y = roller(20);
    natroll = y;

    //If a natural 20 is rolled, print a little shamrock for visibility
    if (y == 20) {
        attack_output = ("<td>" + "1" + "D20: " + y + " &#9752" + "</td> </tr>") + attack_output;
    } else {
        attack_output = ("<td>" + "1" + "D20: " + y + "</td> </tr>") + attack_output;
    }

    //Add appropriate modifiers and output out the result of the attack roll.
    y += Number(bab) + Number(str);
    if (document.getElementById("smite").checked == true) {
        y += Number(chr);
    }
    attack_output = ("<tr> <td>" + "Attack Roll: " + y + "</td>") + attack_output;
    if (document.getElementById("smite").checked == true) {
        attack_output = "<tr> <td> &#9841 Smite! </td> </tr>" + attack_output;
    }

    //style on nat 20
    if (natroll == 20) {
        attack_output = '<table class="natural">' + attack_output + "</table>";
    } else {
        attack_output = '<table class="attack">' + attack_output + "</table>";
    }

    return attack_output
}
