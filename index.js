alert("Für alle Infos: h");
//alle p element unter v. p
var p = document.getElementsByTagName("p");
var zug = 2;
var spieler = 0;
var runden = 0;
var letzterBegriff = [];
var letzteKarte = [];
var letzteId;
var punkte1 = 0;
var punkte2 = 0;
var paare = [];
//bergriffmöglichkeiten
var moeglichkeiten = ["Bus", "Auto", "Fahrrad", "Flugzeug", "Zug", "Boot", "U-Boot", "Rakete", "Motorrad", "LKW", "Roller", "Moppet", "Jet", "Raumschiff", "Heißluftballong", "Dreirad", "U-Bahn", "Schwebebahn", "Seilbahn", "Sesselbahn", "Kran", "Bagger", "Traktor", "Mähdräscher", "Walze", "Teermaschine", "Propellerflugzeug", "Hubschrauber"];
//verwendete begriffe
var genutzt = [];
var kopieGenutzt = [];
//beim laden...
function zuweisen() {
    //jede Karte bekommt eine id von 0 bis 8
    for (let i = 0; i < p.length; i++) {
        p[i].setAttribute("id", i)
    }
    //wenn es mehr Karten als Begriffe gibt
    if (p.length > moeglichkeiten.length) {
        alert("Es gibt zu viele Karten")
    }
    console.log("Es gibt " + moeglichkeiten.length + " Möglickkeiten")
    //wiedrholt sich p.länge mal
    for (let i = 0; i < (p.length); i++) {
        if (i < (p.length / 2)) {
            //zufallszahl
            var zufall = Math.round(Math.random() * (moeglichkeiten.length - 1));
            //begriff kommt in genutzt und in kopie
            genutzt.push(moeglichkeiten[zufall])
            kopieGenutzt.push(moeglichkeiten[zufall])
            //begriff wird von moeglichkeiten gelöscht
            moeglichkeiten.splice(zufall, 1)
        } else {
            //zufallszahl
            zufall = Math.round(Math.random() * (kopieGenutzt.length - 1))
            //begriff aus kopie kommt in genutzt
            genutzt.push(kopieGenutzt[zufall])
            //begriff kommt aus kopie
            kopieGenutzt.splice(zufall, 1);
        }
/*     p[i].innerHTML = genutzt[i]
 */  }
    console.log("Die Begriffe sind: " + genutzt)
}
//wenn das Spielfeld gedrückt wird
function karte(event) {
    //id des elementes unter "id"
    id = event.target.id;
    //wenn element gedrückt, dann... ƒ_spielen mit wert der "id"
    event.target.addEventListener("click", spielen(id))

}
function spielen(id) {
    //karte wird definiert
    var karte = event.target;
    if (paare.indexOf(genutzt[id]) == -1) {
        //wenn eine Karte geklickt wurde
        if (id != "keineKarte" && id != letzteId) {
            //nur zuweisungen und ausgeben von werten in der console: 
            zug++;
            if (zug < 2) {
                console.log("1")
            }
            else {
                zug = 0;
                spieler++;
                if (spieler > 2) {
                    spieler = 1;

                } for (let i = 0; i < p.length; i++) {
                    document.getElementById(i).innerHTML = "";
                }
                letzterBegriff.splice(0, 2);
                letzteKarte.splice(0, 2)
                runden++;
            }
            //eigentliches spiel:
            //karte aufdecken
            karte.innerHTML = genutzt[id];
            //wenn karte schon einmal aufgedeckt von Spieler 1, dann...
            if (letzterBegriff.indexOf(genutzt[id]) > -1 && spieler == 1) {
                //punkte 1 ++
                punkte1++;
                //innerHTML löschen
                karte.removeChild(karte.childNodes[0]);
                letzteKarte[0].removeChild(letzteKarte[0].childNodes[0])
                //Karten in paare einfügen
                paare.push(genutzt[id])
                //hintergrund = blau
                karte.style.backgroundColor = "blue";
                letzteKarte[0].style.backgroundColor = "blue"
                //wenn karte schon einmal aufgedeckt von Spieler 2, dann...
            } if (letzterBegriff.indexOf(genutzt[id]) > -1 && spieler == 2) {
                //punkte 1 ++
                punkte2++;
                //innerHTML löschen

                karte.removeChild(karte.childNodes[0]);
                letzteKarte[0].removeChild(letzteKarte[0].childNodes[0])
                //innerHTML löschen

                paare.push(genutzt[id])
                //hintergrund = blau
                karte.style.backgroundColor = "green";
                letzteKarte[0].style.backgroundColor = "green"
            }
            //werte in arrays einfügen
            letzterBegriff.push(genutzt[id])
            letzteKarte.push(karte);
            letzteId = id;
        }
    }
    //wenn paare = p.länge/2
    if (paare.length == (p.length / 2)) {
        //punkte
        alert("Punkte: " + punkte1 + " : " + punkte2);
        //fragen, ob weiterspielen
        if (confirm("Wollen Sie noch einmal spielen?")) {
            window.location.assign("file:///C:/Users/mikar/Documents/coding/spiele/memory/index.html")
        }
    }
    //ausgabe console:
    console.log("Runde: " + runden + "." + zug)
    console.log("Id Karte: " + id);
    console.log("Zug: " + zug);
    console.log("Spieler: " + spieler)
    console.log("Letze Karte: " + letzterBegriff)
    console.log("Punkte: " + punkte1 + " : " + punkte2);
    console.log("Paare: " + paare)
}
function taste(event) {
    var taste = event.keycode || event.which;
    console.log(taste)
    if (taste == "104") {
        alert("Runde: " + runden + "\nSpieler: " + spieler + "\nPunkte: " + punkte1 + " : " + punkte2 + "\nPaare: " + paare + "\nUm das Spiel neu zu laden drücken Sie die leertaste oder laden Sie das Spiel oben links neu")
    }
    if (taste == "32") {
        window.location.assign("file:///C:/Users/mikar/Documents/coding/spiele/memory/index.html")
    }
}