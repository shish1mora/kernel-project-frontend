import React from "react";

const Kernpage = ({ kernel_data }) => {
  // Функция обработки данных
  const processData = (inputData) => {
    if (!inputData || !Array.isArray(inputData)) return {};

    const fix_ml_hash = inputData[0]?.fix_ml_hash ?? "N/A";
    const fix_ml_ver = inputData[0]?.fix_ml_ver?.replace(/^v/, "") ?? "unknown";

    const bug_ml_hash = inputData[0]?.bug_ml_hash ?? null;
    const bug_ml_ver = inputData[0]?.bug_ml_ver?.replace(/^v/, "") ?? null;

    const result = {
      fix_ml: { hash: fix_ml_hash, ver: fix_ml_ver },
      bug_ml: { hash: bug_ml_hash, ver: bug_ml_ver },
      bug_st: [],
      fix_st: [],
    };

    const addedBugSt = new Set();
    const addedFixSt = new Set();

    for (const item of inputData) {
      const bugKey = `${item.bug_st_hash}|${item.bug_st_ver}`;
      if (item.bug_st_hash && item.bug_st_ver && !addedBugSt.has(bugKey)) {
        result.bug_st.push({
          hash: item.bug_st_hash,
          ver: item.bug_st_ver.replace(/^v/, ""),
        });
        addedBugSt.add(bugKey);
      }

      const fixKey = `${item.fix_st_hash}|${item.fix_st_ver}`;
      if (item.fix_st_hash && item.fix_st_ver && !addedFixSt.has(fixKey)) {
        result.fix_st.push({
          hash: item.fix_st_hash,
          ver: item.fix_st_ver.replace(/^v/, ""),
        });
        addedFixSt.add(fixKey);
      }
    }

    return result;
  };

  // Проверка входных данных
  if (!kernel_data || !Array.isArray(kernel_data) || kernel_data.length === 0) {
    return <div className="no-data">Данные изменения недоступны</div>;
  }

  const processed = processData(kernel_data);

  return (
    <div className="kernel-container">
      {/* Секция с информацией об исправлении */}
      <div className="kernel-section">
        <h3 className="section-title">Информация об исправлении</h3>
        <div className="info-block">
          <div className="info-item">
            <span className="info-label">Версия:</span>
            <span className="info-value">{processed.fix_ml.ver}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Хеш коммита:</span>
            <span className="info-value">{processed.fix_ml.hash}</span>
          </div>
        </div>
      </div>

      {/* Секция с информацией о внесении ошибки */}
      {processed.bug_ml.hash && processed.bug_ml.ver && (
        <div className="kernel-section">
          <h3 className="section-title">Информация о внесении ошибки</h3>
          <div className="info-block">
            <div className="info-item">
              <span className="info-label">Версия:</span>
              <span className="info-value">{processed.bug_ml.ver}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Хеш коммита:</span>
              <span className="info-value">{processed.bug_ml.hash}</span>
            </div>
          </div>
        </div>
      )}

      {/* Секция с информацией о переносе уязвимого кода */}
      {processed.bug_st.length > 0 && (
        <div className="kernel-section">
          <h3 className="section-title">Перенос уязвимого кода</h3>
          {processed.bug_st.map((item, index) => (
            <div key={`bug-st-${index}`} className="info-block">
              <div className="info-item">
                <span className="info-label">Версия:</span>
                <span className="info-value">{item.ver}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Хеш коммита:</span>
                <span className="info-value">{item.hash}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Секция с информацией о переносе исправлений */}
      {processed.fix_st.length > 0 && (
        <div className="kernel-section">
          <h3 className="section-title">Перенос исправлений</h3>
          {processed.fix_st.map((item, index) => (
            <div key={`fix-st-${index}`} className="info-block">
              <div className="info-item">
                <span className="info-label">Версия:</span>
                <span className="info-value">{item.ver}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Хеш коммита:</span>
                <span className="info-value">{item.hash}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Kernpage;
