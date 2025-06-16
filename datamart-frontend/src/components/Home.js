import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "KERNEL TRACKER";
  }, []);

  return (
    <div className="home">
      <div className="kernel-container">
        {/* Секция описания */}
        <div className="kernel-section">
          <h2 className="section-title">О сервисе</h2>
          <div className="info-block">
            <p>
              Этот сервис помогает отслеживать изменения ядра Linux в различных версиях и ветках. 
              Он позволяет проследить как оригинальные исправления в основной ветке (mainline), 
              так и их перенос в стабильные версии ядра.
            </p>
          </div>
        </div>

        {/* Секция функциональности */}
        <div className="kernel-section">
          <h2 className="section-title">Как это работает</h2>
          <div className="info-block">
            <p>
              Сервис предоставляет API-endpoint, который принимает хеш коммита ядра и возвращает информацию о связанных изменениях, включая:
            </p>
            <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
              <li>Оригинальное исправление в основной ветке</li>
              <li>Переносы в стабильные ветки</li>
              <li>Связанные исправления ошибок</li>
              <li>Информацию о версиях для каждого коммита</li>
            </ul>
          </div>
        </div>

        {/* Секция примера */}
        <div className="kernel-section">
          <h2 className="section-title">Пример отслеживания изменений</h2>
          <div className="info-block">
            <div className="info-item">
              <span className="info-label">Хеш коммита:</span>
              <span className="info-value">00012b2925e58d01e002a26389e3f0506f57da02</span>
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <p><strong>Исправление в основной ветке (mainline):</strong></p>
              <div className="info-item">
                <span className="info-label">Версия:</span>
                <span className="info-value">5.4-rc1</span>
              </div>
              <div className="info-item">
                <span className="info-label">Хеш:</span>
                <span className="info-value">f659bb6dae58c113805f92822e4c16ddd3156b79</span>
              </div>
            </div>

            <div style={{ marginTop: '15px' }}>
              <p><strong>Переносы в стабильные ветки:</strong></p>
              <div className="info-block" style={{ marginTop: '10px' }}>
                <div className="info-item">
                  <span className="info-label">5.3.4:</span>
                  <span className="info-value">c748297e8576cce33a9ddb9e3b9ccf4b2f11e290</span>
                </div>
                <div className="info-item">
                  <span className="info-label">5.2.19:</span>
                  <span className="info-value">06752109ced1e7c719d7dce9f12c9e67a93b62c7</span>
                </div>
                <div className="info-item">
                  <span className="info-label">4.19.77:</span>
                  <span className="info-value">d47636913bda8255652805eb29b9638e6d9311c1</span>
                </div>
                <div className="info-item">
                  <span className="info-label">4.14.147:</span>
                  <span className="info-value">00012b2925e58d01e002a26389e3f0506f57da02</span>
                </div>
                <div className="info-item">
                  <span className="info-label">4.9.195:</span>
                  <span className="info-value">33bdbb12e279f1c0e11687d529c18db88c17ec38</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
