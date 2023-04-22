const url = "https://digimon-api.vercel.app/api/digimon";

fetch(url)
    .then(res => res.json())
    .then(data => tabla (data))
    .catch(err => console.log(err));

function tabla(datos) {
    let cuerpoTabla = document.querySelector('#cuerpoTabla');
   
    for (let i = 0; i < datos.length; i = i + 1) {
        let fila = document.createElement('tr');
        let columnaUno = document.createElement('td');
        let columnaDos = document.createElement('td');
        let columnaTres = document.createElement('td');
        columnaUno.innerHTML = datos[i].name;
        columnaDos.innerHTML = datos[i].level;
        columnaTres.innerHTML = `<img style="width: 80px;" src="${datos[i].img}"/>`;
        fila.append(columnaUno, columnaDos, columnaTres);
        cuerpoTabla.append(fila);
    }

    //defino el boton de buscador con el evento onclick
    let buscador = document.getElementById('buscador');
    buscador.onclick = buscarDigi; //al ser presionado va a la funcion buscarDigi()
    
    function buscarDigi() {
        //defini el valor a buscar del input con el id buscar.
        let buscar = document.getElementById('buscar').value;
        fetch(url+'/name/'+buscar)
        .then(res => res.json())
        .then(data => mostrarDigi(data))
        .catch(err => console.log(err));
    }

    //Modal
    let myModal = new bootstrap.Modal(document.getElementById('myModal'));

    function mostrarDigi(datos) {
        if(datos.ErrorMsg){
            alert("Lo sentimos, no se encontraron resultados");
            throw Error(datos.ErrorMsg);
        }
        myModal.show();
        let nombreDigimon = document.getElementById('digi-name');
        let levelDigimon = document.getElementById('digi-level');
        let imgDigimon = document.getElementById('digi-img');
        nombreDigimon.innerHTML = "Nombre: " +datos[0].name;
        levelDigimon.innerHTML = "Nivel: "+datos[0].level;
        imgDigimon.innerHTML = `<img style="width: 300px;" src="${datos[0].img}"/>`; 

    }

    //cerrar modal
    let cerrar = document.getElementById('cerrar');
    cerrar.onclick = cerrarModal;

    function cerrarModal() {
        myModal.hide();
    }
   
}
