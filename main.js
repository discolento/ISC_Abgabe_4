
let fullBeerList = [];
displayBeer()

// Diese Funktion wird ausgeführt, sobald die Seite geladen wurde
function displayBeer() {
    const beerContainer = document.getElementById("beerContainer")
    const url = "https://api.punkapi.com/v2/beers"; // Die URL der API, die die Biere liefert

    fetch(url) // Abrufen der Daten von der API mit fetch
        .then(response => response.json())
        .then(data => {
            fullBeerList = data; // Speichern der vollständigen Liste der Biere in das vorgegebene Array
            const beerHtml = data.map(generateBeerHtml).join('');//  Generieren des HTML-Codes für jedes Bier und Zusammenfügen in eine einzige Zeichenkette => Hilfestellung: data.map(generateBeerHtml).join('')
            beerContainer.innerHTML = beerHtml;    // Fügen des HTML-Codes zur beerContainer-Div-Box hinzu
            console.log(fullBeerList);
        })
        .catch(error => console.log(error))
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
        <img src="${beer.image_url}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${beer.name}</h5>
            <div class="card-text">
                <p>${beer.tagline}</p>
            </div>
        </div>
        <div class="card-footer">
          <a class="btn btn-dark btn-sm details-link" data-beer-id="${beer.id}">weitere Details</a>
        </div>
    </div>
  </section>
`;

// Event-Listener für Details-Links
document.addEventListener('click', event => {
    if (event.target.matches('.details-link')){// Überprüfen, ob das geklickte Element ein Details-Link ist
        event.preventDefault();// ToDo
        const beerId = event.target.getAttribute('data-beer-id') // Speichern sie die data-beer-id in eine Konstante und rufen sie die
        getBeerDetails(beerId); // Funktion getBeerDetails mit der Konstante als Übergabeparameter auf

    };
});

// Diese Funktion zeigt die Details eines Biers in einem Modal-Fenster an
function getBeerDetails(beerId) {
    const beer = fullBeerList.find(beer => {
        console.log(beer.id, "=", beerId, beer.id === beerId, beer.id == beerId)
        return beer.id === +beerId
    });/* Speichern Sie das Objekt aus der fullBeerList an der Stelle der ID die als Übergabeparameter
       übergeben wird in die const beer die Sie hier definieren */
    console.log(beer)// ToDo
    /* Das HTML-Code für das Modal-Fenster mit den Details des Biers
       Fügen Sie die korrekten Daten mit ${beer.bsp} aus dem Objekt ein überall wo <!-- ToDo: ... --> steht */
    const modalHtml = `
        <div class="modal fade" id="beerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${beer.name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row row-cols-2 g-4">
                            <div>
                                <img src="${beer.image_url}" class="img-fluid mb-3">
                                <div class="d-flex justify-content-center">
                                    <div class="px-2">
                                        <p><b>Ingredients: Malt</b></p>
                                        <ul>
                                           ${beer.ingredients.malt.map(malt => `<li> ${malt.name}</li>`).join('')}<!-- ToDo: malt name => Hinweis map! Ausgabe in <li> nicht vergessen -->
                                        </ul>
                                    </div>
                                    <div class="px-2">
                                        <p><b>Ingredients: Hops</b></p>
                                        <ul>
                                           ${beer.ingredients.hops.map(hops => `<li> ${hops.name}</li>`).join('')}<!-- ToDo: hops name => Hinweis map! Ausgabe in <li> nicht vergessen -->
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <table class="table">
                                    
                                    <tbody>
                                    <tr>
                                        <td>First Brewed</td>
                                        <td>${beer.first_brewed}</td>
                                    </tr>
                                    <tr>
                                        <td>Volume</td>
                                        <td>${beer.volume.value} ${beer.volume.unit}</td>
                                    </tr>
                                    <tr>
                                        <td>Boil Volume</td>
                                        <td>${beer.boil_volume.value} ${beer.boil_volume.unit}</td>
                                    </tr>
        
                                    <tr>
                                        <td>Mash Temperatures</td>
                                        <td>
                                            <ul>
                                                ${beer.method.mash_temp.map(mash_temp => `<li>${mash_temp.temp.value} ${mash_temp.temp.unit} for ${mash_temp.duration ?? "unknown"} minutes</li>`).join('') }
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fermentation</td>
                                        <td>${beer.method.fermentation.temp.value} ${beer.method.fermentation.temp.unit}<!--ToDo: Methods fermentation Temp value--> <!--ToDo: Methods fermentation Temp Unit--></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <p><b>Food Pairing</b></p>
                                <ul>
                                   ${beer.food_pairing.map(pairing => `<li>${pairing}</li>`).join('')} <!--ToDo: food pairing => Hinweis map! Ausgabe in <li> nicht vergessen-->
                                </ul>
                            </div>
                        </div>
                        <p>
                        <b>Description: </b> ${beer.description}
                        </p>
                        <p>
                        <b>Brewer's Tip: </b> ${beer.brewers_tips}
                        </p>
                    </div>
                    <div class="modal-footer">
                        <p><small>${beer.contributed_by}</small></p>
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

