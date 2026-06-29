// URL-адрес вашего сервера, где запущен бот и API
const API_URL = "https://thyself-lavish-underhand.ngrok-free.dev/api/v1/tariffs";

window.dbFluxDevPrices = { coins_min: 1, coins_mid: 2, coins_max: 3 };
window.dbBananaPaintPrices = { coins_min: 2, coins_mid: 3, coins_max: 4 };
window.dbFluxPulidPrices = { coins_min: 1, coins_mid: 2, coins_max: 3 };
// 🔵 2. ДЕФОЛТНЫЕ ЗАГЛУШКИ ДЛЯ ВИДЕОСТУДИИ
window.dbKling5s = { coins: 7 };
window.dbKling10s = { coins: 14 };
window.dbSora4s = { coins: 3 };
window.dbSora8s = { coins: 6 };
window.dbSora12s = { coins: 9 };
window.dbSora16s = { coins: 12 };
window.dbSora20s = { coins: 15 };
// 🔥 ДОБАВЛЕНО: Заглушка для 3-го режима (посекундный тариф)
window.dbKlingPerSec = { coins_per_sec: 2 }; 

async function syncPricesFromDatabase() {
    try {
        // 🔥 ИСПРАВЛЕНО: Добавили заголовок ngrok-skip-browser-warning, чтобы Ngrok пропускал запрос!
        const response = await fetch(API_URL, { 
            method: "GET",
            cache: "no-store", 
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true" 
            }
        }); 
        const data = await response.json();
        
        // 🔥 НАШИ ДЕТЕКТИВНЫЕ ЛОГИ: Увидим в консоли браузера, что шлёт Макбук
        console.log("=== ОТВЕТ ОТ БЭКЕНДА ===");
        console.log("Живой JSON:", data);
        
        // 🔥 СОХРАНЯЕМ В ГЛОБАЛЬНУЮ ПАМЯТЬ БРАУЗЕРА (чтобы шторка её видела)
        window.allPrices = data;
        
        if (data && data.services) {
            // 🔥 Записываем новые цены из Mongo в наши безопасные переменные window.db...
            window.dbFluxDevPrices.coins_min = data.services.flux_dev.coins_min;
            window.dbFluxDevPrices.coins_mid = data.services.flux_dev.coins_mid;
            window.dbFluxDevPrices.coins_max = data.services.flux_dev.coins_max;

            window.dbBananaPaintPrices.coins_min = data.services.nano_banana_paint.coins_min;
            window.dbBananaPaintPrices.coins_mid = data.services.nano_banana_paint.coins_mid;
            window.dbBananaPaintPrices.coins_max = data.services.nano_banana_paint.coins_max;

            window.dbFluxPulidPrices.coins_min = data.services.flux_pulid.coins_min;
            window.dbFluxPulidPrices.coins_mid = data.services.flux_pulid.coins_mid;
            window.dbFluxPulidPrices.coins_max = data.services.flux_pulid.coins_max;
                        // 🔥 СОХРАНЯЕМ СВЕЖИЕ ЦЕНЫ ВИДЕО ИЗ MONGO
            if (data.services.kling_video_5s) window.dbKling5s.coins = data.services.kling_video_5s.coins;
            if (data.services.kling_video_10s) window.dbKling10s.coins = data.services.kling_video_10s.coins;
            if (data.services.sora_4s) window.dbSora4s.coins = data.services.sora_4s.coins;
            if (data.services.sora_8s) window.dbSora8s.coins = data.services.sora_8s.coins;
            if (data.services.sora_12s) window.dbSora12s.coins = data.services.sora_12s.coins;
            if (data.services.sora_16s) window.dbSora16s.coins = data.services.sora_16s.coins;
            if (data.services.sora_20s) window.dbSora20s.coins = data.services.sora_20s.coins;

            // 🔥 ДОБАВЛЕНО: Записываем живую стоимость за 1 секунду из базы!
            if (data.services.kling_control_per_sec) {
                window.dbKlingPerSec.coins_per_sec = data.services.kling_control_per_sec.coins_per_sec;
            }

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
        if (typeof updateNeoStartButtonText === "function") {
            updateNeoStartButtonText();
        }

        // 🔥 ДОБАВЛЕНО: Пинаем главную кнопку видео при загрузке страницы!
        if (typeof updateMotionSubmitButton === "function") {
            updateMotionSubmitButton();
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
    // Поддерживаем оба возможных ID для кнопки бананы-красок
    const btnDirect = document.getElementById('btn-start-banana-paint_2') || document.getElementById('btn-start-banana-paint');
    
    // 🔥 ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ ЦИФРОВОЙ ОПТИКИ (Класс text_image на Flux)
    if (btnText) {
        if (selectedAiModelEngine === 'custom') {
            // Если включен "custom", берем базовую цену Flux PuLID из безопасного объекта
            btnText.innerHTML = `Start ${window.dbFluxPulidPrices.coins_min} 🪙`; 
        } else {
            // Смотрим, какое качество выбрано в шторке текста (selectedTextQuality):
            if (selectedTextQuality === 'dev') {
                btnText.innerHTML = `Start ${window.dbFluxDevPrices.coins_mid} 🪙`; // Цена Pro из базы
            } else if (selectedTextQuality === 'ultra_4k') {
                btnText.innerHTML = `Start ${window.dbFluxDevPrices.coins_max} 🪙`; // Цена Ultra из базы
            } else {
                btnText.innerHTML = `Start ${window.dbFluxDevPrices.coins_min} 🪙`; // Стандартная цена
            }
        }
    }
    
    // 🔥 ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ УМНОГО ФОКУСА (Класс image_generation_direct на Nano Banana)
    if (btnDirect) {
        if (directGenQuality === 'dev') {
            btnDirect.innerHTML = `Start ${window.dbBananaPaintPrices.coins_mid} 🪙`; // Средняя цена бананы
        } else if (directGenQuality === 'ultra_4k') {
            btnDirect.innerHTML = `Start ${window.dbBananaPaintPrices.coins_max} 🪙`; // Максимальная цена бананы
        } else {
            btnDirect.innerHTML = `Start ${window.dbBananaPaintPrices.coins_min} 🪙`; // Минимальная цена бананы
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

    // 🔥 УНИВЕРСАЛЬНЫЙ КОД С ЗАЩИТОЙ ОТ СБОЕВ БАЗЫ
    if (window.allPrices && window.allPrices.services && window.allPrices.services[targetService]) {
        min = window.allPrices.services[targetService].coins_min;
        mid = window.allPrices.services[targetService].coins_mid;
        max = window.allPrices.services[targetService].coins_max;
    } else {
        // Если база недоступна или грузится, берем дефолты из нашего нового безопасного объекта
        const backup = targetService === 'nano_banana_paint' ? window.dbBananaPaintPrices : window.dbFluxDevPrices;
        min = backup.coins_min;
        mid = backup.coins_mid;
        max = backup.coins_max;
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
    
    // 🔥 ДОБАВЛЕНО: Пересчитываем цену на кнопке "Start" при смене формата
    if (typeof updateNeoStartButtonText === "function") updateNeoStartButtonText();
}

function setDirectRatio(ratio) { 
    directGenRatio = ratio; 
    const el = document.getElementById('btn_direct_ratio_2') || document.getElementById('btn_direct_ratio');
    if (el) el.innerHTML = ratio;
    
    // 🔥 ДОБАВЛЕНО: Пересчитываем цену на кнопке "Start" при смене формата
    if (typeof updateNeoStartButtonText === "function") updateNeoStartButtonText();
}

// Функция закрытия шторки (остается без изменений)
function closeCustomSheet() {
    const sheet = document.getElementById('custom_action_sheet');
    if (sheet) sheet.classList.remove('active');
}



/////////// БЛОК ВИДИО ///////////



// ====================================================================================
// 9. ПОЛНОЕ УПРАВЛЕНИЕ ВСЕМИ ШТОРКАМИ ВИДЕОСТУДИИ (ТЕПЕРЬ 100% ДИНАМИКА ИЗ MONGO!)
// ====================================================================================

function openUniversalDurationSheet() {
    const titleEl = document.getElementById('custom_sheet_title');
    const listEl = document.getElementById('custom_sheet_list');
    const sheetEl = document.getElementById('custom_action_sheet');
    if (!titleEl || !listEl || !sheetEl) return;

    titleEl.innerText = "ДЛИТЕЛЬНОСТЬ ВИДЕО";
    listEl.innerHTML = ''; // Очищаем список старых кнопок

    // 🍏 БЕЗОПАСНО: Берём цены из наших застрахованных объектов (там всегда либо база, либо дефолты)
    let price5s = window.dbKling5s.coins;   
    let price10s = window.dbKling10s.coins; 
    let sora4 = window.dbSora4s.coins;
    let sora8 = window.dbSora8s.coins;
    let sora12 = window.dbSora12s.coins;
    let sora16 = window.dbSora16s.coins;
    let sora20 = window.dbSora20s.coins;

    // 🔥 ПОДТЯГИВАЕМ СВЕЖИЙ JSON, ЕСЛИ ОН УЖЕ ДОЛЕТЕЛ ИЗ БАЗЫ
    if (window.allPrices && window.allPrices.services) {
        if (window.allPrices.services.kling_video_5s) price5s = window.allPrices.services.kling_video_5s.coins;
        if (window.allPrices.services.kling_video_10s) price10s = window.allPrices.services.kling_video_10s.coins;
        
        if (window.allPrices.services.sora_4s) sora4 = window.allPrices.services.sora_4s.coins;
        if (window.allPrices.services.sora_8s) sora8 = window.allPrices.services.sora_8s.coins;
        if (window.allPrices.services.sora_12s) sora12 = window.allPrices.services.sora_12s.coins;
        if (window.allPrices.services.sora_16s) sora16 = window.allPrices.services.sora_16s.coins;
        if (window.allPrices.services.sora_20s) sora20 = window.allPrices.services.sora_20s.coins;
    }

    let options = [];
    const activeMode = window.currentActiveMode || currentActiveMode;

    if (activeMode === 'animate_nosound') {
        // Режим 1: Оживление фото (Kling)
        options = [
            { sec: 5, text: '⏱️ 5 сек', label: '5 секунд', price: `${price5s} 🪙` },
            { sec: 10, text: '⏱️ 10 сек', label: '10 секунд', price: `${price10s} 🪙` }
        ];
    } else if (activeMode === 'animate_sound') {
        // Режим 2: Оживление со звуком (Sora)
        options = [
            { sec: 4, text: '⏱️ 4 сек', label: '4 секунды', price: `${sora4} 🪙` },
            { sec: 8, text: '⏱️ 8 сек', label: '8 секунд', price: `${sora8} 🪙` },
            { sec: 12, text: '⏱️ 12 сек', label: '12 секунд', price: `${sora12} 🪙` },
            { sec: 16, text: '⏱️ 16 сек', label: '16 секунд', price: `${sora16} 🪙` },
            { sec: 20, text: '⏱️ 20 сек', label: '20 секунд', price: `${sora20} 🪙` }
        ];
    }

    // Собираем кнопки шторки
    options.forEach(opt => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = 'custom-sheet-item';
        btn.innerHTML = `<span>${opt.label}</span><span class="coin-price">${opt.price}</span>`;
        
        btn.addEventListener('click', function() {
            selectDurationFromSheet(opt.sec, opt.text);
        });

        li.appendChild(btn);
        listEl.appendChild(li);
    });

    sheetEl.classList.add('active');
}

// 2. УМНЫЙ ОБРАБОТЧИК КЛИКА ПО СЕКУНДАМ
function selectDurationFromSheet(seconds, text) {
    const activeMode = window.currentActiveMode || currentActiveMode;

    if (activeMode === 'animate_nosound') {
        // Мягко меняем переменную 1-го режима (в HTML или window)
        if (typeof currentKlingDuration !== 'undefined') currentKlingDuration = seconds;
        if (typeof window.currentKlingDuration !== 'undefined') window.currentKlingDuration = seconds;
        
        const btn1 = document.getElementById('btn_video_duration');
        if (btn1) btn1.innerHTML = text; 
    } else if (activeMode === 'animate_sound') {
        // Мягко меняем переменную 2-го режима (в HTML или window)
        if (typeof currentSoraDuration !== 'undefined') currentSoraDuration = seconds;
        if (typeof window.currentSoraDuration !== 'undefined') window.currentSoraDuration = seconds;
        
        const btn2 = document.getElementById('btn_sora_duration');
        if (btn2) btn2.innerHTML = text; 
    }
    
       // 1. Пересчет для кнопок рисования (если мы на той вкладке)
    if (typeof updateNeoStartButtonText === 'function') {
        updateNeoStartButtonText();
    }
    
    // 2. 🔥 ДОБАВЬ СЮДА: Пересчет для главной кнопки видео из MongoDB
    if (typeof updateMotionSubmitButton === 'function') {
        updateMotionSubmitButton();
    }
    
    closeCustomSheet();

}

// 3. ПЕРЕНАПРАВЛЕНИЕ СТАРЫХ ВЫЗОВОВ ПОПАПОВ (чтобы кнопки в HTML продолжали работать)
function showNativeDurationPopup() { openUniversalDurationSheet(); }
function showNativeSoraDurationPopup() { openUniversalDurationSheet(); }

// ====================================================================================
// 10. УМНЫЙ ОБНОВЛЯТОР ЦЕН НА ВСЕХ ВСТРОЕННЫХ КНОПКАХ ВИДЕО (START)
// ====================================================================================
function updateMotionSubmitButton() {
    const startBtn1 = document.getElementById('neo_video_submit_btn');       // Режим 1 (Без звука)
    const startBtn2 = document.getElementById('neo_video_sound_submit_btn'); // Режим 2 (Со звуком)
    const startBtn3 = document.getElementById('neo_motion_submit_btn');      // Режим 3 (По видео)
    
    if (!startBtn1 && !startBtn2 && !startBtn3) return;

    // 🟢 1. ДИНАМИЧЕСКИЕ ЦЕНЫ ДЛЯ KLING (БЕРЕМ ИЗ НАШИХ ГЛОБАЛЬНЫХ ОБЪЕКТОВ WINDOW)
    const price5s = window.dbKling5s.coins;
    const price10s = window.dbKling10s.coins;

    // 🔵 2. ДИНАМИЧЕСКИЕ ЦЕНЫ ДЛЯ SORA (ТЕПЕРЬ ТОЖЕ ИЗ СТРУКТУРЫ WINDOW!)
    const sora4 = window.dbSora4s.coins;
    const sora8 = window.dbSora8s.coins;
    const sora12 = window.dbSora12s.coins;
    const sora16 = window.dbSora16s.coins;
    const sora20 = window.dbSora20s.coins;

    // 3. Железная защита от ошибок "not defined" на разных вкладках сайта!
    const klingSeconds = (typeof currentKlingDuration !== 'undefined') ? currentKlingDuration : ((typeof window.currentKlingDuration !== 'undefined') ? window.currentKlingDuration : 5);
    const soraSeconds = (typeof currentSoraDuration !== 'undefined') ? currentSoraDuration : ((typeof window.currentSoraDuration !== 'undefined') ? window.currentSoraDuration : 4);

    // 🔥 ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ РЕЖИМА 1: «Оживление фото» (Kling)
    if (startBtn1) {
        startBtn1.innerHTML = `Start ${klingSeconds === 10 ? price10s : price5s} 🪙`;
    }
    
    // 🔥 ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ РЕЖИМА 2: «Оживление со звуком» (Sora) -> ТЕПЕРЬ СЧИТАЕТ ВСЕ 5 ВАРНАНТОВ СЕКУНД!
    if (startBtn2) {
        let currentSoraPrice = sora4; // по дефолту за 4 секунды
        if (soraSeconds === 8) currentSoraPrice = sora8;
        if (soraSeconds === 12) currentSoraPrice = sora12;
        if (soraSeconds === 16) currentSoraPrice = sora16;
        if (soraSeconds === 20) currentSoraPrice = sora20;

        startBtn2.innerHTML = `Start ${currentSoraPrice} 🪙`; 
    }
    
    // 🔥 ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ РЕЖИМА 3: «Оживление по видео» (Motion Control) -> УМНОЖАЕТ ТАРИФ ИЗ БАЗЫ НА СЕКУНДЫ!
    if (startBtn3) {
        const ratePerSec = window.dbKlingPerSec.coins_per_sec; 
        const totalPrice = ratePerSec * klingSeconds; // Умножаем ставку из базы на выбранное в шторке время
        startBtn3.innerHTML = `Start ${totalPrice} 🪙`;
    }
}
