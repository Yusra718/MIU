// Yusra Ahmed
// Project 2: Web App Part 2
// VFW Term 1210

window.addEventListener("DOMContentLoaded", function() {

    function getId(id) {
        var element = document.getElementById(id)
        return element
    };

        //Save Data
    var save = getId("save");

        //Display Data Link
    var displayData = getId("displaydata");

        //Clear Link
    var clear = getId("clearstoreddata");

        //Meat
    var tu = getId("turkey"),
        tusl = getId("turkeyslices"),
        ch = getId("chicken"),
        chsl = getId("chickenslices"),
        pa = getId("pastrami"),
        pasl = getId("pastramislices"),
        bb = getId("beefbacon"),
        bbsl = getId("beefbaconslices"),
        nm = getId("nomeat")
    ;
        //Anything Else
    var tm = getId("tomatoes"),
        tmsl = getId("tomatoslices"),
        pi = getId("pickles"),
        pisl = getId("pickleslices"),
        on = getId("onions"),
        onsl = getId("onionslices"),
        le = getId("lettuce"),
        no = getId("no")
    ;
        //Cheese
    var ac = getId("americancheese"),
        acsl = getId("americanslices"),
        mjc = getId("montereyjackcheese"),
        mjcsl = getId("montereyjackslices"),
        pc = getId("parmesancheese"),
        pcsl = getId("parmesanslices"),
        nc = getId("nocheese")
    ;
        //Condiments
    var mayo = getId("mayo"),
        ke = getId("ketchup"),
        must = getId("mustard"),
        hs = getId("hotsauce")
        noCon = getId("nocondiments")
    ;
        //Delivery
    var addressForm = getId("address"),
        del = getId("delivery"),
        pu = getId("pickup"),
        h = getId("house"),
        st = getId("street"),
        city = getId("city"),
        zip = getId("zip"),
        notes = getId("notes")
    ;
        //Define sandwich variables for values
    var bcValue,
        delValue,
        meat = [],
        other = [],
        cheese = [],
        condiment = [],
        errMsg = getId("errors")
    ;
    
    function toggleDisplay(n){
        switch(n){
            case "on":
                getId("sandwichForm").style.display = "none";
                clear.style.display = "inline";
                displayData.style.display = "none";
                getId("addsandwich").style.display = "inline";
                break;
            case "off":
                getId("sandwichForm").style.display = "block";
                clear.style.display = "inline";
                displayData.style.display = "inline";
                getId("addsandwich").style.display = "none";
                getId("sandwich").style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    function storeData(key){
        if(!key){
            var id = Math.floor(Math.random()*1000001);
        }else{
            id = key;
        }
        selectedBreadColor();
        selectDelivery();
        var sandwich = {};
            sandwich.bcolor         = ["White/Whole Wheat:", bcValue];
            sandwich.breadtype      = ["Type of Bread:", getId("bread").value];
            sandwich.meat           = ["Meat(s):", meat];
            sandwich.anyelse        = ["Other Thing(s):", other];
            sandwich.cheese         = ["Cheese(s):", cheese];
            sandwich.condiments     = ["Condiment(s):", condiment];
            sandwich.delivery       = ["Get food by:", delValue];
            sandwich.house          = ["House Number:", h.value];
            sandwich.street         = ["Street:", st.value];
            sandwich.city           = ["City:", city.value];
            sandwich.zip            = ["Zip Code:", zip.value];
            sandwich.requests       = ["Requests/Notes:", notes.value];
        localStorage.setItem(id, JSON.stringify(sandwich));
        alert("Saved!");
    };
    
    function getData() {
        toggleDisplay("on");
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "sandwich");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        for (var i=0, j=localStorage.length; i<j;i++) {
            var makeli = document.createElement("li");
            var links = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            for (var n in obj){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(links);
            }
            makeLinks(localStorage.key(i), links);
        }
    };

    function makeLinks(key, links){
        var edit = document.createElement("a");
        edit.href = "#";
        edit.key = key;
        var editText = "Edit Sandwich";
        edit.addEventListener("click", editSandwich);
        edit.innerHTML = editText;
        links.appendChild(edit);
        edit.style.display = "inline-block"

        var deletion = document.createElement("a");
        deletion.href = "#";
        deletion.key = key;
        var deleteText = "Delete Sandwich";
        //deletion.addEventListener("click", deleteSandwich);
        deletion.innerHTML = deleteText;
        links.appendChild(deletion);
        deletion.style.display = "inline-block"
    }


    function clearData() {
        if (localStorage.length === 0) {
            alert("Nothing to clear!")
        } else {
            localStorage.clear();
            alert("Data Cleared!");
            window.location.reload();
            return false;
        }
    }
    function editSandwich(){
        var value = localStorage.getItem(this.key);
        var sandwich = JSON.parse(value);

        toggleDisplay("off");

        var breadColor = document.forms[0].bread;
        for(var i=0; i<breadColor.length; i++){
            if (breadColor[i].value == "White" && sandwich.bcolor[1] == "White"){
                breadColor[i].setAttribute("checked", "checked");
            } else if(breadColor[i].value == "Whole Wheat" && sandwich.bcolor[1] == "Whole Wheat"){
                breadColor[i].setAttribute("checked", "checked");
            }
        }

        getId("bread").value = sandwich.breadtype[1];
        
        if(sandwich.meat[1][0] == "Turkey"){
            tu.setAttribute("checked", "checked");
        }if(sandwich.meat[1][1] == "Turkey"){
            tu.setAttribute("checked", "checked");
        }if(sandwich.meat[1][2] == "Turkey"){
            tu.setAttribute("checked", "checked");
        }if(sandwich.meat[1][3] == "Turkey"){
            tu.setAttribute("checked", "checked");
        }if(sandwich.meat[1][0] == "Chicken"){
            ch.setAttribute("checked", "checked");
        }if(sandwich.meat[1][1] == "Chicken"){
            ch.setAttribute("checked", "checked");
        }if(sandwich.meat[1][2] == "Chicken"){
            ch.setAttribute("checked", "checked");
        }if(sandwich.meat[1][3] == "Chicken"){
            ch.setAttribute("checked", "checked");
        }if(sandwich.meat[1][0] == "Pastrami"){
            pa.setAttribute("checked", "checked");
        }if(sandwich.meat[1][1] == "Pastrami"){
            pa.setAttribute("checked", "checked");
        }if(sandwich.meat[1][2] == "Pastrami"){
            pa.setAttribute("checked", "checked");
        }if(sandwich.meat[1][3] == "Pastrami"){
            pa.setAttribute("checked", "checked");
        }if(sandwich.meat[1][0] == "Beef Bacon"){
            bb.setAttribute("checked", "checked");
        }if(sandwich.meat[1][1] == "Beef Bacon"){
            bb.setAttribute("checked", "checked");
        }if(sandwich.meat[1][2] == "Beef Bacon"){
            bb.setAttribute("checked", "checked");
        }if(sandwich.meat[1][3] == "Beef Bacon"){
            bb.setAttribute("checked", "checked");
        }if(sandwich.meat[1][0] == "No Meat"){
            nm.setAttribute("checked", "checked");
        }

        if(sandwich.anyelse[1][0] == "Tomatoes"){
            tm.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][1] == "Tomatoes"){
            tm.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][2] == "Tomatoes"){
            tm.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][3] == "Tomatoes"){
            tm.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][0] == "Pickles"){
            pi.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][1] == "Pickles"){
            pi.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][2] == "Pickles"){
            pi.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][3] == "Pickles"){
            pi.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][0] == "Onions"){
            on.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][1] == "Onions"){
            on.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][2] == "Onions"){
            on.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][3] == "Onions"){
            on.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][0] == "Lettuce"){
            le.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][1] == "Lettuce"){
            le.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][2] == "Lettuce"){
            le.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][3] == "Lettuce"){
            le.setAttribute("checked", "checked");
        }if(sandwich.anyelse[1][0] == "No"){
            no.setAttribute("checked", "checked");
        }


        if(sandwich.cheese[1][0] == "Amercan Cheese"){
            ac.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][1] == "Amercan Cheese"){
            ac.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][2] == "Amercan Cheese"){
            ac.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][0] == "Monterey Jack Cheese"){
            mjc.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][1] == "Monterey Jack Cheese"){
            mjc.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][2] == "Monterey Jack Cheese"){
            mjc.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][0] == "Parmesan Cheese"){
            pc.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][1] == "Parmesan Cheese"){
            pc.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][2] == "Parmesan Cheese"){
            pc.setAttribute("checked", "checked");
        }if(sandwich.cheese[1][0] == "No Cheese"){
            nc.setAttribute("checked", "checked");
        }


        if(sandwich.condiments[1][0] == "Mayo"){
            mayo.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][1] == "Mayo"){
            mayo.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][2] == "Mayo"){
            mayo.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][3] == "Mayo"){
            mayo.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][0] == "Ketchup"){
            ke.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][1] == "Ketchup"){
            ke.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][2] == "Ketchup"){
            ke.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][3] == "Ketchup"){
            ke.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][0] == "Mustard"){
            must.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][1] == "Mustard"){
            must.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][2] == "Mustard"){
            must.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][3] == "Mustard"){
            must.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][0] == "Hot Sauce"){
            hs.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][1] == "Hot Sauce"){
            hs.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][2] == "Hot Sauce"){
            hs.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][3] == "Hot Sauce"){
            hs.setAttribute("checked", "checked");
        }if(sandwich.condiments[1][0] == "No Condiments"){
            noCon.setAttribute("checked", "checked");
        }

        var delivered = document.forms[0].delivery;
        for(var i=0; i<delivered.length; i++){
            if (delivered[i].value == "Delivery" && sandwich.delivery[1] == "Delivery"){
                delivered[i].setAttribute("checked", "checked");
            } else if(delivered[i].value == "Pick-Up" && sandwich.delivery[1] == "Pick-Up"){
                delivered[i].setAttribute("checked", "checked");
            }
        }
        getId("house").value = sandwich.house[1];
        getId("street").value = sandwich.street[1];
        getId("city").value = sandwich.city[1];
        getId("zip").value = sandwich.zip[1];
        getId("notes").value = sandwich.requests[1];

        save.removeEventListener("click", validate);

        getId("save").value = "Edit Sandwich";
        var editSave = getId("save");
        editSave.addEventListener("click", validate);
        editSave.key = this.key;
    }

    function validate(e){
        var getBreadColor = document.forms[0].elements.bread,
            breadColorArry = [],
            getBreadType = getId("bread"),
            getMeat = document.forms[0].elements.meat,
            meatArry = [],
            getOthers = document.forms[0].elements.other,
            othersArry = [],
            getCheese = document.forms[0].elements.cheese,
            cheeseArry = [],
            getCondiments = document.forms[0].elements.condiments,
            condimentsArry = [],
            getDelivery = document.forms[0].elements.delivery,
            deliveryArry = [],
            getHouseNumber = getId("house"),
            getStreet = getId("street"),
            getCity = getId("city"),
            getZipCode = getId("zip"),
            errMsgAry = []
        ;
        for(var i=0; i<getBreadColor.length;i++){
            var breadLi = getId(bread + "_" + i);
            if (breadLi.checked){
                breadColorArry.push(breadLi);
            }
        }
        if(breadColorArry.length === 0){
            var bcError = "Please choose White or Whole Wheat.";
            getBreadColor.style.border = #666;
            errMsgAry.push(bcError);
        }
        if(getBreadType === "What would you like?"){
            var btError = "Please choose the type of bread you would like."
            getBreadType.style.color = #666;
            errMsgAry.push(btError);
        }
        for(var j=0; j<getMeat.length;j++){
            var meatLi = getId(meat + "_" + j);
            if (meatLi.checked){
                meatArry.push(meatLi);
            }
        }
        if(meatArry.length === 0){
            var meatError = "Please choose some meat or select 'No Meat'.";
            getMeat.style.color = #666;
            errMsgAry.push(meatError);
        }
        for(var k=0; k<getOthers.length; k++){
            var othersLi = getId(other + "_" + k);
            if(othersLi.checked){
                othersArry.push(othersLi);
            }
        }
        if(othersArry.length === 0){
            var otherError = "Please choose some veggies or select 'No'.";
            getOthers.style.color = #666;
            errMsgAry.push(otherError);
        }
        for(var l=0; l<getCheese.length; l++){
            var cheeseLi = getId(cheese + "_" + l);
            if(cheeseLi.checked){
                cheeseArry.push(cheeseLi);
            }
        }
        if(cheeseArry.length === 0){
            var cheeseError = "Please select a cheese or select 'No Cheese'.";
            getCheese.style.color = #666;
            errMsgAry.push(cheeseError);
        }
        for(var m=0; m<getCondiments.length; m++){
            var condimentsLi = getId(condiments + "_" + m);
            if(condimentsLi.checked){
                condimentsArry.push(condimentsLi);
            }
        }
        if(condimentsArry.length === 0){
            var conError = "Please select some condiments or select 'No Condiments'.";
            getCondiments.style.color = #666;
            errMsgAry.push(conError);
        }
        for(var n=0; n<getDelivery.length; n++){
            var deliLi = getId(delivery + "_" + n);
            if(deliLi.checked){
                deliveryArry.push(deliLi);
            }
        }
       if(deliveryArry.length === 0){
            var deliError = "Please select how you will receive you order.";
            getDelivery.style.color = #666;
            errMsgAry.push(deliError);
        }
        if(del.checked){
            if(getHouseNumber === ""){
                var houseError = "Please enter your house number.";
                getHouseNumber.style.color = #666;
                errMsgAry.push(houseError)
            }if(getStreet === ""){
                var streetError = "Please enter your street.";
                getStreet.style.color = #666;
                errMsgAry.push(streetError);
            }if(getCity === ""){
                var cityError = "Please enter your street.";
                getCity.style.color = #666;
                errMsgAry.push(cityError);
            }if(getZipCode === ""){
                var zipError = "Please enter your zip code.";
                getZipCode.style.color = #666;
                errMsgAry.push(zipError)
            }
        }
        if(errMsgAry >=1){
            for(var o=0, p=errMsgAry.length; o<p; o++){
                var createErrorLi = document.createElement("li");
                createErrorLi.innerHTML = errMsgAry[i];
                errMsg.appendChild(createErrorLi);
            }
        }
        e.preventDefault();
        return false;
    }   

    // condiment values
        // mayo
    function mayoValue(){
        if(mayo.checked){
            condiment.push(mayo.value)
        }
    }
        // ketchup
    function ketchupValue(){
        if (ke.checked){
            condiment.push(ke.value)
        }
    }
        // mustard
    function mustardValue(){
        if (must.checked){
            condiment.push(must.value)
        }
    }
        // hot sauce
    function hotSauceValue(){
        if (hs.checked){
            condiment.push(hs.value)
        }
    }
        // no condiment
    function noCondimentsValue(){
        if (noCon.checked) {
            condiment.push(noCon.value)
        }
    }

    // getting cheese values
        // american cheese
    function americanValue(){
        if(ac.checked){
            cheese.push(ac.value)
        }
    }
        // monterey jack cheese
    function montereyJackValue(){
        if (mjc.checked){
            cheese.push(mjc.value)
        }
    }
        // parmesan cheese
    function parmesanValue(){
        if (pc.checked){
            cheese.push(pc.value)
        }
    }
        // no cheese
    function noCheeseValue(){
        if (nc.checked) {
            cheese.push(nc.value)
        }
    }
    
    // getting veggie values
        //tomato
    function tomatoValue(){
        if(tm.checked){
            other.push(tm.value)
        }
    }
        //pickle
    function pickleValue(){
        if (pi.checked){
            other.push(pi.value)
        }
    }
        //onion
    function onionValue() {
        if (on.checked){
            other.push(on.value)
        }
    }
        //lettuce
    function lettuceValue(){
        if (le.checked) {
            other.push(le.value)
        }
    }
        //no thanks
    function noValue(){
        if (no.checked) {
            other.push(no.value)
        }
    }
    
    //getting meat values
            //turkey
    function turkeyValue() {
        if(tu.checked){
            meat.push(tu.value)
        }
    }
            //chicken
    function chickenValue(){
        if(ch.checked){
            meat.push(ch.value)
        }
    }
            //pastrami
    function pastramiValue(){
        if(pa.checked){
            meat.push(pa.value)
        }
    }
            //beef bacon
    function beefbaconValue(){
        if(bb.checked){
            meat.push(bb.value)
        }
    }
            //no meat
    function noMeatValue(){
        if(nm.checked){
            meat.push(nm.value)
        }
    }

    
    function selectDelivery(){
        var delivered = document.forms[0].delivery;
        for(var i=0; i<delivered.length; i++) {
            if (delivered[i].checked){
                delValue = delivered[i].value;
            }
        }
    }
    
    function selectedBreadColor(){
        var breadColor = document.forms[0].bread;
        for(var i=0; i<breadColor.length; i++) {
            if (breadColor[i].checked){
                bcValue = breadColor[i].value;
            }
        }
    }
   
    function makeBread(){
        var form = document.getElementsByTagName("form"),
            selectLi = getId("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "bread");
        for (var i=0, j=breadType.length; i<j; i++){
            var makeOption = document.createElement("option");
            var optText = breadType[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    };

        // Bread Type Select Field
    var breadType = ["What would you like?", "Hero", "Roll", "Bagel", "Sliced Bread", "Hamburger Buns"];

    function tuslRange() {
       if (tu.checked) {
           tusl.style.display = "inline"
       } else {
           tusl.style.display = "none"
       }
    };
    
    function chslRange() {
       if (ch.checked) {
           chsl.style.display = "inline"
       } else {
           chsl.style.display = "none"
       }
    };
    
    function paslRange() {
       if (pa.checked) {
           pasl.style.display = "inline"
       } else {
           pasl.style.display = "none"
       }
    };
    
    function bbslRange() {
       if (bb.checked) {
           bbsl.style.display = "inline"
       } else {
           bbsl.style.display = "none"
       }
    };

    function noMeat() {
        if (nm.checked) {
            tu.setAttribute("disabled", "disabled"),
            ch.setAttribute("disabled", "disabled"),
            pa.setAttribute("disabled", "disabled"),
            bb.setAttribute("disabled", "disabled")
        } else {
            tu.removeAttribute("disabled", "disabled"),
            ch.removeAttribute("disabled", "disabled"),
            pa.removeAttribute("disabled", "disabled"),
            bb.removeAttribute("disabled", "disabled")
        }
    };
    
    function tmslRange() {
       if (tm.checked) {
           tmsl.style.display = "inline"
       } else {
           tmsl.style.display = "none"
       }
    };
    
    function pislRange() {
       if (pi.checked) {
           pisl.style.display = "inline"
       } else {
           pisl.style.display = "none"
       }
    };
    
    function onslRange() {
       if (on.checked) {
           onsl.style.display = "inline"
       } else {
           onsl.style.display = "none"
       }
    };
    
    function nothing() {
        if (no.checked) {
            tm.setAttribute("disabled", "disabled"),
            pi.setAttribute("disabled", "disabled"),
            on.setAttribute("disabled", "disabled"),
            le.setAttribute("disabled", "disabled")
        } else {
            tm.removeAttribute("disabled", "disabled"),
            pi.removeAttribute("disabled", "disabled"),
            on.removeAttribute("disabled", "disabled"),
            le.removeAttribute("disabled", "disabled")
        }
    };
    
    function acslRange() {
       if (ac.checked) {
           acsl.style.display = "inline"
       } else {
           acsl.style.display = "none"
       }
    };
    
    function mjcslRange() {
       if (mjc.checked) {
           mjcsl.style.display = "inline"
       } else {
           mjcsl.style.display = "none"
       }
    };
    
    function pcslRange() {
       if (pc.checked) {
           pcsl.style.display = "inline"
       } else {
           pcsl.style.display = "none"
       }
    };
    
    function noCheese() {
        if (nc.checked) {
            ac.setAttribute("disabled", "disabled"),
            mjc.setAttribute("disabled", "disabled"),
            pc.setAttribute("disabled", "disabled")
        } else {
            ac.removeAttribute("disabled", "disabled"),
            mjc.removeAttribute("disabled", "disabled"),
            pc.removeAttribute("disabled", "disabled")
        }
    };

    function noCondiments() {
        if (noCon.checked) {
            mayo.setAttribute("disabled", "disabled"),
            ke.setAttribute("disabled", "disabled"),
            must.setAttribute("disabled", "disabled"),
            hs.setAttribute("disabled", "disabled")
        } else {
            mayo.removeAttribute("disabled", "disabled"),
            ke.removeAttribute("disabled", "disabled"),
            must.removeAttribute("disabled", "disabled"),
            hs.removeAttribute("disabled", "disabled")
        }
    };
    
    function pickUp() {
        if (pu.checked) {
            h.style.display = "none",
            st.style.display = "none",
            city.style.display = "none",
            zip.style.display = "none",
            notes.style.display = "none",
            addressForm.style.display = "none"
        } else if (del.checked){
            h.style.display = "inline-block",
            st.style.display = "inline-block",
            city.style.display = "inline-block",
            zip.style.display = "inline-block",
            notes.style.display = "inline-block",
            addressForm.style.display = "inline-block"
        }
    };
    
    makeBread();
    tu.addEventListener("click", tuslRange);
    ch.addEventListener("click", chslRange);
    pa.addEventListener("click", paslRange);
    bb.addEventListener("click", bbslRange);
    nm.addEventListener("click", noMeat);
    tm.addEventListener("click", tmslRange);
    pi.addEventListener("click", pislRange);
    on.addEventListener("click", onslRange);
    no.addEventListener("click", nothing);
    ac.addEventListener("click", acslRange);
    mjc.addEventListener("click", mjcslRange);
    pc.addEventListener("click", pcslRange);
    nc.addEventListener("click", noCheese);
    noCon.addEventListener("click", noCondiments);
    pu.addEventListener("click", pickUp);
    del.addEventListener("click", pickUp);
    tu.addEventListener("click", turkeyValue);
    ch.addEventListener("click", chickenValue);
    pa.addEventListener("click", pastramiValue);
    bb.addEventListener("click", beefbaconValue);
    nm.addEventListener("click", noMeatValue);
    tm.addEventListener("click", tomatoValue);
    pi.addEventListener("click", pickleValue);
    on.addEventListener("click", onionValue);
    le.addEventListener("click", lettuceValue);
    no.addEventListener("click", noValue);
    ac.addEventListener("click", americanValue);
    mjc.addEventListener("click", montereyJackValue);
    pc.addEventListener("click", parmesanValue);
    nc.addEventListener("click", noCheeseValue);
    mayo.addEventListener("click", mayoValue);
    ke.addEventListener("click", ketchupValue);
    must.addEventListener("click", mustardValue);
    hs.addEventListener("click", hotSauceValue);
    noCon.addEventListener("click", noCondimentsValue);
    displayData.addEventListener("click", validate);
    save.addEventListener("click", storeData);
    clear.addEventListener("click", clearData);
    
});