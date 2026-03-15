import React, { useState, useEffect } from "react"
import { Drawer, TextField, Button, Box, Stack } from "@mui/material"
import { addUser, updateUser } from "../api"
import { MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material"
import { validateUser } from "../utils/validation"

export default function UserDrawer({ open, onClose, user, reload, notify }) {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState("")
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [errors, setErrors] = useState({})
  const [hobbies, setHobbies] = useState([])

  // Example options for hobbies
  const hobbyOptions = ["Reading", "Sports", "Music", "Travel", "Cooking"]

  useEffect(() => {
    if (user) {
      setUsername(user.username || "")
      setEmail(user.email || "")
      setPhone(user.phone || "")
      setAge(user.age || "")
      setTitle(user.title || "")
      setAddress(user.address || "")
      setHobbies(user.hobbies || [])
    } else {
      setUsername("")
      setEmail("")
      setPhone("")
      setAge("")
      setTitle("")
      setAddress("")
      setHobbies([])
    }
  }, [user])

  const save = async () => {

    const payload = { username, email, phone, age, title, address, hobbies }

    const validation = validateUser(payload)

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    if (user) {
      await updateUser(user.id, payload)
      notify("User updated")
    } else {
      await addUser(payload)
      notify("User added")
    }

    reload()
    onClose()
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>

      <Box
        sx={{
          width: 360,
          p: 4
        }}
      >

        {/* Inputs with larger spacing */}
        <Stack spacing={3}>

          <TextField
            label="Username *"
            value={username}
            onChange={e => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
          />

          <TextField
            label="Email *"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />

          <TextField
            label="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            fullWidth
          />

          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            fullWidth
          />

          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="hobbies-label" fullWidth>Hobbies</InputLabel>
            <Select
              labelId="hobbies-label"
              multiple
              value={hobbies}
              onChange={e => setHobbies(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {hobbyOptions.map(hobby => (
                <MenuItem key={hobby} value={hobby}>
                  {hobby}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Stack>

        {/* Space before buttons */}
        <Box sx={{ mt: 5 }}>

          <Stack direction="row" spacing={2} justifyContent="flex-end">

            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={save}
            >
              Save
            </Button>

          </Stack>

        </Box>

      </Box>

    </Drawer>
  )
}