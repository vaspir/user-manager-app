const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const express = require("express")
const cors = require("cors")
const store = require("./usersStore")

const app = express()
app.use(cors())
app.use(express.json())

const validateUser = (user) => {

  if (!user.username)
    return "Username is required"

  if (!user.email)
    return "Email is required"

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(user.email))
    return "Invalid email"

  return null
}

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Manager API",
      version: "1.0.0",
      description: "Simple Users API"
    },
    servers: [
      {
        url: "http://localhost:4000"
      }
    ]
  },
  apis: ["./server/server.js"]
}

const swaggerSpec = swaggerJsDoc(swaggerOptions)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Returns list of users
 */
app.get("/api/users", (req, res) => {
  res.json(store.getAll())
})

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               title:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created
 */
app.post("/api/users", (req, res) => {

  const error = validateUser(req.body)

  if (error)
    return res.status(400).json({ error })

  const user = store.add(req.body)

  res.json(user)
})

/**
 * @swagger
 * /api/users/:id:
 *   put:
 *     summary: Edit user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               title:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created
 */
app.put("/api/users/:id", (req, res) => {

  store.update(Number(req.params.id), req.body)

  res.json({ success: true })
})

app.delete("/api/users/:id", (req, res) => {

  store.remove(Number(req.params.id))

  res.json({ success: true })
})

app.listen(4000, () => {
  console.log("Server running on port 4000")
})