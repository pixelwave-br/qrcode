const qrForm = document.getElementById('qrForm');
const qrInput = document.getElementById('qrInput');
const qrContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');
const statusText = document.getElementById('status');

const passwordLength = document.getElementById('passwordLength');
const passwordLengthValue = document.getElementById('passwordLengthValue');
const includeLower = document.getElementById('includeLower');
const includeUpper = document.getElementById('includeUpper');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generatePasswordBtn = document.getElementById('generatePassword');
const passwordOutput = document.getElementById('passwordOutput');
const copyPasswordBtn = document.getElementById('copyPassword');

const hashForm = document.getElementById('hashForm');
const hashInput = document.getElementById('hashInput');
const hashAlgorithm = document.getElementById('hashAlgorithm');
const hashResult = document.getElementById('hashResult');
const copyHashBtn = document.getElementById('copyHash');

const uuidBtn = document.getElementById('uuidBtn');
const uuidOutput = document.getElementById('uuidOutput');
const copyUUIDBtn = document.getElementById('copyUUID');

const tokenLengthInput = document.getElementById('tokenLength');
const generateTokenBtn = document.getElementById('generateToken');
const tokenOutput = document.getElementById('tokenOutput');
const copyTokenBtn = document.getElementById('copyToken');

const strengthInput = document.getElementById('strengthInput');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const strengthCriteria = document.querySelectorAll('.strength-criteria li');

const wordInput = document.getElementById('wordInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');

const compoundForm = document.getElementById('compoundForm');
const principalInput = document.getElementById('principal');
const monthlyContributionInput = document.getElementById('monthlyContribution');
const annualRateInput = document.getElementById('annualRate');
const yearsInput = document.getElementById('years');
const compoundsPerYearInput = document.getElementById('compoundsPerYear');
const compoundTotal = document.getElementById('compoundTotal');
const compoundContribution = document.getElementById('compoundContribution');
const compoundInterest = document.getElementById('compoundInterest');

const generatePaletteBtn = document.getElementById('generatePalette');
const paletteDisplay = document.getElementById('paletteDisplay');
const paletteStatus = document.getElementById('paletteStatus');

const whatsappNumber = document.getElementById('whatsappNumber');
const whatsappMessage = document.getElementById('whatsappMessage');
const generateWhatsapp = document.getElementById('generateWhatsapp');
const whatsappOutput = document.getElementById('whatsappOutput');
const copyWhatsapp = document.getElementById('copyWhatsapp');
const whatsappStatus = document.getElementById('whatsappStatus');

const jsonInput = document.getElementById('jsonInput');
const formatJsonBtn = document.getElementById('formatJson');
const jsonOutput = document.getElementById('jsonOutput');
const copyJsonBtn = document.getElementById('copyJson');
const jsonStatus = document.getElementById('jsonStatus');

const bmiForm = document.getElementById('bmiForm');
const weightInput = document.getElementById('weightInput');
const heightInput = document.getElementById('heightInput');
const calculateBmiBtn = document.getElementById('calculateBmi');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');

const compressorFile = document.getElementById('compressorFile');
const compressorQuality = document.getElementById('compressorQuality');
const compressorQualityValue = document.getElementById('compressorQualityValue');
const compressImage = document.getElementById('compressImage');
const compressorPreview = document.getElementById('compressorPreview');
const downloadCompressor = document.getElementById('downloadCompressor');

const cutterFile = document.getElementById('cutterFile');
const cutterWidth = document.getElementById('cutterWidth');
const cutterHeight = document.getElementById('cutterHeight');
const cropImageBtn = document.getElementById('cropImage');
const cutterPreview = document.getElementById('cutterPreview');
const downloadCutter = document.getElementById('downloadCutter');

const resizeFile = document.getElementById('resizeFile');
const resizeWidth = document.getElementById('resizeWidth');
const resizeHeight = document.getElementById('resizeHeight');
const keepAspect = document.getElementById('keepAspect');
const resizeImageBtn = document.getElementById('resizeImage');
const resizePreview = document.getElementById('resizePreview');
const downloadResize = document.getElementById('downloadResize');

const nameInput = document.getElementById('nameInput');
const pickNameBtn = document.getElementById('pickName');
const nameResult = document.getElementById('nameResult');
const nameHistory = document.getElementById('nameHistory');

const symbolChars = '!@#$%^&*()_-+=[]{}/?;:,.';

const copyToClipboard = async (value) => {
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
};

const loadImageFromFile = (file) =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Nenhum arquivo enviado.'));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (error) => {
      URL.revokeObjectURL(url);
      reject(error);
    };
    img.src = url;
  });

const updateImagePreview = (container, src) => {
  if (!container) return;
  container.innerHTML = '';
  if (!src) {
    container.innerHTML = '<p class="status">Preview indisponível.</p>';
    return;
  }
  const img = document.createElement('img');
  img.src = src;
  container.appendChild(img);
};

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const updateCopyButtons = () => {
  if (copyPasswordBtn && passwordOutput) {
    copyPasswordBtn.disabled = !passwordOutput.value;
  }

  if (copyHashBtn && hashResult) {
    copyHashBtn.disabled = !hashResult.value;
  }

  if (copyUUIDBtn && uuidOutput) {
    copyUUIDBtn.disabled = !uuidOutput.value;
  }

  if (copyTokenBtn && tokenOutput) {
    copyTokenBtn.disabled = !tokenOutput.value;
  }

  if (copyWhatsapp && whatsappOutput) {
    copyWhatsapp.disabled = !whatsappOutput.value;
  }

  if (copyJsonBtn && jsonOutput) {
    copyJsonBtn.disabled = !jsonOutput.value;
  }
};

let lastResizeImage = null;
const prepareDownloadButton = (button, dataUrl, filename) => {
  if (!button) return;
  button.disabled = !dataUrl;
  if (!dataUrl) {
    delete button.dataset.url;
    delete button.dataset.filename;
    return;
  }
  button.dataset.url = dataUrl;
  button.dataset.filename = filename;
};

const triggerDownload = (button) => {
  if (!button) return;
  const url = button.dataset.url;
  const filename = button.dataset.filename || 'imagem.png';
  if (!url) return;
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
};

const initWordCounter = () => {
  if (!wordInput) return;

  const update = () => {
    const text = wordInput.value || '';
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length : 0;
    const paragraphs = text.split(/\n+/).filter((part) => part.trim()).length;

    if (wordCount) wordCount.textContent = words.length;
    if (charCount) charCount.textContent = text.length;
    if (sentenceCount) sentenceCount.textContent = sentences;
    if (paragraphCount) paragraphCount.textContent = paragraphs;
  };

  wordInput.addEventListener('input', update);
  update();
};

const initCompoundTool = () => {
  if (!compoundForm) return;

  compoundForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const principal = Number(principalInput?.value) || 0;
    const monthlyContribution = Number(monthlyContributionInput?.value) || 0;
    const annualRate = Number(annualRateInput?.value) || 0;
    const years = Number(yearsInput?.value) || 0;
    const compoundsPerYear = Number(compoundsPerYearInput?.value) || 1;

    const totalPeriods = years * compoundsPerYear;
    const periodicRate = annualRate / 100 / compoundsPerYear;

    let futureValue = 0;
    if (periodicRate === 0) {
      futureValue = principal + monthlyContribution * totalPeriods;
    } else {
      futureValue =
        principal * Math.pow(1 + periodicRate, totalPeriods) +
        (monthlyContribution *
          (Math.pow(1 + periodicRate, totalPeriods) - 1)) /
          periodicRate;
    }

    const totalContribution = principal + monthlyContribution * totalPeriods;
    const interestEarned = futureValue - totalContribution;

    if (compoundTotal) compoundTotal.textContent = formatCurrency(futureValue || 0);
    if (compoundContribution) compoundContribution.textContent = formatCurrency(totalContribution || 0);
    if (compoundInterest) compoundInterest.textContent = formatCurrency(interestEarned || 0);
  });
};

const generateCanvasFromImage = (image, width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
};

const initCompressorTool = () => {
  if (!compressImage || !compressorFile || !compressorQuality || !compressorPreview) return;

  const updateQualityText = () => {
    if (compressorQualityValue) {
      compressorQualityValue.textContent = `Qualidade: ${Math.round(Number(compressorQuality.value) * 100)}%`;
    }
  };

  compressorQuality.addEventListener('input', updateQualityText);
  updateQualityText();

  compressImage.addEventListener('click', async () => {
    const file = compressorFile.files?.[0];
    if (!file) {
      if (compressorPreview) {
        compressorPreview.innerHTML = '<p class="status">Selecione uma imagem primeiro.</p>';
      }
      return;
    }

    try {
      const image = await loadImageFromFile(file);
      const canvas = generateCanvasFromImage(image, image.naturalWidth, image.naturalHeight);
      const quality = Number(compressorQuality.value);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      updateImagePreview(compressorPreview, dataUrl);
      prepareDownloadButton(downloadCompressor, dataUrl, `compress_${file.name}`);
    } catch (error) {
      if (compressorPreview) {
        compressorPreview.innerHTML = `<p class="status">Erro ao carregar a imagem.</p>`;
      }
      console.error(error);
    }
  });

  if (downloadCompressor) {
    downloadCompressor.addEventListener('click', () => triggerDownload(downloadCompressor));
  }
};

const initCutterTool = () => {
  if (!cropImageBtn || !cutterFile || !cutterPreview) return;

  const getCropSize = (image) => {
    const desiredWidth = Number(cutterWidth?.value) || image.naturalWidth;
    const desiredHeight = Number(cutterHeight?.value) || image.naturalHeight;
    return {
      width: Math.min(desiredWidth, image.naturalWidth),
      height: Math.min(desiredHeight, image.naturalHeight),
    };
  };

  cropImageBtn.addEventListener('click', async () => {
    const file = cutterFile.files?.[0];
    if (!file) {
      if (cutterPreview) {
        cutterPreview.innerHTML = '<p class="status">Selecione uma imagem primeiro.</p>';
      }
      return;
    }

    try {
      const image = await loadImageFromFile(file);
      const crop = getCropSize(image);
      const startX = Math.max(0, (image.naturalWidth - crop.width) / 2);
      const startY = Math.max(0, (image.naturalHeight - crop.height) / 2);
      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, startX, startY, crop.width, crop.height, 0, 0, crop.width, crop.height);
      const dataUrl = canvas.toDataURL('image/png');
      updateImagePreview(cutterPreview, dataUrl);
      prepareDownloadButton(downloadCutter, dataUrl, `crop_${file.name}`);
    } catch (error) {
      if (cutterPreview) {
        cutterPreview.innerHTML = '<p class="status">Erro ao carregar a imagem.</p>';
      }
      console.error(error);
    }
  });

  if (downloadCutter) {
    downloadCutter.addEventListener('click', () => triggerDownload(downloadCutter));
  }
};

const initResizeTool = () => {
  if (!resizeImageBtn || !resizeFile || !resizePreview) return;

  const updateHeightFromWidth = () => {
    if (!keepAspect?.checked || !resizeWidth || !lastResizeImage) return;
    const widthValue = Number(resizeWidth.value);
    if (!widthValue) return;
    resizeHeight.value = Math.round((widthValue * lastResizeImage.naturalHeight) / lastResizeImage.naturalWidth);
  };

  resizeImageBtn.addEventListener('click', async () => {
    const file = resizeFile.files?.[0];
    if (!file) {
      if (resizePreview) {
        resizePreview.innerHTML = '<p class="status">Selecione uma imagem primeiro.</p>';
      }
      return;
    }

    try {
      const image = await loadImageFromFile(file);
      lastResizeImage = image;
      let targetWidth = Number(resizeWidth?.value) || image.naturalWidth;
      let targetHeight = Number(resizeHeight?.value) || image.naturalHeight;
      if (keepAspect?.checked) {
        targetHeight = Math.round((targetWidth * image.naturalHeight) / image.naturalWidth);
        resizeHeight.value = targetHeight;
      }

      const canvas = generateCanvasFromImage(image, targetWidth, targetHeight);
      const dataUrl = canvas.toDataURL('image/png');
      updateImagePreview(resizePreview, dataUrl);
      prepareDownloadButton(downloadResize, dataUrl, `resize_${file.name}`);
    } catch (error) {
      if (resizePreview) {
        resizePreview.innerHTML = '<p class="status">Erro ao carregar a imagem.</p>';
      }
      console.error(error);
    }
  });

  resizeWidth?.addEventListener('input', updateHeightFromWidth);

  if (downloadResize) {
    downloadResize.addEventListener('click', () => triggerDownload(downloadResize));
  }
};
const createPaletteSwatch = (hex) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Copiar';
  button.addEventListener('click', () => {
    copyToClipboard(hex);
  });

  const swatch = document.createElement('div');
  swatch.className = 'palette-swatch';
  swatch.style.backgroundColor = hex;

  const label = document.createElement('span');
  label.textContent = hex;
  swatch.appendChild(button);
  swatch.appendChild(label);

  return swatch;
};

const initPaletteTool = () => {
  if (!generatePaletteBtn || !paletteDisplay) return;

  const buildPalette = () => {
    const palette = Array.from({ length: 5 }, () =>
      `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')}`
    );

    paletteDisplay.innerHTML = '';
    palette.forEach((hex) => {
      paletteDisplay.appendChild(createPaletteSwatch(hex));
    });

    if (paletteStatus) paletteStatus.textContent = 'Paleta gerada. Clique em "Copiar" para salvar o código.';
  };

  generatePaletteBtn.addEventListener('click', buildPalette);
};

const initWhatsappTool = () => {
  if (!generateWhatsapp || !whatsappOutput || !whatsappNumber || !whatsappMessage) return;

  whatsappNumber.addEventListener('input', () => {
    if (whatsappStatus) {
      whatsappStatus.textContent = 'Número em andamento; mantenha o DDI +55 ao início.';
    }
  });

  generateWhatsapp.addEventListener('click', () => {
    const phone = whatsappNumber.value.replace(/\D/g, '');
    const message = (whatsappMessage.value || '').trim();

    if (!phone) {
      if (whatsappStatus) whatsappStatus.textContent = 'Informe um número válido.';
      whatsappOutput.value = '';
      if (copyWhatsapp) copyWhatsapp.disabled = true;
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;

    whatsappOutput.value = link;
    if (copyWhatsapp) copyWhatsapp.disabled = false;
    if (whatsappStatus) whatsappStatus.textContent = 'Link pronto. Abra no WhatsApp ou copie.';
  });

  if (copyWhatsapp) {
    copyWhatsapp.addEventListener('click', async () => {
      await copyToClipboard(whatsappOutput.value);
    });
  }
};

const initJsonTool = () => {
  if (!formatJsonBtn || !jsonInput || !jsonOutput) return;

  formatJsonBtn.addEventListener('click', () => {
    const text = jsonInput.value.trim();
    if (!text) {
      jsonOutput.value = '';
      if (jsonStatus) jsonStatus.textContent = 'Cole um JSON válido para formatar.';
      if (copyJsonBtn) copyJsonBtn.disabled = true;
      return;
    }

    try {
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);
      jsonOutput.value = formatted;
      if (jsonStatus) jsonStatus.textContent = 'JSON formatado com sucesso.';
      if (copyJsonBtn) copyJsonBtn.disabled = false;
    } catch (error) {
      jsonOutput.value = '';
      if (jsonStatus) jsonStatus.textContent = `Erro: ${error.message}`;
      if (copyJsonBtn) copyJsonBtn.disabled = true;
    }
  });

  if (copyJsonBtn) {
    copyJsonBtn.addEventListener('click', async () => {
      await copyToClipboard(jsonOutput.value);
    });
  }
};

const initNameSorter = () => {
  if (!pickNameBtn || !nameInput || !nameResult) return;
  const historyList = nameHistory?.querySelector('ul');
  let animationTimer = null;

  const formatNames = (text) =>
    text
      .split(/[\n,;]+/)
      .map((name) => name.trim())
      .filter(Boolean);

  const addToHistory = (entry) => {
    if (!historyList) return;
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.prepend(li);
    while (historyList.children.length > 5) {
      historyList.removeChild(historyList.lastChild);
    }
  };

  const setResultState = (state) => {
    if (!nameResult) return;
    nameResult.classList.toggle('rolling', state === 'rolling');
    nameResult.classList.toggle('winner', state === 'winner');
  };

  const rollVisibleName = (options) => {
    const candidate = options[Math.floor(Math.random() * options.length)];
    nameResult.textContent = candidate;
    return candidate;
  };

  pickNameBtn.addEventListener('click', () => {
    const options = formatNames(nameInput.value);
    if (!options.length) {
      nameResult.textContent = 'Cole ao menos um nome.';
      return;
    }

    if (animationTimer) {
      clearInterval(animationTimer);
      animationTimer = null;
    }

    pickNameBtn.disabled = true;
    nameResult.textContent = 'Sorteando...';
    setResultState('rolling');
    rollVisibleName(options);

    const duration = 5000;
    const interval = 120;
    let elapsed = 0;

    animationTimer = setInterval(() => {
      elapsed += interval;
      rollVisibleName(options);
      if (elapsed >= duration) {
        clearInterval(animationTimer);
        animationTimer = null;
        const winner = rollVisibleName(options);
        nameResult.textContent = `🏆 ${winner}`;
        setResultState('winner');
        addToHistory(winner);
        pickNameBtn.disabled = false;
      }
    }, interval);
  });
};

const initBmiTool = () => {
  if (!calculateBmiBtn || !weightInput || !heightInput || !bmiValue || !bmiCategory) return;

  const evaluateCategory = (value) => {
    if (value < 18.5) return 'Abaixo do peso';
    if (value < 25) return 'Peso normal';
    if (value < 30) return 'Sobrepeso';
    return 'Obesidade';
  };

  const calculate = () => {
    const weight = Number(weightInput.value);
    const heightCm = Number(heightInput.value);
    if (!weight || !heightCm) return;

    const heightMeters = heightCm / 100;
    const bmi = weight / (heightMeters * heightMeters);
    const category = evaluateCategory(bmi);

    bmiValue.textContent = bmi.toFixed(2);
    bmiCategory.textContent = category;
  };

  calculateBmiBtn.addEventListener('click', calculate);
};

const initPasswordTool = () => {
  if (!generatePasswordBtn || !passwordOutput) return;

  if (passwordLength && passwordLengthValue) {
    passwordLength.addEventListener('input', () => {
      passwordLengthValue.textContent = passwordLength.value;
    });
  }

  generatePasswordBtn.addEventListener('click', () => {
    const length = Number(passwordLength?.value) || 16;
    const pools = [];
    if (includeLower?.checked) pools.push('abcdefghijklmnopqrstuvwxyz');
    if (includeUpper?.checked) pools.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (includeNumbers?.checked) pools.push('0123456789');
    if (includeSymbols?.checked) pools.push(symbolChars);

    if (pools.length === 0) {
      passwordOutput.value = '';
      if (copyPasswordBtn) copyPasswordBtn.disabled = true;
      passwordOutput.placeholder = 'Selecione ao menos um tipo de caractere.';
      return;
    }

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    const result = [];
    for (let i = 0; i < length; i += 1) {
      const pool = pools[i % pools.length];
      const randomIndex = randomValues[i] % pool.length;
      result.push(pool[randomIndex]);
    }

    passwordOutput.value = result.join('');
    if (copyPasswordBtn) copyPasswordBtn.disabled = false;
  });

  if (copyPasswordBtn) {
    copyPasswordBtn.addEventListener('click', async () => {
      await copyToClipboard(passwordOutput.value);
    });
  }
};

const initHashTool = () => {
  if (!hashForm || !hashInput || !hashResult || !hashAlgorithm) return;

  hashForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = hashInput.value.trim();
    if (!value) {
      hashResult.value = '';
      if (copyHashBtn) copyHashBtn.disabled = true;
      hashResult.placeholder = 'Digite um texto para gerar o hash.';
      return;
    }

    let digest = '';
    const selectedAlgo = hashAlgorithm.value;

    if (window.CryptoJS) {
      switch (selectedAlgo) {
        case 'MD5':
          digest = CryptoJS.MD5(value).toString(CryptoJS.enc.Hex);
          break;
        case 'SHA-1':
          digest = CryptoJS.SHA1(value).toString(CryptoJS.enc.Hex);
          break;
        case 'SHA-256':
          digest = CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
          break;
        case 'SHA-384':
          digest = CryptoJS.SHA384(value).toString(CryptoJS.enc.Hex);
          break;
        case 'SHA-512':
          digest = CryptoJS.SHA512(value).toString(CryptoJS.enc.Hex);
          break;
        default:
          digest = '';
      }
    }

    hashResult.value = digest;
    if (copyHashBtn) copyHashBtn.disabled = !digest;
  });

  if (copyHashBtn) {
    copyHashBtn.addEventListener('click', async () => {
      await copyToClipboard(hashResult.value);
    });
  }
};

const initUUIDTool = () => {
  if (!uuidBtn || !uuidOutput) return;

  uuidBtn.addEventListener('click', () => {
    let uuid = '';
    if (crypto.randomUUID) {
      uuid = crypto.randomUUID();
    } else {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
      uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }

    uuidOutput.value = uuid;
    if (copyUUIDBtn) copyUUIDBtn.disabled = false;
  });

  if (copyUUIDBtn) {
    copyUUIDBtn.addEventListener('click', async () => {
      await copyToClipboard(uuidOutput.value);
    });
  }
};

const buildToken = (length) => {
  const additionalBytes = Math.ceil((length * 3) / 4);
  const randomBytes = new Uint8Array(additionalBytes);
  crypto.getRandomValues(randomBytes);
  const binary = Array.from(randomBytes, (byte) => String.fromCharCode(byte)).join('');
  const base64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return base64.slice(0, length);
};

const initTokenTool = () => {
  if (!generateTokenBtn || !tokenOutput) return;

  generateTokenBtn.addEventListener('click', () => {
    const length = Math.min(Math.max(Number(tokenLengthInput?.value) || 48, 24), 128);
    const token = buildToken(length);
    tokenOutput.value = token;
    if (copyTokenBtn) copyTokenBtn.disabled = false;
  });

  if (copyTokenBtn) {
    copyTokenBtn.addEventListener('click', async () => {
      await copyToClipboard(tokenOutput.value);
    });
  }
};

const evaluateStrength = (password = '') => {
  if (!strengthBar || !strengthText) return;
  const checks = {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[^A-Za-z0-9]/.test(password),
  };

  Object.entries(checks).forEach(([key, passed]) => {
    const criterion = document.querySelector(`.strength-criteria li[data-criterion="${key}"]`);
    if (criterion) {
      criterion.classList.toggle('filled', passed);
    }
  });

  const score = Object.values(checks).filter(Boolean).length;
  const width = (score / Object.keys(checks).length) * 100;
  strengthBar.style.width = `${width}%`;

  if (!password) {
    strengthText.textContent = 'Aguardando senha para avaliação.';
    return;
  }

  if (score <= 2) {
    strengthText.textContent = 'Fraca. Combine mais caracteres, números e símbolos.';
  } else if (score === 3) {
    strengthText.textContent = 'Moderada. Adicione mais variedade para reforçar.';
  } else if (score >= 4) {
    strengthText.textContent = 'Forte. Sua senha atende a múltiplos critérios.';
  }
};

const initStrengthTool = () => {
  if (!strengthInput) return;

  strengthInput.addEventListener('input', (event) => {
    evaluateStrength(event.target.value);
  });

  strengthInput.addEventListener('blur', () => {
    evaluateStrength(strengthInput.value);
  });
};

const initQRCode = () => {
  if (!qrForm || !qrInput || !qrContainer || !statusText) return;

  qrForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = qrInput.value.trim();

    if (!payload) {
      statusText.textContent = 'Digite um texto ou URL válido.';
      if (downloadBtn) downloadBtn.disabled = true;
      qrContainer.innerHTML = '';
      return;
    }

    statusText.textContent = 'Gerando QR Code...';
    if (downloadBtn) downloadBtn.disabled = true;
    qrContainer.innerHTML = '';

    const canvas = document.createElement('canvas');

    try {
      await QRCode.toCanvas(canvas, payload, {
        width: 300,
        margin: 1,
        color: { dark: '#0f172a', light: '#ffffff' },
      });

      qrContainer.appendChild(canvas);
      statusText.textContent = 'QR Code pronto. Clique para baixar!';
      if (downloadBtn) downloadBtn.disabled = false;
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      statusText.textContent = 'Não foi possível gerar o QR Code. Tente novamente.';
    }
  });

  if (downloadBtn) {
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
  }
};

initQRCode();
initPasswordTool();
initHashTool();
initUUIDTool();
initTokenTool();
initStrengthTool();
initWordCounter();
initCompoundTool();
initPaletteTool();
initWhatsappTool();
initJsonTool();
initBmiTool();
initCompressorTool();
initCutterTool();
initResizeTool();
initNameSorter();

document.addEventListener('DOMContentLoaded', () => {
  updateCopyButtons();
  if (strengthInput) evaluateStrength(strengthInput.value);
});
