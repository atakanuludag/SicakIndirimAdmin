import React, { useState, useEffect } from 'react';
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import CategoryService from "../services/CategoryService";
import CategoryItem, { CategoryForm } from "../models/CategoryItem";
import MUIDataTableLang from "../utils/MUIDataTableLang";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const Category: React.FC = () => {
  
  const service = new CategoryService();
  const [items, setItems] = useState<CategoryItem[]>(new Array<CategoryItem>());
  const [form, setForm] = useState<CategoryForm>({
    title: "",
    description: ""
  });
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

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

  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);
  
  const handleSnackBarClose = () => setSnackBarOpen(false);
  const handleSnackBarOpen = () => setSnackBarOpen(true);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const create = await service.create(form);
    handleDialogClose();
    handleSnackBarOpen();
    setLoading(false);
  }


  const columns: MUIDataTableColumnDef[] = [
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

        customBodyRender: () => {
          return (
            <React.Fragment>
              <Tooltip title={"Düzenle"}>
                <IconButton onClick={handleDialogOpen}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={"Sil"}>
                <IconButton onClick={handleDialogOpen}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

            </React.Fragment>
          )
        }
      }
    }
  ];


  const options = {
    ...MUIDataTableLang(),
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