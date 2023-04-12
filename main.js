
let fullBeerList = [];
displayBeer()

// Diese Funktion wird ausgeführt, sobald die Seite geladen wurde
function displayBeer() {
    // Die URL der API, die die Biere liefert
    const url = `https://api.punkapi.com/v2/beers`;

    // Abrufen der Daten von der API mit fetch
        // ToDo

    // Speichern der vollständigen Liste der Biere in das vorgegebene Array
        // ToDo

    // Generieren des HTML-Codes für jedes Bier und Zusammenfügen in eine einzige Zeichenkette => Hilfestellung: data.map(generateBeerHtml).join('')
        // ToDo

    // Fügen des HTML-Codes zur beerContainer-Div-Box hinzu
        // ToDo
}

/* Diese Funktion generiert den HTML-Code für ein einzelnes Bier
   Ersetze die Angaben <!--ToDo--> mit den korrekten Werten ${}
    1.: Bild
    2.: Biername
    3.: Tagline
    4.: Id
 */

const generateBeerHtml = beer => `
  <section class="col">
    <div class="card">
        <img src="<!--ToDo-->" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title"><!--ToDo--></h5>
            <div class="card-text">
                <p><!--ToDo--></p>
            </div>
        </div>
        <div class="card-footer">
          <a class="btn btn-dark btn-sm details-link" data-beer-id="<!--ToDo-->">weitere Details</a>
        </div>
    </div>
  </section>
`;

// Event-Listener für Details-Links
document.addEventListener('click', event => {
    // Überprüfen, ob das geklickte Element ein Details-Link ist
    // ToDo

        /* Speichern sie die data-beer-id in eine Konstante und rufen sie die
         Funktion getBeerDetails mit der Konstante als Übergabeparameter auf */
        // ToDo

});

// Diese Funktion zeigt die Details eines Biers in einem Modal-Fenster an
function getBeerDetails(beerID) {
    /* Speichern Sie das Objekt aus der fullBeerList an der Stelle der ID die als Übergabeparameter
       übergeben wird in die const beer die Sie hier definieren */
    // ToDo

    /* Das HTML-Code für das Modal-Fenster mit den Details des Biers
       Fügen Sie die korrekten Daten mit ${beer.bsp} aus dem Objekt ein überall wo <!-- ToDo: ... --> steht */
    const modalHtml = `
        <div class="modal fade" id="beerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><!--ToDo: Name--></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row row-cols-2 g-4">
                            <div>
                                <img src="<!--ToDo: Image-->" class="img-fluid mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="px-2">
                                        <p><b>ingredients: malt</b></p>
                                        <ul>
                                           <!-- ToDo: malt name => Hinweis map! Ausgabe in <li> nicht vergessen -->
                                        </ul>
                                    </div>
                                    <div class="px-2">
                                        <p><b>ingredients: hops</b></p>
                                        <ul>
                                           <!-- ToDo: hops name => Hinweis map! Ausgabe in <li> nicht vergessen -->
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">#</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>first brewed</td>
                                        <td><!--ToDo: first brew--></td>
                                    </tr>
                                    <tr>
                                        <td>Volumne</td>
                                        <td><!--ToDo: Volumne Value--> <!--ToDo: Unit--></td>
                                    </tr>
                                    <tr>
                                        <td>boil volume</td>
                                        <td><!--ToDo: Boil Value--> <!--ToDo: Boil Unit--></td>
                                    </tr>
        
                                    <tr>
                                        <td>methods</td>
                                        <td><!--ToDo: Methods Mash Temp value--> <!--ToDo: Methods Mash Temp Unit--></td>
                                    </tr>
                                    <tr>
                                        <td>fermentation</td>
                                        <td><!--ToDo: Methods fermentation Temp value--> <!--ToDo: Methods fermentation Temp Unit--></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <p><b>Food Pairing</b></p>
                                <ul>
                                    <!--ToDo: food pairing => Hinweis map! Ausgabe in <li> nicht vergessen-->
                                </ul>
                            </div>
                        </div>
                        <p>
                        <!--ToDo: brewers tip-->
                        </p>
                    </div>
                    <div class="modal-footer">
                        <p><small><!--ToDo: contributed by--></small></p>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;


    // Ab hier muss nichts verändert werden!!
    // --------------------------------------
    // Hier wird ein DOM-Element aus dem Modal-HTML erstellt
    const modalElement = document.createRange().createContextualFragment(modalHtml);

    // Hier wird div-Box geholt, in die das Modal eingefügt werden soll
    const modalContainer = document.getElementById('modalContainer');

    // Hier wird das Modal-Element als Kind der div-Box hinzugefügt
    modalContainer.appendChild(modalElement);

    // Hier wird das Modal-Element geholt
    const modal = document.getElementById('beerModal');

    // Hier wird das Modal angezeigt
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();

    // Hinzufügen eines Event-Listeners, um das Modal zu leeren, wenn es geschlossen wird
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

