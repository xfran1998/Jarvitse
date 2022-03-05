const socket = io();

socket.on('server', (message) => {
    let el = document.createElement('div');
    el.classList = "key-container";
    el.innerHTML = `<p>${message}</p>`;

    document.body.appendChild(el);
    console.log('Hijo añadido: ', message);
});

console.log('Hola');
socket.emit('client', 'Hola desde el cliente');