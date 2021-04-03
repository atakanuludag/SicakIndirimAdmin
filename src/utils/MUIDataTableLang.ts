const MUIDataTableLang = () => {
    return {
        textLabels: {
            body: {
                noMatch: "Herhangi bir veri bulunamadı.",
                toolTip: "Sıralama",
                columnHeaderTooltip: (column: any) => `Sırala: ${column.label}`
            },
            pagination: {
                next: "İleri",
                previous: "Geri",
                rowsPerPage: "Sayfa başına gösterilen:",
                displayRows: "/",
            },
            toolbar: {
                search: "Arama",
                downloadCsv: "CSV İndir",
                print: "Yazdır",
                viewColumns: "View Columns",
                filterTable: "Filtreler",
            },
            filter: {
                all: "Hepsi",
                title: "Filtreler",
                reset: "Temizle",
            },
            viewColumns: {
                title: "Sütunları Göster",
                titleAria: "Tablo Sütunlarını Göster/Gizle",
            },
            selectedRows: {
                text: "satır(lar) seçildi",
                delete: "Sil",
                deleteAria: "Delete Selected Rows",
            },
        }
    }
}

export default MUIDataTableLang;