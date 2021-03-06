import React, { useState, useEffect } from 'react';
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableMeta } from "mui-datatables";
import { useSnackbar } from 'notistack';
import CategoryService from "../services/CategoryService";
import CategoryItem, { CategoryForm } from "../models/CategoryItem";
import MUIDataTableLang from "../utils/MUIDataTableLang";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Alerts from '../utils/Alerts';

const CategoryList: React.FC = () => {
  
  const { enqueueSnackbar } = useSnackbar();
  const alert = new Alerts(enqueueSnackbar);

  const service = new CategoryService();

  const initialFormState: CategoryForm = {
    id: undefined,
    title: "",
    description: ""
  };

  const [items, setItems] = useState<CategoryItem[]>(new Array<CategoryItem>());
  const [form, setForm] = useState<CategoryForm>(initialFormState);
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        const result = await service.getItems();
        setItems(result);
      } catch(err){
        console.log("[CategoryList] getItems() Error: ", err);
        alert.errorAlert("Veriler çekilirken bir hata oluştu.");
      }
    }
    getItems()
    
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setRemoveDialogOpen(false);
    setForm(initialFormState);
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleTableUpdateButton = (tableMeta: MUIDataTableMeta) =>{
    const row: any = tableMeta.tableData[tableMeta.rowIndex];
    const { id, title, description } = row;
    setForm({ ...form, id, title, description });
    setDialogOpen(true);
  }

  const handleTableRemoveButton = (tableMeta: MUIDataTableMeta) =>{
    const row: any = tableMeta.tableData[tableMeta.rowIndex];
    const { id, title, description } = row;
    setForm({ ...form, id, title, description });
    setRemoveDialogOpen(true);
  }


  const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const items = form.id ? await service.update(form) : await service.create(form);
      alert.successAlert("Başarıyla kayıt edildi.");
      handleDialogClose();
      setForm(initialFormState);
      setLoading(false);
      items.length > 0 && setItems(items);
    } catch(err){
      console.log("[CategoryList] handleFormSubmit() Error: ", err);
      alert.errorAlert("Veri kaydedilirken veya güncellenirken bir hata oluştu.");
    }
  }

  const handleRemoveFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const items = form.id ? await service.delete(form.id) : [];
      alert.successAlert("Başarıyla silindi.");
      handleDialogClose();
      setForm(initialFormState);
      setLoading(false);
      items.length > 0 && setItems(items);
    } catch(err){
      console.log("[CategoryList] handleRemoveFormSubmit() Error: ", err);
      alert.errorAlert("Silinirken bir hata oluştu.");
    }
  }

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false
      }
    },
    {
      name: "title",
      label: "Kategori",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "description",
      label: "Açıklama",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "actions",
      label: "İşlemler",
      options: {
        filter: false,
        sort: false,
        empty: false,
        //setCellProps: () => ({ style: { minWidth: "1px", maxWidth: "1px" }}),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <Tooltip title={"Düzenle"}>
                <IconButton onClick={() => handleTableUpdateButton(tableMeta)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={"Sil"}>
                <IconButton onClick={() => handleTableRemoveButton(tableMeta)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

            </React.Fragment>
          )
        }
      }
    }
  ];

  const options: any = {
    ...MUIDataTableLang(),
    selectableRows: false,
    customToolbar: () => {
      return (
        <Tooltip title={"Yeni Ekle"}>
          <IconButton onClick={() => setDialogOpen(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      );
    }
  }

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <form noValidate onSubmit={handleFormSubmit} autoComplete="off">
          <DialogTitle id="form-dialog-title">Yeni Ekle</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Kategori Adı"
              name="title"
              autoComplete="title"
              value={form?.title} onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Açıklama"
              name="description"
              autoComplete="description"
              value={form?.description} onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" disabled={loading}>
              Kapat
          </Button>
            <Button type="submit" color="primary" disabled={loading}>
              Kaydet
          </Button>
          </DialogActions>
        </form>
      </Dialog>


      <Dialog open={removeDialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <form noValidate onSubmit={handleRemoveFormSubmit} autoComplete="off">
          <DialogTitle id="form-dialog-title">Silme Onayı</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"><strong>"{form.title}"</strong> adlı kategoriyi gerçekten silmek istiyor musunuz ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" disabled={loading}>
              Kapat
          </Button>
            <Button type="submit" color="primary" disabled={loading}>
              Sil
          </Button>
          </DialogActions>
        </form>
      </Dialog>

      <MUIDataTable
        title={"Kategori Listesi"}
        data={items}
        columns={columns}
        options={options}

      />
    </>
  );
}

export default CategoryList;