// URL-адрес вашего сервера, где запущен бот и API
        const API_URL = "https://thyself-lavish-underhand.ngrok-free.dev/api/v1/tariffs";
        // Глобальные переменные цен (база запишет сюда цифры, а кнопка их считает)
        let fluxDevPrices = { coins_min: 1, coins_mid: 2, coins_max: 3 };
        let bananaPaintPrices = { coins_min: 2, coins_mid: 3, coins_max: 4 };
        let fluxPulidPrices = { coins_min: 1, coins_mid: 2, coins_max: 3 }; // для custom режима

async function syncPricesFromDatabase() {
    try {
        const response = await fetch(API_URL, { cache: "no-store" }); // Добавили no-store от кэша
        const data = await response.json();
        
        // 🔥 НАШИ ДЕТЕКТИВНЫЕ ЛОГИ: Увидим в консоли браузера, что шлёт Макбук
        console.log("=== ОТВЕТ ОТ БЭКЕНДА ===");
        console.log("Живой JSON:", data);
        
        // 🔥 СОХРАНЯЕМ В ГЛОБАЛЬНУЮ ПАМЯТЬ БРАУЗЕРА (чтобы шторка её видела)
        window.allPrices = data;
        
        if (data && data.services) {
            // 🔥 ОБНОВЛЯЕМ ЗНАЧЕНИЯ ВНУТРИ, ЧТОБЫ ШТОРКА НЕ ТЕРЯЛА СВЯЗЬ С СЫЛКОЙ В ПАМЯТИ
            fluxDevPrices.coins_min = data.services.flux_dev.coins_min;
            fluxDevPrices.coins_mid = data.services.flux_dev.coins_mid;
            fluxDevPrices.coins_max = data.services.flux_dev.coins_max;

            bananaPaintPrices.coins_min = data.services.nano_banana_paint.coins_min;
            bananaPaintPrices.coins_mid = data.services.nano_banana_paint.coins_mid;
            bananaPaintPrices.coins_max = data.services.nano_banana_paint.coins_max;

            fluxPulidPrices.coins_min = data.services.flux_pulid.coins_min;
            fluxPulidPrices.coins_mid = data.services.flux_pulid.coins_mid;
            fluxPulidPrices.coins_max = data.services.flux_pulid.coins_max;
        } else {
            console.warn("⚠️ База вернула пустые данные, используем заглушки");
            return;
        }

        
        // =========================================================================
        // 1. ДОСТАЕМ АКТУАЛЬНЫЕ ЦЕНЫ РЕЖИМОВ (Блок services из MongoDB Compass)
        // =========================================================================
        const fluxPrice = data.services.flux_pulid.coins_min;       
        const faceswapPrice = data.services.hy_wu_faceswap.coins_min; 
        const tryonPrice = data.services.hy_wu_clothing.coins_min;    
        const bgPrice = data.services.bria_background.coins_min;      
        
        // Дополнительные ИИ-режимы из твоего файла базы (на случай, если они есть на сайте)
        const fluxDevPrice = data.services.flux_dev.coins_min;
        const bananaEditPrice = data.services.nano_banana_edit.coins_min;
        const bananaPaintPrice = data.services.nano_banana_paint.coins_min;
        const kling5sPrice = data.services.kling_video_5s.coins;
        const kling10sPrice = data.services.kling_video_10s.coins;
        const soraPrice = data.services.sora_2_10s.coins;

        // =========================================================================
        // 2. СИЛОЙ ВСТАВЛЯЕМ ЦЕНЫ НА КНОПКИ РЕЖИМОВ САЙТА
        // =========================================================================
        
        // Твои базовые 4 кнопки
        if (document.getElementById("btn-start-flux")) document.getElementById("btn-start-flux").innerHTML = `Start ${fluxPrice} 🪙`;
        if (document.getElementById("btn-start-swap")) document.getElementById("btn-start-swap").innerHTML = `Start ${faceswapPrice} 🪙`;
        if (document.getElementById("btn-start-tryon")) document.getElementById("btn-start-tryon").innerHTML = `Start ${tryonPrice} 🪙`;
        if (document.getElementById("btn-start-bg")) document.getElementById("btn-start-bg").innerHTML = `Start ${bgPrice} 🪙`;

        // Кнопки для остальных режимов (если они выведены на фронтенд)
        if (document.getElementById("btn-start-flux-dev")) document.getElementById("btn-start-flux-dev").innerHTML = `Start ${fluxDevPrice} 🪙`;
        if (document.getElementById("btn-start-banana-edit")) document.getElementById("btn-start-banana-edit").innerHTML = `Start ${bananaEditPrice} 🪙`;
        if (document.getElementById("btn-start-banana-paint")) document.getElementById("btn-start-banana-paint").innerHTML = `Start ${bananaPaintPrice} 🪙`;
        if (document.getElementById("btn-start-kling5s")) document.getElementById("btn-start-kling5s").innerHTML = `Start ${kling5sPrice} 🪙`;
        if (document.getElementById("btn-start-kling10s")) document.getElementById("btn-start-kling10s").innerHTML = `Start ${kling10sPrice} 🪙`;
        if (document.getElementById("btn-start-sora")) document.getElementById("btn-start-sora").innerHTML = `Start ${soraPrice} 🪙`;
        // Вставляем живые цены из MongoDB в шторку качества
        if (document.getElementById("quality-flux-standard")) {
            document.getElementById("quality-flux-standard").innerText = fluxDevPrices.coins_min;
        }
        if (document.getElementById("quality-flux-pro")) {
            document.getElementById("quality-flux-pro").innerText = fluxDevPrices.coins_mid;
        }
        if (document.getElementById("quality-flux-ultra")) {
            document.getElementById("quality-flux-ultra").innerText = fluxDevPrices.coins_max;
        }

        console.log("✅ Все кнопки активных режимов на сайте успешно получили новые цены из MongoDB!");
    } catch (error) {
        console.error("❌ Не удалось загрузить динамические цены с сервера бота:", error);
    }
}

// Запуск синхронизации автоматически
window.addEventListener("DOMContentLoaded", syncPricesFromDatabase);

// ====================================================================================
// 7. УМНЫЙ ОБНОВЛЯТОР СТОИМОСТИ НА ВСТРОЕННЫХ КНОПКАХ (ТЕПЕРЬ ТУТ!)
// ====================================================================================
function updateNeoStartButtonText() {
    const btnText = document.getElementById('btn-start-flux-dev');
    const btnDirect = document.getElementById('btn-start-banana-paint_2') || document.getElementById('btn-start-banana-paint');
    
    if (btnText) {
        if (selectedAiModelEngine === 'custom') {
            btnText.innerHTML = `Start ${fluxPulidPrices.coins_min} 🪙`; 
        } else {
            if (selectedTextQuality === 'dev') {
                btnText.innerHTML = `Start ${fluxDevPrices.coins_mid} 🪙`; 
            } else if (selectedTextQuality === 'ultra_4k') {
                btnText.innerHTML = `Start ${fluxDevPrices.coins_max} 🪙`; 
            } else {
                btnText.innerHTML = `Start ${fluxDevPrices.coins_min} 🪙`; 
            }
        }
    }
    
    if (btnDirect) {
        if (directGenQuality === 'dev') {
            btnDirect.innerHTML = `Start ${bananaPaintPrices.coins_mid} 🪙`; 
        } else if (directGenQuality === 'ultra_4k') {
            btnDirect.innerHTML = `Start ${bananaPaintPrices.coins_max} 🪙`; 
        } else {
            btnDirect.innerHTML = `Start ${bananaPaintPrices.coins_min} 🪙`; 
        }
    }
}

// ====================================================================================
// 8. УПРАВЛЕНИЕ УНИВЕРСАЛЬНЫМИ ШТОРКАМИ И ОБРАБОТЧИКАМИ (СИНХРОНИЗИРОВАНО В PRICES.JS)
// ====================================================================================

// 1. ОТКРЫТИЕ ШТОРКИ КАЧЕСТВА
function openUniversalQualitySheet(serviceName) {
    const titleEl = document.getElementById('custom_sheet_title');
    const listEl = document.getElementById('custom_sheet_list');
    if (!titleEl || !listEl) return;

    titleEl.innerText = "КАЧЕСТВО ГЕНЕРАЦИИ";
    
    let min = 1, mid = 2, max = 3;
    const targetService = serviceName || 'flux_dev';

    // 🔥 УНИВЕРСАЛЬНЫЙ КОД: Он сам подставит и flux_dev, и nano_banana_paint в зависимости от экрана!
    if (window.allPrices && window.allPrices.services && window.allPrices.services[targetService]) {
        min = window.allPrices.services[targetService].coins_min;
        mid = window.allPrices.services[targetService].coins_mid;
        max = window.allPrices.services[targetService].coins_max;
    }

    listEl.innerHTML = `
        <li><button class="custom-sheet-item" onclick="selectQualityFromSheet('schnell', '⚡ Standard')"><span>Standard</span><span class="coin-price">${min} 🪙</span></button></li>
        <li><button class="custom-sheet-item" onclick="selectQualityFromSheet('dev', '💎 Pro')"><span>Pro</span><span class="coin-price">${mid} 🪙</span></button></li>
        <li><button class="custom-sheet-item" onclick="selectQualityFromSheet('ultra_4k', '🔥 Ultra')"><span>Ultra</span><span class="coin-price">${max} 🪙</span></button></li>
    `;

    document.getElementById('custom_action_sheet').classList.add('active');
}

// 2. ОТКРЫТИЕ ШТОРКИ ФОРМАТА (ПЕРЕНЕСЕНА СЮДА!)
function openUniversalRatioSheet() {
    const titleEl = document.getElementById('custom_sheet_title');
    const listEl = document.getElementById('custom_sheet_list');
    if (!titleEl || !listEl) return;

    titleEl.innerText = "СООТНОШЕНИЕ СТОРОН";
    
    listEl.innerHTML = `
        <li><button class="custom-sheet-item" onclick="selectRatioFromSheet('9:16')"><span style="width: 100%; text-align: center;">9:16</span></button></li>
        <li><button class="custom-sheet-item" onclick="selectRatioFromSheet('3:4')"><span style="width: 100%; text-align: center;">3:4</span></button></li>
        <li><button class="custom-sheet-item" onclick="selectRatioFromSheet('1:1')"><span style="width: 100%; text-align: center;">1:1</span></button></li>
        <li><button class="custom-sheet-item" onclick="selectRatioFromSheet('4:3')"><span style="width: 100%; text-align: center;">4:3</span></button></li>
        <li><button class="custom-sheet-item" onclick="selectRatioFromSheet('16:9')"><span style="width: 100%; text-align: center;">16:9</span></button></li>
    `;

    document.getElementById('custom_action_sheet').classList.add('active');
}

// 3. УМНЫЙ ОБРАБОТЧИК КАЧЕСТВА
function selectQualityFromSheet(id, text) {
    const btnText = document.getElementById('btn-start-flux-dev');
    const isTextImageActive = btnText && btnText.offsetParent !== null;

    if (isTextImageActive) {
        selectedTextQuality = id;
        const el = document.getElementById('btn_text_quality');
        if (el) el.innerHTML = text;
    } else {
        directGenQuality = id;
        const el = document.getElementById('btn_direct_quality_2') || document.getElementById('btn_direct_quality');
        if (el) el.innerHTML = text;
    }
    
    updateNeoStartButtonText();
    closeCustomSheet();
}

// 4. УМНЫЙ ОБРАБОТЧИК ФОРМАТА
function selectRatioFromSheet(id) {
    const btnText = document.getElementById('btn-start-flux-dev');
    const isTextImageActive = btnText && btnText.offsetParent !== null;

    if (isTextImageActive) {
        selectedTextRatio = id;
        const el = document.getElementById('btn_text_ratio');
        if (el) el.innerHTML = id;
    } else {
        directGenRatio = id;
        const el = document.getElementById('btn_direct_ratio_2') || document.getElementById('btn_direct_ratio');
        if (el) el.innerHTML = id;
    }
    
    updateNeoStartButtonText();
    closeCustomSheet();
}

// Функции принудительной синхронизации формата для капсул кадра на основном экране
function setTextRatio(ratio) { 
    selectedTextRatio = ratio; 
    const el = document.getElementById('btn_text_ratio');
    if (el) el.innerHTML = ratio;
}

function setDirectRatio(ratio) { 
    directGenRatio = ratio; 
    const el = document.getElementById('btn_direct_ratio_2') || document.getElementById('btn_direct_ratio');
    if (el) el.innerHTML = ratio;
}

// Функция закрытия шторки
function closeCustomSheet() {
    const sheet = document.getElementById('custom_action_sheet');
    if (sheet) sheet.classList.remove('active');
}
