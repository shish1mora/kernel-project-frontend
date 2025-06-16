const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
};

export function renderTable(data) {
    return (
        <table className="cve-details-table">
            <tbody>
            {Object.keys(data).map((key) => {
                const value = data[key];
                if (key === "description") {
                return (
                    <tr key={key}>
                    <th>ОПИСАНИЕ</th>
                    <td>{value ? value : "-"}</td>
                    </tr>
                );
                } else if (key === "base_score") {
                return (
                    <tr key={key}>
                    <th>БАЗОВАЯ ОЦЕНКА</th>
                    <td>{value ? parseFloat(value).toFixed(1) : "-"}</td>
                    </tr>
                );
                } else if (key === "last_modified_tracker" || key.includes("date")) {
                return (
                    <tr key={key}>
                    <th>ДАТА ПОСЛЕДНЕГО ИЗМЕНЕНИЯ</th>
                    <td>{formatDate(value)}</td>
                    </tr>
                );
                }
                return null;
            })}
            </tbody>
        </table>
    );
}