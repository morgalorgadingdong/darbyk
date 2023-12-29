import ngrok from 'ngrok';
const PORT = process.env.PORT || 5173;

(async function() {
  await ngrok.connect(PORT);
  console.log(`ngrok tunnel set up on port ${PORT}`);
  console.log(`Public URL: ${url}`);
})();