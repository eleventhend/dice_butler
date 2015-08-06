function roller(pips) {
    result = Math.floor(Math.random() * (pips)) + 1;
    return result
}

//Outputs individual dice rolls for a given number of iterations and dice pips
function singleroll() { 
    pips = document.getElementById("pips").value;
    iterations = document.getElementById("iter").value;
    modifier = document.getElementById("mod").value;
    total = 0;
    roll_output = "";
    for (i = 1; i <= iterations; i++) {
        x = roller(pips);
        roll_output = ("<tr> <td>" + "1" + "D" + pips + ": " + x + "</td> </tr>") + roll_output;
        total += x;
    }
    total += Number(modifier);
    roll_output = '<tr> <td rowspan="' + iterations+1 + '">' + "Total: " + total + '</td> </tr>' + roll_output
    output.innerHTML = '<div class="attack"> <table class="attack">' + roll_output + "</table> </div>" + "<br>" + output.innerHTML
}

function singleattack() {
    d_pips = document.getElementById("damage_pips").value;
    d_dice = document.getElementById("damage_dice").value;
    bab1 = document.getElementById("bab1").value;
    str = document.getElementById("str").value;
    chr = document.getElementById("chr").value;
    pallvl = document.getElementById("pallvl").value;
    c_mult = document.getElementById("crit_multiplier").value; 

    a = attack(bab1, d_pips, d_dice, c_mult)
    output.innerHTML = '<div class="attack">' + a + "</div>" + "<br>" + output.innerHTML

}

//Outputs a single attack and damage roll based on inputs from the "attack" form
function fullattack() {
    //Get input values from the attack form
    d_pips = document.getElementById("damage_pips").value;
    d_dice = document.getElementById("damage_dice").value;
    bab1 = document.getElementById("bab1").value;
    bab2 = document.getElementById("bab2").value;
    bab3 = document.getElementById("bab3").value;
    bab4 = document.getElementById("bab4").value;
    str = document.getElementById("str").value;
    chr = document.getElementById("chr").value;
    pallvl = document.getElementById("pallvl").value;
    c_mult = document.getElementById("crit_multiplier").value;

    if (bab1 != 0) {
        a1 = attack(bab1, d_pips, d_dice, c_mult);
        a_out = a1
    }

    if (bab2 != 0) {
        a2 = attack(bab2, d_pips, d_dice, c_mult);
        a_out += a2;
    }

    if (bab3 != 0) {
        a3 = attack(bab3, d_pips, d_dice, c_mult);
        a_out += a3;
    }

    if (bab4 != 0) {
        a4 = attack(bab4, d_pips, d_dice, c_mult);
        a_out += a4;
    }

    output.innerHTML = '<div class="attack">' + a_out + "</div>" + "<br>" + output.innerHTML
}

function attack(bab, damage_pips, damage_dice, crit_multiplier) {
    //Initialize damage and other variables as 0
    //Initialize the output text as empty
    damage = 0;
    smitedmg = 0;
    attack_output = "";

    //Make the attack roll
    y = roller(20);
    natroll = y;

    if (natroll == 20) {
        damage_dice = (damage_dice * crit_multiplier);
    }

    //Make damage rolls, ouput each roll and then total damage
    //This is done before the attack roll for the sake of visual clarity. Because everything appends from the top, this will make the damage roll appear after the attack roll on the webpage.
    for (i = 1; i <= damage_dice; i++) {
        x = roller(damage_pips);
        attack_output = ("<tr> <td>" + "1" + "D" + damage_pips + ": " + x + "</td> </tr>") + attack_output;
        damage += x;
        if (document.getElementById("smite").checked == true) {
            damage += Number(pallvl);
        }
    }
    attack_output = '<tr> <td rowspan="' + damage_dice+1 + '">' + "Damage: " + damage + "</td></tr>" + attack_output;

    //If a natural 20 is rolled, print a little shamrock for visibility
    if (natroll == 20) {
        z = roller(20);
        attack_output = ("<td>" + "1" + "D20: " + z + "</td> </tr>") + attack_output;
        z += Number(bab) + Number(str);
        if (document.getElementById("smite").checked == true) {
            z += Number(chr);
        }
        attack_output = ("<tr> <td>" + "Critical Roll: " + z + "</td>") + attack_output;
        attack_output = ("<td>" + "1" + "D20: " + y + " &#9752" + "</td> </tr>") + attack_output;
    } else if (natroll == 1) {
        z = roller(20);
        attack_output = ("<td>" + "1" + "D20: " + z + "</td> </tr>") + attack_output;
        z += Number(bab) + Number(str);
        if (document.getElementById("smite").checked == true) {
            z += Number(chr);
        }
        attack_output = ("<tr> <td>" + "Failure Roll: " + z + "</td>") + attack_output;
        attack_output = ("<td>" + "1" + "D20: " + y + " &#9730" + "</td> </tr>") + attack_output;
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
    } else if (natroll == 1) {
        attack_output = '<table class="fail">' + attack_output + "</table>";
    } else {
        attack_output = '<table class="attack">' + attack_output + "</table>";
    }

    return attack_output
}
