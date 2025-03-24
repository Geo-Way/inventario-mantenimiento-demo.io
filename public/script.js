async function cargarPiezas() {
  const res = await fetch('/api/piezas');
  const piezas = await res.json();
  const contenedor = document.getElementById('piezas');
  contenedor.innerHTML = '';
  piezas.forEach(p => {
    contenedor.innerHTML += `
      <div>
        <h3>${p.nombre}</h3>
        <img src="${p.foto}" />
        <p>Proveedor: ${p.proveedor} | Precio: $${p.precio}</p>
        <p>Vida útil: ${p.vida_util} | Mantenimiento: ${p.mantenimiento_fecha}</p>
        <p>Código: ${p.codigo}</p>
      </div>
    `;
  });
}
document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();
  const body = {
    nombre: document.getElementById('nombre').value,
    proveedor: document.getElementById('proveedor').value,
    precio: parseFloat(document.getElementById('precio').value),
    vida_util: document.getElementById('vida_util').value,
    mantenimiento_fecha: document.getElementById('mantenimiento_fecha').value,
    codigo: document.getElementById('codigo').value,
    foto: document.getElementById('foto').value
  };
  await fetch('/api/piezas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  cargarPiezas();
});
cargarPiezas();
