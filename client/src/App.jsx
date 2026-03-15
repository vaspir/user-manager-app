import React, { useEffect, useState } from "react"
import { Container, Button, Snackbar } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import UsersTable from "./components/UsersTable"
import UserDrawer from "./components/UserDrawer"
import { getUsers, deleteUser } from "./api"

export default function App() {

    const [users, setUsers] = useState([])
    const [drawer, setDrawer] = useState(false)
    const [selected, setSelected] = useState(null)
    const [notification, setNotification] = useState("")

    const loadUsers = async () => {
        const res = await getUsers()
        setUsers(res.data)
    }

    useEffect(() => { loadUsers() }, [])

    const openAdd = () => {
        setSelected(null)
        setDrawer(true)
    }

    const openEdit = (user) => {
        setSelected(user)
        setDrawer(true)
    }

    const remove = async (id) => {
        await deleteUser(id)
        setNotification("User deleted")
        loadUsers()
    }

    return (
        <Container sx={{ mt: 4 }}>

            <UsersTable
                users={users}
                onEdit={openEdit}
                onDelete={remove}
            />

            <Button data-testid='add-user-button'
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 3 }}
                onClick={openAdd}
            >
                Add User
            </Button>


            <UserDrawer
                open={drawer}
                onClose={() => setDrawer(false)}
                user={selected}
                reload={loadUsers}
                notify={setNotification}
            />

            <Snackbar open={!!notification} message={notification} autoHideDuration={3000} onClose={() => setNotification("")} />

        </Container>
    )
}