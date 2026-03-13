const form = document.getElementById('qrForm');
const qrInput = document.getElementById('qrInput');
const qrContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');
const statusText = document.getElementById('status');

// Gera o QR Code usando qrcode.js e atualiza o botão de download
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = qrInput.value.trim();

  if (!payload) {
    statusText.textContent = 'Digite um texto ou URL válido.';
    downloadBtn.disabled = true;
    qrContainer.innerHTML = '';
    return;
  }

  statusText.textContent = 'Gerando QR Code...';
  downloadBtn.disabled = true;
  qrContainer.innerHTML = ''; // remove código anterior

  const canvas = document.createElement('canvas');

  try {
    // Renderiza no canvas criado
    await QRCode.toCanvas(canvas, payload, {
      width: 300,
      margin: 1,
      color: { dark: '#0f172a', light: '#ffffff' },
    });

    qrContainer.appendChild(canvas);
    statusText.textContent = 'QR Code pronto. Clique para baixar!';
    downloadBtn.disabled = false;
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
    statusText.textContent = 'Não foi possível gerar o QR Code. Tente novamente.';
  }
});

// Baixa o QR Code atual como imagem PNG
downloadBtn.addEventListener('click', () => {
  const canvas = qrContainer.querySelector('canvas');
  if (!canvas) {
    statusText.textContent = 'Nenhum QR Code disponível para download.';
    return;
  }

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'qr-code.png';
  link.click();
});
