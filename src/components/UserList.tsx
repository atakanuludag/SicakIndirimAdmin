import React, { useState, useEffect } from 'react';
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableMeta } from "mui-datatables";
import { useSnackbar } from 'notistack';
import { USER_ROLES } from "../core/Constants";
import UserService from "../services/UserService";
import UserItem, { UserForm } from "../models/UserItem";
import MUIDataTableLang from "../utils/MUIDataTableLang";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, FormControlLabel, Checkbox, FormGroup, FormLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Alerts from '../utils/Alerts';

import { useForm, SubmitHandler } from "react-hook-form";
//import mapValues from "lodash/mapValues"; lodash silinecek

let initialFormState: UserForm = {
  id: undefined,
  userName: "",
  email: "",
  password: "",
  name: "",
  surname: "",
  roles: []
};

const UserList: React.FC = () => {

  const { enqueueSnackbar } = useSnackbar();
  const alert = new Alerts(enqueueSnackbar);
  const service = new UserService();

 

  const [items, setItems] = useState<UserItem[]>(new Array<UserItem>());
  //const [form, setForm] = useState<UserForm>(initialFormState);

  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  
  let { register, handleSubmit, setValue } = useForm<UserForm>({
    defaultValues: initialFormState,
    shouldUnregister: false
  });
  const onSubmit: SubmitHandler<UserForm> = data => console.log("atakan", data);

  useEffect(() => {
    const getItems = async () => {
      try {
        const result = await service.getItems();
        setItems(result);
      } catch(err){
        console.log("[UserList] getItems() Error: ", err);
        alert.errorAlert("Veriler çekilirken bir hata oluştu.");
      }
    }
    getItems();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setRemoveDialogOpen(false);
    //setForm(initialFormState);
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*const { name, value } = e.target;
    if(name === "role"){
      let roles = form.roles;
      const roleIndex = roles.findIndex((r) => r === value);
      roleIndex === -1 ? roles.push(value) : roles.splice(roleIndex, 1);
      setForm({ ...form, roles });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });*/
  }



  const handleTableUpdateButton = (tableMeta: MUIDataTableMeta) =>{
    const row: any = tableMeta.tableData[tableMeta.rowIndex];
    const search = items.findIndex((i) => i.id === row.id);
    initialFormState = items[search] as UserForm;
    setValue("form", initialFormState);
    setDialogOpen(true);
  }

  const handleTableRemoveButton = (tableMeta: MUIDataTableMeta) =>{
    const row: any = tableMeta.tableData[tableMeta.rowIndex];
    const find = items.findIndex((i) => i.id === row.id);
    //setForm(items[find] as UserForm);
    setRemoveDialogOpen(true);
  }


  const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    /*e.preventDefault();
    setLoading(true);
    const items = form.id ? await service.update(form) : await service.create(form);
    //toast.success("Başarıyla kayıt edildi.");
    handleDialogClose();
    setForm(initialFormState);
    setLoading(false);
    items.length > 0 && setItems(items);*/
  }

  const handleRemoveFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    /*e.preventDefault();
    setLoading(true);
    const items = form.id ? await service.delete(form.id) : [];
    //toast.success("Başarıyla silindi.");
    handleDialogClose();
    setForm(initialFormState);
    setLoading(false);
    items.length > 0 && setItems(items);*/
  }
  //https://react-hook-form.com/form-builder
  //burada validate için illa type ile vermek lazım. model değilde type olarak vereceğiz
  
  

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false
      }
    },
    {
      name: "userName",
      label: "Kullanıcı Adı",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "name",
      label: "Adı",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "surname",
      label: "Soyadı",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "email",
      label: "E-Mail",
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Yeni Ekle</DialogTitle>
          <DialogContent>
            

            <TextField
              inputRef={register}
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Kullanıcı Adı"
              name="form.userName"
              autoComplete="userName"
            />

            <TextField
              inputRef={register}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Ad"
              name="form.name"
              autoComplete="name"
            />
            <TextField
              inputRef={register}
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Soyad"
              name="form.surname"
              autoComplete="surname"
            />
            <TextField
              inputRef={register}
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-Mail"
              name="form.email"
              autoComplete="email"
            />
          
            <FormGroup style={{marginTop: "10px"}}>
              <FormLabel component="label">Kullanıcı İzinleri</FormLabel>
              {
                USER_ROLES.map((role, index) => {
                  const checked = initialFormState.roles.some((r) => r === role);
                  return (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox color="primary" name="form.roles" checked={checked} inputRef={register} />}
                      label={role}
                      labelPlacement="end"
                    />
                  )
                })
              }
            </FormGroup>
           
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
            <DialogContentText id="alert-dialog-description"><strong>"{/*form.name*/}"</strong> adlı kullanıcıyı gerçekten silmek istiyor musunuz ?</DialogContentText>
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
        title={"Kullanıcı Listesi"}
        data={items}
        columns={columns}
        options={options}

      />


    </>
  );


}


export default UserList;