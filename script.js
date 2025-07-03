const form = document.getElementById('surveyForm');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const emocion = form.emocion.value;
  const ganas = form.ganas.value;
  const acompanado = form.acompanado.value;

  let alerta = false;

  if (emocion === 'triste' || ganas === 'si' || acompanado === 'no') {
    alerta = true;
  }

  if (alerta) {
    resultado.innerHTML = `<p style="color: red;"><strong>🔔 Alerta:</strong> El estudiante puede necesitar apoyo emocional. Notificar al encargado.</p>`;
  } else {
    resultado.innerHTML = `<p style="color: green;">✅ Gracias por responder. ¡Sigue así!</p>`;
  }

  form.reset();
});