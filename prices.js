// URL-адрес вашего сервера, где запущен бот и API
const API_URL = "https://thyself-lavish-underhand.ngrok-free.dev/api/v1/tariffs";

// 🟢 1. ДЕФОЛТНЫЕ ЗАГЛУШКИ ДЛЯ КАРТИНОК (РИСОВАНИЯ)
window.dbFluxDevPrices = { coins_min: 1, coins_mid: 2, coins_max: 3 };
window.dbBananaPaintPrices = { coins_min: 2, coins_mid: 3, coins_max: 4 };
window.dbFluxPulidPrices = { coins_min: 1, coins_mid: 2, coins_max: 3 }; // 🍏 ТУТ лежат цены для Оптики (Flux PuLID)!

// 🔵 2. ДЕФОЛТНЫЕ ЗАГЛУШКИ ДЛЯ ВИДЕОСТУДИИ
window.dbKling5s = { coins: 7 };
window.dbKling10s = { coins: 14 };
window.dbSora4s = { coins: 3 };
window.dbSora8s = { coins: 6 };
window.dbSora12s = { coins: 9 };
window.dbSora16s = { coins: 12 };
window.dbSora20s = { coins: 15 };
window.dbKlingPerSec = { coins_per_sec: 2 }; 

// 🟠 3. ДЕФОЛТНЫЕ ЗАГЛУШКИ ДЛЯ ФОТОСТУДИИ
window.dbFaceSwapPrices = { coins_min: 3, coins_mid: 4, coins_max: 5 };
window.dbClothingPrices = { coins_min: 3, coins_mid: 4, coins_max: 5 };
window.dbBackgroundPrices = { coins_min: 2, coins_mid: 3, coins_max: 4 };

// 🍌 ДОБАВЛЕНО: Личная заглушка Умного Фокуса (Nano Banana Edit) для 1-го режима фото!
window.dbBananaEditPrices = { coins_min: 2, coins_mid: 3, coins_max: 4 };

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
            // 🔥 1. ЗАПИСЫВАЕМ ЦЕНЫ ДЛЯ КАРТИНОК (РИСОВАНИЕ)
            window.dbFluxDevPrices.coins_min = data.services.flux_dev.coins_min;
            window.dbFluxDevPrices.coins_mid = data.services.flux_dev.coins_mid;
            window.dbFluxDevPrices.coins_max = data.services.flux_dev.coins_max;

            if (data.services.flux_pulid) {
                window.dbFluxPulidPrices.coins_min = data.services.flux_pulid.coins_min;
                window.dbFluxPulidPrices.coins_mid = data.services.flux_pulid.coins_mid;
                window.dbFluxPulidPrices.coins_max = data.services.flux_pulid.coins_max;
            }

            window.dbBananaPaintPrices.coins_min = data.services.nano_banana_paint.coins_min;
            window.dbBananaPaintPrices.coins_mid = data.services.nano_banana_paint.coins_mid;
            window.dbBananaPaintPrices.coins_max = data.services.nano_banana_paint.coins_max;

            // 🔥 2. СОХРАНЯЕМ СВЕЖИЕ ЦЕНЫ ВИДЕО ИЗ MONGO
            if (data.services.kling_video_5s) window.dbKling5s.coins = data.services.kling_video_5s.coins;
            if (data.services.kling_video_10s) window.dbKling10s.coins = data.services.kling_video_10s.coins;
            if (data.services.sora_4s) window.dbSora4s.coins = data.services.sora_4s.coins;
            if (data.services.sora_8s) window.dbSora8s.coins = data.services.sora_8s.coins;
            if (data.services.sora_12s) window.dbSora12s.coins = data.services.sora_12s.coins;
            if (data.services.sora_16s) window.dbSora16s.coins = data.services.sora_16s.coins;
            if (data.services.sora_20s) window.dbSora20s.coins = data.services.sora_20s.coins;

            if (data.services.kling_control_per_sec) {
                window.dbKlingPerSec.coins_per_sec = data.services.kling_control_per_sec.coins_per_sec;
            }

            // 🔥 3. СОХРАНЯЕМ СВЕЖИЕ ЦЕНЫ ФОТОСТУДИИ ИЗ MONGO
            if (data.services.hy_wu_faceswap) {
                window.dbFaceSwapPrices.coins_min = data.services.hy_wu_faceswap.coins_min;
                window.dbFaceSwapPrices.coins_mid = data.services.hy_wu_faceswap.coins_mid;
                window.dbFaceSwapPrices.coins_max = data.services.hy_wu_faceswap.coins_max;
            }
            if (data.services.hy_wu_clothing) {
                window.dbClothingPrices.coins_min = data.services.hy_wu_clothing.coins_min;
                window.dbClothingPrices.coins_mid = data.services.hy_wu_clothing.coins_mid;
                window.dbClothingPrices.coins_max = data.services.hy_wu_clothing.coins_max;
            }
            if (data.services.bria_background) {
                window.dbBackgroundPrices.coins_min = data.services.bria_background.coins_min;
                window.dbBackgroundPrices.coins_mid = data.services.bria_background.coins_mid;
                window.dbBackgroundPrices.coins_max = data.services.bria_background.coins_max;
            }
            
            // 🔥 ДОБАВЛЕНО: Сохраняем три уровня цен для Умного Фокуса Фотостудии (nano_banana_edit)
            if (data.services.nano_banana_edit) {
                window.dbBananaEditPrices.coins_min = data.services.nano_banana_edit.coins_min;
                window.dbBananaEditPrices.coins_mid = data.services.nano_banana_edit.coins_mid;
                window.dbBananaEditPrices.coins_max = data.services.nano_banana_edit.coins_max;
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

        // 🔥 Пинаем главную кнопку видео при загрузке страницы!
        if (typeof updateMotionSubmitButton === "function") {
            updateMotionSubmitButton();
        }

        // 🔥 ДОБАВЛЕНО: Пинаем кнопки фотостудии при загрузке страницы!
        if (typeof updateFotoSubmitButtons === "function") {
            updateFotoSubmitButtons();
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
    
    // Считываем количество кликнутых людей (1, 2 или 3)
    const currentFaces = parseInt(window.selectedStyleFacesCount) || 1;
    
    // Для Nano Banana (btnDirect) определяем ключ цены по количеству человек (min, mid, max)
    let bananaPriceKey = "coins_min"; 
    if (currentFaces === 2) bananaPriceKey = "coins_mid";
    else if (currentFaces === 3) bananaPriceKey = "coins_max";

    // 🔥 РАСЧЕТ ДЛЯ ТВОЕЙ КНОПКИ ФОТОСТУДИИ (Цифровая Оптика / Свой сюжет)
    if (btnText) {
        let basePrice = 2; // Стандартная базовая цена за 1 человека
        
        if (selectedAiModelEngine === 'custom') {
            // Если включен "custom", берем базовую цену Flux PuLID из безопасного объекта
            basePrice = window.dbFluxPulidPrices.coins_min || 2; 
        } else {
            // Смотрим, какое качество выбрано в шторке текста (selectedTextQuality):
            if (selectedTextQuality === 'dev') {
                basePrice = window.dbFluxDevPrices.coins_mid || 3; 
            } else if (selectedTextQuality === 'ultra_4k') {
                basePrice = window.dbFluxDevPrices.coins_max || 4; 
            } else {
                basePrice = window.dbFluxDevPrices.coins_min || 2; 
            }
        }
        
        // 🔥 ВАЖНО: Умножаем базовую стоимость на количество выбранных персонажей!
        let finalFluxPrice = basePrice * currentFaces;
        
        // Меняем текст на твоей реальной кнопке
        btnText.innerHTML = `Start ${finalFluxPrice} 🪙`;
    }
    
    // ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ УМНОГО ФОКУСА
    if (btnDirect) {
        let finalBananaPrice = window.dbBananaPaintPrices[bananaPriceKey] || window.dbBananaPaintPrices.coins_min;
        
        if (directGenQuality === 'dev' && currentFaces === 1) {
            finalBananaPrice = window.dbBananaPaintPrices.coins_mid;
        } else if (directGenQuality === 'ultra_4k' && currentFaces === 1) {
            finalBananaPrice = window.dbBananaPaintPrices.coins_max;
        }
        
        btnDirect.innerHTML = `Start ${finalBananaPrice} 🪙`;
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
    let targetService = serviceName || 'flux_dev';

    // 🔥 УМНЫЙ ПЕРЕХВАТ ДЛЯ ПЕРВОГО ЭКРАНА (ФОТО + ТЕКСТ):
    if (targetService === 'flux_pulid' || targetService === 'flux_dev') {
        const currentEngine = typeof selectedAiModelEngine !== 'undefined' ? selectedAiModelEngine : 'banana';
        
        if (currentEngine === 'banana') {
            targetService = 'nano_banana_edit';
        }
    }

    // УНИВЕРСАЛЬНЫЙ КОД С ЗАЩИТОЙ ОТ СБОЕВ БАЗЫ
    if (window.allPrices && window.allPrices.services && window.allPrices.services[targetService]) {
        min = window.allPrices.services[targetService].coins_min;
        mid = window.allPrices.services[targetService].coins_mid;
        max = window.allPrices.services[targetService].coins_max;
    } else {
        let backup = window.dbFluxDevPrices;
        if (targetService === 'nano_banana_paint') backup = window.dbBananaPaintPrices;
        if (targetService === 'flux_pulid') backup = window.dbFluxPulidPrices;
        if (targetService === 'nano_banana_edit') backup = window.dbBananaEditPrices;
        if (targetService === 'hy_wu_faceswap') backup = window.dbFaceSwapPrices;
        if (targetService === 'hy_wu_clothing') backup = window.dbClothingPrices;
        if (targetService === 'bria_background') backup = window.dbBackgroundPrices;

        min = backup.coins_min;
        mid = backup.coins_mid;
        max = backup.coins_max;
    }

    // 🔥 🔥 🔥 НАДЕЖНАЯ ИЗОЛЯЦИЯ: Умножаем цену только для первого режима фотостудии!
    if (targetService === 'flux_pulid' || targetService === 'nano_banana_edit') {
        const currentFaces = parseInt(window.selectedStyleFacesCount) || 1;
        min = min * currentFaces;
        mid = mid * currentFaces;
        max = max * currentFaces;
        console.log(`[Шторка-Прайс] Включен режим фото. Умножаем цены на людей: ${currentFaces}. Итог: ${min}, ${mid}, ${max}`);
    }

    listEl.innerHTML = `
        <li><button class="custom-sheet-item" onclick="if(window.Telegram?.WebApp?.HapticFeedback)Telegram.WebApp.HapticFeedback.impactOccurred('light'); selectQualityFromSheet('schnell', '⚡ Standard')"><span>Standard</span><span class="coin-price">${min} 🪙</span></button></li>
        <li><button class="custom-sheet-item" onclick="if(window.Telegram?.WebApp?.HapticFeedback)Telegram.WebApp.HapticFeedback.impactOccurred('light'); selectQualityFromSheet('dev', '💎 Pro')"><span>Pro</span><span class="coin-price">${mid} 🪙</span></button></li>
        <li><button class="custom-sheet-item" onclick="if(window.Telegram?.WebApp?.HapticFeedback)Telegram.WebApp.HapticFeedback.impactOccurred('light'); selectQualityFromSheet('ultra_4k', '🔥 Ultra')"><span>Ultra</span><span class="coin-price">${max} 🪙</span></button></li>
    `;

    document.getElementById('custom_action_sheet').classList.add('active');
}

// 2. ОТКРЫТИЕ ШТОРКИ ФОРМАТА (ОСТАВЛЯЕМ БЕЗ ИЗМЕНЕНИЙ)
function openUniversalRatioSheet() {
    const titleEl = document.getElementById('custom_sheet_title');
    const listEl = document.getElementById('custom_sheet_list');
    if (!titleEl || !listEl) return;

    titleEl.innerText = "СООТНОШЕНИЕ СТОРОН";
    
    listEl.innerHTML = `
        <li><button class="custom-sheet-item" onclick="Telegram.WebApp.HapticFeedback.impactOccurred('light'); selectRatioFromSheet('9:16')"><span style="width: 100%; text-align: center;">9:16</span></button></li>
        <li><button class="custom-sheet-item" onclick="Telegram.WebApp.HapticFeedback.impactOccurred('light'); selectRatioFromSheet('3:4')"><span style="width: 100%; text-align: center;">3:4</span></button></li>
        <li><button class="custom-sheet-item" onclick="Telegram.WebApp.HapticFeedback.impactOccurred('light'); selectRatioFromSheet('1:1')"><span style="width: 100%; text-align: center;">1:1</span></button></li>
        <li><button class="custom-sheet-item" onclick="Telegram.WebApp.HapticFeedback.impactOccurred('light'); selectRatioFromSheet('4:3')"><span style="width: 100%; text-align: center;">4:3</span></button></li>
        <li><button class="custom-sheet-item" onclick="Telegram.WebApp.HapticFeedback.impactOccurred('light'); selectRatioFromSheet('16:9')"><span style="width: 100%; text-align: center;">16:9</span></button></li>
    `;

    document.getElementById('custom_action_sheet').classList.add('active');
}

// ====================================================================================
// УНИВЕРСАЛЬНЫЙ ОБРАБОТЧИК КЛИКА ПО КАЧЕСТВУ В ШТОРКЕ (ОБСЛУЖИВАЕТ ВСЕ 3 САЙТА)
// ====================================================================================
function selectQualityFromSheet(id, text) {
    // 🟢 Проверяем активный подрежим фотостудии (из photo.html)
    const activeMode = window.currentActiveMode || (typeof currentActiveMode !== 'undefined' ? currentActiveMode : null);

    if (activeMode === 'text_image') {
        if (typeof selectedTextQuality !== 'undefined') selectedTextQuality = id;
        const el = document.getElementById('btn_text_quality');
        if (el) el.innerHTML = text;
    } else if (activeMode === 'face_swap') {
        if (typeof selectedSwapQuality !== 'undefined') selectedSwapQuality = id;
        const el = document.getElementById('btn_swap_quality');
        if (el) el.innerHTML = text;
    } else if (activeMode === 'tryon') {
        if (typeof selectedTryOnQuality !== 'undefined') selectedTryOnQuality = id;
        // 🔥 Железно обновляем обе капсулы примерки одежды на экране фотостудии!
        const q1 = document.getElementById('btn_tryon_quality_face');
        const q2 = document.getElementById('btn_tryon_quality');
        if (q1) q1.innerHTML = text;
        if (q2) q2.innerHTML = text;
    } else if (activeMode === 'bg_change') {
        if (typeof selectedBgQuality !== 'undefined') selectedBgQuality = id;
        const el = document.getElementById('btn_bg_quality');
        if (el) el.innerHTML = text;
    } else {
        // 🔵 Если мы не в фотостудии — значит, мы на вкладке рисования (Flux Dev и Nano Banana)
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
    }
    
    // 🔥 МГНОВЕННО ПИНАЕМ ВСЕ ОБНОВЛЯТОРЫ ЦЕН НА ВСЕХ САЙТАХ ПРОЕКТА!
    if (typeof updateNeoStartButtonText === "function") updateNeoStartButtonText(); // Рисование
    if (typeof updateMotionSubmitButton === "function") updateMotionSubmitButton(); // Видеостудия
    if (typeof updateFotoSubmitButtons === "function") updateFotoSubmitButtons();   // Фотостудия
    
    closeCustomSheet();
}

// 4. УМНЫЙ ОБРАБОТЧИК ФОРМАТА (ИСПРАВЛЕННЫЙ)
function selectRatioFromSheet(id) {
    // Проверяем, активен ли режим текстовой генерации ("Свой" или шаблоны)
    // Мы смотрим на твою глобальную переменную currentGenerationMode
    // Или проверяем, виден ли сам экран text_image
    const textImageScreen = document.getElementById('text_image');
    const isTextImageActive = (typeof currentGenerationMode !== 'undefined' && currentGenerationMode === 'custom') || 
                              (textImageScreen && textImageScreen.offsetParent !== null);

    if (isTextImageActive) {
        // Если мы в режиме Фото ("Свой" / Шаблоны)
        selectedTextRatio = id;
        const el = document.getElementById('btn_text_ratio');
        if (el) el.innerHTML = id;
    } else {
        // Если мы в любом другом режиме (Рисование и т.д.)
        directGenRatio = id;
        const el = document.getElementById('btn_direct_ratio_2') || document.getElementById('btn_direct_ratio');
        if (el) el.innerHTML = id;
    }
    
    // Безопасно обновляем текст кнопки "Start", если функция существует
    if (typeof updateNeoStartButtonText === "function") {
        updateNeoStartButtonText();
    }
    
    closeCustomSheet();
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
    // Получаем текущие кнопки, чтобы точно знать, какой экран открыт
    const btnKling = document.getElementById('btn_video_duration');
    const btnSora = document.getElementById('btn_sora_duration');
    
    // Определяем режим: смотрим на переменную или на видимость кнопки Sora
    let activeMode = window.currentActiveMode || currentActiveMode || 'animate_nosound';
    if (btnSora && btnSora.offsetParent !== null) {
        activeMode = 'animate_sound';
    }

    if (activeMode === 'animate_nosound') {
        // Мягко меняем переменную 1-го режима (в HTML или window)
        if (typeof currentKlingDuration !== 'undefined') currentKlingDuration = seconds;
        if (typeof window.currentKlingDuration !== 'undefined') window.currentKlingDuration = seconds;
        if (btnKling) btnKling.innerHTML = text; 
    } else if (activeMode === 'animate_sound') {
        // 🔥 ЖЕЛЕЗОБЕТОННО: Меняем переменную 2-го режима (Sora)
        if (typeof currentSoraDuration !== 'undefined') currentSoraDuration = seconds;
        if (typeof window.currentSoraDuration !== 'undefined') window.currentSoraDuration = seconds;
        if (btnSora) btnSora.innerHTML = text; 
    }
    
    // 1. Пересчет для кнопок рисования (если мы на той вкладке)
    if (typeof updateNeoStartButtonText === 'function') {
        updateNeoStartButtonText();
    }
    
    // 2. Пересчет для главной кнопки видео из MongoDB
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
    
    // 🔥 НАДЕЖНЫЙ ВАРИАНТ ДЛЯ SORA: Читаем секунды прямо из текста кнопки на экране!
    let soraSeconds = 4; // по умолчанию 4
    const soraBtnEl = document.getElementById('btn_sora_duration');
    if (soraBtnEl) {
        // Берем текст кнопки (например, "⏱️ 8 сек"), вытаскиваем оттуда цифру и превращаем в число 8
        const match = soraBtnEl.innerText.match(/\d+/);
        if (match) soraSeconds = parseInt(match, 10);
    }

    // 🔥 ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ РЕЖИМА 1: «Оживление фото» (Kling)
    if (startBtn1) {
        startBtn1.innerHTML = `Start ${klingSeconds === 10 ? price10s : price5s} 🪙`;
    }
    
    // 🔥 ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ РЕЖИМА 2: «Оживление со звуком» (Sora)
    if (startBtn2) {
        let currentSoraPrice = sora4; // по дефолту за 4 секунды (3 коина)
        if (soraSeconds === 8) currentSoraPrice = sora8;
        if (soraSeconds === 12) currentSoraPrice = sora12;
        if (soraSeconds === 16) currentSoraPrice = sora16;
        if (soraSeconds === 20) currentSoraPrice = sora20;

        startBtn2.innerHTML = `Start ${currentSoraPrice} 🪙`; 
    }
    
    // 🔥 ДИНАМИЧЕСКИЙ РАСЧЕТ ДЛЯ РЕЖИМА 3: «Оживление по видео» (Motion Control)
    if (startBtn3) {
        // Защита: берем цену из базы, если она готова, или ставим 2 по умолчанию
        const ratePerSec = (window.dbKlingPerSec && window.dbKlingPerSec.coins_per_sec) ? window.dbKlingPerSec.coins_per_sec : 2; 
        
        // На кнопке теперь ВСЕГДА будет просто надпись Start без лишних цифр страховок
        startBtn3.innerHTML = `Start`;

        // Тариф за секунду всё равно передаем в текст описания, чтобы точки заменялись на цифру
        const rateTextEl = document.getElementById('motion_rate_per_sec');
        if (rateTextEl) {
            rateTextEl.innerText = ratePerSec;
        }
    } 
}

// ====================================================================================
// 11. АВТОМАТИЧЕСКАЯ ПРИВЯЗКА КЛИКОВ ДЛЯ КНОПОК ВИДЕО (ПЕРЕНЕСЕНО СЮДА)
// ====================================================================================
// Ждем, пока браузер полностью отрисует все элементы страницы
window.addEventListener('DOMContentLoaded', () => {
    // Автоматически вешаем открытие шторки на кнопки времени видеостудии
    const btnKlingDuration = document.getElementById('btn_video_duration');
    const btnSoraDuration = document.getElementById('btn_sora_duration');
    const btnMotionDuration = document.getElementById('btn_motion_duration'); // на всякий случай для 3 режима

    if (btnKlingDuration) {
        btnKlingDuration.addEventListener('click', () => {
            if (window.Telegram?.WebApp?.HapticFeedback) Telegram.WebApp.HapticFeedback.impactOccurred('light');
            openUniversalDurationSheet();
        });
    }
    
    if (btnSoraDuration) {
        btnSoraDuration.addEventListener('click', () => {
            if (window.Telegram?.WebApp?.HapticFeedback) Telegram.WebApp.HapticFeedback.impactOccurred('light');
            openUniversalDurationSheet();
        });
    }

    if (btnMotionDuration) {
        btnMotionDuration.addEventListener('click', () => {
            if (window.Telegram?.WebApp?.HapticFeedback) Telegram.WebApp.HapticFeedback.impactOccurred('light');
            openUniversalDurationSheet();
        });
    }
});
/////////////////////////// ФОТО /////////////////////////////
// ====================================================================================
// 12. УМНЫЙ ОБНОВЛЯТОР ЦЕН НА ВСЕХ ВСТРОЕННЫХ КНОПКАХ ФОТО (START)
// ====================================================================================
function updateFotoSubmitButtons() {
    const btnText = document.getElementById('neo_text_submit_btn');   // Режим 1: Фото + Текст
    const btnSwap = document.getElementById('neo_swap_submit_btn');   // Режим 2: Face Swap
    const btnTryon = document.getElementById('neo_tryon_submit_btn'); // Режим 3: Примерка одежды
    const btnBg = document.getElementById('neo_bg_submit_btn');       // Режим 4: Смена фона
    
    if (!btnText && !btnSwap && !btnTryon && !btnBg) return;

    // 🟠 1. Считываем текст с капсулы качества для первого подэкрана (Фото + Текст)
    let photoTextQuality = 'standard';
    const textProtoBtn = document.getElementById('btn_text_quality');
    if (textProtoBtn) {
        const txt = textProtoBtn.innerText.toLowerCase();
        if (txt.includes('pro') || txt.includes('mid') || txt.includes('dev')) photoTextQuality = 'dev';
        if (txt.includes('ultra') || txt.includes('max') || txt.includes('4k')) photoTextQuality = 'ultra_4k';
    }

    // 🟠 2. Считываем текст с капсул остальных трех режимов
    let swapQuality = 'standard', tryonQuality = 'standard', bgQuality = 'standard';
    const swapBtn = document.getElementById('btn_swap_quality');
    if (swapBtn) {
        const txt = swapBtn.innerText.toLowerCase();
        if (txt.includes('pro') || txt.includes('mid') || txt.includes('dev')) swapQuality = 'dev';
        if (txt.includes('ultra') || txt.includes('max') || txt.includes('4k')) swapQuality = 'ultra_4k';
    }
    const tryonBtn = document.getElementById('btn_tryon_quality');
    if (tryonBtn) {
        const txt = tryonBtn.innerText.toLowerCase();
        if (txt.includes('pro') || txt.includes('mid') || txt.includes('dev')) tryonQuality = 'dev';
        if (txt.includes('ultra') || txt.includes('max') || txt.includes('4k')) tryonQuality = 'ultra_4k';
    }
    const bgBtn = document.getElementById('btn_bg_quality');
    if (bgBtn) {
        const txt = bgBtn.innerText.toLowerCase();
        if (txt.includes('pro') || txt.includes('mid') || txt.includes('dev')) bgQuality = 'dev';
        if (txt.includes('ultra') || txt.includes('max') || txt.includes('4k')) bgQuality = 'ultra_4k';
    }

    // 🔥 СЧИТЫВАЕМ КОЛИЧЕСТВО ВЫБРАННЫХ ЛЮДЕЙ ДЛЯ РЕЖИМА 1 (1, 2 или 3)
    const currentFaces = parseInt(window.selectedStyleFacesCount) || 1;

    // 🔥 🔥 🔥 НОВОЕ: Динамически пересчитываем и обновляем цены ПРЯМО ВНУТРИ ШТОРКИ КАЧЕСТВА!
    // Проверяем, какой движок выбран, чтобы взять правильный объект цен для шторки
    const currentEngine = typeof selectedAiModelEngine !== 'undefined' ? selectedAiModelEngine : 'banana';
    let pricesObj = (currentEngine === 'pulid') ? window.dbFluxPulidPrices : window.dbBananaEditPrices;

    if (pricesObj) {
        // Ищем элементы цифр в твоей шторке и пишем туда (Базовая цена из базы * Количество людей)
        if (document.getElementById("quality-flux-standard")) {
            document.getElementById("quality-flux-standard").innerText = (pricesObj.coins_min || 2) * currentFaces;
        }
        if (document.getElementById("quality-flux-pro")) {
            document.getElementById("quality-flux-pro").innerText = (pricesObj.coins_mid || 3) * currentFaces;
        }
        if (document.getElementById("quality-flux-ultra")) {
            document.getElementById("quality-flux-ultra").innerText = (pricesObj.coins_max || 4) * currentFaces;
        }
    }

    // 🔮 РАСЧЕТ ЦЕНЫ ДЛЯ БОЛЬШОЙ КНОПКИ «START»
    if (btnText) {
        if (currentEngine === 'pulid') {
            // 🍏 ЦИФРОВАЯ ОПТИКА (Flux PuLID)
            let basePrice = window.dbFluxPulidPrices.coins_min;
            if (photoTextQuality === 'dev') basePrice = window.dbFluxPulidPrices.coins_mid;
            else if (photoTextQuality === 'ultra_4k') basePrice = window.dbFluxPulidPrices.coins_max;
            else basePrice = window.dbFluxPulidPrices.coins_min;
            
            let finalFluxPrice = basePrice * currentFaces;
            btnText.innerHTML = `Start ${finalFluxPrice} 🪙`;
            
        } else {
            // 🍌 УМНЫЙ ФОКУС (Nano Banana Edit)
            let baseBananaPrice = window.dbBananaEditPrices.coins_min;
            if (photoTextQuality === 'dev') baseBananaPrice = window.dbBananaEditPrices.coins_mid;
            else if (photoTextQuality === 'ultra_4k') baseBananaPrice = window.dbBananaEditPrices.coins_max;
            else baseBananaPrice = window.dbBananaEditPrices.coins_min;
            
            let finalBananaPrice = baseBananaPrice * currentFaces;
            btnText.innerHTML = `Start ${finalBananaPrice} 🪙`;
        }
    }
    
    // 🔮 РАСЧЕТ ДЛЯ ОСТАЛЬНЫХ ТРЕХ РЕЖИМОВ (FACE SWAP, ОДЕЖДА, ФОН)
    if (btnSwap) {
        if (swapQuality === 'dev') btnSwap.innerHTML = `Start ${window.dbFaceSwapPrices.coins_mid} 🪙`;
        else if (swapQuality === 'ultra_4k') btnSwap.innerHTML = `Start ${window.dbFaceSwapPrices.coins_max} 🪙`;
        else btnSwap.innerHTML = `Start ${window.dbFaceSwapPrices.coins_min} 🪙`;
    }
    if (btnTryon) {
        if (tryonQuality === 'dev') btnTryon.innerHTML = `Start ${window.dbClothingPrices.coins_mid} 🪙`;
        else if (tryonQuality === 'ultra_4k') btnTryon.innerHTML = `Start ${window.dbClothingPrices.coins_max} 🪙`;
        else btnTryon.innerHTML = `Start ${window.dbClothingPrices.coins_min} 🪙`;
    }
    if (btnBg) {
        if (bgQuality === 'dev') btnBg.innerHTML = `Start ${window.dbBackgroundPrices.coins_mid} 🪙`;
        else if (bgQuality === 'ultra_4k') btnBg.innerHTML = `Start ${window.dbBackgroundPrices.coins_max} 🪙`;
        else btnBg.innerHTML = `Start ${window.dbBackgroundPrices.coins_min} 🪙`;
    }
}
