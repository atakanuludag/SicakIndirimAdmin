import React, { useState, useEffect } from 'react';
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableMeta } from "mui-datatables";
import { toast } from 'react-toastify';
import CategoryService from "../services/CategoryService";
import CategoryItem, { CategoryForm } from "../models/CategoryItem";
import MUIDataTableLang from "../utils/MUIDataTableLang";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const Category: React.FC = () => {
  
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

  //const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const getItems = async () => {
      try {
        const result = await service.getItems();
        setItems(result);
      } catch(err){
        console.log("err", err);
      }
      
      
    }
    getItems();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setForm(initialFormState);
  }

  const handleDialogOpen = () => setDialogOpen(true);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleUpdateButton = (value: any, tableMeta: MUIDataTableMeta) =>{
    const row: any = tableMeta.tableData[tableMeta.rowIndex];
    const { id, title, description } = row;
    setForm({ ...form, id, title, description });
    handleDialogOpen();
  }

  const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if(form.id) await service.update(form);
    else await service.create(form)
    toast.success("Başarıyla kayıt edildi.");
    handleDialogClose();
    setForm(initialFormState);
    setLoading(false);
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
                <IconButton onClick={() => handleUpdateButton(value, tableMeta)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={"Sil"}>
                <IconButton onClick={() => handleDialogOpen()}>
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
          <IconButton onClick={handleDialogOpen}>
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



      <MUIDataTable
        title={"Kategori Listesi"}
        data={items}
        columns={columns}
        options={options}

      />


    </>
  );


}


export default Category;