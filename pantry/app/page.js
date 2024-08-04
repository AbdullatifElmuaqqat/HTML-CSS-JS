'use client'
import React, { useEffect, useState } from 'react';
import { TextField, Box, Stack, Typography, Button, Modal } from '@mui/material';
import { collection, query, getDocs, addDoc, doc, setDoc, deleteDoc, count, getDoc} from 'firebase/firestore';
import { firestore } from './firebase'; // Adjust the path to your Firebase configuration file

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ItemName, setItemName] = useState('')


  const updatePantry1 = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      console.log(doc.id); // Log document ID for debugging
      pantryList.push({name: doc.id, ...doc.data()}); // Assuming each document has an 'itemName' field
    });

    console.log(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'));
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        console.log(doc.id); // Log document ID for debugging
        pantryList.push({name: doc.id, ...doc.data()}); // Assuming each document has an 'itemName' field
      });
      console.log(pantryList);
      setPantry(pantryList);
    };

    updatePantry();

  }, []);

  const addItem = async(item) => {
    const docRef =  doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      const {count} = docSnap.data()
    await setDoc(docRef,{count: count+1})
    
   } else{
    await setDoc(docRef,{count: 1})
   }
   updatePantry1()
  }

   const removeItem = async(item) =>{
    const docRef =  doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()) {
      const {count} = docSnap.data()
      if(count == 1){
    await deleteDoc(docRef)
      } else{
      await setDoc(docRef,{count : count-1})
    }
  }
   updatePantry1()
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgcolor="#f0f0f0"
      border={1}
      borderColor="grey.400"
      gap={1.5}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add item          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
          <Stack width = '100%' direction={'row'} spacing={2}>
        <TextField id="filled-basic" label="Item" variant="filled" fullWidth
        value={ItemName}
        onChange={(e) => setItemName(e.target.value)}/>
        
        <Button variant = "contained"
        onClick={() =>{
          addItem(ItemName);

        }}
        >Add</Button>
        </Stack>

          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
      
      <Button variant="contained" onClick={handleOpen}>Add</Button>

      <Box
        width="800px"
        bgcolor="#5F9EA0"
        textAlign="center"
        mb={2}
        border={5} // Border around the title box
        borderColor="grey.400"
        borderRadius={4}
      >
        <Typography variant="h2" color="#333">
          Pantry items
        </Typography>

      </Box>
      <Box
        width="800px"
        height="300px"
        overflow="auto"
        border={4} // Border around the scrollable box
        borderRadius={4}
        borderColor="grey.400"
        bgcolor="white"
        padding={2}
      >
        <Stack spacing={1}>
          {pantry.map(({name, count}) => (
            <Box
              key={name}
              width="100%"
              border={1}
              borderRadius={4}
              borderColor="grey.400"
              padding={2}
              bgcolor="white"
              display="flex"
              justifyContent="space-between"
              alignItems="space-between"
            >              
              <Typography>{name}</Typography>
                <Typography variant='h6' color="#333">
                  Quantity: {count}
                </Typography>
              
            <Button variant='contained' onClick= { () =>removeItem(name)}>
            Remove
            </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
