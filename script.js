// 1. TIMING DELLA LANDING PAGE (2 SECONDI)
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('ready');
    }, 2000);
});

// 2. SISTEMA TRADUZIONE E FONT ASEMICO
function changeLang(lang) {
    const body = document.body;
    
    if (lang === 'asemic') {
        body.classList.add('asemic-mode');
        return; 
    }
    
    body.classList.remove('asemic-mode');
    const elements = document.querySelectorAll('[data-ita]');
    
    elements.forEach(el => {
        if (lang === 'ita') el.textContent = el.getAttribute('data-ita');
        else if (lang === 'eng') el.textContent = el.getAttribute('data-eng');
    });
}

// 3. NAVIGATORI IN SCROLL + GESTIONE MODALITÀ NOTTURNA E PARALLASSE
const sections = document.querySelectorAll('.scroll-section');
const navLinks = document.querySelectorAll('.nav-link');
const parallaxBg = document.getElementById('parallax-intro-bg');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                else link.classList.remove('active');
            });

            // Spegne l'immagine parallasse se superiamo la prima parte
            if (id === 'introduzione' || id === 'parte-prima') {
                parallaxBg.style.opacity = "0.9";
            } else {
                parallaxBg.style.opacity = "0"; 
            }

            // Attivazione modalità scura
            if (entry.target.classList.contains('target-dark-zone')) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
}, { rootMargin: '-30% 0px -40% 0px' });

sections.forEach(section => observer.observe(section));

// 4. INIZIALIZZAZIONE MAPPA DARK
const map = L.map('map', {
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 1.0
}).setView([35, 10], 2);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Stadia Maps &copy; OpenStreetMap',
    minZoom: 2,
    maxZoom: 10
}).addTo(map);

// Icone
const whiteCircleIcon = L.divIcon({ className: 'custom-marker', iconSize: [16, 16], iconAnchor: [8, 8] });
const whiteTriangleIcon = L.divIcon({ className: 'custom-marker-triangle', iconSize: [20, 18], iconAnchor: [10, 18] });

// DATABASE SEGNAPOSTI CIRCOLARI (Luoghi)
const locations = [
    { name: "Milano, Italia", coords: [45.4642, 9.1900], img: "media/mappa/italia/1.jpg" },
    { name: "Madrid, Spagna", coords: [40.4168, -3.7038], img: "media/mappa/spagna/1.jpg" },
    { name: "Brno, Rep. Ceca", coords: [49.1951, 16.6068], img: "media/mappa/repubblicaceca/1.jpg" },
    { name: "Yuuki", coords: [35.6762, 139.6503], img: "media/mappa/giappone/1.jpg" },
    { name: "Ottawa, Canada", coords: [45.4215, -75.6972], img: "media/mappa/canada/1.jpg" },
    { name: "Pechino, Cina", coords: [39.9042, 116.4074], img: "media/mappa/cina/1.jpg" },
    { name: "Seoul, Corea del Sud", coords: [37.5665, 126.9780], img: "media/mappa/coreadelsud/1.jpg" },
    { name: "Bombay, India", coords: [19.0760, 72.8777], img: "media/mappa/india/1.jpg" },
    { name: "Islamabad, Pakistan", coords: [33.6844, 73.0479], img: "media/mappa/pakistan/1.jpg" },
    { name: "Praga, Repubblica Ceca", coords: [50.0755, 14.4378], img: "media/mappa/repubblicaceca/2.jpg" },
    { name: "San Pietroburgo, Russia", coords: [59.9343, 30.3351], img: "media/mappa/russia/1.jpg" },
    { name: "Bratislava, Slovacchia", coords: [48.1486, 17.1077], img: "media/mappa/slovacchia/1.jpg" },
    { name: "Taipei, Taiwan", coords: [25.0330, 121.5654], img: "media/mappa/taiwan/1.jpg" },
    { name: "Ankara, Turchia", coords: [39.9334, 32.8597], img: "media/mappa/turchia/1.jpg" },
    { name: "Hanoi, Vietnam", coords: [21.0285, 105.8542], img: "media/mappa/vietnam/1.jpg" },
    { name: "Cesena, Italia", coords: [44.1391, 12.2431], img: "media/mappa/italia/cesena.jpg" },
    { name: "Varese, Italia", coords: [45.8195, 8.8251], img: "media/mappa/italia/varese.jpg" },
    { name: "Imola, Italia", coords: [44.3531, 11.7142], img: "media/mappa/italia/imola1.jpg" },
    { name: "Forlì, Italia", coords: [44.2227, 12.0407], img: "media/mappa/italia/forli.jpg" },
    { name: "Cesenatico, Italia", coords: [44.2017, 12.4007], img: "media/mappa/italia/cesenatico.jpg" },
    { name: "Genova, Italia", coords: [44.4056, 8.9463], img: "media/mappa/italia/genova.jpg" },
    { name: "Firenze, Italia", coords: [43.7696, 11.2558], img: "media/mappa/italia/firenze.jpg" },
    { name: "Imola (2), Italia", coords: [44.3560, 11.7180], img: "media/mappa/italia/imola2.jpg" }
];

locations.forEach(loc => {
    const popupContent = `<div><h3>${loc.name}</h3><img src="${loc.img}" alt="${loc.name}"></div>`;
    L.marker(loc.coords, { icon: whiteCircleIcon }).addTo(map).bindPopup(popupContent, { maxWidth: 250 });
});

// DATABASE SEGNAPOSTI A TRIANGOLO (Artisti)
const triangleLocations = [
    { title: "Tao Magico", place: "Cina", coords: [39.9042, 116.4074], img: "media/triangoli/taomagico.jpg" },
    { title: "Mir Imad", place: "Iran", coords: [32.6546, 51.6680], img: "media/triangoli/mirimad.png" },
    { title: "Paul Klee", place: "Berna, Svizzera", coords: [46.9480, 7.4474], img: "media/triangoli/klee.png" },
    { title: "Max Ernst", place: "Parigi, Francia", coords: [48.8566, 2.3522], img: "media/triangoli/ernst.jpg" },
    { title: "Bruno Munari", place: "Milano, Italia", coords: [45.4642, 9.1900], img: "media/triangoli/munari.jpg" },
    { title: "Mark Tobey", place: "Svizzera", coords: [46.8182, 8.2275], img: "media/triangoli/tobey.jpg" },
    { title: "Saul Steinberg", place: "NYC, USA", coords: [40.7128, -74.0060], img: "media/triangoli/steinberg.jpg" },
    { title: "Leon Ferrari", place: "Buenos Aires, Argentina", coords: [-34.6037, -58.3816], img: "media/triangoli/ferrari.jpg" },
    { title: "Christian Dotremont", place: "Belgio", coords: [50.8503, 4.3517], img: "media/triangoli/dotremont.jpg" },
    { title: "Bernard Réquichot", place: "Francia", coords: [46.2276, 2.2137], img: "media/triangoli/requichot.jpg" },
    { title: "Ahmed Shibrain", place: "Sudan", coords: [15.5007, 32.5599], img: "media/triangoli/shibrain.png" },
    { title: "Irma Blank", place: "Milano, Italia", coords: [45.4650, 9.1910], img: "media/triangoli/blank.jpg" },
    { title: "Marta Dermisache", place: "Buenos Aires, Argentina", coords: [-34.6050, -58.3830], img: "media/triangoli/dermisache.jpg" },
    { title: "Made Wianta", place: "Indonesia", coords: [-0.7893, 113.9213], img: "media/triangoli/wianta.gif" },
    { title: "Wenda Gu", place: "Cina", coords: [31.2304, 121.4737], img: "media/triangoli/gu.jpg" },
    { title: "Francesca Biasetton", place: "Genova, Italia", coords: [44.4056, 8.9463], img: "media/triangoli/biasetton.jpg" },
    { title: "Marco Campedelli", place: "Vicenza, Italia", coords: [45.5455, 11.5347], img: "media/triangoli/campedelli.jpg" },
    { title: "Patrick Collier", place: "Oregon, USA", coords: [43.8041, -120.5542], img: "media/triangoli/collier.jpg" },
    { title: "Creighton Richard", place: "Greensboro, USA", coords: [36.0726, -79.7930], img: "media/triangoli/creighton.jpg" },
    { title: "Matox", place: "Porto, Portogallo", coords: [41.1579, -8.6291], img: "media/triangoli/matox.jpg" },
    { title: "Ross Ford", place: "Carrboro, USA", coords: [35.9101, -79.0753], img: "media/triangoli/ross.jpg" },
    { title: "Tim Gaze", place: "Australia", coords: [-25.2744, 133.7751], img: "media/triangoli/gaze.webp" },
    { title: "Losada Ariel Gonzales", place: "Buenos Aires, Argentina", coords: [-34.6070, -58.3850], img: "media/triangoli/gonzales.jpg" },
    { title: "Michael Jacobson", place: "Minneapolis, USA", coords: [44.9778, -93.2650], img: "media/triangoli/jacobson.jpg" },
    { title: "Thomas Ingmire", place: "Indiana, USA", coords: [40.2672, -86.1349], img: "media/triangoli/ingmire.jpg" },
    { title: "Satu Kaikkonen", place: "Finlandia", coords: [61.9241, 25.7482], img: "media/triangoli/kaikkonen.jpg" },
    { title: "Rachid Koraichi", place: "Algeria", coords: [28.0339, 1.6596], img: "media/triangoli/koraichi.jpg" },
    { title: "Monica Dengo", place: "Arezzo, Italia", coords: [43.4633, 11.8781], img: "media/triangoli/dengo.png" },
    { title: "Edward Kulemin", place: "Yaroslavl, Russia", coords: [57.6261, 39.8845], img: "media/triangoli/kulemin.jpg" },
    { title: "Jim Leftwitch", place: "Charlottesville, USA", coords: [38.0293, -78.4767], img: "media/triangoli/leftwitch.jpeg" },
    { title: "Kumizo Matsumoto", place: "Giappone", coords: [35.6762, 139.6503], img: "media/triangoli/kunizo.jfif" },
    { title: "Quang Thang Nguyen", place: "Vietnam", coords: [21.0285, 105.8542], img: "media/triangoli/nguyen.jpg" },
    { title: "Luigi Serafini", place: "Firenze, Italia", coords: [43.7696, 11.2558], img: "media/triangoli/serafini.jpg" },
    { title: "Christopher Skinner", place: "King's Lynn, UK", coords: [52.7512, 0.4009], img: "media/triangoli/skinner.gif" },
    { title: "Jay Snodgrass", place: "Tallahassee, USA", coords: [30.4383, -84.2807], img: "media/triangoli/snodgrass.jpg" },
    { title: "Martina Stella", place: "Trieste, Italia", coords: [45.6495, 13.7768], img: "media/triangoli/stella.png" },
    { title: "Lina Stern", place: "Ucraina", coords: [48.3794, 31.1656], img: "media/triangoli/stern.jpg" },
    { title: "Federico Federici", place: "L'Aquila, Italia", coords: [42.3498, 13.3995], img: "media/triangoli/federici.jpg" },
    { title: "Ulfert Wilke", place: "Germania", coords: [51.1657, 10.4515], img: "media/triangoli/wilke.jpg" },
    { title: "Kosrof Wosene Worke", place: "Etiopia", coords: [9.1450, 40.4896], img: "media/triangoli/worke.webp" },
    { title: "Ásgrímur Kuldaboli Þórhallsson", place: "Islanda", coords: [64.9631, -19.0208], img: "media/triangoli/thorhallsson.jpg" },
    { title: "Marco Giovenale", place: "Roma, Italia", coords: [41.9028, 12.4964], img: "media/triangoli/giovenale.png" },
    { title: "Roland Barthes", place: "Parigi, Francia", coords: [48.8575, 2.3510], img: "media/triangoli/barthes.jpg" }
];

triangleLocations.forEach(loc => {
    const popupContent = `<div><h3>${loc.title}</h3><p style="font-size:11px; color:#aaa; margin-bottom:8px; font-style:italic;">${loc.place}</p><img src="${loc.img}" alt="${loc.title}"></div>`;
    L.marker(loc.coords, { icon: whiteTriangleIcon }).addTo(map).bindPopup(popupContent, { maxWidth: 250 });
});

// 5. CARICAMENTO IMMAGINE CON ANTEPRIMA
const uploader = document.getElementById('image-uploader');
const preview = document.getElementById('image-preview');
const uploadText = document.getElementById('upload-text');
let userImageBase64 = "";

uploader.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            userImageBase64 = event.target.result;
            preview.src = userImageBase64;
            preview.style.display = 'block';
            uploadText.style.display = 'none';
        }
        reader.readAsDataURL(file);
    }
});

// 6. GEOLOCALIZZAZIONE IN TEMPO REALE DA FORM A MAPPA
const userForm = document.getElementById('user-form');

userForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const locationInput = document.getElementById('form-location').value;
    const notes = document.getElementById('form-notes').value;

    if (!userImageBase64) {
        alert("Per favore, carica un'immagine prima di inviare!");
        return;
    }

    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}&limit=1`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);

                const userPopupContent = `
                    <div>
                        <h3>Opere di: ${name}</h3>
                        <p style="font-size:11px; color:#aaa; margin-bottom:4px; font-style:italic;">Provenienza: ${locationInput}</p>
                        ${notes ? `<p style="font-size:12px; margin-bottom:8px;">"${notes}"</p>` : ''}
                        <img src="${userImageBase64}" alt="Opera utente">
                    </div>
                `;

                const newUserMarker = L.marker([lat, lon], { icon: whiteCircleIcon }).addTo(map);
                newUserMarker.bindPopup(userPopupContent, { maxWidth: 250 }).openPopup();

                map.setView([lat, lon], 6, { animate: true, duration: 1.5 });

                userForm.reset();
                preview.style.display = 'none';
                preview.src = "";
                uploadText.style.display = 'block';
                userImageBase64 = "";

                alert("La tua opera è stata geolocalizzata ed inserita nell'atlante globale!");
            } else {
                alert("Non siamo riusciti a trovare questa località sulla mappa. Prova a scriverla in modo più specifico (es. Città, Paese).");
            }
        })
        .catch(error => {
            console.error("Errore di geocodifica:", error);
            alert("Si è verificato un errore durante la geolocalizzazione. Riprova.");
        });
});

// 7. NUOVO: GESTIONE COMPATTA DEL LIGHTBOX (APERTURA/CHIUSURA FOTO)
const lightbox = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

// Apri Lightbox al click sulle foto abilitate
document.querySelectorAll('.lightbox-target').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

// Chiudi Lightbox cliccando la croce o lo sfondo scuro circostante
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.classList.remove('active');
    }
});