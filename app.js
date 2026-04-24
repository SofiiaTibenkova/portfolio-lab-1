const btn = document.getElementById('btn');
const statusText = document.getElementById('status-text');
const imageContainer = document.getElementById('image-container');
const launchTitle = document.getElementById('launch-title');
const launchDetails = document.getElementById('launch-details');
const providerSelect = document.getElementById('provider-select');

btn.addEventListener('click', async () => {
    try {
        statusText.textContent = 'Зв\'язок з орбітою...';
        btn.disabled = true;
        
        const provider = providerSelect.value;
        let url = 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=1';
        
        //параметр search для фільтрації за назвою
        if (provider) {
            url += `&search=${provider}`; 
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Не вдалося отримати дані: " + response.status);
        }
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const launch = data.results[0];
            const launchDate = new Date(launch.net).toLocaleString('uk-UA');
            
            //виведення фото ракети та інформації про місію
            if (launch.image) {
                imageContainer.innerHTML = `<img src="${launch.image}" alt="Space Rocket">`;
            } else {
                imageContainer.innerHTML = `<div class="placeholder-text">Фото місії відсутнє</div>`;
            }
            
            launchTitle.textContent = launch.name || 'Назва місії не вказана';
            launchDetails.innerHTML = `
                <p><strong>Статус:</strong> ${launch.status?.name || 'В очікуванні'}</p>
                <p><strong>Дата старту:</strong> ${launchDate}</p>
                <p><strong>Ракета:</strong> ${launch.rocket?.configuration?.name || 'Інформація оновлюється'}</p>
                <p><strong>Оператор:</strong> ${launch.launch_service_provider?.name || 'Приватний оператор'}</p>
            `;
            
            statusText.textContent = 'Дані отримано успішно.';
        } else {
            launchTitle.textContent = 'Поки немає запланованих місій';
            launchDetails.innerHTML = '';
            imageContainer.innerHTML = `<div class="placeholder-text">Запусків не знайдено</div>`;
            statusText.textContent = 'Спробуйте вибрати іншого провайдера.';
        }
        
    } catch (err) {
        statusText.textContent = `Помилка зв'язку: ${err.message}`;
    } finally {
        btn.disabled = false;
    }
});