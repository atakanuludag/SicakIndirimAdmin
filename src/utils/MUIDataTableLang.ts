const MUIDataTableLang = () => {
    return {
        textLabels: {
            body: {
                noMatch: "Herhangi bir veri bulunamadı.",
                toolTip: "Sıralama",
                columnHeaderTooltip: (column: any) => `Sort for ${column.label}`
            },
            pagination: {
                next: "İleri",
                previous: "Geri",
                rowsPerPage: "Sayfa başına gösterilen:",
                displayRows: "of",
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
                title: "Show Columns",
                titleAria: "Show/Hide Table Columns",
            },
            selectedRows: {
                text: "row(s) selected",
                delete: "Sil",
                deleteAria: "Delete Selected Rows",
            },
        }
    }
}

export default MUIDataTableLang;