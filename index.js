document.addEventListener("DOMContentLoaded", () => {
    fetch("texto.xml")
        .then(response => response.text())
        .then(xmlTexto => {
            const parser = new DOMParser();
            const textoXML = parser.parseFromString(xmlTexto, "text/xml");
        })
    function pasarAXML(){

    }
}