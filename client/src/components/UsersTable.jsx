import React, { useState } from "react"
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { Chip } from "@mui/material"

export default function UsersTable({ users, onEdit, onDelete }) {

    const [search, setSearch] = useState("")
    const [selectedId, setSelectedId] = useState(null)

    const filtered = (users || []).filter(u => {

        const searchValue = search.toLowerCase()

        return (
            (u.username || "").toLowerCase().includes(searchValue) ||
            (u.email || "").toLowerCase().includes(searchValue)
        )
    })

    return (
        <>
            <TextField
                label="Search by username or email"
                fullWidth
                sx={{ mb: 3 }}
                onChange={e => setSearch(e.target.value)}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell data-testid="username-header" sx={{ fontWeight: "bold" }}>Username</TableCell>
                        <TableCell data-testid="email-header" sx={{ fontWeight: "bold" }}>Email</TableCell>
                        <TableCell data-testid="phone-header" sx={{ fontWeight: "bold" }}>Phone</TableCell>
                        <TableCell data-testid="age-header" sx={{ fontWeight: "bold" }}>Age</TableCell>
                        <TableCell data-testid="job-title-header" sx={{ fontWeight: "bold" }}>Job Title</TableCell>
                        <TableCell data-testid="hobbies-header" sx={{ fontWeight: "bold" }}>Hobbies</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {filtered.map(user => (
                        <TableRow
                            key={user.id}
                            hover
                            onClick={() => setSelectedId(user.id)}
                            selected={selectedId === user.id} // MUI built-in
                            sx={{
                                cursor: "pointer",
                                backgroundColor: selectedId === user.id ? "#cce5ff" : "inherit"
                            }}
                            data-testid={user.id}
                        >
                            <TableCell data-testid={user.username}>{user.username}</TableCell>
                            <TableCell data-testid={user.email}>{user.email}</TableCell>
                            <TableCell data-testid={user.phone}>{user.phone}</TableCell>
                            <TableCell data-testid={user.age}>{user.age}</TableCell>
                            <TableCell data-testid={user.title}>{user.title}</TableCell>
                            <TableCell>
                                {user.hobbies?.map((hobby) => (
                                    <Chip
                                        data-testid={hobby}
                                        key={hobby}
                                        label={hobby}
                                        size="small"
                                        color="primary"
                                        sx={{ mr: 0.5, mb: 0.5 }}
                                    />
                                ))}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(user)} data-testid="edit-icon"><EditIcon /></IconButton>
                                <IconButton onClick={() => onDelete(user.id)} data-testid="delete-icon"><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </>
    )
}